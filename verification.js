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
        code: document.getElementById('verificationCode').value    
        });

    xmlhttp = new XMLHttpRequest();
    var token = localStorage.getItem('verification_token'); 

    xmlhttp.open("POST", `http://127.0.0.1:5000/user/fa2_auth/${token}`, true);   
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.status == 200){ 
            var jsonResponse = JSON.parse(this.responseText);
            localStorage.setItem('access_token', jsonResponse['access_token']); 
            localStorage.setItem('refresh_token', jsonResponse['refresh_token']);   
            location.replace("http://localhost:8888/Login_v2/content.html");  
        }  
        
        if (xmlhttp.status == 401) {
            $('#pushMsg').html("Wrong Code");  
        }
    }; 
    xmlhttp.send(json);
}

$(document).ready( function() {
    $('#validate').on('click', httpPost);     
});