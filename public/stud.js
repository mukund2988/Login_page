const url = new URL(window.location.href);
const ls  = JSON.parse(localStorage.getItem("role"))

if(url.searchParams.get("email")!==ls.email || ls.role!=="Student")
{
 document.body.innerHTML = `<p>Not authorized</p>`
}

