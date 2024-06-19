import express, { Request, Response } from 'express';
import { UserModel } from './schema';

const router = express.Router();

router.post("/user", async (req: Request, res: Response) => {
    try {
        const { id, name, age } = req.body;
        const user = new UserModel(id, name, age);
        await user.save();
        res.status(201).send("User created successfully");
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user: " + error); 
    }
});

router.get("/users", async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Error fetching users: " + error);
    }
});

export default router;
