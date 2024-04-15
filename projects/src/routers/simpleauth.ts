import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const KEY = process.env.SECRET_KEY || "5100";
const posts = [
    {
        username: "saikumar",
        password: "sai123"
    },
    {
        username: "sai",
        password: "sai1"
    }
];

router.post("/loginup", (req, res) => {
    const username = req.body.username;
    const user = { name: username };
    const accessToken = jwt.sign(user, KEY);
    res.json({ accessToken: accessToken });
});

router.get("/posts", authenticationToken, (req, res) => {
    res.json(posts.filter(post => post.username === (req as any).user.name));
});

function authenticationToken(req: Request, res: Response, next: any) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        (req as any).user = user;
        next();
    });
}

export default router;
