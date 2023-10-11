const socket = io();

const txtChat = document.getElementById('txtChat');
const contenido = document.getElementById('dvContenido');

txtChat.addEventListener('change', (e) => {
    socket.emit('mensaje',{
        user: usuario,
        mensaje: e.target.value,
    });
});

let usuario = '';

Swal.fire({
    title: 'Ingresa tu nombre',
    input : 'text',
    inputAttributes:{
        autocapitalize:'off',
    },
    confirmButtonText: 'Ingresar',
    showLoaderOnConfirm : true,
}).then((result) => {
   usuario = result.value;
});

//[{user: "usuario", mensaje: "mensaje"}]

socket.on('nuevo_mensaje', (data)=>{
    const mensajes = data.map(({user, mensaje}) => {
        return `<p>${user} dijo: ${mensaje}</p>`;
    });

    contenido.innerHTML = mensajes.join('');
});