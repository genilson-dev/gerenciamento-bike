import 'dotenv/config';
import { config } from 'dotenv';
config({ path: './config.env' });
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { router } from './routes/routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
const PORT = process.env.PORT || 3001;

const erro = 'Error interno do servidor';

// Middleware de tratamento de erros
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        });
    }
    
    return res.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));