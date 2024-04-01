const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('ASAVI',['Cliente']);
const { ObjectId } = require('mongojs');

router.get('/Cliente',(req ,res ,next) =>{
    db.Cliente.find((err,Clientes) => {
        if (err) return next(err);
        res.json(Clientes);
    });
});

router.get('/Cliente/:id',(req ,res ,next) =>{
    db.Cliente.findOne({_id: ObjectId(req.params.id)},(err,Clientes) => {
        if (err) return next(err);

        if (!Clientes){
            return res.status(404).json({ error: 'Cliente no encontrado :(' });
        }
        res.json(Clientes);
    });
});

router.post('/Cliente', (req, res, next) => {
    const ClienteI = req.body;
    if( !ClienteI.Nombre || !ClienteI.ApPaterno || !ClienteI.ApMaterno || !ClienteI.Telefono || !ClienteI.Pais || 
        !ClienteI.Estados || !ClienteI.Ciudades || !ClienteI.Municipio || !ClienteI.Colonia || !ClienteI.Calle ||  
        !ClienteI.NumExterior || !ClienteI.NumLicencia || !ClienteI.EstadoEmision || !ClienteI.FechaVencimientoLic || !ClienteI.FechaEmisionLic || 
        !ClienteI.EstadoEmisionLic || !ClienteI.UrlLicencia || !ClienteI.NumIne || !ClienteI.FechaVencimientoIne || !ClienteI.UrlIne || 
        !ClienteI.Correo || !ClienteI.Contrasena){
        res.status(400).json({
            error: 'Cliente no insertado'
        });
    }else{
        db.Cliente.save(ClienteI,(err,Clientes) => {
            if (err) return next(err);
            res.json({message: 'Cliente insertado'});
        });
    }
});

router.delete('/Cliente/:id', (req, res, next) => {
    const ClienteD = req.params.id;

    if (!ObjectId.isValid(ClienteD)){
        return res.status(400).json({ error: 'Cliente no existente :(' });
    }
    db.Cliente.remove({_id: ObjectId(req.params.id)},(err,result) => {
        if (err) return next(err);

        if (result.n ===0){
            return res.status(404).json({ error: 'Cliente no existente :(' });
        }
        res.json({message: 'Cliente eliminado'});
    });
})

router.put('/Cliente/:id', (req, res, next) => {
    const ClienteU = req.params.id;
    const { Nombre, ApPaterno, ApMaterno, Telefono, Pais, 
        Estados, Ciudades, Municipio, Colonia, Calle, 
        NumExterior, NumLicencia, EstadoEmision, FechaVencimientoLic, FechaEmisionLic, 
        EstadoEmisionLic, UrlLicencia, NumIne, FechaVencimientoIne, UrlIne, 
        Correo, Contrasena} = req.body;

    if (!ObjectId.isValid(ClienteU)) {
        return res.status(400).json({ error: 'Cliente no existente :(' });
    }

    const query = { _id: ObjectId(ClienteU) };
    const update = {
        $set: {
            Nombre, ApPaterno, ApMaterno, Telefono, Pais, 
            Estados, Ciudades, Municipio, Colonia, Calle,  
            NumExterior, NumLicencia, EstadoEmision, FechaVencimientoLic, FechaEmisionLic, 
            EstadoEmisionLic, UrlLicencia, NumIne, FechaVencimientoIne, UrlIne, 
            Correo, Contrasena
        }
    };

    db.Cliente.updateOne(query, update, (err, result) => {
        if (err) return next(err);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado :(' });
        }

        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: 'Error de cambios' });
        }

        res.json({ message: 'Cliente actualizado' });
    });
});
module.exports = router;