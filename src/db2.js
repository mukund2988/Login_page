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
    const sql="SELECT students.sid AS sid,students.name AS name,students.attendance AS attendance,subject_att.ML AS ML,subject_att.OOSD AS OOSD,subject_att.DBMS AS DBMS,subject_att.DAA AS DAA,subject_att.WT AS WT FROM students INNER JOIN subject_att on students.sid = subject_att.sid;"

    const studs= await db.promise().query("select sid,name,attendance from students");
    const sub_att= await db.promise().query(sql)
    
    return [studs[0],sub_att[0]];
}

export async function getAttendance(email) {
    const attendance = await db.promise().query("select name,attendance from students where email=?", [email]);
    
    


    const subj_att = await db.promise().query("select ML,OOSD,DBMS,DAA,WT from subject_att where sid in(select sid from students where email=?)", [email]);
    return [attendance[0],subj_att[0]];
}

export async function updateAttendance(data){
    console.log(data);
}