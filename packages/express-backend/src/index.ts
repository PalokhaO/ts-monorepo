import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    credentials: true,
    origin: true,
}));

app.get('/hello', (req, res) => {
    res.json({
        hello: 'world'
    });
});

app.listen(process.env.PORT || 8080);