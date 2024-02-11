const express = require("express")
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = require('./models/user.model')

const Book = require('./models/book.model')


const mongouri = "mongodb://localhost:27017/lab2db"
// app service 
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))


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
        res.status(404).json({message: error.message})
    }
});

app.get('/user/email/:email', async (req, res) => {
    
    try {
        // req id 
        const email = req.params.email;
        // find by id in users 
        const user = await User.findOne ({email: email});
	if (!user){
		res.status(404).json({message: error.message})
	}
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});


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
        //Assignment=> hash password before saving user to database ??????????   
	const hashedpassword = await bcrypt.hash(userParam.password, 10);
	userParam.password = hashedpassword ; 
        const user = new User(userParam);
        // save user
         await user.save();
         res.send("user added successfully ")

    }catch(err)
    {
        res.status(500).send('server error: '+ err);
    }
    
});

// Assignment => add new route here to edit user info ???

app.put('/edituser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const userToUpdate = await User.findById(id);
        if (!userToUpdate) {
            return res.status(404).json({ message: `Cannot find any user with ID ${id}` });
        }

        // Update user properties based on the request body
        if (req.body.name) {
            userToUpdate.name = req.body.name;
        }
        if (req.body.phone) {
            userToUpdate.phone = req.body.phone;
        }
        if (req.body.email) {
            // Check if the new email is not already in use
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser && existingUser.id !== id) {
                return res.status(400).json({ message: 'Email is already in use by another user' });
            }
            userToUpdate.email = req.body.email;
        }

        // Save the updated user
        const updatedUser = await userToUpdate.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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



app.get('/books', async (req, res) => {
    try {
        const book = await Book.find({});
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

app.get('/books/:id', async (req, res) => {
    try {
        // req id 
        const id = req.params.id;
        // find by id in users 
        const book = await Book.findById(id);
        res.status(200).json(book);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
});


app.get('/book/bookName/:bookName', async (req, res) => {
    
    try {
        // req id 
        const title = req.params.title;
        // find by id in users 
        const book = await User.findOne ({bookName: bookName});
	if (!book){
		res.status(404).json({message: "err"})
	}
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: "err"})
    }
});
app.post('/addbook',  async (req, res) => {

    try{
        //get user object from body 
        let bookParam = req.body;
        if (await Book.findOne({ bookName: bookParam.bookName })) {
            res.send( 'book "' + bookParam.book + '" is already exist');
        }
        const book = new Book(bookParam);
        // save user
         await book.save();
         res.send("book added successfully ");

    }catch(err)
    {
        res.status(500).send('server error: '+ err);
    }
    
});

app.delete('/book/:id', async (req, res) => {

    // req id 
    const id = req.params.id;
    // delet by id in users 
   
    try {
        const {id} = req.params;
        const book = await Book.findByIdAndDelete(id);
        if(!book){
            return res.status(404).json({message: `cannot find any user with ID ${id}`})
        }
        res.status(200).json(book);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});
mongoose.set("strictQuery", false)
mongoose.connect('mongodb://127.0.0.1:27017/lab2db')
.then(() => {
    console.log('connected to MongoDB')
    //listen on specific port 
    app.listen(8000, () => console.log('app started on port 8000'))
}).catch((error) => {
    console.log('cant connect to mongodb'+error)
})
