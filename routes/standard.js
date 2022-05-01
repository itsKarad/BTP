const express = require("express");
const Page = require("../models/page.js");
const Standard = require("../models/standards.js");
const router = express.Router();
const {isLoggedIn} = require("../middleware/auth.js");

// POST for adding new standard for a page
router.post("/page/:pageId/standards", isLoggedIn, isLoggedIn,async (req,res) => {
    console.log(req.body);
    const pageId = req.params.pageId;
    const foundPage = await Page.findById(pageId);
    const userId = req.user._id;
    const name = req.user.name;
    const standardText = req.body.standardText;
    const standardValue = req.body.standardValue;
    const standardSource = req.body.standardSource;
    const newStandard = Standard({
        text: standardText,
        value: standardValue,
        authorId: userId,
        authorName: name,
        source: standardSource,
    });
    foundPage.standards.push(newStandard);
    await foundPage.save();    
    await newStandard.save(); 
    res.redirect(`/page/${pageId}`);
});

router.delete("/page/:pageId/standard/:standardId", isLoggedIn,async (req,res) => {
    const pageId = req.params.pageId;
    const standardId = req.params.standardId;
    let foundPage = null;
    let foundStandard = null;

    try{
        foundPage = await Page.findById(pageId);
        foundStandard = await Standard.findById(standardId);   
    }
    catch{

    }    
    if(foundPage && foundStandard && ( req.user.isAdmin || foundStandard.authorId.toString() === req.user._id.toString())){
        try{
            foundPage.standards.pull(foundStandard);
            await foundPage.save();
            await foundStandard.remove();
        }
        catch{

        }
    }

    res.redirect(`/page/${pageId}`);
});

module.exports = router;