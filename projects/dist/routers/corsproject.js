"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const sessions = {};
const router = express_1.default.Router();
router.use(express_1.default.json());
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username !== 'admin' || password !== 'admin') {
        res.status(401).send("Invalid username or password");
    }
    const sessionId = (0, uuid_1.v4)();
    sessions[sessionId] = { username, userId: 1 };
    res.cookie('session', sessionId);
    res.send('Success');
});
router.post('/logout', (req, res) => {
    var _a;
    const sessionId = (_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split('=')[1];
    if (sessionId) {
        delete sessions[sessionId];
    }
    res.set('Set-Cookie', `session=null; Max-Age=0`);
    res.send("Success");
});
router.get('/todo', (req, res) => {
    var _a;
    const sessionId = (_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split('=')[1];
    const userSession = sessionId ? sessions[sessionId] : undefined;
    if (!userSession) {
        return res.status(401).send('Invalid session');
    }
    const userId = userSession.userId;
    res.send([{
            id: 1,
            title: 'learn Node',
            userId,
        }]);
});
exports.default = router;
//# sourceMappingURL=corsproject.js.map