function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
} 

function httpPost() 
{
   
    xmlhttp = new XMLHttpRequest();
    
    xmlhttp.open("GET", "http://127.0.0.1:5000/user/1", true);      
    xmlhttp.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('access_token')}`); 
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.status == 200) {
            var jsonResponse = JSON.parse(this.responseText);
            document.getElementById('userName').value = jsonResponse["username"],
            document.getElementById('userRealName').value = jsonResponse["name"], 
            document.getElementById('userRealSurName').value = jsonResponse["surname"],
            document.getElementById('userLocality').value = jsonResponse["locality"], 
            document.getElementById('userBalance').value = jsonResponse["balance"],
            document.getElementById('userProfilePic').value = jsonResponse["profile_pic"],
            document.getElementById('user2FA').checked = jsonResponse["second_fa_enabled"]     
        }
        
        else {
            location.replace("http://localhost:8888/Login_v2/"); 
        }
    }; 
    xmlhttp.send();  
}

function saveData() 
{    
    var json = JSON.stringify({
        username: document.getElementById('userName').value,
        name: document.getElementById('userRealName').value, 
        surname: document.getElementById('userRealSurName').value,
        locality: document.getElementById('userLocality').value,
        balance: document.getElementById('userBalance').value,
        profile_pic: document.getElementById('userProfilePic').value,
        second_fa_enabled: document.getElementById('user2FA').checked, 
    }) 

    xmlhttp = new XMLHttpRequest();
    
    xmlhttp.open("PUT", "http://127.0.0.1:5000/user/1", true);    
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('access_token')}`);  
    xmlhttp.onreadystatechange = function() {
        console.log(this.responseText); 
        // document.location.reload(true);           
    }; 
    xmlhttp.send(json);  
}

$(document).ready( function() {
    httpPost(); 
    $('#profileBtn').on('click', saveData);        
});