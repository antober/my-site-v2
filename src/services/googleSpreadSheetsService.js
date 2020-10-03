const { google } = require('googleapis');
const sheets = google.sheets('v4');
const Auth = google.auth.GoogleAuth;

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

async function getAuthToken() {
  const auth = new Auth({
    scopes: SCOPES
  });
  const authToken = await auth.getClient();
  return authToken;
}

async function getSpreadSheet({spreadsheetId, auth}) {
    const res = await sheets.spreadsheets.get({
      spreadsheetId,
      auth,
    });
    return res;
  }
  
  async function getSpreadSheetValues({spreadsheetId, auth, sheetName}) {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      auth,
      range: sheetName
    });
    return res;
  }
  
  
  module.exports = {
    getAuthToken,
    getSpreadSheet,
    getSpreadSheetValues
  }