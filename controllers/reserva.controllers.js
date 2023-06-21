const ctrlReservas = {};
const Reserva = require('../models/Reserva');

// Ctrl para obtener todas las reservas
ctrlTarea.obtenerTareas = async (req, res) => {
    try {
        const reserva = await Reserva.findAll({
            where: {
                estado: true,
                usuarioId: req.usuario.id
            }
        });

        if (!reserva || reserva.length === 0) {
            throw ({
                status: 404,
                message: 'No hay reservas registradas'
            })
        }

        return res.json(reserva);
    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || 'Error interno del servidor'
        });
    }
}

// Ctrl para obtener una reserva
ctrlTarea.obtenerReserva = async (req, res) => {
    const { id } = req.params;

    try {
        const tarea = await Reserva.findOne({
            where: {
                id,
                estado: true
            }
        });

        if (!reserva) {
            throw ({
                status: 404,
                message: 'No existe la reserva'
            })
        }
    
        return res.json(reserva);

    } catch (error) {
        return res.status(error.status || 500).json(error.message || 'Error interno del servidor');
    }
}

// Crear para crear una reserva
ctrlReserva.crearReserva = async (req, res) => {
    const { nombre_reserva } = req.body;

    try {
        const reserva = await Tarea.create({
            nombre_reserva,
            id_usuario: req.usuario.id
        });

        if (!reserva) {
            throw ({
                status: 400,
                message: 'No se pudo crear la reserva'
            })
        }

        return res.json(reserva);
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json(error.message || 'Error interno del servidor');
    }
}

//Actualizar una reserva
ctrlReserva.actualizarReserva = async (req, res) => {
    const { id } = req.params;
    const { nombre_reserva } = req.body;
    
    try {
        const reservaActualizada = await Reserva.update({
            nombre_reserva,
        }, {
            where: {
                id,
                estado: true
            }
        });

        if (!reservaActualizada) {
            throw ({
                status: 400,
                message: 'No se pudo actualizar la reserva'
            })
        }

        return res.json({
            message: 'Reserva actualizada correctamente',
            reservaActualizada
            
        });
    } catch (error) {
        return res.status(error.status || 500).json(error.message || 'Error interno del servidor');
    }
}

//Eliminar una tarea
ctrlReserva.eliminarreserva = async (req, res) => {
    const { id } = req.params;

    try {
        const reservaEliminada = await Reserva.update({
            estado: false
        }, {
            where: {
                id,
                estado: true
            }
        });

        if (!reservaEliminada) {
            throw ({
                status: 400,
                message: 'No se pudo eliminar la reserva'
            })
        }

        return res.json({tareaEliminada, message: 'Reserva eliminada correctamente' });
    } catch (error) {
        return res.status(error.status || 500).json(error.message || 'Error interno del servidor');
    }
}


module.exports = ctrlReservas;