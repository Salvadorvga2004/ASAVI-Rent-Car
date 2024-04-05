const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('ASAVI',['Marca']);
const { ObjectId } = require('mongojs');

router.get('/Marca',(req ,res ,next) =>{
    db.Marca.find((err,Marcas) => {
        if (err) return next(err);
        res.json(Marcas);
    });
});

router.get('/Marca/:id',(req ,res ,next) =>{
    db.Marca.findOne({ _id: ObjectId(req.params.id)},(err,Marcas) => {
        if (err) return next(err);

        if (!Marcas) {
            return res.status(404).json({ error: 'Marca no encontrado :(' });
        }

        res.json(Marcas);
    });
});

router.post('/Marca', (req, res, next) => {
    const MarcaA = req.body;
    if( !MarcaA.NomMarca){
        res.status(400).json({
            error: 'Marca no insertado :('
        });
    }else{
        db.Marca.save(MarcaA,(err,Marcas) => {
            if (err) return next(err);
            res.json({message: 'Marca insertado'});
        });
    }
});

router.delete('/Marca/:id', (req, res, next) => {
    const MarcaD = req.params.id;

    if (!ObjectId.isValid(MarcaD)) {
        return res.status(400).json({ error: 'Marca no existente :(' });
    }

    db.Marca.remove({ _id: ObjectId(MarcaD) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            return res.status(404).json({ error: 'Marca no existente :(' });
        }

        res.json({ message: 'Marca eliminada' });
    });
});

router.put('/Marca/:id', (req, res, next) => {
    const MarcaI = req.params.id;
    const { NomMarca} = req.body;

    if (!ObjectId.isValid(MarcaI)) {
        return res.status(400).json({ error: 'Marca no existente :(' });
    }

    const query = { _id: ObjectId(MarcaI) };
    const update = {
        $set: {
            NomMarca
        }
    };

    db.Marca.updateOne(query, update, (err, result) => {
        if (err) return next(err);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Marca no encontrada :(' });
        }

        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: 'Error de cambios' });
        }

        res.json({ message: 'Marca actualizado' });
    });
});
module.exports = router;