import express from "express";
import bodyParser from "body-parser";
import exphbs from "express-handlebars";
import path from "path";
import dotenv from "dotenv";

import { toObject } from './src/helpers/objectCreator';
import { get, set } from './src/redis/redisClient';

import { getSpreadSheetValues } from "./src/services/googleSpreadSheetsService";
import { convertToMultipleObjects, convertToObject, isLastIndex, } from "./src/helpers/objectConverter";

dotenv.config();
const sheetNameDeveloper = process.env.GOOGLE_SHEETNAME_DEVELOPER;
const sheetNameWorkplaces = process.env.GOOGLE_SHEETNAME_WORKPLACES;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "src/public")));

app.set("views", path.join(__dirname, "src/Views"));
app.engine("handlebars", exphbs({ defaultLayout: "layout" }));
app.set("view engine", "handlebars");

app.get("/", async (req, res) => {
    Promise.all([
        getSpreadSheetValues(sheetNameDeveloper),
        getSpreadSheetValues(sheetNameWorkplaces),
    ]).then((result) => {
        const resultValues = JSON.parse(result[0]).values
        const context = {
            developerContextProps: toObject(resultValues, 0),
            developerContextVals: toObject(resultValues, 1),
            developerContext: convertToObject(result),
            workplaceContext: convertToMultipleObjects(result),
            isLastIndex: isLastIndex(result),
        };

        res.render("index", context);
    });
});

app.get("/redis", get, (req, res) => {
    Promise.all([
        getSpreadSheetValues(sheetNameDeveloper),
        getSpreadSheetValues(sheetNameWorkplaces),
    ]).then((redisValue) => {
        try {
            const parsedRedisValue = JSON.parse(redisValue)
            const redisResultValues = JSON.parse(Object(parsedRedisValue)[0]).values
            const devContext = convertToObject(JSON.parse(redisValue))
            const workContext = convertToMultipleObjects(JSON.parse(redisValue))
            const context = {
                developerContextProps: toObject(redisResultValues, 0),
                developerContextVals: toObject(redisResultValues, 1),
                developerContext: devContext,
                workplaceContext: workContext,
                isLastIndex: isLastIndex(workContext),
            };

            res.render("index", context);
        } catch (error) {
            set(req.route.path, redisValue);
            res.redirect('/redis')
        }
    })
    .catch(error => {
        console.error(error);
        res.render("500");
    });
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'src/public', 'index.html'));
});

app.all("*", (req, res) => {
    res.render("404")
});

app.listen(process.env.PORT || 5000);
