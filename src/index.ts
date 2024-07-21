import bodyParser from "body-parser";
import express, { Express } from "express";

import { serverAdapter } from "./config/bullBoard.config";
import serverconfig from "./config/server.config";
import apiRouter from "./routes";
import SubmissionWorker from "./workers/submission.worker";



const app: Express = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/api',apiRouter);



//setting up the bull-board ui

app.use('/ui',serverAdapter.getRouter());




app.listen(serverconfig.PORT, () => {
	console.log(`served started at port ${serverconfig.PORT}`);

	console.log(`BullBoard url ->> localhost:${serverconfig.PORT}/ui`);
	SubmissionWorker('SubmissionQueue');

});
