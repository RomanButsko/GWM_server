import { ChatService } from './chat/chat.service';
import { UpdateChatDto } from './chat/dto/update-chat.dto';
import { CreateChatDto } from './chat/dto/create-chat.dto';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

const users: Record<string, string> = {};

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  serveClient: false,
  // название пространства может быть любым, но должно учитываться на клиенте
  namespace: 'chat',
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private chatService: ChatService) {}

  users: number = 0;

  @WebSocketServer() server: Server;

  // когда пользователь устанавливает соединение
  handleConnection(client: Socket, ...args: any[]) {
    const userName = client.handshake.query.name as string;
    const socketId = client.id;
    users[socketId] = userName;

    client.broadcast.emit('log', `${userName} connected`);
  }

  // при отключении пользователя
  handleDisconnect(client: Socket) {
    const socketId = client.id;
    const userName = users[socketId];
    delete users[socketId];

    client.broadcast.emit('log', `${userName} disconnected`);
  }

  // когда пользователь подключился
  afterInit(server: Server) {
    console.log(server);
  }

  @SubscribeMessage('messages:get')
  async handleMessagesGet(): Promise<void> {
    const messages = await this.chatService.getMessages();
    this.server.emit('messages', messages);
  }

  @SubscribeMessage('messages:clear')
  async handleMessagesClear(): Promise<void> {
    await this.chatService.deleteMessages();
  }

  @SubscribeMessage('message:post')
  async handleMessagePost(
    @MessageBody()
    payload: CreateChatDto,
  ): Promise<void> {
    const createdMessage = await this.chatService.createMessage(payload);
    // можно сообщать клиентам о каждой операции по отдельности
    this.server.emit('message:post', createdMessage);
    // но мы пойдем более простым путем
    this.handleMessagesGet();
  }

  @SubscribeMessage('message:put')
  async handleMessagePut(
    @MessageBody()
    payload: {
      id: number;
      dto: UpdateChatDto;
    },
  ): Promise<void> {
    const updatedMessage = await this.chatService.updateMessage(
      payload.id,
      payload.dto,
    );
    this.server.emit('message:put', updatedMessage);
    this.handleMessagesGet();
  }

  @SubscribeMessage('message:delete')
  async handleMessageDelete(
    @MessageBody()
    payload: {
      id: number;
    },
  ) {
    const removedMessage = await this.chatService.deleteMessage(payload.id);
    this.server.emit('message:delete', removedMessage);
    this.handleMessagesGet();
  }
}
