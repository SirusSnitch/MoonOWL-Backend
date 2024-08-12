const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const multer = require('multer');


let filename = '';

const mystorage = multer.diskStorage({
    destination: './Assets',
    filename: (req, file, redirect)=>{

        let date = Date.now();
        let fl = date + '.' + file.mimetype.split('/')[1];
        redirect(null,fl);
        filename = fl;

    } 
})

const upload = multer({storage: mystorage});




//Product CRUD

router.post('/add', upload.any('image') ,(req,res)=>{
    data = req.body;
    prod = new Product(data);
    prod.image = filename;
    prod.save()
    
        .then(
            (savedproduct)=>{
            res.status(200).send(savedproduct);
            filename= '';
            }
        )
        .catch((err)=>{
            res.status(400).send(err);
        })
})

router.get('/getall',(req,res)=>{
    Product.find()
        .then(
            (products)=>{
                res.status(200).send(products)
            })
        .catch((err)=>{
            res.status(400).send(err);
        })
})

router.get('/getbyid/:id',(req , res)=>{

    id = req.params.id;
    Product.findById({ _id: id})
        .then(
            (product)=>{
                res.status(200).send(product)
            })
        .catch((err)=>{
            res.status(400).send(err);
        })

})

router.put('/update/:id',(req , res)=>{

    id = req.params.id;
    data = req.body;

    Product.findByIdAndUpdate({_id: id})
        .then(
            (produpdated)=>{
                res.status(200).send(produpdated)
            })
        .catch((err)=>{
            res.status(400).send(err);
        })

})

router.delete('/delete',(req , res)=>{
    
    id = req.params.id;

    Product.findOneAndDelete({_id: id})
        .then(
            (delproduct)=>{
                res.status(200).send(delproduct)
            })
        .catch((err)=>{
            res.status(400).send(err);
        })
    
})





module.exports = router;