import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose, { get } from 'mongoose';


const router = express.Router();
async function connectToMongoDB() {
  try {
      await mongoose.connect('mongodb+srv://gvvsaikumar9010:saikumar@cluster0.zsaa96w.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0');
      console.log('MongoDB connected');
  } catch (error) {
      console.error('MongoDB connection error:', error);
  }
}

connectToMongoDB();

const contactSchema = new mongoose.Schema({
  eid: Number,
  ename: String
});

const Contact = mongoose.model("Contact", contactSchema);
router.use(bodyParser.json());

router.post("/contact", async (req: Request, res: Response) => {
  try {
      const { eid, ename } = req.body;
      const contact = new Contact({
          eid,
          ename
      });
      await contact.save();
      res.status(201).send("Contact created successfully");
  } catch (error) {
      console.error("Error creating contact:", error);
      res.status(500).send("Error creating contact");
  }
});

router.get("/contact", (req: Request, res: Response) => {
  Contact.find()
    .then(contacts => res.json(contacts))
    .catch(() => res.status(500).send("Error fetching contacts"));
});

router.get("/contact/:eid",(req,res)=>{
  const eid = Number(req.params.eid);
  Contact.find({eid})
  .then((contact) => {
    if (contact) {
      res.json(contact); 
    } else {
      res.status(404).send("Contact not found");
    }
  })
  .catch(() => res.status(500).send("Error finding contact"));
});
router.delete("/contact/:eid",(req,res)=>{
  const eid = Number(req.params.eid);
  Contact.findOneAndDelete({eid})
  .then((contact)=>{
    if(contact)
    {
      res.send("contact delete succesfully");
    }
    else{
      res.status(404).send("contact not found");
    }
    })
    .catch(()=>res.status(500).send("error finding contact"))
})

router.patch("/contact/:eid", (req: Request, res: Response) => {
  const eid = Number(req.params.eid);
  const { ename } = req.body;
  Contact.findOneAndUpdate({ eid }, { ename }, { new: true })
    .then(() => res.send("Contact updated successfully"))
    .catch(() => res.status(500).send("Error updating contact"));
});

router.put("/contact/:eid", (req: Request, res: Response) => {
  const eid =Number(req.params.eid);
  const { ename } = req.body;
  Contact.findOneAndReplace({ eid }, { ename }, { new: true, upsert: true })
    .then(() => res.send("Contact replaced successfully"))
    .catch(() => res.status(500).send("Error replacing contact"));
});


export default router;