import express from "express";
import bodyParser from "body-parser";
import exphbs from "express-handlebars";
import path from "path";

//TODO: use service
import googleSpreadSheetsHelper from './src/helpers/googleSpreadSheetsHelper';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'src/public')));

app.set('views', path.join(__dirname, 'src/views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    googleSpreadSheetsHelper.GetSpreadSheetDeveloperValues().then(result =>
        res.render('index', { 
            firstNameProp: JSON.parse(result).values[0][0],
            firstNameVal: JSON.parse(result).values[1][0],
            lastNameProp: JSON.parse(result).values[0][1],
            lastNameVal: JSON.parse(result).values[1][1],
            emailProp: JSON.parse(result).values[0][2],
            emailVal: JSON.parse(result).values[1][2],
            githubProp: JSON.parse(result).values[0][3],
            githubVal: JSON.parse(result).values[1][3],
            linkedInProp: JSON.parse(result).values[0][4],
            linkedInVal: JSON.parse(result).values[1][4]
        }))
});

app.all('*', (req, res) => {
    res.status(404).send({
        status: 404
    });
});

app.listen(process.env.PORT || 5000);