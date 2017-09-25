import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import auth from './routes/auth'
import dotenv from 'dotenv'
import Promise from 'bluebird'

dotenv.config();
const app = express();
app.use(bodyParser.json());

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL, function (err, res) {
    if(err){
        console.log('DB Connection Failed:' + err);
    }
    else{
        console.log('DB Connection Success: ');
    }
});

app.use('/api/auth', auth);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8080, ()=> console.log('Running on 8080 '));