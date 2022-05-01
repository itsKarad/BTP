// npm imports
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const passport=require("passport");
const dotenv=require("dotenv");
const session = require("express-session");
const MongoDBStore=require("connect-mongo");
const flash = require("connect-flash");
const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");
const pageRoutes = require("./routes/page.js");
const guidelineRoutes = require("./routes/guideline.js");
const standardRoutes = require("./routes/standard.js");
const errorRoutes = require("./routes/error.js");
const authRoutes = require("./routes/auth.js");
const searchRoutes = require("./routes/search.js");
const User = require("./models/user.js");

require("./config/passport.js")(passport);



// express-sessions
const expressSession = session({
    secret: 'ThisMustBeMySecretLOL',
    resave: false,
    saveUninitialized: false,
    store: MongoDBStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
});




// Connecting database
connectDB();



 

// Load config
dotenv.config({ path: "./config.env" });

// Middleware
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/views/'));
app.use(expressSession);
app.use(flash());

// User authentication
app.use(passport.initialize());
app.use(passport.session());


// Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// Routes
app.use(searchRoutes);
app.use(authRoutes);
app.use(pageRoutes);
app.use(guidelineRoutes);
app.use(standardRoutes);
app.use(errorRoutes);

// Setting server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is online on " + PORT);
});