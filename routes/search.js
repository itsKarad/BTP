const express = require("express");
const Guideline = require("../models/guideline.js");
const Page = require("../models/page.js");
const Standard = require("../models/standards.js");
const router = express.Router();

// GET for getting search query
router.post("/search", async(req, res) => {
    const searchQuery = req.body.searchQuery;
    const foundGuidelines = await Guideline.find({
        text: { $regex : new RegExp(searchQuery, "i") }
    });

    const foundStandards = await Standard.find({
        text: { $regex : new RegExp(searchQuery, "i") }
    });
    let guidelinesParentPages = [];
    for(let i=foundGuidelines.length-1; i>=0; i--){
        const foundParentPage = await Page.find({
            guidelines: foundGuidelines[i]._id
        });
        if(!foundParentPage || foundParentPage.length === 0){
            foundGuidelines.splice(i, 1);
        }
        else{
            guidelinesParentPages.push(foundParentPage[0]);
        }
    }
    guidelinesParentPages.reverse();

    let standardsParentPages = [];
    for(let i=foundStandards.length-1 ; i>=0; i--){
        const foundParentPage = await Page.find({
            standards: foundStandards[i]._id
        });
        if(!foundParentPage || foundParentPage.length === 0){
            foundStandards.splice(i, 1);
        }
        else{
            standardsParentPages.push(foundParentPage[0]);
        }
    }
    standardsParentPages.reverse();

    res.render("./search/index.ejs", {
        guidelines: foundGuidelines, 
        guidelinesParentPages, 
        standards: foundStandards, 
        searchQuery: searchQuery, 
        standardsParentPages
    });
});

module.exports = router;