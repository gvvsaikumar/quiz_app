"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const router = express_1.default.Router();
// Connect to MongoDB
mongoose_1.default.connect('mongodb+srv://gvvsaikumar9010:saikumar@cluster0.zsaa96w.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
// Define Contact schema
const contactSchema = new mongoose_1.default.Schema({
    eid: Number,
    ename: String
});
// Define Contact model
const Contact = mongoose_1.default.model("Contact", contactSchema);
// Middleware to parse JSON
router.use(body_parser_1.default.json());
router.post("/", (req, res) => {
    const { eid, ename } = req.body;
    const contact = new Contact({
        eid,
        ename
    });
    contact.save()
        .then(() => res.send("cotact create succesfully"))
        .catch((err) => {
        console.error("Error creating contact:", err);
        res.status(500).send("Error creating contact");
    });
});
// GET route to fetch all contacts
router.get("/", (req, res) => {
    Contact.find()
        .then(contacts => res.json(contacts))
        .catch(() => res.status(500).send("Error fetching contacts"));
});
router.get("/:eid", (req, res) => {
    const eid = Number(req.params.eid);
    Contact.find({ eid })
        .then((contact) => {
        if (contact) {
            res.json(contact); // Return the contact as JSON
        }
        else {
            res.status(404).send("Contact not found");
        }
    })
        .catch(() => res.status(500).send("Error finding contact"));
});
router.delete("/:eid", (req, res) => {
    const eid = Number(req.params.eid);
    Contact.findOneAndDelete({ eid })
        .then((contact) => {
        if (contact) {
            res.send("contact delete succesfully");
        }
        else {
            res.status(404).send("contact not found");
        }
    })
        .catch(() => res.status(500).send("error finding contact"));
});
// PATCH route to update contact by ID
router.patch("/:eid", (req, res) => {
    const eid = Number(req.params.eid);
    const { ename } = req.body;
    Contact.findOneAndUpdate({ eid }, { ename }, { new: true })
        .then(() => res.send("Contact updated successfully"))
        .catch(() => res.status(500).send("Error updating contact"));
});
// PUT route to replace contact by ID
router.put("/:eid", (req, res) => {
    const eid = Number(req.params.eid);
    const { ename } = req.body;
    Contact.findOneAndReplace({ eid }, { ename }, { new: true, upsert: true })
        .then(() => res.send("Contact replaced successfully"))
        .catch(() => res.status(500).send("Error replacing contact"));
});
exports.default = router;
//# sourceMappingURL=mongoexp.js.map