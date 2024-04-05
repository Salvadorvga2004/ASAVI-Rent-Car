const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('ASAVI', ['Extras']);
const { ObjectId } = require('mongojs');

router.get('/Extras', (req, res, next) => {
    db.Extras.find((err, Extras) => {
        if (err) return next(err);
        res.json(Extras);
    });
});

router.get('/Extras/:id', (req, res, next) => {
    db.Extras.findOne({ _id: ObjectId(req.params.id) }, (err, Extra) => {
        if (err) return next(err);

        if (!Extra) {
            return res.status(404).json({ error: 'Extra no encontrado :(' });
        }

        res.json(Extra);
    });
});

router.post('/Extras', (req, res, next) => {
    const ExtraI = req.body;
    if (!ExtraI.ClaveExtra || !ExtraI.NomArticulo || !ExtraI.Descripcion || !ExtraI.Precio || !ExtraI.NumDias || !ExtraI.Total || !ExtraI.ClaveReserva) {
        res.status(400).json({
            error: 'Datos de extra incompletos :('
        });
    } else {
        db.Extras.insertOne(ExtraI, (err, result) => {
            if (err) return next(err);
            res.json({ message: 'Extra insertado' });
        });
    }
});

router.delete('/Extras/:id', (req, res, next) => {
    const ExtraD = req.params.id;

    if (!ObjectId.isValid(ExtraD)) {
        return res.status(400).json({ error: 'Extra no existente :(' });
    }

    db.Extras.remove({ _id: ObjectId(ExtraD) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            return res.status(404).json({ error: 'Extra no existente :(' });
        }

        res.json({ message: 'Extra eliminado' });
    });
});

router.put('/Extras/:id', (req, res, next) => {
    const ExtraA = req.params.id;
    const { ClaveExtra, NomArticulo, Descripcion, Precio, NumDias, Total, ClaveReserva } = req.body;

    if (!ObjectId.isValid(ExtraA)) {
        return res.status(400).json({ error: 'Extra no existente :(' });
    }

    const query = { _id: ObjectId(ExtraA) };
    const update = {
        $set: {
            ClaveExtra,
            NomArticulo,
            Descripcion,
            Precio,
            NumDias,
            Total,
            ClaveReserva
        }
    };

    db.Extras.updateOne(query, update, (err, result) => {
        if (err) return next(err);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Extra no encontrado :(' });
        }

        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: 'Error de cambios' });
        }

        res.json({ message: 'Extra actualizado' });
    });
});

module.exports = router;
