const url = "/";
document.getElementById("login-toggle").addEventListener("click", function () {
    document.getElementById("login-form").style.display = "flex";
    document.getElementById("signup-form").style.display = "none";
    this.classList.add("active");
    document.getElementById("signup-toggle").classList.remove("active");
});

document.getElementById("signup-toggle").addEventListener("click", function () {
    document.getElementById("signup-form").style.display = "flex";
    document.getElementById("login-form").style.display = "none";
    this.classList.add("active");
    document.getElementById("login-toggle").classList.remove("active");
});


document.getElementById("signup-submit").addEventListener("click", function (e) {
    e.preventDefault()
    const data = {
        role: document.getElementById("user_type").value,
        name: document.getElementById("signup-username").value,
        email: document.getElementById("signup-email").value,
        password: document.getElementById("signup-password").value,
    };
    postData(url, data)

})

document.getElementById("login-submit").addEventListener("click", function (e) {
    e.preventDefault()
    const data = {
        auth:"login",
        role: document.getElementById("user_type").value,
        email: document.getElementById("signup-email").value,
        password: document.getElementById("signup-password").value,
    };
    console.log(data);
    authData(url, data)

})


async function postData(url, data) {
    // Default options are marked with *
    await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    }).then((res)=>{
        console.log(res);
        if(res.status===200){   
           window.location.href="http://localhost:4500/admin";
        }
        else{
            console.log("Error");
            document.getElementById('error').innerHTML='Exists'
        }
    })
    localStorage.setItem("role",data.role);
    return  // parses JSON response into native JavaScript objects
}

async function authData(url, data) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    }).then((res)=>{
        console.log(res);
        if(res.status===200){   
           window.location.href="http://localhost:4500/admin";
        }
        else{
            console.log("Error");
            document.getElementById('error').innerHTML='Wrong'
        }
    })
  // parses JSON response into native JavaScript objects
}
