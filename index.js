import express from "express";
import bodyParser from "body-parser";
import exphbs from "express-handlebars";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

import { getAuthToken, getSpreadSheet, getSpreadSheetValues } from "./src/services/googleSpreadSheetsService";

const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
const sheetNameDeveloper = process.env.GOOGLE_SHEETNAME_DEVELOPER;
const sheetNameWorkplaces = process.env.GOOGLE_SHEETNAME_WORKPLACES;

async function testGetSpreadSheet() {
try {
    const auth = await getAuthToken();
    const response = await getSpreadSheet({
        spreadsheetId,
        auth
    })
        console.log('output for getSpreadSheet', JSON.stringify(response.data, null, 2));
    } catch(error) {
        console.log(error.message, error.stack);
    }
}

async function testGetSpreadSheetDeveloperValues() {
try {
    const auth = await getAuthToken();
    const response = await getSpreadSheetValues({
        spreadsheetId,
        sheetName: sheetNameDeveloper,
        auth
    })
        console.log('output for getSpreadSheetDeveloperValues', JSON.stringify(response.data, null, 2));
    } catch(error) {
        console.log(error.message, error.stack);
    }
}

async function testGetSpreadSheetWorkplacesValues() {
    try {
        const auth = await getAuthToken();
        const response = await getSpreadSheetValues({
            spreadsheetId,
            sheetName: sheetNameWorkplaces,
            auth
        })
            console.log('output for getSpreadSheetWorkplacesValues', JSON.stringify(response.data, null, 2));
        } catch(error) {
            console.log(error.message, error.stack);
        }
    }

function main() {
testGetSpreadSheet();
testGetSpreadSheetDeveloperValues();
testGetSpreadSheetWorkplacesValues();
}

main()

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