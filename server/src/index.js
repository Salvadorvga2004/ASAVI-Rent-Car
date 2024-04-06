const cors = require('cors');
const express = require('express');
const app = express();

const raizR = require('./routes/index');
const UsuR = require('./routes/usuarios');
const AutR = require('./routes/modelos');
const EstaR = require('./routes/estados');
const CiuR   = require('./routes/ciudades');
const SucuR = require('./routes/sucursales');
const ClieR   = require('./routes/clientes');
const ResR   = require('./routes/reservas');
const AutoR   = require('./routes/autos');
const ExtR = require('./routes/extras');
const TAutR = require('./routes/tipoAuto');
const MarcaR = require('./routes/marcas');

app.set('port',process.env.PORT || 4000);
app.engine('html', require('ejs').renderFile);
app.set('view engine','ejs')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(raizR);
app.use('/api',UsuR);
app.use('/api',AutR);
app.use('/api',EstaR);
app.use('/api',CiuR);
app.use('/api',SucuR);
app.use('/api',ClieR);
app.use('/api',ResR);
app.use('/api',AutoR);
app.use('/api',ExtR);
app.use('/api',TAutR);
app.use('/api',MarcaR);


app.listen(app.get('port'),() => {
    console.log('server on port',app.get('port'));
});