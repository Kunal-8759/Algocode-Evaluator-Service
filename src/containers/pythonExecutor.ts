import CodeExecutorStrategy, { ExecutionResponse } from '../types/codeExecutorStrategy';
import { PYTHON_IMAGE } from '../utils/constants';
import createContainer from './containersFactory';
import decodeDockerStream from './dockerHelper';
import pullImage from './pullImage';


class PythonExecutor implements CodeExecutorStrategy{
    async execute(code:string ,inputTestCase:string):Promise<ExecutionResponse>{


        const rawLogBuffer: Buffer[] = [];//array of type buffer that holds the chunk

        //lets first pull the python image into the local machine
        await pullImage(PYTHON_IMAGE);//python image is a string 

        const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > test.py && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | python3 test.py`;

        //initialising the new python container 
        const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
            '/bin/sh', 
            '-c',
            runCommand
        ]); 

        // starting / booting the corresponding docker container
        await pythonDockerContainer.start();

        console.log("Started the docker container");

        //tum log me kya dekhna chahte ho mention kro kruki log stream ke through aayega
        const loggerStream = await pythonDockerContainer.logs({
            stdout: true,
            stderr: true,
            timestamps: false,
            follow: true // whether the logs are streamed or returned as a string
        });
        
        // Attach events on the stream objects to start and stop reading
        loggerStream.on('data', (chunk) => {
            rawLogBuffer.push(chunk);
        });

        try {
            const codeResponse : string = this.fetchDecodedStream(loggerStream,rawLogBuffer);
            //if the promise resolved => stdout else stderr
            return {output:codeResponse,status:"COMPLETED"};
        } catch (error) {
            return {output:codeResponse,status : "ERROR"};
        } finally{
            await pythonDockerContainer.remove();
        }    
    }

    fetchDecodedStream(loggerStream:NodeJS.ReadableStream , rawLogBuffer: Buffer[]) {
    
        return new Promise((res,rej) => {
            loggerStream.on('end', () => {
                console.log("raw log buffer in array : ",rawLogBuffer);
    
                const completeBuffer = Buffer.concat(rawLogBuffer);
                console.log("raw log buffere after concatenated",completeBuffer); 
                
                const decodedStream = decodeDockerStream(completeBuffer);//output:{stdout : '' ,stderr : ''}
                console.log("output after shaping the stream ",decodedStream);
    
    
                if(decodedStream.stderr){
                    rej(decodedStream.stderr);
                }
                else{
                    res(decodedStream.stdout);
                }
            });
        });
    } 

    
}

export default PythonExecutor;
