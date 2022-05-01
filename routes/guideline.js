const express = require("express");
const Page = require("../models/page.js");
const Guideline = require("../models/guideline.js");
const router = express.Router();
const {isLoggedIn} = require("../middleware/auth.js");


router.get("/page/:pageId/new-guideline", isLoggedIn,async(req, res) => {
    const page = await Page.findById(req.params.pageId);

    res.render("./page/new-guideline/index.ejs", {page: page});
});

router.get("/page/:pageId/guideline/:guidelineId", async(req, res) => {
    const page = await Page.findById(req.params.pageId);
    const guideline = await Guideline.findById(req.params.guidelineId);
    res.render("./page/edit-guideline/index.ejs", {page: page, guideline: guideline});
})


// POST for adding new guideline for a page
router.post("/page/:pageId/guidelines", isLoggedIn, async(req,res) => {
    console.log(req.body);
    const pageId = req.params.pageId;
    const foundPage = await Page.findById(pageId);
    const userId = req.user._id;
    const name = req.user.name;
    const guidelineText = req.body.guidelineText;
    const guidelineSource = req.body.guidelineSource;
    const newGuideline = Guideline({
        text: guidelineText,
        authorId: userId,
        source: guidelineSource,
        authorName: name,
    });
    foundPage.guidelines.push(newGuideline);
    await foundPage.save();
    await newGuideline.save();
    res.redirect(`/page/${pageId}`);
});

// Editting a guideline
router.patch("/page/:pageId/guideline/:guidelineId", isLoggedIn,async(req,res) => {
    const guidelineId = req.params.guidelineId;
    const guidelineText = req.body.guidelineText;
    const guidelineSource = req.body.guidelineSource;
    let foundGuideline = await Guideline.findById(guidelineId);
    if(req.user.isAdmin || foundGuideline.authorId.toString() === req.user._id.toString()){
        foundGuideline.text = guidelineText;
        foundGuideline.source = guidelineSource;
        await foundGuideline.save();
    }
    res.redirect(`/page/${req.params.pageId}`);    
});

router.delete("/page/:pageId/guideline/:guidelineId", isLoggedIn,async(req,res) => {
    const pageId = req.params.pageId;
    const guidelineId = req.params.guidelineId;
    console.log(pageId, guidelineId);
    let foundPage = null;
    let foundGuideline = null;

    // remove guideline from page and delete guideline
    try{
        foundPage = await Page.findById(pageId);
        foundGuideline = await Guideline.findById(guidelineId);
        
    } catch{

    }
    
    if(foundPage && foundGuideline && ( req.user.isAdmin || foundGuideline.authorId.toString() === req.user._id.toString())){
        try{
            foundPage.guidelines.pull(foundGuideline);
            await foundPage.save();
            await foundGuideline.remove();
        }
        catch{
    
        }
    }
    
    res.redirect(`/page/${pageId}`);
});



module.exports = router;