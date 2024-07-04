import { CPP_IMAGE } from '../utils/constants';
import createContainer from './containersFactory';
import decodeDockerStream from './dockerHelper';
import pullImage from './pullImage';


async function runCpp(code: string, inputTestCase: string) {
    const rawLogBuffer: Buffer[] = [];//array of type buffer that holds the chunk

    //lets first pull the python image into the local machine
    await pullImage(CPP_IMAGE);

    const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > main.cpp && g++ main.cpp -o main && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | ./main`;
    console.log(runCommand);

    //initialising the new python container 
    const cppDockerContainer = await createContainer(CPP_IMAGE, [
        '/bin/sh', 
        '-c',
        runCommand
    ]); 

    // starting / booting the corresponding docker container
    await cppDockerContainer.start();

    console.log("Started the cpp docker container");

    //tum log me kya dekhna chahte ho mention kro kruki log stream ke through aayega
    const loggerStream = await cppDockerContainer.logs({
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
    await cppDockerContainer.remove();

}       

export default runCpp;