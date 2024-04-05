const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('ASAVI',['TipoAuto']);
const { ObjectId } = require('mongojs');

router.get('/TipoAuto',(req ,res ,next) =>{
    db.TipoAuto.find((err,TipoAutos) => {
        if (err) return next(err);
        res.json(TipoAutos);
    });
});

router.get('/TipoAuto/:id',(req ,res ,next) =>{
    db.TipoAuto.findOne({ _id: ObjectId(req.params.id)},(err,TipoAutos) => {
        if (err) return next(err);

        if (!TipoAutos) {
            return res.status(404).json({ error: 'Auto no encontrado :(' });
        }

        res.json(TipoAutos);
    });
});

router.post('/TipoAuto', (req, res, next) => {
    const AutoA = req.body;
    if( !AutoA.Tipo){
        res.status(400).json({
            error: 'Auto no insertado :('
        });
    }else{
        db.TipoAuto.save(AutoA,(err,TipoAutos) => {
            if (err) return next(err);
            res.json({message: 'Auto insertado'});
        });
    }
});

router.delete('/TipoAuto/:id', (req, res, next) => {
    const AutoD = req.params.id;

    if (!ObjectId.isValid(AutoD)) {
        return res.status(400).json({ error: 'Tipo auto no existente :(' });
    }

    db.TipoAuto.remove({ _id: ObjectId(AutoD) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            return res.status(404).json({ error: 'Tipo auto no existente :(' });
        }

        res.json({ message: 'Tipo auto eliminado' });
    });
});

router.put('/TipoAuto/:id', (req, res, next) => {
    const AutoI = req.params.id;
    const { Tipo} = req.body;

    if (!ObjectId.isValid(AutoI)) {
        return res.status(400).json({ error: 'Auto no existente :(' });
    }

    const query = { _id: ObjectId(AutoI) };
    const update = {
        $set: {
            Tipo
        }
    };

    db.TipoAuto.updateOne(query, update, (err, result) => {
        if (err) return next(err);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Tipo auto no encontrado :(' });
        }

        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: 'Error de cambios' });
        }

        res.json({ message: 'Tipo auto actualizado' });
    });
});
module.exports = router;