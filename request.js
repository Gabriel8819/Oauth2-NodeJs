const  http = require("https");

const crypto  = require("crypto");


const options = {
    
    protocol:"https:",
    hostname: "www.login.microsoftonline.com",
    port: 443,
    path: "/common/v2.0/.well-known/openid-configuration",
    method: "GET",
    headers: {
       
    }

}

const req = http.request(options, (res)=>{
    let body = [];
    res.on("data", (data)=>{
        body.push(data);
        
    }).on("end", ()=>{
        console.log(Buffer.concat(body).toString());
        
    });
});


//req.write(data);
req.end();
