const sendMessage = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/messages/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: 'Se ha conectado el websocket' })
        });

        if (!response.ok) {
            throw new Error('Error al enviar el mensaje');
        }

        console.log("Mensaje enviado correctamente");
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
    }
};

sendMessage();