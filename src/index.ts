import express, { Express } from "express";

import serverconfig from "./config/server.config";
import sampleProducers from "./producers/sampleProducers";
import apiRouter from "./routes";
import SampleWorker from "./workers/sample.worker";

const app: Express = express();

app.use('/api',apiRouter);


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
	
});
