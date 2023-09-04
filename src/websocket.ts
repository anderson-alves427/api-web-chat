import { io } from './http';
import { IMessageChat } from './interfaces/message-chat/IIMessageChat';
import { IUsersConnected } from './interfaces/users-connected/IUsersConnected';

let usersConnected: IUsersConnected[] = [];

io.on("connection", (socket) => {
    console.log('conectado', socket.id)
    socket.on('join-chat', (userId) => {
        const existsUserId = usersConnected.find(user => user.user_id === userId)

        if(existsUserId) {
            existsUserId.socket_id = socket.id;
        } else {
            usersConnected.push({
                user_id: userId,
                socket_id: socket.id
            })
        }
        io.emit('join-chat', usersConnected);
      });

    socket.on('message-chat', (data: IMessageChat) => {
        const message = {
            id_pessoa_remetente: data.id_pessoa_remetente,
            id_pessoa_destinatario: data.id_pessoa_destinatario,
            message: data.message,
            data: '08:00',
            nome_destinatario: data.nome_destinatario
        }
        
        console.log('messagess', message)
        const user = usersConnected.find(user => user.user_id === data.id_pessoa_destinatario)
        console.log('finddd', user)

        if (user) socket.to(user.socket_id).emit('message-chat', message);
    })
})