export const PYTHON_IMAGE = "python:3.8-slim";
export const CPP_IMAGE = "gcc:latest";
export const JAVA_IMAGE="openjdk";
// This will represent the header size of docker stream
// docker stream header will contain data about type of stream i.e. stdout/stderr
// and the length of data
export const DOCKER_STREAM_HEADER_SIZE = 8; // in bytes