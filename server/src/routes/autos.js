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
    const AutoI = req.body;
    if( !AutoI.Modelo || !AutoI.Tipo || !AutoI.Marca || !AutoI.Transmision || !AutoI.NumPasajeros || !AutoI.NumMaletas || !AutoI.AireAcondicionado || !AutoI.Radio || !AutoI.PagoPorDia || !AutoI.UrlImagen || !AutoI.CantidadAutos || !AutoI.ClaveReserva){
        res.status(400).json({
            error: 'No Auto insertado :('
        });
    }else{
        db.Auto.save(AutoI,(err,Usuarios) => {
            if (err) return next(err);
            res.json({message: 'Usuario insertado'});
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
    const AutoA = req.params.id;
    const { Modelo, Tipo, Marca, Transmision, NumPasajeros, NumMaletas,AireAcondicionado,Radio,PagoPorDia,UrlImagen,CantidadAutos,ClaveReserva} = req.body;

    if (!ObjectId.isValid(AutoA)) {
        return res.status(400).json({ error: 'Auto no existente :(' });
    }

    const query = { _id: ObjectId(AutoA) };
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
            CantidadAutos,
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