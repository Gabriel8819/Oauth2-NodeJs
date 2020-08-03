const  http = require("https");



/*const data =`code=test&
username=gabriel8819&
password=secret123`;*/


const options = {
    
    protocol:"https:",
    hostname: "www.googleapis.com",
    port: 443,
    path: "/oauth2/v3/userinfo",
    method: "GET",
    headers: {
        "Authorization" : "Bearer ya29.a0AfH6SMCV9hiaG4vUGv-iY4ZBJM9uIo6O-C9nuGe8EfjBCOaPsYI8wkdcjtTikP2GWkVoFaw47gpP9bBW0nvkXbPPOT4Wpy93Z880p6f52Vc4orw1AIJ_d9IvmPAwzQU3G8yPKcVXu3tCyS-_EAlVqp0nm8XdjcNTdZ8"
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