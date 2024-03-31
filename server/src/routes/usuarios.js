const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('ASAVI',['Usuario']);
const { ObjectId } = require('mongojs');

router.get('/Usuario',(req ,res ,next) =>{
    db.Usuario.find((err,Usuarios) => {
        if (err) return next(err);
        res.json(Usuarios);
    });
});

router.get('/Usuario/:Correo/:Contrasena', (req, res, next) => {
    const correo = req.params.Correo;
    const contrasena = req.params.Contrasena;

    db.Usuario.findOne({ Correo: correo, Contrasena: contrasena }, (err, Usuario) => {
        if (err) return next(err);

        if (!Usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado :(' });
        }
        res.json(Usuario);
    });
});


router.post('/Usuario', (req, res, next) => {
    const UsuarioI = req.body;
    if(!UsuarioI.ClaveCliente || !UsuarioI.Correo || !UsuarioI.Contrasena){
        res.status(400).json({
            error: 'Usuario no insertado'
        });
    }else{
        db.Usuario.save(UsuarioI,(err,Usuarios) => {
            if (err) return next(err);
            res.json({message: 'Usuario insertado'});
        });
    }
});

router.delete('/Usuario/:id', (req, res, next) => {
    const UsuarioD = req.params.id;

    if (!ObjectId.isValid(UsuarioD)){
        return res.status(400).json({ error: 'Usuario no existente :(' });
    }
    db.Usuario.remove({_id: ObjectId(req.params.id)},(err,result) => {
        if (err) return next(err);

        if (result.n ===0){
            return res.status(404).json({ error: 'Usuario no existente :(' });
        }
        res.json({message: 'Usuario eliminado'});
    });
})

router.put('/Usuario/:id', (req, res, next) => {
    const UsuarioU = req.params.id;
    const { ClaveCliente,Correo, Contrasena} = req.body;

    if (!ObjectId.isValid(UsuarioU)) {
        return res.status(400).json({ error: 'Usuario no existente :(' });
    }

    const query = { _id: ObjectId(UsuarioU) };
    const update = {
        $set: {
            ClaveCliente,
            Correo,
            Contrasena
        }
    };

    db.Usuario.updateOne(query, update, (err, result) => {
        if (err) return next(err);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado :(' });
        }

        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: 'Error de cambios' });
        }

        res.json({ message: 'Usuario actualizado' });
    });
});
module.exports = router;