# Firegram

## Summary (YAIC)
**Y**et **A**nother **I**nstagram **C**lone. This is an open source project to clone the popular social network Instagram. The tech stack used is
- React
- Redux
- Firebase (for hosting, database, filestorage and authentication).
- Gitlab (for version control and CI/CD).

## Prerequirements
You must have installed the following software:
- Node.JS
- Yarn or npm
- A google account
- A gitlab.com account

On the part of knowledge. You only need some knowledge on the use of terminal. You don't need know about React.JS or TypeScript.

## Setting up the Firebase projects
Go to https://firebase.google.com/ and sign in with your google account. Click on "Go to console" button. Now, you should see a list with your projects created. If you have not created any before, the list will be empty. You must follow the next instructions to create two projects.

- Add project. This step take a while.
- Click on the project.
- On the sidebar, go to Authentication > User auth methods.
- Enable the methods that you want. I recommend at least email and Google.
- Go to database on the sidebar. Click on "Create database". Ensure that the database is Cloud firestore. The database rules will be updated later. Select a location for your database.
- Repeat the previous steps for "Storage" section. The rules and storage location may be differents than databases.

Now create a second project with the same configuration. The location maybe differents than at the first project, but the rules must be the same.

## Initialize the project on local
1. Install the firebase CLI.
~~~
sudo npm install -g firebase-tools
// or
yarn global add firebase-tools
~~~
2. Login on the cli with the same account that you create the projects.
~~~
firebase login
~~~
List the projects created
~~~
firebase projects:list
~~~
3. Create the project
~~~
mkdir my-project
cd my-project
firebase init
~~~
Select Firestore, Hosting and Storage pressing the Space key and press Enter to confirm. Select "Use an existing project". Select your main (production) project. Select the default options.

4. Create the React project
~~~
npx create-react-app client --typescript
~~~
The project name is up to you, and you can use JavaScript if you want.

5. Create the alias projects. Copy and replace the content of your local ```.firebaserc``` file with
~~~
{
  "projects": {
    "production": "<your-production-project-id>",
    "staging": "<your-staging-project-id>"
  }
}
~~~

6. Create a token for *production* environment. Copy the token and save for later. This is the token for *production*.
~~~
firebase use production
firebase login:ci
~~~

7. Repeat the previous step for *staging* environment and remember copy the token.

8. Change the rules. I recommend change the default rules to the following
~~~
allow read, write;
~~~
With this rule, you can read and write with any control. This can be useful for the firsts steps of the project. The rules will change every time that you deploy. Later you can change the rules for other more secure. Take in consideration that all of your environments share the rules.

## Setup the React app
1. First of all go to the app folder.

~~~
cd client
~~~

2. Remove the ```.git``` folder.
~~~
rm -rf .git
~~~

3. Install the needed dependencies.
~~~
yarn add dotenv firebase
~~~

4. Install the types dependencies (Skip this step if you don't use TypeScript).
~~~
yarn add -D @types/dotenv @types/firebase
~~~

5. Inside the ```src``` folder, create a file named ```firebase.ts``` (the name is up to you). And fill with the following code
~~~
// firebase.ts
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);
~~~

6. Create a file named ```.env``` at the same level of your ```package.json```. Copy and paste the following code and use your own values. Those values can be extracted for your staging project in firebase. For more info visit https://create-react-app.dev/docs/adding-custom-environment-variables/
~~~
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_DATABASE_URL=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_APP_ID=
~~~
Don't forget add ```.env``` file to ```.gitignore```.

7. Load the enviroment variables. Inside your ```src/index.tsx``` paste the following code before the render method call.
~~~
import { config } from 'dotenv';
config();
~~~

8. (Optional) This is step is only for made a PWA. A PWA involves many things apart of that, but start replacing 
~~~
serviceWorker.unregister();
~~~ 
for
~~~
serviceWorker.register();
~~~

## Setup testing
1. Install the development dependencies
~~~
yarn add -D enzyme enzyme-adapter-react-16 enzyme-to-json jest jest-enzyme ts-jest
~~~

2. Install the types
~~~
yarn add -D @types/enzyme @types/enzyme-adapter-react-16 @types/jest
~~~

3. (Optional) With the default ```create-react-app``` setup types are added like a dependency instead a dev dependency so copy and paste to the proper place.

4. Create a file named ```jest.config.js``` and write the following code. Note that the extension is ```js``` not ```ts```.
~~~
module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  snapshotSerializers: ['enzyme-to-json/serializer']
};
~~~

5. Create a test file. The test files should have the following format in their name ```my-component.test.tsx```. You can take like reference the test file for App component. For the test step in the workflow, at least a test must be provided.

~~~
import React from 'react';

test('Dummy test', () => {
  expect(true).toBe(true);
});
~~~
This test always pass and it is only provided for the test step.

6. Run the test command to check that all works
~~~
yarn test
~~~

## Gitlab setup

