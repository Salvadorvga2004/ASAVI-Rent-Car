const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('ASAVI',['Estado']);
const { ObjectId } = require('mongojs');

router.get('/Estado',(req ,res ,next) =>{
    db.Estado.find((err,Estados) => {
        if (err) return next(err);
        res.json(Estados);
    });
});

router.get('/Estado/:id',(req ,res ,next) =>{
    db.Estado.findOne({ _id: ObjectId(req.params.id)},(err,Estados) => {
        if (err) return next(err);

        if (!Estados) {
            return res.status(404).json({ error: 'Estado no encontrado :(' });
        }

        res.json(Estados);
    });
});

router.post('/Estado', (req, res, next) => {
    const EstadoI = req.body;
    if( !EstadoI.Pais || !EstadoI.Estados || !EstadoI.claveEstado || !EstadoI.NombreEstado ){
        res.status(400).json({
            error: 'Estado no insertado :('
        });
    }else{
        db.Estado.save(EstadoI,(err,Estados) => {
            if (err) return next(err);
            res.json({message: 'Estado insertado'});
        });
    }
});

router.delete('/Estado/:id', (req, res, next) => {
    const EstadoD = req.params.id;

    if (!ObjectId.isValid(EstadoD)) {
        return res.status(400).json({ error: 'Estado no existente :(' });
    }

    db.Estado.remove({ _id: ObjectId(EstadoD) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            return res.status(404).json({ error: 'Estado no existente :(' });
        }

        res.json({ message: 'Estado eliminado' });
    });
});

router.put('/Estado/:id', (req, res, next) => {
    const EstadoA = req.params.id;
    const { Pais,Estados,claveEstado,NombreEstado,Ciudades,ClaveCiudad,NombreCiudad} = req.body;

    if (!ObjectId.isValid(EstadoA)) {
        return res.status(400).json({ error: 'Estado no existente :(' });
    }

    const query = { _id: ObjectId(EstadoA) };
    const update = {
        $set: {
            Pais,
	        Estados,
            claveEstado,
            NombreEstado,
            Ciudades,
            ClaveCiudad,
            NombreCiudad,
        }
    }

    db.Estado.updateOne(query, update, (err, result) => {
        if (err) return next(err);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Estado no encontrado :(' });
        }

        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: 'Error de cambios' });
        }

        res.json({ message: 'Estado actualizado' });
    });
});
module.exports = router;