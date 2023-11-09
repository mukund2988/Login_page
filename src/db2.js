import mysql from "mysql2"

const db = mysql.createConnection({
    host: "localhost",
    port: 3308,
    user: "admin",
    password: "1234",
    database: "att",
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to MySQL");
    }
});

export async function registerUser(data) {
    try {
        if (data.role === "Admin") {
            const email = await db.promise().query("select email from admin");
            if (!email[0].some(e => e.email === data.email)) {
                await db.promise().query("insert into admin values(?,?,?)", [data.name, data.email, data.password]);
                return true;
            }
            else {
                console.log("Admin Email already exists");
                return false
                //TODO: ui update & reject promise
            }
        }
        else if (data.role === "Student") {
            const email = await db.promise().query("select email from students");
            if (!email[0].some(e => e.email === data.email)) {
                await db.promise().query("insert into students values(?,?,?,?)", [0, data.name, data.email, data.password]);
                return true
            }
            else {
                console.log("Email already exists");
                return false;
                //TODO: ui update
            }
        }
    }
    catch (err) {
        console.log(err);
    }
}


export async function authUser(data){
    return true
}