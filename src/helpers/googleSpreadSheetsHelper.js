import dotenv from "dotenv";
dotenv.config();

import { getAuthToken, getSpreadSheet, getSpreadSheetValues } from "../services/googleSpreadSheetsService";

const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
const sheetNameDeveloper = process.env.GOOGLE_SHEETNAME_DEVELOPER;
const sheetNameWorkplaces = process.env.GOOGLE_SHEETNAME_WORKPLACES;

const GetSpreadSheet = async () => {
try {
    const auth = await getAuthToken();
    const response = await getSpreadSheet({
        spreadsheetId,
        auth
    })
    let result = JSON.stringify(response.data, null, 2);
    let promise = new Promise((resolve, reject) => {
        resolve(result)
    });

    return promise;
    } catch(error) {
        console.log(error.message, error.stack);
    }
}

const GetSpreadSheetDeveloperValues = async () => {
try {
    const auth = await getAuthToken();
    const response = await getSpreadSheetValues({
        spreadsheetId,
        sheetName: sheetNameDeveloper,
        auth
    })
    let result = JSON.stringify(response.data, null, 2);
    let promise = new Promise((resolve, reject) => {
        resolve(result)
    });

    return promise;
    } catch(error) {
        console.log(error.message, error.stack);
    }
}

const GetSpreadSheetWorkplacesValues = async () => {
    try {
        const auth = await getAuthToken();
        const response = await getSpreadSheetValues({
            spreadsheetId,
            sheetName: sheetNameWorkplaces,
            auth
        })
        let result = JSON.stringify(response.data, null, 2);
        let promise = new Promise((resolve, reject) => {
            resolve(result)
        });
    
        return promise;
        } catch(error) {
            console.log(error.message, error.stack);
        }
    }

export default {
    GetSpreadSheet,
    GetSpreadSheetDeveloperValues,
    GetSpreadSheetWorkplacesValues,
}
