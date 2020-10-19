import express from "express";
import bodyParser from "body-parser";
import exphbs from "express-handlebars";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

import { getSpreadSheetValues } from "./src/services/googleSpreadSheetsService";
import {
    convertToMultipleObjects,
    convertToObject,
    isLastIndex,
} from "./src/helpers/objectConverter";

const app = express();
const sheetNameDeveloper = process.env.GOOGLE_SHEETNAME_DEVELOPER;
const sheetNameWorkplaces = process.env.GOOGLE_SHEETNAME_WORKPLACES;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "src/public")));

app.set("views", path.join(__dirname, "src/views"));
app.engine("handlebars", exphbs({ defaultLayout: "layout" }));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
    Promise.all([
        getSpreadSheetValues(sheetNameDeveloper),
        getSpreadSheetValues(sheetNameWorkplaces),
    ]).then((result) => {
        const context = {
            developerContextProps: Object.assign(
                ...JSON.parse(result[0]).values[0].map((k, i) => ({
                    [k]: JSON.parse(result[0]).values[0][i],
                }))
            ),
            developerContextVals: Object.assign(
                ...JSON.parse(result[0]).values[0].map((k, i) => ({
                    [k]: JSON.parse(result[0]).values[1][i],
                }))
            ),
            developerContext: convertToObject(result),
            workplaceContext: convertToMultipleObjects(result),
            isLastIndex: isLastIndex(result)
        };

        res.render("index", context);
    });
});

app.all("*", (req, res) => {
    res.status(404).send({
        status: 404,
    });
});

app.listen(process.env.PORT || 5000);
