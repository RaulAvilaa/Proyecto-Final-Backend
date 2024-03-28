document.getElementById('messageForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const user = document.getElementById('user').value;
    const message = document.getElementById('message').value;

    if (user && message) {
        try {
            const response = await fetch('http://localhost:8080/api/messages/addMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user, text: message })
            });

            if (!response.ok) {
                throw new Error('Error al agregar el mensaje');
            }

            console.log("Mensaje agregado:", { user, message });
            appendMessage({ user, text: message }); // Llama a la función para agregar el mensaje a la lista
            document.getElementById('message').value = '';

            event.target.reset();
        } catch (error) {
            console.error('Error al agregar el mensaje:', error);
        }
    }
});

function appendMessage(message) {
    const chatList = document.getElementById('chatList');
    const chatElement = document.createElement('div');
    chatElement.classList.add('col-md-4', 'mb-4');
    chatElement.innerHTML = `
        <div class="card">
            <h2>usuario: ${message.user}</h2>
            <p>mensaje: ${message.text}</p>
        </div>`;
    chatList.appendChild(chatElement);
}