const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



router.post('/register', async (req,res)=>{
    data = req.body;
    usr = new User(data);
    salt = bcrypt.genSalt(10);
    cryptedpass = await bcrypt.hashSync(data.password , salt);
    usr.password = cryptedpass;
    usr.save()
        .then(
            (saveduser)=>{
            res.status(200).send(saveduser);
            }
        )
        .catch((err)=>{
            res.status(400).send(err);
        })
})


router.post('/login', async (req,res)=>{
    data = req.body;

    user = await User.findOne({email : data.email})

    if(!user){
        res.status(404).send(' email or password invalid ! ')
    }else{
        validPass = bcrypt.compareSync(data.password,user.password)
        if(!validPass){
            res.status(404).send(' email or password invalid ! ')
        }else{
            payload = {
                id : user._id,
                email : user.email,
                name : user.name
            }
            token = jwt.sign(payload, '12345678' );
            res.status(200).send({mytoken : token});
        }
    }

})

//User CRUD
router.get('/getall',(req,res)=>{
    User.find()
        .then(
            (users)=>{
                res.status(200).send(users)
            })
        .catch((err)=>{
            res.status(400).send(err);
        })
})

router.get('/getbyid/:id',(req , res)=>{

    myid = req.params.id;
    User.findById({ _id: myid})
        .then(
            (user)=>{
                res.status(200).send(user)
            })
        .catch((err)=>{
            res.status(400).send(err);
        })

})

router.put('/update/:id',(req , res)=>{

    id = req.params.id;
    data = req.body;

    User.findByIdAndUpdate({_id: id})
        .then(
            (updated)=>{
                res.status(200).send(updated)
            })
        .catch((err)=>{
            res.status(400).send(err);
        })

})

router.delete('/delete/:id',(req , res)=>{
    
    id = req.params.id;

    User.findOneAndDelete({_id: id})
        .then(
            (deleteduser)=>{
                res.status(200).send(deleteduser)
            })
        .catch((err)=>{
            res.status(400).send(err);
        })
    
})




module.exports = router;