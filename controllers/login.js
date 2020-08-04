const https = require("https");
const fs = require("fs");

const  jwt = require("jsonwebtoken");
const jwkToPem = require('jwk-to-pem');
const router = require("express").Router();



const parser = require("../utils/parsers");
const oauth = require("../utils/oauth");


let openIdProvider;
let csrfToken;

const clientId = "891216826881-bviuj6h42bfumint33q8fjubv0sbrbd1.apps.googleusercontent.com";
const secretClientCode = "J08OHq5jfXxic3nVrTAfnLxb";
const scope = "openid profile email"
const redirect_url = "https://localhost:3000/oauth/login";

const msftAppClientId = "7fe90a47-4b2b-4fc9-b978-6bb7d12bb1ca";
const msftObjectId = "ff5d4f06-fae5-4da5-942f-61c01e1a2b44";
const msftTennant = "f8cdef31-a31e-4b4a-93e4-5f571e91255a";
const client_secret = "A8GFXo7_humC575BEfEsh_1igXp-0M5r-1";




oauth.createGoogleUrl(clientId,scope,redirect_url);



router.post("/login", (req, res)=>{
    req.on("data", (data)=>{
        const body = parser.bodyParser(data);
        console.log(body)
        
        if(body.password == "123456"){
            return res.status(200).send("Hello");
        }
        
        res.redirect("/");
    })

})


router.get("/oauth", (req, res)=>{
    csrfToken = oauth.createCsrfToken();
    let nonce;


  
    try{
        openIdProvider = parser.urlParser(req.url).socialMedia;
    }catch(e){
        res.redirect("/");

    }
  
    switch(openIdProvider){
        case "google":
            nonce = oauth.createNoOnce();
            const googleUrl = oauth.createGoogleUrl(clientId,scope,redirect_url,csrfToken, nonce);
            return res.redirect(googleUrl);
            break;
            break;
        case "microsoft":
            const microsoftUrl = oauth.createMicrosoftUrl(msftTennant, msftAppClientId, redirect_url, csrfToken);
            return res.redirect(microsoftUrl);
            break;

        default:
           
    }
   
})


