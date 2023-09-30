document.getElementById("login-toggle").addEventListener("click", function() {
    document.getElementById("login-form").style.display = "flex";
    document.getElementById("signup-form").style.display = "none";
    this.classList.add("active");
    document.getElementById("signup-toggle").classList.remove("active");
});

document.getElementById("signup-toggle").addEventListener("click", function() {
    document.getElementById("signup-form").style.display = "flex";
    document.getElementById("login-form").style.display = "none";
    this.classList.add("active");
    document.getElementById("login-toggle").classList.remove("active");
});
