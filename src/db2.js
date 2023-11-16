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
            const email = await db.promise().query("select email,pswd from admin where email=?", [data.email]);
            if (email[0].length == 0) {
                await db.promise().query("insert into admin values(?,?,?)", [data.name, data.email, data.password]);
                return 202;
            }
            else
                return false
            //TODO: ui update & reject promise

        }
        else if (data.role === "Student") {
            const email = await db.promise().query("select email,pswd from students where email=?", [data.email]);
            if (email[0].length == 0) {
                await db.promise().query("insert into students values(?,?,?,?)", [0, data.name, data.email, data.password]);
                return 201
            }
            else
                return false;
            //TODO: ui update
        }
    }
    catch (err) {
        console.log(err);
    }
}


export async function authUser(data) {
    try {
        if (data.role === "Admin") {
            const auth = await db.promise().query("select email,pswd from admin where email=? and pswd=?", [data.email, data.password]);
            if (auth[0].length == 0)
                return false
            else
                return 202

            {
                //TODO: ui update & reject promise
            }
        }
        else if (data.role === "Student") {
            const auth = await db.promise().query("select email,pswd from students where email=? and pswd=?", [data.email, data.password]);
            if (auth[0].length == 0)
                return false
            else {

                return 201;
            }


        }
    }
    catch (err) {
        console.log(err);
    }
}

export async function showStudents(){
    const studs= await db.promise().query("select sid,name from students");
    return studs[0];
}