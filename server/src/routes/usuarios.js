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

router.get('/Usuario/:id',(req ,res ,next) =>{
    db.Usuario.findOne({ _id: ObjectId(req.params.id)},(err,Usuarios) => {
        if (err) return next(err);

        if (!Usuarios) {
            return res.status(404).json({ error: 'Usuario no encontrado :(' });
        }

        res.json(Usuarios);
    });
});

router.post('/Usuario', (req, res, next) => {
    const UsuarioIs = req.body;
    if(!UsuarioIs.Nombre || !UsuarioIs.ApPaterno || !UsuarioIs.ApMaterno || !UsuarioIs.Telefono || !UsuarioIs.Usuario || !UsuarioIs.Contrasenia){
        res.status(400).json({
            error: 'No insertado :('
        });
    }else{
        db.Usuario.save(UsuarioIs,(err,Usuarios) => {
            if (err) return next(err);
            res.json({message: 'Usuario insertado'});
        });
    }
});

router.delete('/Usuario/:id', (req, res, next) => {
    const UsuarioR = req.params.id;

    if (!ObjectId.isValid(UsuarioR)) {
        return res.status(400).json({ error: 'Usuario no existente :(' });
    }

    db.Usuario.remove({ _id: ObjectId(UsuarioR) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            return res.status(404).json({ error: 'Usuario no existente :(' });
        }

        res.json({ message: 'Usuario eliminado' });
    });
});

router.put('/Usuario/:id', (req, res, next) => {
    const UsuarioA = req.params.id;
    const { Nombre, ApPaterno, ApMaterno, Telefono, Usuario, Contrasenia} = req.body;

    if (!ObjectId.isValid(UsuarioA)) {
        return res.status(400).json({ error: 'Usuario no existente :(' });
    }

    const query = { _id: ObjectId(UsuarioA) };
    const update = {
        $set: {
            Nombre, 
            ApPaterno, 
            ApMaterno, 
            Telefono, 
            Usuario, 
            Contrasenia
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