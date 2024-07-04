import bodyParser from "body-parser";
import express, { Express } from "express";

import serverconfig from "./config/server.config";
import runPython from "./containers/runPythonDocker";
import sampleProducers from "./producers/sampleProducers";
import apiRouter from "./routes";
import SampleWorker from "./workers/sample.worker";


const app: Express = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/api',apiRouter);



//setting up the bull-board ui

import { serverAdapter } from "./config/bullBoard.config";
app.use('/ui',serverAdapter.getRouter());




app.listen(serverconfig.PORT, () => {
	console.log(`served started at port ${serverconfig.PORT}`);

	SampleWorker('SampleQueue');
	sampleProducers('SampleJob',{
		name:"kunal kumar",
		company:"Oracle",
		position :"intern",
		loaction :"Remote"
	},{
		priority:2
	});

	sampleProducers('SampleJob',{
		name:"Gulshan Vikas",
		company:"Oracle",
		position:"sde-1",
		location:"Noida"
	},{
		priority:1
	});



	const code = `x = input()
y = input()
print("value of x is", x)
print("value of y is", y)
`;

const inputCase = `100
200
`;

  runPython(code, inputCase);
	
});
