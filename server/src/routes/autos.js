const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('ASAVI',['Auto']);
const { ObjectId } = require('mongojs');

router.get('/Auto',(req ,res ,next) =>{
    db.Auto.find((err,Autos) => {
        if (err) return next(err);
        res.json(Autos);
    });
});

router.get('/Auto/:id',(req ,res ,next) =>{
    db.Auto.findOne({ _id: ObjectId(req.params.id)},(err,Autos) => {
        if (err) return next(err);

        if (!Autos) {
            return res.status(404).json({ error: 'Auto no encontrado :(' });
        }

        res.json(Autos);
    });
});



router.post('/Auto', (req, res, next) => {
    const AutoA = req.body;
    if( !AutoA.NumSerie || !AutoA.Kilometraje || !AutoA.EstadoCarroceria || !AutoA.Ubicacion || !AutoA.EstatusAuto || !AutoA.ModeloAuto || !AutoA.ClaveReserva  ){
        res.status(400).json({
            error: 'Auto no insertado :('
        });
    }else{
        db.Auto.save(AutoA,(err,Autos) => {
            if (err) return next(err);
            res.json({message: 'Auto insertado'});
        });
    }
});

router.delete('/Auto/:id', (req, res, next) => {
    const AutoD = req.params.id;

    if (!ObjectId.isValid(AutoD)) {
        return res.status(400).json({ error: 'Auto no existente :(' });
    }

    db.Auto.remove({ _id: ObjectId(AutoD) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            return res.status(404).json({ error: 'Auto no existente :(' });
        }

        res.json({ message: 'Auto eliminado' });
    });
});

router.put('/Auto/:id', (req, res, next) => {
    const AutoI = req.params.id;
    const { NumSerie, Kilometraje, EstadoCarroceria, Ubicacion, EstatusAuto, ModeloAuto,ClaveReserva} = req.body;

    if (!ObjectId.isValid(AutoI)) {
        return res.status(400).json({ error: 'Auto no existente :(' });
    }

    const query = { _id: ObjectId(AutoI) };
    const update = {
        $set: {
            NumSerie,
            Kilometraje,
            EstadoCarroceria,
            Ubicacion,
            EstatusAuto,
            ModeloAuto,
            ClaveReserva
        }
    };

    db.Auto.updateOne(query, update, (err, result) => {
        if (err) return next(err);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Auto no encontrado :(' });
        }

        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: 'Error de cambios' });
        }

        res.json({ message: 'Auto actualizado' });
    });
});
module.exports = router;