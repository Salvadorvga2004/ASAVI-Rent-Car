const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('ASAVI',['Usuario']);

router.get('/Usuario',(req ,res ,next) =>{
    db.Usuario.find((err,Usuarios) => {
        if (err) return next(err);
        res.json(Usuarios);
    });
});

router.get('/Usuario/:id',(req ,res ,next) =>{
    db.Usuario.findOne({_id: mongojs.ObjectID(req.params.id)},(err,Usuarios) => {
        if (err) return next(err);
        res.json(Usuarios);
    });
});

router.post('/Usuario', (req, res, next) => {
    const Usuario = req.body;
    if(!Usuario.correo || !Usuario.contrasena){
        res.status(400).json({
            error: 'Bad data'
        });
    }else{
        db.Usuarios.save(usuarios,(err,Usuarios) => {
            if (err) return next(err);
            res.json(Usuarios);
        });
    }
});

router.delete('/Usuario/:id', (req, res, next) => {
    db.tasks.remove({_id: mongojs.ObjectID(req.params.id)},(err,result) => {
        if (err) return next(err);
        res.json(Usuarios);
    });
})

router.put('/Usuario/:id', (req, res, next) => {
    const UsuarioId = req.params.id;
    const { Nombre, ApPaterno, ApMaterno, Telefono, Usuario, Contrasenia} = req.body;

    if (!ObjectId.isValid(UsuarioId)) {
        return res.status(400).json({ error: 'Invalid Usuario ID' });
    }

    const query = { _id: ObjectId(UsuarioId) };
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
            return res.status(404).json({ error: 'Usuario not found' });
        }

        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: 'No changes made' });
        }

        res.json({ message: 'Usuario updated successfully' });
    });
});
module.exports = router;