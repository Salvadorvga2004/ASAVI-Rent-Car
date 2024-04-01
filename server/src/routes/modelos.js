const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('ASAVI',['Modelo']);
const { ObjectId } = require('mongojs');

router.get('/Modelo',(req ,res ,next) =>{
    db.Modelo.find((err,Modelos) => {
        if (err) return next(err);
        res.json(Modelos);
    });
});

router.get('/Modelo/:id',(req ,res ,next) =>{
    db.Modelo.findOne({ _id: ObjectId(req.params.id)},(err,Modelos) => {
        if (err) return next(err);

        if (!Modelos) {
            return res.status(404).json({ error: 'Auto no encontrado :(' });
        }

        res.json(Modelos);
    });
});

router.post('/Modelo', (req, res, next) => {
    const ModeloI = req.body;
    if( !ModeloI.Modelo || !ModeloI.Tipo || !ModeloI.Marca || !ModeloI.Transmision || !ModeloI.NumPasajeros || !ModeloI.NumMaletas || !ModeloI.AireAcondicionado || !ModeloI.Radio || !ModeloI.PagoPorDia || !ModeloI.UrlImagen || !ModeloI.CantidadAutos){
        res.status(400).json({
            error: 'Modelo no insertado :('
        });
    }else{
        db.Modelo.save(ModeloI,(err,Modelos) => {
            if (err) return next(err);
            res.json({message: 'Modelo insertado'});
        });
    }
});

router.delete('/Modelo/:id', (req, res, next) => {
    const ModeloD = req.params.id;

    if (!ObjectId.isValid(ModeloD)) {
        return res.status(400).json({ error: 'Modelo no existente :(' });
    }

    db.Modelo.remove({ _id: ObjectId(ModeloD) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            return res.status(404).json({ error: 'Modelo no existente :(' });
        }

        res.json({ message: 'Modelo eliminado' });
    });
});

router.put('/Modelo/:id', (req, res, next) => {
    const ModeloA = req.params.id;
    const { Modelo, Tipo, Marca, Transmision, NumPasajeros, NumMaletas,AireAcondicionado,Radio,PagoPorDia,UrlImagen,CantidadAutos} = req.body;

    if (!ObjectId.isValid(ModeloA)) {
        return res.status(400).json({ error: 'Modelo no existente :(' });
    }

    const query = { _id: ObjectId(ModeloA) };
    const update = {
        $set: {
            Modelo, 
            Tipo, 
            Marca, 
            Transmision, 
            NumPasajeros, 
            NumMaletas,
            AireAcondicionado,
            Radio,
            PagoPorDia,
            UrlImagen,
            CantidadAutos
        }
    };

    db.Modelo.updateOne(query, update, (err, result) => {
        if (err) return next(err);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Modelo no encontrado :(' });
        }

        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: 'Error de cambios' });
        }

        res.json({ message: 'Modelo actualizado' });
    });
});
module.exports = router;