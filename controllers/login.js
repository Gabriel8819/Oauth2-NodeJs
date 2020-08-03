const https = require("https");
const fs = require("fs");

const  jwt = require("jsonwebtoken");
const router = require("express").Router();



const parser = require("../utils/parsers");
const oauth = require("../utils/oauth");

const clientId = "891216826881-bviuj6h42bfumint33q8fjubv0sbrbd1.apps.googleusercontent.com";
const secretClientCode = "J08OHq5jfXxic3nVrTAfnLxb";
const scope = "openid email"
const redirect_url = "https://localhost:3000/oauth/login";


const stateToken = oauth.createCsrfToken();


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
    let queryParams;
    try{
        queryParams = parser.urlParser(req.url);
    }catch(e){
        res.redirect("/");

    }

    switch(queryParams.socialMedia){
        case "google":
            const googleUrl = oauth.createGoogleUrl(clientId,scope,redirect_url);
            return res.redirect(googleUrl);
            break;
            break;
        case "twitter":

            break;

        default:
           
    }
   
})


router.get("/oauth/login", (req, res)=>{
    /*
    const key1 = "-AS7NlginBBXBMgB-ZWn9frB82HvW8jU7sMxk5Frhwc8LR1pJtdrl39yiBGO8Sa-YyuL56JD8rrWesHhLLp76rtW5Xpups_gbzJn3vnbG-d1-b0BEp9Drjd3eMsPzaGQl0mQCBTyhY_D11CINQ1LovLVR8RV7VjpRehkYjwmMrQPa0-I0K5LQi2stEZ-XV7_BPPqMq5g9O-g6O38suQPbZYykBL5J30YdiN9NsyXDObOX28jONsHdj7q2lvtcJDFjupUowPfgHEen_Pfq9ERaNkQ8zyqAPw9htpQ5U-9NDlFrPrBsWPzJ1MdwR-b0ISLAcHFaEfDYrEHalW3lf7Hew"
    const key2 = "yTrewP0u9KoGSzBgTBR3aTvSGdqEX-haZEFkr-MvPX4IuFAxpIoiuB3wcPIvvNer_yYTYBXOnkLnWz3b2YOH_xW9D2XrtoqsIaEzIKv6cgMKR5CMJ7cWB16NtO8v7C5wP-TRTHt38DXkmpJDvTVWT0VgQwwQO68OLaq-eVgpgbfCD1u6NJaKC8mdTyWl9tj1Kx-T3y0G7Vhj3F6i1T_qyQ8eOB5odjeEvEi3EziD_8_tFJcTePFc62Hmun7aVMB94DL1CS2pa7z18d_dF2jo680cvBDDd1eTzcKCYqvMdiIP-MxuMryPeiNrcwp45w4fr7nGUg3ExUGXXQ63AFu0AQ"
    const key3 = "-----BEGIN CERTIFICATE-----\nMIIDJjCCAg6gAwIBAgIIXf+K/6DnKnIwDQYJKoZIhvcNAQEFBQAwNjE0MDIGA1UE\nAxMrZmVkZXJhdGVkLXNpZ25vbi5zeXN0ZW0uZ3NlcnZpY2VhY2NvdW50LmNvbTAe\nFw0yMDA3MjcwNDI5MzZaFw0yMDA4MTIxNjQ0MzZaMDYxNDAyBgNVBAMTK2ZlZGVy\nYXRlZC1zaWdub24uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wggEiMA0GCSqG\nSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDJOt7A/S70qgZLMGBMFHdpO9IZ2oRf6Fpk\nQWSv4y89fgi4UDGkiiK4HfBw8i+816v/JhNgFc6eQudbPdvZg4f/Fb0PZeu2iqwh\noTMgq/pyAwpHkIwntxYHXo207y/sLnA/5NFMe3fwNeSakkO9NVZPRWBDDBA7rw4t\nqr55WCmBt8IPW7o0looLyZ1PJaX22PUrH5PfLQbtWGPcXqLVP+rJDx44Hmh2N4S8\nSLcTOIP/z+0UlxN48VzrYea6ftpUwH3gMvUJLalrvPXx390XaOjrzRy8EMN3V5PN\nwoJiq8x2Ig/4zG4yvI96I2tzCnjnDh+vucZSDcTFQZddDrcAW7QBAgMBAAGjODA2\nMAwGA1UdEwEB/wQCMAAwDgYDVR0PAQH/BAQDAgeAMBYGA1UdJQEB/wQMMAoGCCsG\nAQUFBwMCMA0GCSqGSIb3DQEBBQUAA4IBAQBOLZxvoVWDwZYDjGvWkNJKITwFO5ZW\nbO+lUbnZWsb2XRZgBn7R/RooOd5KY2EHOLa89gicfj6WjhqqhiYSHXMh0JG2dnwX\nLPRknwI9nzCsbUF6FsG3L9isTeZZqX9CqgYBisHfrkf7aSTbgkPa+j+UGtNC/5pm\nkoXs9bbrQmO/JfV96fRIrWb+cSlxC419Zn8DgYZkR6nITVTPEeRU868sezki6jDC\nfLDsi83rB5w/js4Rjt0k2T7TmyXDM+IfJIkWsvw1tkC/9ZKF46T2yrMxJObm9ttH\npmUc4JvK8AynPipoaFQJERhUHO6Je6gKmW2+8foQniHYuV2R1V/wpd6S\n-----END CERTIFICATE-----"
    const key4 = "-----BEGIN CERTIFICATE-----\nMIIDJjCCAg6gAwIBAgIIfT2mW9k7U7QwDQYJKoZIhvcNAQEFBQAwNjE0MDIGA1UE\nAxMrZmVkZXJhdGVkLXNpZ25vbi5zeXN0ZW0uZ3NlcnZpY2VhY2NvdW50LmNvbTAe\nFw0yMDA3MTkwNDI5MzZaFw0yMDA4MDQxNjQ0MzZaMDYxNDAyBgNVBAMTK2ZlZGVy\nYXRlZC1zaWdub24uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wggEiMA0GCSqG\nSIb3DQEBAQUAA4IBDwAwggEKAoIBAQD4BLs2WCKcEFcEyAH5laf1+sHzYe9byNTu\nwzGTkWuHBzwtHWkm12uXf3KIEY7xJr5jK4vnokPyutZ6weEsunvqu1blem6mz+Bv\nMmfe+dsb53X5vQESn0OuN3d4yw/NoZCXSZAIFPKFj8PXUIg1DUui8tVHxFXtWOlF\n6GRiPCYytA9rT4jQrktCLay0Rn5dXv8E8+oyrmD076Do7fyy5A9tljKQEvknfRh2\nI302zJcM5s5fbyM42wd2PuraW+1wkMWO6lSjA9+AcR6f89+r0RFo2RDzPKoA/D2G\n2lDlT700OUWs+sGxY/MnUx3BH5vQhIsBwcVoR8NisQdqVbeV/sd7AgMBAAGjODA2\nMAwGA1UdEwEB/wQCMAAwDgYDVR0PAQH/BAQDAgeAMBYGA1UdJQEB/wQMMAoGCCsG\nAQUFBwMCMA0GCSqGSIb3DQEBBQUAA4IBAQAHRqRzVBeXr208KACJmPZCWgxkduPD\n8wbirbV55zAg2wuA5yKCm5yXe1F9gd3FiPAbVF6jMQMdBfFvZPJdkEAuokguTxFd\np5k9snYX7iOe7z6MyA4+lSiA66cbevo8LXY1syAPjJrEiy7oG/MbKhnoxI228ynZ\nzIL08rJ9geEdBWKNv6vdkSmYXZlx1m5br95PoI3vlp1DOBAttRmKeVowsIqZ4TFb\n+MAjg8TcvXaaUU5aSRZXxvXPNnS3Fu6gSEuKHnhBmqdtPId5AGlXXrbslQMSyaNM\nw6vwo9Msm3tx3eLsNvM9jM+EpNUQ1apcZSaF311WDsgqFZWqS+23cj2Z\n-----END CERTIFICATE-----"
    
    if(req.cookies.googleOauth){
        const cookieObj = JSON.parse(req.cookies.googleOauth)
        console.log()

        jwt.verify(cookieObj["id_token"], key1, (err, decoded)=>{
           // if(err) console.log(err)
            console.log("Value", decoded)
        });

        res.set({"Content-Type": "text/plain"});
        return res.send(req.cookies.googleOauth);
    }*/


    
    const parsedUrl = parser.urlParser(req.url);
    const scope = decodeURIComponent(parsedUrl.scope);
    //console.log(parsedUrl);
    //console.log(scope);


    const requestBody = `code=${parsedUrl.code}&client_id=${clientId}&client_secret=${secretClientCode}&redirect_uri=${encodeURIComponent("https://localhost:3000/oauth/login")}&grant_type=authorization_code`;

    const tlsOptions = {
        hostname: "oauth2.googleapis.com",
        //post:,
        path: "/token",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": Buffer.byteLength(requestBody)
        },
        key:fs.readFileSync("C:\\Users\\Gabriel\\Desktop\\web developpement\\node\\test\\tls/key.pem"),
        cert: fs.readFileSync("C:\\Users\\Gabriel\\Desktop\\web developpement\\node\\test\\tls/certificate.pem")

    }


    const request = https.request(tlsOptions, (response)=>{

        let body = [];
        response.on("data", (data)=>{
            body.push(data);
            // const obj2 = JSON.parse(data.toString());
            

        }).on("end", ()=>{
            Buffer.concat(body).toString();

            res.cookie("googleOauth", body.toString(), {httpOnly: true});

            const obj = JSON.parse(body);

            // jwt.verify(obj["id_token"], "J08OHq5jfXxic3nVrTAfnLxb", (err, decoded)=>{
            //     if(err) console.log(err)
            //     console.log(decoded)
            // });
            
            //https://localhost:3000/oauth/login

            console.log(obj);
            
            res.set({"Content-Type": "text/plain"});
            res.send(body.toString());
        })
      
    })

    request.write(requestBody);
    request.end();


    /*
    /oauth/login?code=4%2F2gGTHD8fPn0G3zYWUoO9uOQ2kzij6SpQv125AE2wmVzy12YYLAbRxXiNNRNFcSyWThwN4lSzCezfQn9qTyfsYys&
    scope=email+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&
    authuser=0&
    prompt=consent
    */
    
    
})


module.exports = router;