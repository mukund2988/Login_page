import mysql from "mysql2"
import dotenv from "dotenv"
import { noOfClasses } from "../data.js";
//dotenv.config()

const db = mysql.createConnection({
    host: process.env.HOST || "localhost",
    port: process.env.SQL_PORT || 3308,
    user: process.env.USER || "admin",
    password: process.env.PASSWORD || "1234",
    database: process.env.DATABASE || "att",
});

db.connect((err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Connected to MySQL");
    }
});

export async function registerUser(data) {
    try {
        if (data.role === "Admin") {
            const email = await db.promise().query("select email,pswd from admin where email=?", [data.email]);
            if (email[0].length == 0) { 	//checks if the user already exixts.
                await db.promise().query("insert into admin values(?,?,?)", [data.name, data.email, data.password]);

                return 202;
            }
            else
                return false


        }
        else if (data.role === "Student") {
            const email = await db.promise().query("select email,pswd from students where email=?", [data.email]);
            if (email[0].length == 0) {
                await db.promise().query("insert into students values(?,?,?,?,?)", [0, data.name, data.email, data.password, 0]);
                await db.promise().query("insert into subject_att values(?,?,?,?,?,?)", [0, 0, 0, 0, 0, 0]);
                return 201
            }
            else
                return false;

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

export async function showStudents() {
    const sql = "SELECT students.sid,students.name,students.attendance,subject_att.ML,subject_att.OOSD,subject_att.DBMS,subject_att.DAA,subject_att.WT FROM students INNER JOIN subject_att on students.sid = subject_att.sid;"

    const studs = await db.promise().query("select sid,name,attendance from students");
    const sub_att = await db.promise().query(sql)

    return [studs[0], sub_att[0]];
}

export async function getAttendance(email) {
    const attendance = await db.promise().query("select name,attendance from students where email=?", [email]);
    const subj_att = await db.promise().query("select ML,OOSD,DBMS,DAA,WT from subject_att where sid in(select sid from students where email=?)", [email]);
    return [attendance[0], subj_att[0]];
}

export async function updateAttendance(data) {
    let id = 1
    for (let i = 0; i <= data.length; i = i + 5) {
        if (data[i] == 0 && data[i + 1] == 0 && data[i + 2] == 0 && data[i + 3] && data[i + 4] == 0)
            break
        await db.promise().query(`update subject_att set ML=ML+${data[i]}, OOSD=OOSD+${data[i + 1]}, DBMS=DBMS+${data[i + 2]}, DAA=DAA+${data[i + 3]}, WT=WT+${data[i + 4]} where sid=?`, [id]);
        id++;

        if (id > data.length / 5)
            break;
    }
    id = 0
    updateAttendancePercenrage()
}

async function updateAttendancePercenrage() {
    let attendancePercenrage;
    let totalAttentedClasses;

    const noOfAttentedClasses = await db.promise().query("SELECT SID,ML,OOSD,DBMS,DAA,WT FROM subject_att")
    for (let i = 0; i < noOfAttentedClasses[0].length; i++) {
        totalAttentedClasses = noOfAttentedClasses[0][i].ML + noOfAttentedClasses[0][i].OOSD + noOfAttentedClasses[0][i].DBMS + noOfAttentedClasses[0][i].DAA + noOfAttentedClasses[0][i].WT
        
        attendancePercenrage = (totalAttentedClasses / (noOfClasses.total_classes+5)) * 100

        if(i==noOfAttentedClasses[0].length)
            await db.promise().query(`UPDATE students set attendance=${attendancePercenrage} WHERE SID = ?`,[i]);
        else
            await db.promise().query(`UPDATE students set attendance=${attendancePercenrage} WHERE SID = ?`,[i+1]);
    }
}