if(localStorage.getItem('role')!=="Admin"){
        document.body.innerHTML = `<p>Not authorized</p>`
}