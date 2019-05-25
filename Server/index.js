require('dotenv').config();
const express = require('express');
const messageCtrl = require('./messagesCtrl');
const session = require('express-session');

const { SERVER_PORT, SESSION_SECRET } = process.env;

const app = express();

app.use(express.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60
    }
  }));

  app.use((req, res, next) => {
    let badWords = ['knucklehead', 'jerk', 'internet explorer'];
    if (req.body.message) {
      for (let i = 0; i < badWords.length; i++) {
        let regex = new RegExp(badWords[i], 'g');
        req.body.message = req.body.message.replace(regex, '****');
      }
      next();
    } else {
      next();
    }
  });

app.get('/api/messages', messageCtrl.getAllMessages);
app.post('/api/messages', messageCtrl.createMessage);
app.get('/api/messages/history', messageCtrl.history);

app.listen(SERVER_PORT, () => {
    console.log(`Humming on Hostage ${ SERVER_PORT }`)
})



// require("dotenv").config(); //requring dotenv 
// const express = require("express");   //requiring express 
// const messagesCtrl = require("./messagesCtrl"); 
// const session = require('express-session'); 

// let {SERVER_PORT, SESSION_SECRET} = process.env; // accessing .env 

// const app = express();  // assigning express to variable app 
// app.use(express.json()); // use express.json 
// app.use(  // destructure this value from the process.env object
//     session({
//         secret: SESSION_SECRET, // secret: The session secret will add a basic layer of security.
//         resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request (info from docs).
//         saveUninitialized: false // Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified (info from docs).

//         // cookie: { cookie: Allows us to customize the seesion cookie. Here we are setting the maximum age of the cookie to 1 hour (1000 milliseconds in a second, 60 seconds in a minutes, 60 minutes in one hour)
//         //     maxAge: 1000 * 60 * 60 
//         // }
//     })
// ); 

// app.get("/api/messages", messagesCtrl.getAllMessages); //end point for the methods in messagesCtrl 
// app.get("/api/messages/history", messagesCtrl.history);
// app.post("/api/messages", messagesCtrl.createMessage); 


// app.listen(SERVER_PORT, () => {  //listening on the port 
//     console.log(`Humming on Host ${SERVER_PORT}.`); 
// }); 