router.get("/oauth/login", (req, res)=>{

    if(req.cookies.googleOauth || req.cookies.microsoftOauth){
        const googleCookie = JSON.parse(req.cookies.googleOauth)
        const microsoftCookie = JSON.parse(req.cookies.microsoftOauth)

        const oAuthProvider = {
            Google: googleCookie,
            Microsoft: microsoftCookie
        }

        console.log(oAuthProvider)

        res.set({"Content-Type": "application/json"});
        return res.send(JSON.stringify(oAuthProvider));
    }

    const parsedUrl = parser.urlParser(req.url);
    const scope = decodeURIComponent(parsedUrl);


    switch(openIdProvider){
        case "microsoft":
            const microsoftRequestBody = `code=${parsedUrl.code}&client_id=${msftAppClientId}&scope=openid%20offline_access%20https%3A%2F%2Fgraph.microsoft.com%2Fmail.read&redirect_uri=${encodeURIComponent("https://localhost:3000/oauth/login")}&grant_type=authorization_code&client_secret=${encodeURIComponent(client_secret)}`;
            
            const microSoftTlsOptions = {
                hostname: "login.microsoftonline.com",
                //post:,
                path: "/consumers/oauth2/v2.0/token",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Content-Length": Buffer.byteLength(microsoftRequestBody)
                },
                key:fs.readFileSync("C:\\Users\\Gabriel\\Desktop\\web developpement\\node\\test\\tls/key.pem"),
                cert: fs.readFileSync("C:\\Users\\Gabriel\\Desktop\\web developpement\\node\\test\\tls/certificate.pem")
                
            }
            
            const microsoftRequest = https.request(microSoftTlsOptions, (response)=>{
                
                let body = [];
                response.on("data", (data)=>{
                    body.push(data);
                    // const obj2 = JSON.parse(data.toString());
                    
                    
                }).on("end", ()=>{
                    Buffer.concat(body).toString();
                    
                    
                    res.cookie("microsoftOauth", body.toString(), {httpOnly: true});
                    
                    const obj = JSON.parse(body);
                    console.log(obj);
                    
                res.set({"Content-Type": "application/json"});
                res.send(JSON.stringify(obj));
                
                
                
                //const base64Body = Buffer.from(obj["id_token"]).toString("base64");
                /*
                const key = {
                    kty: "RSA",
                    use: "sig",
                    kid: "1LTMzakihiRla_8z2BEJVXeWMqo",
                    x5t: "1LTMzakihiRla_8z2BEJVXeWMqo",
                    n: "3sKcJSD4cHwTY5jYm5lNEzqk3wON1CaARO5EoWIQt5u-X-ZnW61CiRZpWpfhKwRYU153td5R8p-AJDWT-NcEJ0MHU3KiuIEPmbgJpS7qkyURuHRucDM2lO4L4XfIlvizQrlyJnJcd09uLErZEO9PcvKiDHoois2B4fGj7CsAe5UZgExJvACDlsQSku2JUyDmZUZP2_u_gCuqNJM5o0hW7FKRI3MFoYCsqSEmHnnumuJ2jF0RHDRWQpodhlAR6uKLoiWHqHO3aG7scxYMj5cMzkpe1Kq_Dm5yyHkMCSJ_JaRhwymFfV_SWkqd3n-WVZT0ADLEq0RNi9tqZ43noUnO_w",
                    e: "AQAB",
                    x5c: [
                        "MIIDYDCCAkigAwIBAgIJAIB4jVVJ3BeuMA0GCSqGSIb3DQEBCwUAMCkxJzAlBgNVBAMTHkxpdmUgSUQgU1RTIFNpZ25pbmcgUHVibGljIEtleTAeFw0xNjA0MDUxNDQzMzVaFw0yMTA0MDQxNDQzMzVaMCkxJzAlBgNVBAMTHkxpdmUgSUQgU1RTIFNpZ25pbmcgUHVibGljIEtleTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAN7CnCUg+HB8E2OY2JuZTRM6pN8DjdQmgETuRKFiELebvl/mZ1utQokWaVqX4SsEWFNed7XeUfKfgCQ1k/jXBCdDB1NyoriBD5m4CaUu6pMlEbh0bnAzNpTuC+F3yJb4s0K5ciZyXHdPbixK2RDvT3Lyogx6KIrNgeHxo+wrAHuVGYBMSbwAg5bEEpLtiVMg5mVGT9v7v4ArqjSTOaNIVuxSkSNzBaGArKkhJh557pridoxdERw0VkKaHYZQEerii6Ilh6hzt2hu7HMWDI+XDM5KXtSqvw5ucsh5DAkifyWkYcMphX1f0lpKnd5/llWU9AAyxKtETYvbameN56FJzv8CAwEAAaOBijCBhzAdBgNVHQ4EFgQU9IdLLpbC2S8Wn1MCXsdtFac9SRYwWQYDVR0jBFIwUIAU9IdLLpbC2S8Wn1MCXsdtFac9SRahLaQrMCkxJzAlBgNVBAMTHkxpdmUgSUQgU1RTIFNpZ25pbmcgUHVibGljIEtleYIJAIB4jVVJ3BeuMAsGA1UdDwQEAwIBxjANBgkqhkiG9w0BAQsFAAOCAQEAXk0sQAib0PGqvwELTlflQEKS++vqpWYPW/2gCVCn5shbyP1J7z1nT8kE/ZDVdl3LvGgTMfdDHaRF5ie5NjkTHmVOKbbHaWpTwUFbYAFBJGnx+s/9XSdmNmW9GlUjdpd6lCZxsI6888r0ptBgKINRRrkwMlq3jD1U0kv4JlsIhafUIOqGi4+hIDXBlY0F/HJPfUU75N885/r4CCxKhmfh3PBM35XOch/NGC67fLjqLN+TIWLoxnvil9m3jRjqOA9u50JUeDGZABIYIMcAdLpI2lcfru4wXcYXuQul22nAR7yOyGKNOKULoOTE4t4AeGRqCogXSxZgaTgKSBhvhE+MGg=="
                    ],
                    issuer: "https://login.microsoftonline.com/9188040d-6c67-4c5b-b112-36a304b66dad/v2.0"
                }
                
                const pem = jwkToPem(key)
                jwt.verify(obj["id_token"], pem, (err, decoded)=>{
                    console.log(decoded);
                });
                */ 
                }).on("error", (err)=>{
                    console.log(err.message);
                })
                
            })
            
            microsoftRequest.write(microsoftRequestBody);
            microsoftRequest.end();

            break;
        case "google":
            const googleRequestBody = `code=${parsedUrl.code}&client_id=${clientId}&client_secret=${secretClientCode}&redirect_uri=${encodeURIComponent("https://localhost:3000/oauth/login")}&grant_type=authorization_code`;
        
            const googleTlsOptions = {
                hostname: "oauth2.googleapis.com",
                //post:,
                path: "/token",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Content-Length": Buffer.byteLength(googleRequestBody)
                },
                key:fs.readFileSync("C:\\Users\\Gabriel\\Desktop\\web developpement\\node\\test\\tls/key.pem"),
                cert: fs.readFileSync("C:\\Users\\Gabriel\\Desktop\\web developpement\\node\\test\\tls/certificate.pem")
        
            }
        
        
            const googleRequest = https.request(googleTlsOptions, (response)=>{
        
                let body = [];
                response.on("data", (data)=>{
                    body.push(data);
                    // const obj2 = JSON.parse(data.toString());
                    
        
                }).on("end", ()=>{
                    Buffer.concat(body).toString();
                
        
                    res.cookie("googleOauth", body.toString(), {httpOnly: true});
                    
                    const obj = JSON.parse(body);
                    const base64Body = Buffer.from(obj["id_token"]).toString("base64");
                    console.log(base64Body)
        
                    // jwt.verify(obj["id_token"], "J08OHq5jfXxic3nVrTAfnLxb", (err, decoded)=>{
                    //     if(err) console.log(err)
                    //     console.log(decoded)
                    // });
                    
                    //https://localhost:3000/oauth/login
        
                    //console.log(obj);
        
                    
        
                    res.set({"Content-Type": "application/json"});
                    res.send(body.toString());
                })
            
            })
        
            googleRequest.write(googleRequestBody);
            googleRequest.end();

            break;
        
    }
    
})


module.exports = router;