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
            else {
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
            if (jsonRes.status === 200) {
                alert(jsonRes.message);
                localStorage.setItem('userToken', JSON.stringify(jsonRes.token))
                location.href = "./profile.html"
            }
            else {
                alert(jsonRes.message);
            }
        }
    }
    return false
}

function getProfile() {
    let userToken = JSON.parse(localStorage.getItem('userToken'))
    const Http = new XMLHttpRequest();
    Http.open("GET", "http://localhost:3000/profile");
    Http.setRequestHeader("Authentication", `Bearer ${userToken}`);
    Http.send();
    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4) {
            var jsonRes = JSON.parse(Http.responseText);
            if(jsonRes.status === 200) {
                document.getElementById('pName').innerText = jsonRes.profile.name
                document.getElementById('pEmail').innerText = jsonRes.profile.email
                document.getElementById('pPhone').innerText = jsonRes.profile.phone
                document.getElementById('pGender').innerText = jsonRes.profile.gender     
            }else{
                location.href = "./login.html"
            }
        }
    }
    return false
}
function logout(){  
    localStorage.removeItem('userToken')
    href.location = "./login.html"
}