1. Move the ```.gitignore``` file content to the root folder file.

2. Create a file at the root folder named ```.gitlab-ci.yml``` and copy the content inside the file

~~~
image: node:12.13.1

cache:
  key: cache_yarn
  paths:
  - .cache_yarn

stages:
  - install
  - build
  - test
  - deploy

install_client:
  stage: install
  script:
    - cd ./client && yarn install --cache-folder ../.cache_yarn
  artifacts:
    paths:
    - client/node_modules

build_client:
  stage: build
  script:
    - cd ./client && yarn build
  dependencies:
    - install_client
  artifacts:
    paths:
    - client/build

build_client_staging:
  stage: build
  script:
    - cd ./client && yarn build
  dependencies:
    - install_client
  only:
    - staging
  environment:
    name: staging
  artifacts:
    paths:
    - client/build

build_client_production:
  stage: build
  script:
    - cd ./client && yarn build
  dependencies:
    - install_client
  only:
    - production
  environment:
    name: production
  artifacts:
    paths:
    - client/build

test_client:
  stage: test
  script:
    - cd ./client && yarn test
  dependencies:
    - install_client

deploy_all_staging:
  stage: deploy
  script:
    - yarn global add firebase-tools --cache-folder ../.cache_yarn
    - firebase deploy --token $FIREBASE_DEPLOY_KEY_STAGING --project staging
  only:
    - staging
  environment:
    name: staging
  dependencies:
    - build_client_staging

deploy_all_production:
  stage: deploy
  script:
    - yarn global add firebase-tools --cache-folder ../.cache_yarn
    - firebase deploy --token $FIREBASE_DEPLOY_KEY_PRODUCTION --project production
  only:
    - production
  environment:
    name: production
  dependencies:
    - build_client_production
~~~

3. Initialize the git repository and add the content
~~~
git init
git add -A
git commit -m "Initial commit"
~~~

4. Create a repository on Gitlab.com

5. Add origin to the repo
~~~
git remote add origin git@gitlab.com:<your-gitlab-username>/<your-repo-name>.git
~~~

6. Upload the project to Gitlab.com
~~~
git push -U origin master
~~~

The next steps are done on Gitlab.com

7. Create two branches on the remote repository. One must be *staging* and another *production*

8. Create protected branches.
    1. Go to Setup > Repository > Protected branches
    2. Add the *production* and *staging* branches

9. Create the enviroment variables
    1. Go to Setup > CI/CD
    2. Add the following variables
~~~
_______________________________________________
|               Key              |    Scope   |
|--------------------------------|------------|
| FIREBASE_DEPLOY_KEY_PRODUCTION | All        |
| FIREBASE_DEPLOY_KEY_STAGING    | All        |
| PUBLIC_URL                     | All        |
| PUBLIC_URL                     | production |
| REACT_APP_API_KEY              | All        |
| REACT_APP_API_KEY              | production |
| REACT_APP_APP_ID               | All        |
| REACT_APP_APP_ID               | production |
| REACT_APP_AUTH_DOMAIN          | All        |
| REACT_APP_AUTH_DOMAIN          | production |
| REACT_APP_DATABASE_URL         | All        |
| REACT_APP_DATABASE_URL         | production |
| REACT_APP_MESSAGING_SENDER_ID  | All        |
| REACT_APP_MESSAGING_SENDER_ID  | production |
| REACT_APP_PROJECT_ID           | All        |
| REACT_APP_PROJECT_ID           | production |
| REACT_APP_STORAGE_BUCKET       | All        |
| REACT_APP_STORAGE_BUCKET       | production |
-----------------------------------------------
~~~
Some considerations: Each variable must be of type *Variable*, *State* and *Mask* must be set to false. Each variable must be have at least the scope *All* (that is the default scope) to work. These values usually are the correspondant to the *staging* Firebase project. The *production* scope values are the values correspondant to the *production* Firebase project. Note that *PUBLIC_URL* shuold ends with /. The tokens was generated on previous past, so here it is where we need to use.

## How the workflow works
Now we have all piece in their place, so these is how we will work.

1. On your local repository, create a branch, and code.
2. When your code is ready to merge, upload your branch to remote
~~~
git push origin <branch-name>
~~~
3. Go to Gitlab.com and do a pull request to ```master```.
4. Once the multiple steps finish, the code will be merged into ```master```. After that, the test will be passed again. This step is automatic.

### Deploy to ```staging``` / ```production```
1. Do a pull request from ```master``` to ```staging```/```production```.
2. Once the merge is succeful, another workflow starts ending on a deploy.

## Conclusions
Now you have a production environment and a development environment with React, TypeScript, Jest, Enzyme and Firebase like backend for a complete PWA. You can add more environment if you need.

If you have any doubt, please post on comments.

## Note about bootstrap
To disable warnings in production, add at the top of the file to prevent error on building in production
~~~
/* eslint-disable */
~~~
