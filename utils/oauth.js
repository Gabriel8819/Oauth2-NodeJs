const qs = require("querystring");


function createCsrfToken(){
    const char = "ABCDEFGHIJKLMNOPQRSTUVWabcdefghijklmnopqrstuvwxyz1234567890";
    const length = char.length;

    let randomString = "";

    for(i=0; i < 30; i++){
        randomString += char.charAt(Math.round(Math.random() * length));
    }
    return randomString;
}


function createGoogleUrl(clientId, scope, redirect_url){
    // other options for url

    // https://accounts.google.com/o/oauth2/v2/auth?
    // response_type=code&
    // client_id=${clientId}&
    // scope=${scope}&
    // redirect_uri=${redirect_url}&
    //* state=security_token%3D138r5719ru3e1%26url%3Dhttps%3A%2F%2Foauth2-login-demo.example.com%2FmyHome&
    //* login_hint=jsmith@example.com&
    //* nonce=0394852-3190485-2490358&
    //* hd=example.com`

/*
    Url used  w/o csrf token

    https://accounts.google.com/o/oauth2/v2/auth?
    response_type=code&client_id=724361235317-53cgptuho20nnu2rsrn7ob73nqutlcrk.apps.googleusercontent.com&
    scope=openid%20email&
    redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth%2Flogin

*/


//@Param
   //, stateToken,login_hint,nonce,hd


    clientId = encodeURIComponent(clientId);
    scope = encodeURIComponent(scope);
    redirect_url = encodeURIComponent(redirect_url);


    let googleUrl= `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&`
    googleUrl += `scope=${scope}&redirect_uri=${redirect_url}`


    return googleUrl;
}


function createTwitterUrl(clientId, scope, redirect_url){
    
    let twitterUrl = "";

    return twitterUrl;
}




module.exports = {createCsrfToken, createGoogleUrl, createTwitterUrl};