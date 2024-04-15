"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const router = express_1.default.Router();
const SECRET_KEY = '33e6e605b32c355e6ece025124d46b1b13b0a89139964304d1f9dd1625a8162348a23e3646e4d1f3bff93d05ede7e38b6bd29e3d016b3f8d0d41701ddf1d648d';
dotenv_1.default.config();
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
router.use(express_1.default.json());
router.get("/posts", authenticationToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name));
});
router.post("/loginup", (req, res) => {
    const username = req.body.username;
    const user = { name: username };
    const accesToken = jsonwebtoken_1.default.sign(user, SECRET_KEY);
    res.json({ accesToken: accesToken });
});
function authenticationToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, user) => {
        if (err)
            return res.sendStatus(403);
        req.user = user;
        next();
    });
}
exports.default = router;
//# sourceMappingURL=simpleauth.js.map