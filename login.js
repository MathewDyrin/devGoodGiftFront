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
        username: document.getElementById('username')   
        });

    xmlhttp = new XMLHttpRequest();
    
    xmlhttp.open("POST", "http://127.0.0.1:5000/user/login", true);  
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.status == 201){ 
            var jsonResponse = JSON.parse(this.responseText);
            localStorage.setItem('access_token', jsonResponse['access_token']); 
            localStorage.setItem('refresh_token', jsonResponse['refresh_token']);   
            location.replace("http://localhost:8888/Login_v2/content.html");  
        }  
        
        if (xmlhttp.status == 202) {
            var jsonResponse = JSON.parse(this.responseText);
            localStorage.setItem('verification_token', jsonResponse['verification_token']);    
            location.replace("http://localhost:8888/Login_v2/verification.html");
        }

        
    }; 
    xmlhttp.send(json);
}

$(document).ready( function() {
    $('#singIn').on('click', httpPost);    
});





    