import CppExecutor from "../containers/cppExecutor";
import JavaExecutor from "../containers/javaExecutor";
import PythonExecutor from "../containers/pythonExecutor";
import { ExecutionResponse } from "../types/codeExecutorStrategy";


function createExecutor(codeLanguage : string,code:string,inputTestCase:string,outputTestCase:string):Promise<ExecutionResponse> | null{
    if(codeLanguage.toUpperCase() ==="PYTHON"){
        const pythonObject=new PythonExecutor();
        return pythonObject.execute(code,inputTestCase,outputTestCase);
    }
    else if(codeLanguage.toUpperCase()==="CPP"){
        const cppObject=new CppExecutor();
        return cppObject.execute(code,inputTestCase,outputTestCase);
    }
    else if(codeLanguage.toUpperCase()==="JAVA"){
        const javaObject=new JavaExecutor();
        return javaObject.execute(code,inputTestCase,outputTestCase);
    }
    else{

        return null;
    }
}

export default createExecutor;