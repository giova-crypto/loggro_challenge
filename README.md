# loggro_challenge
Loggro challenge for development analyst position

# How to operate
- git clone the repository
- run backend
  - open a terminal in repo folder and:
    - cd `cd backend`
    - run `yarn` or `npm install`
    - replace mongodb connection on app.module for your own connection string
    - replace google cloud storage credentials in storage.service.ts for your own json file (note that your bucket must be public, for all users in order to see the images in the frontend)
    - run `yarn dev` or `npm run dev`
- run frontend
  - open a terminal in repo folder and:
    - cd `cd frontend`
    - run `yarn` or `npm install`
    - if for some reason your backend url is different from `http://localhost:3000` you need to change it in the environment file in environments folder
    - run `yarn start` or `npm run start`
    - got to angular application url in browser, typically in [Angular Application](http://localhost:42000).
