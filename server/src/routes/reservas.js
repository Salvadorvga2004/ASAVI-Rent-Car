const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('ASAVI',['Reserva']);
const { ObjectId } = require('mongojs');

router.get('/Reserva',(req ,res ,next) =>{
    db.Reserva.find((err,Reservas) => {
        if (err) return next(err);
        res.json(Reservas);
    });
});

router.get('/Reserva/:id',(req ,res ,next) =>{
    db.Reserva.findOne({ _id: ObjectId(req.params.id)},(err,Reservas) => {
        if (err) return next(err);

        if (!Reservas) {
            return res.status(404).json({ error: 'Reserva no encontrada :(' });
        }

        res.json(Reservas);
    });
});

router.post('/Reserva', (req, res, next) => {
    const { ClaveReserva, NumSerie, ClaveExtra, ModeloAuto, FechaEntrega, HoraEntrega, SucursalEntrega, FechaRegreso, HoraRegreso, SucursalRegreso, Estatus, Total, Correo} = req.body;

    if (!Pais || !Estados || !Ciudades ||!Array.isArray(Reservas) || Reservas.length === 0) {
        res.status(400).json({
            error: 'Reserva no insertada :('
        });
    } else {
        db.Reserva.save({ Pais, Estados, Ciudades, Reservas }, (err, newReserva) => {
            if (err) return next(err);
            res.json({ message: 'Reserva insertada'});
        });
    }
});


router.delete('/Reserva/:id', (req, res, next) => {
    const ReservaD = req.params.id;

    if (!ObjectId.isValid(ReservaD)) {
        return res.status(400).json({ error: 'Reserva no existente :(' });
    }

    db.Reserva.remove({ _id: ObjectId(ReservaD) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            return res.status(404).json({ error: 'Reserva no existente :(' });
        }

        res.json({ message: 'Reserva eliminada' });
    });
});

router.put('/Reserva/:id', (req, res, next) => {
    const ReservaA = req.params.id;
    const { Pais, Estados, Ciudades ,Reservas: [{ ClaveReserva, NombreReserva, Telefono}] } = req.body;

    if (!ObjectId.isValid(ReservaA)) {
        return res.status(400).json({ error: 'Ciudad no existente :(' });
    }

    const query = { _id: ObjectId(ReservaA) };
    const update = {
        $set: {
            Pais,
            Estados,
            Ciudades,
	        Reservaes: [
                {
                    ClaveReserva,
		            NombreReserva,
		            Telefono
                }
            ]
            

        }
    }

    db.Reserva.updateOne(query, update, (err, result) => {
        if (err) return next(err);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Reserva no encontrada :(' });
        }

        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: 'Error de cambios' });
        }

        res.json({ message: 'Reserva actualizada' });
    });
});
module.exports = router;