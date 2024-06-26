import express, { Express } from "express";

import serverconfig from "./config/server.config";
import apiRouter from "./routes";

const app: Express = express();

app.use('/api',apiRouter);


app.listen(serverconfig.PORT, () => {
	console.log(`served started at port ${serverconfig.PORT}`);
});
