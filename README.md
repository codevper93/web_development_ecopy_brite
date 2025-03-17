## Version Reacts JS
  - React JS VERSION ^18.2.0

## Description of this project

I made a mini copy of the Eventbrite platform to test user access and registration using Firebase's Firestore storage manager. You can only register, access, modify, load and delete an event, as well as bring loaded events.

This project has 3 views: Home, Events (public), Event detail (public) and admin (private)


## Required file

You need to create an .env file to make use of the variables, same height as package.json file: 

```bash
  NECESSARY VARIABLES:
    - REACT_APP_firebaseAppConf_apiKey="your related information"
    - REACT_APP_firebaseAppConf_authDomain="your related information"
    - REACT_APP_firebaseAppConf_projectId="your related information"
    - REACT_APP_firebaseAppConf_storageBucket="your related information"
    - REACT_APP_firebaseAppConf_messagingSenderId="your related information"
    - REACT_APP_firebaseAppConf_appId="your related information"
```

## Run the application

To run this app you must do this:

```bash
  npm install
  npm start

  Listen on port: 3000 --> http://localhost:3000
```

## Used Libraries

```bash
  Bootstrap VERSION ^5.3.1
  Firebase VERSION ^10.2.0
  Firebase Admin VERSION ^11.10.1
  React Bootstrap VERSION ^2.8.0
  React Icons VERSION ^4.10.1
  React Router Dom VERSION ^6.15.0
```
