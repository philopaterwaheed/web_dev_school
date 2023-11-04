const express = require("express")
const mongoose = require('mongoose')
const User = require('./models/user.model')

const mongouri = "mongodb://localhost:27017/lab2db"
// app service 
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

let users= [
    {
        "id": "1",
        "name": "Ali",
        "phone": "0111111",
        "email": "ali@gmail.com"
    },
    {
        "id": "2",
        "name": "mohamed",
        "phone": "02222222",
        "email": "mohamed@gmail.com"
    },
    {
        "id": "3",
        "name": "Ahmed",
        "phone": "0333333333333",
        "email": "Ahmed@gmail.com"
    }
]

app.get('/', (req, res) => {
    res.send('Hello World, from cs309');
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

app.get('/user/:id', async (req, res) => {
    
    try {
        // req id 
        const id = req.params.id;
        // find by id in users 
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

// Assignment => write route to get user by email ????


app.delete('/user/:id', async (req, res) => {

    // req id 
    const id = req.params.id;
    // delet by id in users 
   
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message: `cannot find any user with ID ${id}`})
        }
        res.status(200).json(user);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

app.post('/adduser',  async (req, res) => {

    try{
        //get user object from body 
        let userParam = req.body;
        // validate
        if (await User.findOne({ email: userParam.email })) {
            res.send( 'email "' + userParam.email + '" is already exist');
        }
        const user = new User(userParam);
        //Assignment=> hash password before saving user to database ??????????   
        // save user
         await user.save();
         res.send("user added successfully ")

    }catch(err)
    {
        res.status(500).send('server error: '+ err);
    }
    
});

// Assignment => add new route here to edit user info ???



mongoose.set("strictQuery", false)
mongoose
.connect('mongodb://127.0.0.1:27017/lab2db')
.then(() => {
    console.log('connected to MongoDB')
    //listen on specific port 
    app.listen(8000, () => console.log('app started on port 8000'))
}).catch((error) => {
    console.log('cant connect to mongodb'+error)
})
