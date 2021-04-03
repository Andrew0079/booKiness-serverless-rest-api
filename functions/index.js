const functions = require("firebase-functions");
const express = require("express");
const cookieParser = require("cookie-parser")();
const cors = require("cors");
const authMiddleware = require("./src/middleware/authMiddleware")
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
//

const app = express();
app.use(cors({ origin: true }));
app.use(cookieParser);
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(authMiddleware)

const user = require("./src/service/user");
const organisation = require("./src/service/organisation");
const check = require("./src/service/check");
const post = require("./src/service/post");
const work = require("./src/service/work");
const comment = require("./src/service/comment");
// routes

app.use("/user", user);
app.use("/organisation", organisation);
app.use("/check", check);
app.use("/post", post);
app.use("/work", work);
app.use("/comment", comment);

exports.app = functions.https.onRequest(app);