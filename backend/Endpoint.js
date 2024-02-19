const PostRouter = require("./routes/PostRouter");
const UserRouter = require("./routes/UserRouter");
const mongoose=require('mongoose')
const fileUpload = require('express-fileupload');
// const webpush = require('web-push');

// const vapidKeys = {
//     publicKey: 'BPMkcv5P0K3DbVOCO35qgyxkstqtlZA1W4bZMTYY6p3c3K2gYqf4nlJcgPvVRnp5w7hYcvA6t9aPt6yCyPpOsa0',
//     privateKey: 'Ymosz6inUiyOhjFn7aHi-_HfWXszr4tQweiilac9yzg',
// };
// const subscriptions = {};

// webpush.setVapidDetails('https://hey-pal.netlify.app/', vapidKeys.publicKey, vapidKeys.privateKey);

var app=require('express')()
var jbp=require('body-parser').json()
var cors=require('cors')()
var urle=require('body-parser').urlencoded({ extended: false })
var express=require('express')

app.use(fileUpload());
app.use(jbp)
app.use(cors)
app.use(urle)

app.use(express.static('public'));
app.use(express.static('profilepics'));
app.use(PostRouter)
app.use(UserRouter)

// app.post('/subscribe', (req, res) => {
//     const { user, subscription } = req.body;
//     subscriptions[user] = subscription;
//     console.log(user,"subscribed")
//     res.status(201).json({ message: 'Subscription saved' });
// });

// app.post('/send-notification', (req, res) => {
//     const { user, message } = req.body;
//     const subscription = subscriptions[user];
  
//     if (subscription) {
//       webpush.sendNotification(subscription, JSON.stringify(message)).catch(error => console.error(error));
//     }
//     console.log(JSON.stringify(message))
//     res.status(200).json({ message: 'Notification sent' });
// });
  
// mongoose.connect('mongodb+srv://ritheeshbs:ceoofbs890@cluster0.f6yclvi.mongodb.net/').then(()=>{
//     console.log("Successfully Connected")
// }).catch(()=>{
//     console.log("Could not connect")
// })
mongoose.connect('mongodb://localhost:27017/heypal').then(()=>{
    console.log("Successfully Connected")
}).catch(()=>{
    console.log("Could not connect")
})

app.listen(8081,()=>{
    console.log('HeyPal!! is Running')
})