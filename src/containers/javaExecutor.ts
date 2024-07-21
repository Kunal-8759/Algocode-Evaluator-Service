import CodeExecutorStrategy, { ExecutionResponse } from "../types/codeExecutorStrategy";
import { JAVA_IMAGE } from "../utils/constants";
import createContainer from "./containersFactory";
import fetchDecodedStream from "./fetchDecodedStream";
import pullImage from "./pullImage";

class JavaExecutor implements CodeExecutorStrategy{
    async execute(code:string,inputTestCase:string,outputTestCase:string):Promise<ExecutionResponse>{
        const rawLogBuffer:Buffer[]=[];
        await pullImage(JAVA_IMAGE);

        const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > Main.java && javac Main.java && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | java Main`;

        const javaDockerContainer = await createContainer(JAVA_IMAGE, [
            '/bin/sh', 
            '-c',
            runCommand
        ]); 

        await javaDockerContainer.start();

        const loggerStream = await javaDockerContainer.logs({
            stdout: true,
            stderr: true,
            timestamps: false,
            follow: true 
        });

        loggerStream.on('data', (chunk) => {
            rawLogBuffer.push(chunk);
        });

        try {
            const codeResponse : string = await fetchDecodedStream(loggerStream, rawLogBuffer);

            if(codeResponse.trim()===outputTestCase.trim()){
                return {output:codeResponse,status:"SUCCESS"};
            }
            else{
                return {output: codeResponse, status: "WA"};
            }
            
        } catch (error) {
            if(error==="TLE"){
                await javaDockerContainer.kill();
            }
            return {output: error as string, status: "ERROR"};
        } finally {
            await javaDockerContainer.remove();

        }

    }
}

export default JavaExecutor;