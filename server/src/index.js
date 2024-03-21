const cors = require('cors');
const express = require('express');
const app = express();

const raizR = require('./routes/index');
const usuR = require('./routes/usuarios');
const AutR = require('./routes/autos');
const EstaR = require('./routes/estados');


app.set('port',process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.set('view engine','ejs')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(raizR);
app.use('/api',usuR);
app.use('/api',AutR);
app.use('/api',EstaR);

app.listen(app.get('port'),() => {
    console.log('server on port',app.get('port'));
});