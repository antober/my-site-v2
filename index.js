import express from "express";
import bodyParser from "body-parser";
import exphbs from "express-handlebars";
import path from "path";

//TODO: use service
import googleSpreadSheetsHelper from './src/helpers/googleSpreadSheetsHelper';
import { stringify } from "querystring";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'src/public')));

app.set('views', path.join(__dirname, 'src/views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    Promise.all([googleSpreadSheetsHelper.GetSpreadSheetDeveloperValues(), googleSpreadSheetsHelper.GetSpreadSheetWorkplacesValues()])
        .then(result => 
                res.render('index', { 
                    firstNameProp: JSON.parse(result[0]).values[0][0],
                    firstNameVal: JSON.parse(result[0]).values[1][0],
                    lastNameProp: JSON.parse(result[0]).values[0][1],
                    lastNameVal: JSON.parse(result[0]).values[1][1],
                    emailProp: JSON.parse(result[0]).values[0][2],
                    emailVal: JSON.parse(result[0]).values[1][2],
                    githubProp: JSON.parse(result[0]).values[0][3],
                    githubVal: JSON.parse(result[0]).values[1][3],
                    linkedInProp: JSON.parse(result[0]).values[0][4],
                    linkedInVal: JSON.parse(result[0]).values[1][4],
                    companyNameProp: JSON.parse(result[1]).values[0][0],
                    companyNameval1: JSON.parse(result[1]).values[1][0],
                    companyNameval2: JSON.parse(result[1]).values[2][0],
                    roleProp: JSON.parse(result[1]).values[0][1],
                    roleVal1: JSON.parse(result[1]).values[1][1],
                    roleVal2: JSON.parse(result[1]).values[2][1],
                    timePeriodProp: JSON.parse(result[1]).values[0][2],
                    timePeriodVal1: JSON.parse(result[1]).values[1][2],
                    timePeriodVal2: JSON.parse(result[1]).values[2][2]
                }));
});

app.all('*', (req, res) => {
    res.status(404).send({
        status: 404
    });
});

app.listen(process.env.PORT || 5000);