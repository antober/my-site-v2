import redis from 'redis';
import dotenv, { parse } from "dotenv";
import {
    convertToMultipleObjects,
    convertToObject,
    isLastIndex,
} from "../helpers/objectConverter";
import { toObject } from '../helpers/objectCreator';

dotenv.config();

let client
if(process.env.REDIS_URL){
    let parsedRedisUrl = parse(process.env.REDIS_URL)
    client = redis.createClient(parsedRedisUrl)
} else {
    client = redis.createClient()
}

const set = (key, value) => {
    client.set(key, JSON.stringify(value), 'EX', 10 * 1 * 1);
}

const get = (req, res, next) => {
    let key = req.route.path;

    client.get(key, (err, redisValue) => {
        if (err) next();
        if (redisValue !== null) {
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
        } else {
            next();
        }
    });
}

export {
    get,
    set
}