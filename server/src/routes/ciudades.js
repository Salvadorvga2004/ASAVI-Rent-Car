const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('ASAVI',['Ciudad']);
const { ObjectId } = require('mongojs');

router.get('/Ciudad',(req ,res ,next) =>{
    db.Ciudad.find((err,Ciudades) => {
        if (err) return next(err);
        res.json(Ciudades);
    });
});

router.get('/Ciudad/:id',(req ,res ,next) =>{
    db.Ciudad.findOne({ _id: ObjectId(req.params.id)},(err,Ciudades) => {
        if (err) return next(err);

        if (!Ciudades) {
            return res.status(404).json({ error: 'Ciudad no encontrada :(' });
        }

        res.json(Ciudades);
    });
});

router.post('/Ciudad', (req, res, next) => {
    const { Pais, Estados, Ciudades } = req.body;

    if (!Pais || !Estados || !Array.isArray(Ciudades) || Ciudades.length === 0) {
        res.status(400).json({
            error: 'Ciudad no insertada :('
        });
    } else {
        db.Ciudad.save({ Pais, Estados, Ciudades }, (err, newCiudad) => {
            if (err) return next(err);
            res.json({ message: 'Ciudad insertada'});
        });
    }
});


router.delete('/Ciudad/:id', (req, res, next) => {
    const CiudadD = req.params.id;

    if (!ObjectId.isValid(CiudadD)) {
        return res.status(400).json({ error: 'Ciudad no existente :(' });
    }

    db.Ciudad.remove({ _id: ObjectId(CiudadD) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            return res.status(404).json({ error: 'Ciudad no existente :(' });
        }

        res.json({ message: 'Ciudad eliminada' });
    });
});

router.put('/Ciudad/:id', (req, res, next) => {
    const CiudadA = req.params.id;
    const { Pais, Estados, Ciudades: [{ ClaveCiudad, NombreCiudad}] } = req.body;

    if (!ObjectId.isValid(CiudadA)) {
        return res.status(400).json({ error: 'Ciudad no existente :(' });
    }

    const query = { _id: ObjectId(CiudadA) };
    const update = {
        $set: {
            Pais,
            Estados,
	        Ciudades: [
                {
                    ClaveCiudad,
	                NombreCiudad
                }
            ]
            

        }
    }

    db.Ciudad.updateOne(query, update, (err, result) => {
        if (err) return next(err);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Ciudad no encontrada :(' });
        }

        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: 'Error de cambios' });
        }

        res.json({ message: 'Ciudad actualizada' });
    });
});
module.exports = router;