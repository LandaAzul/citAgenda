const lessonCtrl = {};

const Lesson = require('../models/Lesson');

lessonCtrl.getLessons = async(req, res) => {
    const lesson = await Lesson.find();//
    res.json(lesson);
}
lessonCtrl.createLesson = async (req, res) => {
    const {Título,Jugador,Código,Cantidad,Clase,Hora,Entrenador,Clase1,Hora1,Entrenador1,Clase2,Hora2,Entrenador2} = req.body;
    const nuevaLesson = new Lesson ({
        Título,
        Jugador,
        Código,
        Cantidad,
        Clase,
        Hora,
        Entrenador,
        Clase1,
        Hora1,
        Entrenador1,
        Clase2,
        Hora2,
        Entrenador2
    });
    await nuevaLesson.save();
    console.log(nuevaLesson)
    //res.json({message:nuevaCita});
    res.json({message: 'leccion guardada'});
}

lessonCtrl.getLesson = async (req, res) =>{ 
    
    const lesson = await Lesson.findById(req.params.id);
    res.json({message:lesson})
}
lessonCtrl.updateLesson = async (req, res) => {
    console.log(req.params.id, req.body)
    const {Título,Jugador,Código,Cantidad,Clase1,Hora1,Entrenador1,Clase2,Hora2,Entrenador2}= req.body;
    await Lesson.findOneAndUpdate(req.params.id, {
        Título,
        Jugador,
        Código,
        Cantidad,
        Clase1,
        Hora1,
        Entrenador1,
        Clase2,
        Hora2,
        Entrenador2
    });
    res.json({message: 'leccion actualizado'})
}

lessonCtrl.deleteLesson = async (req, res) => {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    res.json({title: 'Leccion eliminada'})
}


module.exports = lessonCtrl;