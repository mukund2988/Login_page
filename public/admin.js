if (localStorage.getItem('role') !== "Admin") {
    document.body.innerHTML = `<p>Not authorized</p>`
}

const url = "/admin"

let attendance = []
const checkbox = document.querySelectorAll('.is_present')
const submit_btn = document.getElementById('submit-btn');
const save_btn = document.getElementById('save-btn');
const reset_btn = document.getElementById('reset-btn');

for (let i = 0; i < checkbox.length; i++) {
    attendance.push(checkbox[i].checked);
}
submit_btn.addEventListener('click', postData)
save_btn.addEventListener('click', () => {
    save_btn.disabled = true;
    submit_btn.disabled = false
    for (let i = 0; i < attendance.length; i++) {
        if (checkbox[i].checked === true) {
            attendance[i] = 1
        }
        else
            attendance[i] = 0;
    }
})

reset_btn.addEventListener("click", reset_att)
function reset_att() {

    for (let i = 0; i < attendance.length; i++) {
        checkbox[i].checked = false;
        save_btn.disabled = false;
        submit_btn.disabled = true
    }
}

async function postData(e) {
    e.preventDefault();
    submit_btn.disabled = true
    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth": "admin"
        },
        body: JSON.stringify(attendance),
    })
    setTimeout(() => {
        submit_btn.disabled = false
        reset_att()
    }, 3000)
}