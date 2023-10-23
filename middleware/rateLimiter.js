import { createClient } from 'redis';
import dotenv from "dotenv";

dotenv.config();
const Redis = createClient({
    password: process.env.redisPass,
    socket: {
        host: process.env.redisHost,
        port: process.env.redisPost,
    }
})
Redis.on('error', err => console.log('Redis Client Error', err))
.connect();

export const ipLimit = async (req, res, next)=>{
    try {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const requests = await Redis.incr(ip);
        console.log("ip is ",ip);
        let ttl;
        if(requests === 1){
            ttl = await Redis.expire(ip, 60);
        }
        if(requests>10){
        ttl = await Redis.ttl(ip);
        return  res.status(400).json({"stats" : "ok", "limit" : "Max Api rate Limit hit","Api Calls":requests,"WaitTime":ttl,"Message":"Wait for dool down preiod"})
        }
        next()
    } catch (error) {
        console.log(error.Message)
        return res.status(500).json({"stat":"Ok","error":"","Verified":"false","Message":"Internal Server Problem"});
    }
}
