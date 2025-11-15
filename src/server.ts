import express, { urlencoded } from 'express';
import cors from 'cors';
import router from './routes/mainRoutes';
import { errorHandler } from './middlewares/errorHandler';

const server = express();

server.use(cors());
server.use(express.json());
server.use(urlencoded({extended:true}));
server.use(express.static('public'));

server.use('/',router);

server.use(errorHandler);
server.listen(3000,()=>{
    console.log("SERVIDOR INICIADO!!!"); 
});