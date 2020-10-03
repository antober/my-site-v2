import express from "express";
import bodyParser from "body-parser";
import exphbs from "express-handlebars";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'src/public')));

app.set('views', path.join(__dirname, 'src/views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');
 
app.get('/', (req, res) => {
    res.render('index');
});

app.all('*', (req, res) => {
    res.status(404).send({
        status: 404
    });
});

app.listen(process.env.PORT || 5000);