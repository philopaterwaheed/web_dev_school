const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user.model');
const Product = require('./models/product.model');
const Book = require('./models/book.model');
const Purchase = require('./models/purchase.model');

// port number , MongoURL 
const PORT = 8000;
const MongoURL = 'mongodb://localhost:27017/lab2db';

// app service
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/users', async (req, res) => {
  try {
      const users = await User.find({});
      res.json(users);
  } catch (error) {
      res.status(400).send(error);
  }
});

//don't forget to add the images ;
app.get('/products', async (req, res) => {
  try {
      const users = await Product.find({});
      res.json(users);
  } catch (error) {
      res.status(400).send(error);
  }
}); // 


// add a product 
app.post('/add__product', async (req, res) => {
  try {
    // get user object from req body
    let productParam = req.body;
    // validate product object
    if(await Product.findOne({name:productParam.name})){
    	return res.status(400).send("product already exist");
    }
    const product = new Product(productParam);
    await product.save();
    
    return res.send("Product is Created");
  } catch (error) {
    return res.status(400).send(error.message);
  }
}); // done 

// get product by its id 
app.get("/products/:id", async (req, res) => {
  try {
    // req id
    const id = req.params.id;

    const product = await Product.findById(id);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}); // done 


//update data by id 
app.put("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await Product.findByIdAndUpdate(id,body, {new : true});
	return res.json(product)

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


app.get("/productByPrice/:price", async (req, res) => {
  try {
    const {price } = req.params;
    const filteredProducts = await Product.find({ price: price });
    if (!filteredProducts) {
      return res
        .status(404)
        .json({ message: `there are no products with the price : {price}` });
    }
    return res.status(200).json(filteredProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});//done

// search with a string
app.get('/productsSearch/', async (req, res) => {
  try {
    const searchString = req.query.q;

    // Use a regular expression to perform a case-insensitive search
    const regex = new RegExp(searchString, 'i');

    // Find products that match the search string
    const result = await Product.find({ name: regex });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get products in a specific category
app.get('/category/:category', async (req, res) => {
  const category = req.params.category;
  try {
    const filteredProducts = await Product.find({ categories: category });
    res.json(filteredProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); // done


// Get products in a specific brand
app.get('/brand/:brand', async (req, res) => {
  const brand = req.params.brand;
  try {
    const filteredProducts = await Product.find({ brand: brand });
    res.json(filteredProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); // done

// Get user by id or by email
app.get("/user/:id", async (req, res) => {
  try {
    // req id
    const id = req.params.id;
    // find by id in users
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/user/byemail/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: `cannot find any user with email ${email}` });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



app.delete('/user/:id', async (req, res) => {
  // find req id
  const id = req.params.id
  // delete the user from has id
  const user = await User.findByIdAndDelete(id);
  try {
    res.send(`User ${user.fullName} is Deleted and his id was ${id}`);
  } catch (error) {
    res.send(error);
  }
});


app.post('/add__user', async (req, res) => {
  try {
    // get user object from req body
    let userParam = req.body;
    // validate user object
    if(await User.findOne({email:userParam.email})){
      res.status(400).send("email is already taken");
	return;
    }
    const user = new User(userParam);
    user.password = await bcrypt.hash(user.password,10);
    // save user to database
    await user.save();
    
    res.send("User is Created");
  } catch (error) {
    res.status(400).send(error.message);
  }
});




app.get("/book/bytitle/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const book = await Book.findOne({ title });
    if (!book) {
      return res
        .status(404)
        .json({ message: `cannot find any book with title ${title}` });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/add__book', async (req, res) => {
  try {
    // get book object from req body
    let { title , description , author , price , stock , categories } = req.body;
    // validate book object is exist or not by title
    if(await Book.findOne({title})){
      return res.status(400).send("book title is already exist");
    }
    const book = new Book({ title , description , author , price , stock , categories });

    // save user to database
    await book.save();
    
    res.send("Book is Added");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.put("/book/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title , description , author , price , stock , categories } = req.body;
    const book = await Book.findById(id);

    if (title) {
      book.title = title;
    }

    if (description) {
      book.description = description;
    }

    if (author) {
      book.author = author;
    }

    if (price) {
      book.price = price;
    }

    if (stock) {
      book.stock = stock ;
    } else if (stock  == 0){
      book.stock = 0 ;
    }
    
    if (categories) {
      book.categories = categories;
    }

    await book.save();
    res.send(book);

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.delete("/book/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      res.status(400).send(`cannot find book with id ${id}`);
      return;
    }

    res.send(book);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});



app.post("/addPurchase/:bookId/:userId", async (req, res) => {
  try {
    const { bookId, userId } = req.params;

    const book = await Book.findById(bookId);

    if (book.stock <= 0) {
      res.status(400).send("this book is out of stock");
      return;
    } else {
      book.stock -= 1; 
      await book.save();
    }

    const purchase = new Purchase({
      bookId,
      userId,
    });

    await purchase.save();

    res.send(purchase);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.delete("/cancelPurchase/:bookId/:userId", async (req, res) => {
  try {
    const { bookId, userId } = req.params;
    const purchase = await Purchase.deleteOne({ bookId, userId });
    if(purchase) {
      const book = await Book.findById(bookId);
      book.stock = book.stock + 1 ;
      book.save();

      res.send(purchase);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/user/purchase/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const purchase = await Purchase.find({ userId });
    if(!purchase){
      res.send(`this user does not have any purchase`);
    }
    res.send(purchase);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});



mongoose.set("strictQuery", false);
mongoose.connect(MongoURL)
.then(()=>{
  console.log("connected To MongoDB");
  // listen on specific port
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}).catch((error)=>{
  console.log('cant connect to mongodb'+ error);
})

