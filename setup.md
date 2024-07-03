1.npm init
2.enable typescript in project --> npm install -d typescript --> npx tsc --init
3.manage the tsconfig.json as per the requirement 
4.install express for the ts  :  npm i -d @types/express  (d->developement)

5.npm i concurrently
6.npm i dotenv

//npm i nodemon-->if any file change occur in the js file then it runs  
                -->but here js file lies in the dist folder which get changes after compilation of the src folder
                -->but for any change in the ts file can not be catched by the nodemon

"scripts": {
    "build": "npx tsc",-->
    "watch": "npx tsc -w",-->if any change occur in the ts file it catches it.
    "prestart": "npm run build",-->first ts file compiled
    "dev": "npx nodemon dist/index.js",-->before executing this prestart will run then dist/index.js run
    "start": "npx concurrently \"npm run watch\" \"npm run dev\""
  },



  eslint-->for consistency in the code
    https://randomzed.medium.com/configure-eslint-prettier-for-a-typescript-project-node-js-79b9f417d2cd
   
    npm i eslint-plugin-simple-import-sort-->for the import export sorting

    also install the eslintrc extension in the vs code









BullMQ-->use reddis queue in nodejs project
reddis->message broker(architecture which follows message queues for producer and consumer)

1.install redis on the laptop
2. npm install bullmq ioredis
3.npm install @types/ioredis-->ioredis for the typescript


    
bull mq provide a dashboard -->npm add @bull-board/express and then set up





####
validation layer using zod
npm i zod
1.before the controller a middleware is set that validates 

  