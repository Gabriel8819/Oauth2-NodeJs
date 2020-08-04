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


function createNoOnce(){
    const char = "1234567890";
    const length = char.length;

    let randomString = "";

    for(let i = 0; i < 3; i++){
        let randomPart = "";
        for(let j=0; j < 6; j++){
            randomPart += char.charAt(Math.round(Math.random() * length));
            //console.log(randomPart)
        }
        if(i === 2){
            randomString += randomPart
        }else{
            randomString += randomPart +  "-";
        }
        
    }
    return randomString;
}


function createGoogleUrl(clientId, scope, redirect_url, csrfToken, nonce){
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
    csrfToken = encodeURIComponent(csrfToken)


    let googleUrl= `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&`
    googleUrl += `scope=${scope}&redirect_uri=${redirect_url}&access_type=offline&`;
    googleUrl += `nonce=${nonce}`;


    return googleUrl;
}


function createTwitterUrl(clientId, scope, redirect_url){
    
    let twitterUrl = "";

    return twitterUrl;
}


function createMicrosoftUrl(tenant, clientId, redirect_uri, csrfToken){
    /*
    https://login.microsoftonline.com/{tenant}/oauth2/v2.0/authorize?
    client_id=6731de76-14a6-49ae-97bc-6eba6914391e
    &response_type=code
    &redirect_uri=http%3A%2F%2Flocalhost%2Fmyapp%2F
    &response_mode=query
    &scope=openid%20offline_access%20https%3A%2F%2Fgraph.microsoft.com%2Fmail.read
    &state=12345
    */

    redirect_uri = encodeURIComponent(redirect_uri);
    csrfToken = encodeURIComponent(csrfToken);


    let url = `https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize?`;
    url += `client_id=${clientId}&response_type=code&redirect_uri=${redirect_uri}`;
    url += `&response_mode=query&scope=openid%20offline_access%20https%3A%2F%2Fgraph.microsoft.com%2Fmail.read&state=${csrfToken}`;
    
    return url;

}























module.exports = {createCsrfToken, createGoogleUrl, createTwitterUrl, createNoOnce, createMicrosoftUrl};