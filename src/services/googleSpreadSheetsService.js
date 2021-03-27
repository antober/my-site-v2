import dotenv from 'dotenv';
dotenv.config();

const { google } = require('googleapis');
const sheets = google.sheets('v4');
const Auth = google.auth.GoogleAuth;
const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
const scopes = ['https://www.googleapis.com/auth/spreadsheets'];

const getGoogleAuthToken = async () => {
  	const auth = new Auth({ scopes: scopes });

  	return await auth.getClient();
}

const getGoogleSpreadSheetValues = async ({spreadsheetId, auth, sheetName}) => {
    return await sheets.spreadsheets.values.get({
     	spreadsheetId,
      	auth,
      	range: sheetName
	});
}

const getSpreadSheetValues = async (sheetName) => {
    try {
        const auth = await getGoogleAuthToken();
        const response = await getGoogleSpreadSheetValues({
            spreadsheetId,
            sheetName: sheetName,
            auth
        });
        let result = JSON.stringify(response.data, null, 2);

        return new Promise((resolve, reject) => {resolve(result)});
    } catch(error) {
        console.log(error.message, error.stack);
    }
}

export {
    getGoogleAuthToken,
	getGoogleSpreadSheetValues,
	getSpreadSheetValues
}