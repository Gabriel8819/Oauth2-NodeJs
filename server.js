const  https = require("https");
const  path = require("path");
const fs = require("fs");
const assert = require("assert").strict;

const  express = require("express");
const cookieParser = require("cookie-parser");

const login = require("./controllers/login");


const  PORT = process.env.PORT || 3000;
const httpsOptions = {
    key: fs.readFileSync("tls/key.pem"),
    cert: fs.readFileSync("tls/certificate.pem")
}


const app = express();




app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/js")));
app.use(express.static(path.join(__dirname, "/public/html")));

app.use(login);
// app.get("/", (req,res)=>{
//     console.log(req.url)
// })

const server = https.createServer(httpsOptions, app);

server.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});




