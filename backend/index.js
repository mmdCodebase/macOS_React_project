const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const { OAuth2Client } = require('google-auth-library');
const UserModel = require("./model/User")

const app = express()
app.use(express.json())
app.use(cors())

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
mongoose.connect("mongodb://127.0.0.1:27017/users");

app.post("/sign-in", (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email : email})
    .then(user => {
        if(user) {
            if(user.password === password){
                res.json("Success")
            }else{
                res.json("The password is incorrect")
            }
        }else{
            res.json("No record existed")
        }
    })
})

app.post("/sign-up", (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post('/google-sign-in', async (req, res) => {
    const { token } = req.body;

    try {
        // Verify the Google token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { sub: googleId, email } = payload;

        // Check if user exists in the database
        const user = await UserModel.findOne({ email });

        if (!user) {
            // If user does not exist, do not log them in
            return res.status(401).json('User not registered');
        }

        // Send success response if user exists
        res.json('Success');
    } catch (error) {
        console.error('Google Sign-In error:', error);
        res.status(401).json('Google Sign-In failed');
    }
});


app.listen(8000, () => {
    console.log("server is running on port:8000")
})