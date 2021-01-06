// var url = "https://mongodb-signup.herokuapp.com"
var url = "http://localhost:3000"
function signup() {
    const Http = new XMLHttpRequest();
    Http.open("POST", url + "/signup");
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send(JSON.stringify({
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        phone: document.getElementById('phone').value,
        gender: document.getElementById('gender').value,
    }));
    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4) {
            let jsonRes = JSON.parse(Http.responseText)
            if (jsonRes.status === 200) {
                alert(jsonRes.message);
                location.href = "./login.html"
            }
            else{
                alert(jsonRes.message);
            }
        }
    }
    return false
}
function login() {
    const Http = new XMLHttpRequest();
    Http.open("POST", url + "/login");
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send(JSON.stringify({
        lemail: document.getElementById('lemail').value,
        lpassword: document.getElementById('lpassword').value,
    }));

    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4) {
            let jsonRes = JSON.parse(Http.responseText)
            if(jsonRes.status === 200){
                alert(jsonRes.message);
                localStorage.setItem("userToken",jsonRes.token)
                location.href = "./profile.html"
                getProfile();
            }
            else{
                alert(jsonRes.message);
            }
        }
    }
    return false
}

function getProfile(){
    var userToken = localStorage.getItem('userToken')
    const Http = new XMLHttpRequest();
    Http.open("POST", url + "/profile");
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send({
        userToken : userToken
    });  
    Http.onreadystatechange = (e) => {
        if(Http.readyState === 4){
            let jsonRes = JSON.parse(Http.responseText);
            document.getElementById('pName').innerHTML = jsonRes.name 
            location.href = "./profile.html"
        }
        else{
            location.href = "./login.html"

        }
    }
}