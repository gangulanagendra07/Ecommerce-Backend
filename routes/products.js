const {Product} = require('../models/product');
const { Category} = require('../models/category');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) =>{

    //Getting specific data by using select method and excluding id
    const productList = await Product.find().select('name image -_id');

    if(!productList) {
        res.status(500).json({success: false})
    } 
    res.send(productList);
})

router.get('/:id', async (req, res) =>{
    // using Populate method to specific id's were inter linked with tables
    const product = await Product.findById(req.params.id).populate('category');

    if(!product) {
        res.status(500).json({success: false})
    } 
    res.send(product);
})

router.post(`/`, async (req, res) =>{
    
    const category = await Category.findById(req.body.category);
       
    if(!category){
        return res.status(400).send('Invalid category');
    }

    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured
    })

    const products = await product.save();
    
    if(!products){
      return res.status(500).send('The product connot be created.!')
    }
    return res.send(products);
})

module.exports =router;