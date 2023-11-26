import express from 'express';
import { registerUser, authUser,showStudents,getAttendance,updateAttendance } from './src/db2.js';
import path from 'node:path';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 4500;


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render("index")
})



app.get('/admin', async(req, res, next) => {
    const response = await showStudents();
    
    res.render("admin",{students:response})
        


})

app.post('/admin', async (req, res) => {
    
    if(req.headers.auth==="admin")
    {
        updateAttendance(req.body)
    }
  
   // const response = await showStudents();
   
    
})
app.get('/student', async(req, res) => {
    const attendance = await getAttendance(decodeURIComponent(req.query?.email));
    
    res.render('stud',{attendance:attendance});
});


app.post('/', async (req, res) => {

    try {
        if (req.body.auth) {
            const response = await authUser(req.body);
            if (!response) {
                res.sendStatus(405)
            }
            else if (response === 201)
                res.sendStatus(201)
            else {
                res.sendStatus(202)
            }
        }

        else {
            const response = await registerUser(req.body);
            if (!response) {
                res.sendStatus(400)
            }
            else if (response === 201)
                res.sendStatus(201)
            else {
                res.sendStatus(203)
            }
        }
    }
    catch (e) {
        console.log(e);
    }
})





app.listen(PORT, () => {
    console.log(`Server running on port http:localhost:${PORT}`);
})