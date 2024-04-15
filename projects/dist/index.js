"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://127.0.0.1:5500",
    methods: ["PUT", "GET"]
}));
app.get("/data", (req, res) => {
    res.json({ name: "sai", fav: "biryani" });
});
app.listen(3000);
//# sourceMappingURL=index.js.map