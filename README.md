# Firegram

## Summary (YAIC)
**Y**et **A**nother **I**nstagram **C**lone. This is an open source project to clone the popular social network Instagram. The tech stack used is
- React
- Redux
- Firebase (for hosting, database, filestorage and authentication).
- Gitlab (for version control and CI/CD).

## Fork and clone
First of all, create a project at the firebase console. Enable hosting, database (firestore), storage and authentication. Create a file named ```.env``` in the *client* folder. Copy and paste the following schema inside the file and fill with your own values extracted from firebase.
~~~
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_DATABASE_URL=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_APP_ID=
~~~

## Setup for CI/CD
In Gitlab set the previous variables and FIREBASE_DEPLOY_KEY_PRODUCTION to the Gitlab CI/CD.

To get the firebase token for deployment follow these steps:

```sudo npm install -g firebase-tools```

```firebase login```

```firebase login:ci```

Take note of the token and use for FIREBASE_DEPLOY_KEY_PRODUCTION