import express, { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const sessions: { [key: string]: { username: string, userId: number } } = {};

const router = express.Router();

router.use(express.json());

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'REST API Docs',
            version: '1.0.0'
        },
        servers: [
            {
                url: `http://localhost:5400/`
            }
        ] as { url: string }[]
    },
    apis: ["./src/routers/corsproject.ts"],
};

const swaggerSpec = swaggerJsdoc(options);


router.use('/app-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticate user and generate session ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    
    if (username !== 'admin' || password !== 'admin') {
        res.status(401).send("Invalid username or password");
    }
    
    const sessionId = uuidv4();
    sessions[sessionId] = { username, userId: 1 }; 
   
    res.cookie('session', sessionId);
    res.send('Success');
});

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: User logout
 *     description: Clear user session
 *     responses:
 *       200:
 *         description: Successful logout
 */
router.post('/logout', (req: Request, res: Response) => {
    
    const sessionId = req.headers.cookie?.split('=')[1];
    if (sessionId) {
        delete sessions[sessionId]; 
    }
    
    res.set('Set-Cookie', `session=null; Max-Age=0`);
    res.send("Success");
});

/**
 * @swagger
 * /todo:
 *   get:
 *     summary: Get todo list
 *     description: Retrieve todo list for authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Todo list retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/todo', (req: Request, res: Response) => {
    const sessionId = req.headers.cookie?.split('=')[1];
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


export default router;
