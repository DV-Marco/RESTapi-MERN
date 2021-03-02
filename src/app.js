const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { mongoose } = require('./database')
const taskRouter = require('./routes/task.router');

const app = express();

//Configs
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//staticfiles
app.use(express.static(path.join(`${__dirname}/public/`)))

//Routes
app.use('/api/task', taskRouter);

//Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server i port: ${app.get('port')}`)
})