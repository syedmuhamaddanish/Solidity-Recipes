const ethers = require('ethers');
require('dotenv').config();
const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const {abi} = require("./artifacts/contracts/contractApi.sol/contractApi.json");
const contractInstance = new ethers.Contract(contractAddress, abi, signer);

const express = require('express');
const app = express();
app.use(express.json());

app.get('/products/:id', async(req, res) => {   //http://localhost:3000/products/1
    try {
        const id = req.params.id;
        const product = await contractInstance.getProduct(id);
        let prod = []
        prod[0] = product[0];
        prod[1] = parseInt(product[1]);
        prod[2] = parseInt(product[2]);
        res.send(prod);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/products/', async(req, res) => {   //http://localhost:3000/products/
    try {
        const allProducts = await contractInstance.getAllProducts();
        const products = allProducts.map(product => ({
            id : parseInt(product.id),
            name: product.name,
            price: parseInt(product.price),
            quantity: parseInt(product.quantity)
        }))
        console.log(products)
        res.send(products);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});


app.post('/products', async(req, res) => {
    try {
        const {id, name, price, quantity} = req.body;
        const tx = await contractInstance.setProduct(id, name, price, quantity);
        await tx.wait();
        res.json({success: true})
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

app.put('/products/:id', async (req, res) => {   //http://localhost:3000/products/1
    try {
        const id = req.params.id;
        const {name, price, quantity} = req.body;
        const tx = await contractInstance.updateProduct(id, name, price, quantity);
        await tx.wait();
        res.json({success: true})
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const tx = await contractInstance.deleteProduct(id);
        await tx.wait();
        res.json({success: true})
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

const port = 3000;
app.listen(port, () => {
    console.log("API server is listening on port 3000")
})

