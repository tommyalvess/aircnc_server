import cors from 'cors';
import express from 'express';
import * as http from 'http';
import mongoose from 'mongoose';
import path from 'path';
import * as socketio from 'socket.io';
import routes from './routes';

const uri = "mongodb+srv://tomalves:1IiHkRnX5DSly6aT@cluster0.nfqjfyn.mongodb.net/?retryWrites=true&w=majority";

const app = express()

// Crie uma instância do servidor HTTP
const server = http.createServer(app);
// Crie uma instância do Socket.IO associada ao servidor HTTP
const io = new socketio.Server(server);

const connectedUsers: Record<string, string> = {};

mongoose.connect(uri);//Conectando ao banco

// Ouça eventos de conexão
io.on('connection', (socket) => {
    const { user_id } = socket.handshake.query;    

    // Armazenar o usuário conectado
    connectedUsers[user_id] = socket.id;

    // Agora você pode usar connectedUsers dentro deste bloco
    console.log('Lista de usuários conectados:', connectedUsers);

     // Lembre-se de manipular a desconexão para remover o usuário desconectado se necessário
     socket.on('disconnect', () => {
        // Remover o usuário desconectado
        delete connectedUsers[user_id];
        console.log('Lista de usuários conectados após desconexão:', connectedUsers);
    });
    
});

// GET, POST, PUT, DELETE   

// req.query = Acessar query params (para filtros)
// req.params = Acessar route params (para edição, delete)
// req.body = Acessar corpo da requisição (para criação, edição)

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333, () => {
    console.log('Servidor está ouvindo na porta 3333');
});

export { connectedUsers, io }; // Exporta a instância do Socket.IO

