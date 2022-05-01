const express = require("express");

const Page = require("../models/page.js");
const router = express.Router();
const {isLoggedIn} = require("../middleware/auth.js");
const sortChronologically = require("../util/sorting.js");

// GET all pages
router.get("/", async(req, res) => {
    const allPages = await Page.find({});
    if(req.query.sort){
        allPages.sort(sortChronologically);
        if(req.query.sort === "latest"){
            allPages.reverse();
        } 
    }
    res.render("./module/index.ejs", {pages: allPages, user: req.user});
});

// GET specific page
router.get("/page/:id", async function (req, res)  {
    let requestedPage = null;
    try{
        requestedPage = await Page.findById(req.params.id).populate("guidelines").populate("standards");
        
    }
    catch{
        
    }
    if(requestedPage === null){
        res.render("./error/error.ejs" , {message: "Cannot find that page!"});
    }
    else{
        if(req.query.guidelineSort){
            //requestedPage.guidelines.sort(sortChronologically);
            if(req.query.guidelineSort === "latest"){
                requestedPage.guidelines.reverse();
            }
        }
        if(req.query.specificationSort){
            //requestedPage.standards.sort(sortChronologically);
            if(req.query.specificationSort === "latest"){
                requestedPage.standards.reverse();
            }
        }
        res.render("./page/index.ejs", {page: requestedPage, user: req.user});
    }
    
    
});

// GET form for editting page
router.get("/page/:id/edit", isLoggedIn,async function (req, res)  {
    let requestedPage = null;
    try{
        requestedPage = await Page.findById(req.params.id); 
    }
    catch{
        
    }
    if(requestedPage === null){
        res.render("./error/error.ejs" , {message: "Cannot find that page!"});
    }
    else{
        res.render("./module/edit-page/index.ejs", {page: requestedPage});
    } 
});


// POST for adding new page
router.post("/page", isLoggedIn,async(req, res) => {
    const pageTitle = req.body.pageTitle;
    const pageDescription = req.body.pageDescription;
    const userId = req.user._id;
    const name = req.user.name;
    const newPage = Page({
        name: pageTitle,
        description: pageDescription,
        guidelines: [],
        standards: [],
        authorId: userId,
        authorName: name
    });
    newPage.save();
    res.redirect("/");
});

// PATCH for editting page
router.patch("/page/:id", isLoggedIn, async(req, res) => {
    const pageId = req.params.id;
    const editedPageTitle = req.body.pageTitle;
    const editedPageDescription = req.body.pageDescription;

    let foundPage = await Page.findById(pageId);
    if(req.user.isAdmin || foundPage.authorId.toString() === req.user._id.toString()){
        foundPage.name = editedPageTitle;
        foundPage.description = editedPageDescription;
        await foundPage.save();
    }
    res.redirect(`/page/${pageId}`);
});

// DELETE for deleting specific page
router.delete("/page/:id", isLoggedIn,async(req, res) => {
    const requestedId = req.params.id;
    let foundPage = null;
    try{
        foundPage = await Page.findById(requestedId);

    } catch{

    }
    if(req.user.isAdmin || foundPage && foundPage.authorId.toString() === req.user._id.toString()){
        try{
            await foundPage.remove();
        }
        catch{
            
        }
    }

    res.redirect("/");
});

module.exports = router;