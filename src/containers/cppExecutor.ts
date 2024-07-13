import CodeExecutorStrategy,{ExecutionResponse} from '../types/codeExecutorStrategy';
import { CPP_IMAGE } from '../utils/constants';
import createContainer from './containersFactory';
import fetchDecodedStream from './fetchDecodedStream';
import pullImage from './pullImage';


class CppExecutor implements CodeExecutorStrategy{
    async execute(code:string ,inputTestCase:string):Promise<ExecutionResponse>{

        const rawLogBuffer: Buffer[] = [];//array of type buffer that holds the chunk

        await pullImage(CPP_IMAGE);

        const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > main.cpp && g++ main.cpp -o main && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | ./main`;
        console.log(runCommand);

        const cppDockerContainer = await createContainer(CPP_IMAGE, [
            '/bin/sh', 
            '-c',
            runCommand
        ]); 

        await cppDockerContainer.start();

        console.log("Started the cpp docker container");

        const loggerStream = await cppDockerContainer.logs({
            stdout: true,
            stderr: true,
            timestamps: false,
            follow: true // whether the logs are streamed or returned as a string
        });
        
        loggerStream.on('data', (chunk) => {
            rawLogBuffer.push(chunk);
        });

        try {
            const codeResponse :string =await fetchDecodedStream(loggerStream,rawLogBuffer);
            //if the promise resolved => stdout else stderr
            return {output:codeResponse,status:"COMPLETED"};
        } catch (error) {
            return {output:error as string,status : "ERROR"};
        } finally{
            await cppDockerContainer.remove();
        }
        
    }
}


export default CppExecutor;