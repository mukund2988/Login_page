import express from 'express';
import { registerUser,authUser } from './src/db2.js';
import path from 'node:path';
import { fileURLToPath } from 'url';


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static('public'));



app.post('/', async (req, res) => {

    try {
        if (req.body.auth) {
            const response = await authUser(req.body);
            console.log(response);
            if (response) {
                res.json({ message: "Login Success" });

            }
            else {
                //res.sendStatus(400)
                res.json({ message: "Login" });

            }
        }

        else{
            const response = await registerUser(req.body);
            console.log(response);
            if (response) {
                res.json({ message: "Success" });

            }
            else {
                //res.sendStatus(400)
                res.json({ message: "Exists" });

            }
        }
    }
    catch (e) {
        console.log(e);
    }
})



app.get('/admin', (req, res) => {
    res.render('admin');
})

app.get('/student', (req, res) => {
    res.render('stud');
});


app.listen(4500, () => {
    console.log("Server running on port 4500");
})