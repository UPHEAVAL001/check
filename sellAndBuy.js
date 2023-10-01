const e = require("express");
const express = require("express");

const SellBuy = require("../mongoose/models/sellBuy")

const router = express.Router()
router.get("/", async (req, res) => {

    try {
        if (req.query.product) {
        const data = await SellBuy.find({ productName: req.query.product })
        res.status(200).json(data)
        }else if (req.query.sortBy) {
            let s = req.query.sortBy
            let i = "costPrice"
            let o = -1;
            if (s.charAt(0) == 'l') {//l for lion
                o = 1;
            }
            if(s.includes("S")) {
                const data = await SellBuy.find().sort ({ soldPrice: o}) // o for owl
                    res.status(200).json(data)
            }else{
                const data = await SellBuy.find().sort({costPrice:o})
                res.status(200).json(data)
            }
        }else{
            const data = await SellBuy.find()
            res.status(200).json(data)
        }
    }catch(err){
        res.status(200).json(data);
    }
})

router. post ("/", async (req, res, next) =>{
    const data = new SellBuy(req.body)
    try{
        if (data.productName.length < 4){
        const err = new Error("product name should have minimum of four characters")
        err.status = 400
        next(err)
        }else if (data.costPrice <= 0){
            const err = new Error("cost price value cannot be zero or negative value");
            err.status = 400
            next(err)
        }else if (data.soldPricePrice <= 0){
            const err = new Error("sold price value cannot be zero or negative value");
            err.status = 400
            next(err)
        }else{
            await data.save();
            res.status(201).json({message :"Product Added"})
        }
    }catch(err){
        res.status(200).json(data);
    }
})

router. patch("/:id", async(req, res, next) => {
    try{
        const data = req.body.soldPrice;
        if (data <= 0){
            const err = new Error("sold price value cannot be zero or negative value")
            err.status = 400
            next(err)
        }else{
            res.status(200).json({message : "Updated Successfully"})
        }
    }catch(err){

    }
})


router.delete("/:id", async (req, res) => {
    try{
        let id = req.params.id
        if(id === undefined || id === null || id === ''){
            res.status(400).json({error: err})
        }
        const data = await SellBuy. findByIdAndDelete(id)
        res.status(200).json({message : "Deleted successfully"})
    }catch(err){
        res.status(400).json({error: err})
    }
})


module.exports = router
