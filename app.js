import express from 'express';
import favicon from 'static-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import routes from './routes/index'
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes'
import usersRoutes from './routes/usersRoutes'
import cors from 'cors';
import dotenv from 'dotenv'
import { Server } from "socket.io";
import groupRoutes from "./routes/groupRoutes";
import passport from 'passport';

dotenv.config()
const app = express();

app.use(passport.initialize());
require('./passport')(passport);

app.use(cors())
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use('/', routes);
app.use('/auth', authRoutes)
app.use('/groups', groupRoutes)
app.use('/users',  usersRoutes)

const port = process.env.PORT;
const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;


mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database is connected') ,
        err => console.log('Can not connect to the database'+ err)
    );

const server = app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
});

const io = new Server(server);

export default app;
