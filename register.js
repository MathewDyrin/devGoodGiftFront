function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
} 

function httpPost() 
{
    var json = JSON.stringify({
        email: document.getElementById('email').value,
        password: document.getElementById('password').value, 
        username: document.getElementById('username').value  
        });

    xmlhttp = new XMLHttpRequest();
    
    xmlhttp.open("POST", "http://127.0.0.1:5000/user/register", true);    
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function() {
        console.log(this.responseText);           
    }; 
    xmlhttp.send(json);
}

$(document).ready( function() {
    $('#singIn').on('click', httpPost);    
});