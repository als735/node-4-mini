
let allMessages = [];
 
module.exports = {
    getAllMessages: (req, res, next) => {

        res.status(200).send(allMessages);
    },
    createMessage: (req, res, next) => {
        const { username, message } = req.body;
        const newMessage = {
            username,
            message
        };
        if(req.session.history){
            req.session.history.push(newMessage)
        } else {
            req.session.history = []
            req.session.history.push(newMessage)
        }
        allMessages.push(newMessage);
        res.status(200).send(allMessages);
        
    },
    history: (req, res, next) => {
        res.status(200).send(req.session.history)
    }
}


// let allMessages = [];  // empty array 

// module.exports = {  //exporting the object 
//     getAllMessages : (req, res) => {  //a method called getAllMessages that responds with the allMessages variable 
//         res.status(200).send(allMessages);
//     }, 
//     createMessage: (req, res) => { //another method called createMessage that will send a username and message in the body of the request. 
//         const {username, message} = req.body; 
//         let newMessage = {
//             username, 
//             message
//         }; 
//         allMessages.push(newMessage); // it Creates a new message obeject with the properites and then pushes the new object into the allMessages array. 

//         if (req.session.history) { // if req.session.history exists then push it into the newMessage array 
//             req.session.history.push(newMessage); 
//         } else { //if it doesn't exist then create it first and set it equal to an empy array, and then push it into the newMessages array 
//             req.session.history = []; 
//             req.session.history.push(newMessage); 
//         }
//         res.status(200).send(allMessages); // response is the new allMessages array 
//     }, 
//     history: (req, res) => { //hisotry should return all the messages stored on the sesion (cookies!)
//         res.status(200).send(req.session.history); 
//     }
// }; 

// // we will use the user's current session to store all the messages from the user.To access session data, just use the property req.session. req.session is an object that we can use to store whatever we want. In this case, we want to add a property called history that will be an array. We need to initialize the req.session.history property if it doesn't already exists on the req.session object. Then push the new message object into the req.session.history array.

