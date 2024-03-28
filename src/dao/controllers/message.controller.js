import Message from "../models/message.model.js";

const messageController = {
    getMessages: async (req, res) => {
        try {
            const messages = await Message.find().lean();

            // Se devuelve una respuesta HTML solo si se solicita explícitamente
            if (req.accepts('html')) {
                return res.render('chat', { messages });
            }

            // Se devuelve una respuesta JSON por defecto
            res.json(messages);
        } catch (error) {
            console.error('Error al obtener los mensajes:', error);
            return res.status(500).json({ error: "Error en la base de datos", details: error.message });
        }
    },

    addMessage: async (req, res) => {
        const { user, text } = req.body;

        try {
            // Se crea y guarda el mensaje de manera más concisa utilizando el método create()
            const newMessage = await Message.create({ user, text });

            return res.json({
                message: 'Mensaje agregado',
                Message: newMessage,
            });
        } catch (error) {
            console.error('Error al guardar el mensaje:', error);
            return res.status(500).json({ error: 'Error en la base de datos', details: error.message });
        }
    },
};

export default messageController;