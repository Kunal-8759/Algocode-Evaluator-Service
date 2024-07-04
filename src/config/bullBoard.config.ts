import {createBullBoard} from '@bull-board/api';
import {BullAdapter} from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from "@bull-board/express";

import sampleQueue from '../queues/sample.queue';


export const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/ui');

createBullBoard({
	queues:[new BullAdapter(sampleQueue)],
	serverAdapter:serverAdapter
});