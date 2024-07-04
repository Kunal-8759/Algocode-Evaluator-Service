import { PYTHON_IMAGE } from '../utils/constants';
import createContainer from './containersFactory';
import decodeDockerStream from './dockerHelper';
import pullImage from './pullImage';


async function runPython(code: string, inputTestCase: string) {
    const rawLogBuffer: Buffer[] = [];//array of type buffer that holds the chunk

    //lets first pull the python image into the local machine
    await pullImage(PYTHON_IMAGE);//python image is a string 

    const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > test.py && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | python3 test.py`;
    console.log(runCommand);
    // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ['python3', '-c', code, 'stty -echo']); 

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

    await new Promise((res) => {
        loggerStream.on('end', () => {
            console.log("raw log buffer in array : ",rawLogBuffer);

            const completeBuffer = Buffer.concat(rawLogBuffer);
            console.log("raw log buffere after concatenated",completeBuffer); 
            
            const decodedStream = decodeDockerStream(completeBuffer);//output:{stdout : '' ,stderr : ''}
            console.log("output after shaping the stream ",decodedStream);

            console.log("last wala",decodedStream.stdout);
            res(decodeDockerStream);
        });
    });

    // remove the container when done with it
    await pythonDockerContainer.remove();

}       

export default runPython;