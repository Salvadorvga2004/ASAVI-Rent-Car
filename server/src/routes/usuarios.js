const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('reclutamiento',['usuarios']);

router.get('/usuario',(req ,res ,next) =>{
    db.usuarios.find((err,usuarios) => {
        if (err) return next(err);
        res.json(usuarios);
    });
});

router.get('/usuario/:id',(req ,res ,next) =>{
    db.usuarios.findOne({_id: mongojs.ObjectID(req.params.id)},(err,usuarios) => {
        if (err) return next(err);
        res.json(usuarios);
    });
});

router.post('/usuario', (req, res, next) => {
    const usuario = req.body;
    if(!usuario.correo || !usuario.contrasena){
        res.status(400).json({
            error: 'Bad data'
        });
    }else{
        db.usuarios.save(usuarios,(err,usuarios) => {
            if (err) return next(err);
            res.json(usuarios);
        });
    }
});

router.delete('/usuarios/:id', (req, res, next) => {
    db.tasks.remove({_id: mongojs.ObjectID(req.params.id)},(err,result) => {
        if (err) return next(err);
        res.json(usuarios);
    });
})

router.put('/usuarios/:id', (req, res, next) => {
    const usuario = req.body;
    const updUsu = {};

    if (usuario.correo){
        updUsu.correo = usuarios.correo
    }

    if (usuario.contrasena){
        updUsu.contrasena = usuarios.contrasena
    }

    if (!updUsu){
        res.status(400).json({
            error: 'Bad data'
        });
    }else{
        db.tasks.update({_id: mongojs.ObjectID(req.params.id)},(err,usuario) => {
            if (err) return next(err);
            res.json(usuario);
        });
    }
})
module.exports = router;