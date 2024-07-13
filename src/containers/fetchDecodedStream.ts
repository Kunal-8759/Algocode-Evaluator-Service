import decodeDockerStream from "./dockerHelper";

async function fetchDecodedStream(loggerStream:NodeJS.ReadableStream , rawLogBuffer: Buffer[]) : Promise<string> {
    
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

export default fetchDecodedStream;


