import express from "express";
import cors from "cors";
import { hello } from "models";

const app = express();

app.use(cors({
    credentials: true,
    origin: true,
}));

app.get('/hello', (req, res) => {
    res.json({
        hello: hello(req.query.name?.toString() || '%defaultName%'),
    });
});

app.listen(process.env.PORT || 8080);