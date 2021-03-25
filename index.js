import express from "express";
import bodyParser from "body-parser";
import exphbs from "express-handlebars";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
import redis from 'redis';
const client = redis.createClient(6379);

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

const set = (key, value) => {
    client.set(key, JSON.stringify(value), 'EX', 10 * 1 * 1);
}

const get = (req, res, next) => {
    let key = req.route.path;

    client.get(key, (error, redisValue) => {
        if (error) {
            res.status(400).send(err);
        }
        if (redisValue !== null) {
            console.log("redisValue set")
            const context = {
                developerContextProps: Object.assign(
                    ...JSON.parse(Object(JSON.parse(redisValue))[0]).values[0].map((k, i) => ({
                        [k]: JSON.parse(Object(JSON.parse(redisValue))[0]).values[0][i],
                    }))
                ),
                developerContextVals: Object.assign(
                    ...JSON.parse(Object(JSON.parse(redisValue))[0]).values[0].map((k, i) => ({
                        [k]: JSON.parse(Object(JSON.parse(redisValue))[0]).values[1][i],
                    }))
                ),
                developerContext: convertToObject(JSON.parse(redisValue)),
                workplaceContext: convertToMultipleObjects(JSON.parse(redisValue)),
                isLastIndex: isLastIndex(JSON.parse(redisValue)),
            };
            res.render("index", context);
        } else {
            next();
        }
    });
}

app.get("/redis", get, (req, res) => {
    Promise.all([
        getSpreadSheetValues(sheetNameDeveloper),
        getSpreadSheetValues(sheetNameWorkplaces),
    ]).then((redisValue) => {
        try {
            const context = {
                developerContextProps: Object.assign(
                    ...JSON.parse(Object(JSON.parse(redisValue))[0])?.values[0]?.map((k, i) => ({
                        [k]: JSON.parse(Object(JSON.parse(redisValue))[0]).values[0][i],
                    }))
                ),
                developerContextVals: Object.assign(
                    ...JSON.parse(Object(JSON.parse(redisValue))[0])?.values[0]?.map((k, i) => ({
                        [k]: JSON.parse(Object(JSON.parse(redisValue))[0]).values[1][i],
                    }))
                ),
                developerContext: convertToObject(JSON.parse(redisValue)),
                workplaceContext: convertToMultipleObjects(JSON.parse(redisValue)),
                isLastIndex: isLastIndex(JSON.parse(redisValue)),
            };
            res.render("index", context);

        } catch (error) {
            console.log("redisValue not set")
            set(req.route.path, redisValue, 'EX', 10 * 1 * 1);
            res.redirect('/redis')
        }
    })
    .catch(error => {
        console.error(error);
        res.status(400).send(error);
    });
});

app.get("/", async (req, res) => {
    Promise.all([
        getSpreadSheetValues(sheetNameDeveloper),
        getSpreadSheetValues(sheetNameWorkplaces),
    ]).then((result) => {
        const context = {
            developerContextProps: Object.assign(
                ...JSON.parse(result[0])?.values[0].map((k, i) => ({
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
            isLastIndex: isLastIndex(result),
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
