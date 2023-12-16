const express = require('express')
var bodyParser = require('body-parser')
 
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express()
var cors = require('cors')
const port = 3001

app.use(cors());
const products = [
  {
    id: "12321341",
    title: "Small Logo Full-Zip Regular Fit Men's Hoodie",
    price: 19.99,
    rating: 5,
    image: "/photo1.png",
  },
  {
    id: "49538094",
    title: "Men blue solid hooded neck sweatshirt",
    price: 29.99,
    rating: 4,
    image: "/photo2.png",
  },
  {
    id: "49536094",
    title:
      "Men's Super Combed Cotton Rich Pique Fabric Ribbed Cuff Hoodie Jacket - Navy",
    price: 39.99,
    rating: 4,
    image: "/hoodie.png",
  },
  {
    id: "4903850",
    title: "Redwolf premium hoodie",
    price: 39.99,
    rating: 3,
    image: "/photo3.png",
  },
  {
    id: "23445930",
    title: "GT Official Hoodie (Navy Blue)",
    price: 98.99,
    rating: 5,
    image: "/photo4.png",
  },
  {
    id: "3254354345",
    title: "Big Logo Regular Fit Men's Hoodie",
    price: 39.99,
    rating: 4,
    image: "/photo5.png",
  },
];
app.get('/', (req, res) => {
  console.log("/ invoked");
  res.send('Hello World!')
})

app.get('/products', (req,res) => {
  console.log("/products invoked");
  res.send(JSON.stringify(products));
  // res.sendStatus(404);
})

app.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  const product = products.find(product => product.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});


app.post('/login', jsonParser, (req, res) => {
  console.log("Request body: " + req.body);
  const email = req.body.email;
  const password = req.body.password;
  
  const isEmailValid = (email) => {
    const validEmailRegex = /^[a-zA-Z]+[\w\d]*([\.-]?[\w\d])*@[a-zA-Z]+[a-zA-Z0-9]*\.([a-zA-Z0-9]+\.)*[a-zA-Z]{2,5}$/;
    const isValid = validEmailRegex.test(email);
    console.log("isEmailValid::isValid: " + isValid);
    return isValid;
  }
  const isPasswordValid = (password) => {
    const validPassRegex = /pass+/;
    return (password == null || password.length < 8)? false: validPassRegex.test(password);
  }
  if(isEmailValid(email) && isPasswordValid(password)) {
    console.log("Auth success");
    res.send(JSON.stringify({
      email: email,
      name: email.substring(0, email.indexOf('@')),
      token: Math.random().toString(36).substring(2)
    }))
  } else {
    res.sendStatus(400);
  }
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})