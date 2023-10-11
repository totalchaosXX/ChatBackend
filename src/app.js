import express from 'express';
import handlebars from 'express-handlebars';
import { Server} from 'socket.io';
import viewsRouter from './router/viewsRouter.js'

const app = express();
const httpServer = app.listen(8080, () => console.log('server up'));
const socketServer = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');
app.use(express.static('./public'));

app.use('/', viewsRouter);

const mensajes =[];

socketServer.on('connection', (socket) => {
    console.log('Se conectó el usuario', socket.id);
    socket.on('mensaje', (data) =>{
        mensajes.push(data);
        socketServer.emit('nuevo_mensaje', mensajes);
    });
});

