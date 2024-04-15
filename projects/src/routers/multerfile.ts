import express, { Request, Response } from 'express';
import multer from 'multer';

const router = express.Router();
router.use(express.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/routers/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
    }
});

const upload = multer({ storage: storage });
router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
    console.log('File Uploaded:', req.file);
    res.send('File Uploaded Successfully');
});
export default router;
