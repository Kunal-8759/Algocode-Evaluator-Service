import bodyParser from "body-parser";
import express, { Express } from "express";

import serverconfig from "./config/server.config";
import runCpp from "./containers/runCppDocker";
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
	


	//code to run the cpp code
	const userCode = `
    class Solution {
      public:
      vector<int> permute() {
          vector<int> v;
          v.push_back(10);
          return v;
      }
    };
  `;

  const code = `
  #include<bits/stdc++.h>
  using namespace std;
  
  ${userCode}
  int main() {
    Solution s;
    vector<int> result = s.permute();
    for(int x : result) {
      cout<<x<<" ";
    }
    cout<<endl;
    return 0;
  }
  `;

const inputCase = `10
`;

  runCpp(code, inputCase);

});
