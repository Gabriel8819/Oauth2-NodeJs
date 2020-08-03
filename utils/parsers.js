let parser = {};

parser.bodyParser = function(data){
    data = data.toString().split("&");
    let body = {};
    data.forEach(element => {
        let input = element.split("=");
        body[input[0]] = input[1];
        
    });
    
    return body;
}


parser.urlParser = function(data){


    data = data.toString().split("?")[1];
    data = data.split("&");
    let body = {};
    data.forEach(element => {
        let input = element.split("=");
        body[input[0]] = input[1];
        
    });
    
    return body;
}









module.exports = parser;