const cors = require('cors');
const express = require('express');
const app = express();

const raizR = require('./routes/index');
const usuR = require('./routes/usuarios');

app.set('port',process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.set('view engine','ejs')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(raizR);
app.use('/api',usuR);

app.listen(app.get('port'),() => {
    console.log('server on port',app.get('port'));
});