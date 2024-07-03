import DockerStreamOutput from "../types/dockerStreamOutput";
import { DOCKER_STREAM_HEADER_SIZE } from "../utils/constants";


//this buffer you are taking is the total buffer (sum of all the chunk)
export default function decodeDockerStream(buffer: Buffer) : DockerStreamOutput{
    let offset = 0; //this offset variable as a pointer to the buffer

    //the output will be returned 
    const output: DockerStreamOutput = { stdout: '' , stderr: ''}; 

    // Loop until offset reaches end of the buffer
    while(offset < buffer.length) {

        
        const typeOfStream = buffer[offset];//tell that the buffer is stdout stream or the error stream

        
        const length = buffer.readUint32BE(offset + 4);// This length variable hold the length of the value 

        
        offset += DOCKER_STREAM_HEADER_SIZE;//move the offset to the 8 bit forward or can say to the value of the chunk

        if(typeOfStream === 1) {
            // stdout stream
            output.stdout += buffer.toString('utf-8', offset, offset + length);
        } else if(typeOfStream === 2) {
            // stderr stream
            output.stderr += buffer.toString('utf-8', offset, offset + length);
        }

        offset += length; // move offset to next chunk
    }

    return output;
}