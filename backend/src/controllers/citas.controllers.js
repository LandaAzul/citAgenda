const citasCtrl = {};

const Cita = require('../models/Cita');

citasCtrl.getCitas = async(req, res) => {
    const citas = await Cita.find();//
    res.json(citas);
}
citasCtrl.createCita = async(req, res) => {
    const { title, content, date, number, author} = req.body;
    const nuevaCita = new Cita ({
        title: title,
        content: content,
        number: number,
        date: date,
        author: author
    });
    //await nuevaCita.save();
    console.log(nuevaCita)
    res.json({message:'cita guardada'});
}

citasCtrl.getCita = (req, res) => res.json({title: 'dasdawd'})

citasCtrl.updateCita = (req, res) => res.json({message: 'cita actualizado'})

citasCtrl.deleteCita = (req, res) => res.json({message: 'cita eliminado'})


module.exports = citasCtrl;