

const addDiv = document.querySelector("#addDiv");
const btnClick = document.querySelector("#btnClick");
const textInput = document.querySelector("#textInput");

const oAuthForm = document.querySelector("#oAuthForm");
const google = document.querySelector("#google");
const twitter = document.querySelector("#twitter");



google.addEventListener("click", (e)=>{
    location.assign("https://localhost:3000/oauth?socialMedia=google");
   
});

twitter.addEventListener("click", (e)=>{
    location.assign("https://localhost:3000/oauth?socialMedia=twitter");
   
});

btnClick.addEventListener("click", addThings);



function addThings(text){


    const p = document.createElement("p");
    const txtNode = document.createTextNode(textInput.value);
    p.appendChild(txtNode);
    addDiv.appendChild(p);

    textInput.value = "";
    textInput.focus();


}