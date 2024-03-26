const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('ASAVI',['Sucursal']);
const { ObjectId } = require('mongojs');

router.get('/Sucursal',(req ,res ,next) =>{
    db.Sucursal.find((err,Sucursales) => {
        if (err) return next(err);
        res.json(Sucursales);
    });
});

router.get('/Sucursal/:id',(req ,res ,next) =>{
    db.Sucursal.findOne({ _id: ObjectId(req.params.id)},(err,Sucursales) => {
        if (err) return next(err);

        if (!Sucursales) {
            return res.status(404).json({ error: 'Sucursal no encontrada :(' });
        }

        res.json(Sucursales);
    });
});

router.post('/Sucursal', (req, res, next) => {
    const { Pais, Estados, Ciudades, Sucursales } = req.body;

    if (!Pais || !Estados || !Ciudades ||!Array.isArray(Sucursales) || Sucursales.length === 0) {
        res.status(400).json({
            error: 'Sucursal no insertada :('
        });
    } else {
        db.Sucursal.save({ Pais, Estados, Ciudades, Sucursales }, (err, newSucursal) => {
            if (err) return next(err);
            res.json({ message: 'Sucursal insertada'});
        });
    }
});


router.delete('/Sucursal/:id', (req, res, next) => {
    const SucursalD = req.params.id;

    if (!ObjectId.isValid(SucursalD)) {
        return res.status(400).json({ error: 'Sucursal no existente :(' });
    }

    db.Sucursal.remove({ _id: ObjectId(SucursalD) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            return res.status(404).json({ error: 'Sucursal no existente :(' });
        }

        res.json({ message: 'Sucursal eliminada' });
    });
});

router.put('/Sucursal/:id', (req, res, next) => {
    const SucursalA = req.params.id;
    const { Pais, Estados, Ciudades ,Sucursales: [{ ClaveSucursal, NombreSucursal, Telefono}] } = req.body;

    if (!ObjectId.isValid(SucursalA)) {
        return res.status(400).json({ error: 'Ciudad no existente :(' });
    }

    const query = { _id: ObjectId(SucursalA) };
    const update = {
        $set: {
            Pais,
            Estados,
            Ciudades,
	        Sucursales: [
                {
                    ClaveSucursal,
		            NombreSucursal,
		            Telefono
                }
            ]
            

        }
    }

    db.Sucursal.updateOne(query, update, (err, result) => {
        if (err) return next(err);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Sucursal no encontrada :(' });
        }

        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: 'Error de cambios' });
        }

        res.json({ message: 'Sucursal actualizada' });
    });
});
module.exports = router;