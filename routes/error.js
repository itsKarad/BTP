const express = require("express");
const router = express.Router();

// Error page route : 404
router.get("*",function(req,res){
    res.send("ERROR PAGE!");
});

module.exports = router;