import { CreateMessageDto } from './dto/create-message.dto';
import { UserService } from './../user/user.service';
import { ChatService } from './chat.service';
import { UpdateChatDto } from './dto/update-message.dto';
import { CreateChatDto } from './dto/create-chat.dto';
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
import { Logger, OnModuleInit } from '@nestjs/common';
import { CurrentUser } from 'src/user/user.decorator';

@WebSocketGateway(80, {
  // cors: ['http://localhost:3000'],
  // serveClient: false,
  cors: true,
  // название пространства может быть любым, но должно учитываться на клиенте
  namespace: 'chat',
})
// implements OnGatewayInit, OnModuleInit, OnGatewayDisconnect
export class ChatGateway {
  constructor(
    private chatService: ChatService,
    private userService: UserService,
  ) {}

  @WebSocketServer()
  server: Server;
  // async handleConnection(client: Socket, ...args: any[]) {
  //   // const post = client.handshake.query.postId as string;
  //   // console.log('post', post);
  //   const userName = client.handshake.query.userId as string;
  //   console.log('user', userName);
  //   // const chat = await this.chatService.findChatByPostId(+post);
  //   // chat.usersID.push(+userName);
  //   client.broadcast.emit('log', `${userName} connected`);
  // }

  // onModuleInit() {
  //   this.server.on('connection', (client: Socket) => {
  //     console.log('connected id on server', client.handshake.query.postId);
  //   });
  // }

  // при отключении пользователя
  // async handleDisconnect(client: Socket) {
  //   const userId = client.handshake.query.userId;
  //   const postId = client.handshake.query.postId as string;
  //   const user = await this.userService.findOneWithoutPosts(userId);

  //   client.broadcast.emit('log', `${userName} disconnected`);
  // }

  // когда пользователь подключился
  afterInit(server: Server) {
    console.log(server);
  }
  @SubscribeMessage('messages:connect')
  async connectChat(
    @MessageBody() chatId: number,
    @CurrentUser('id') id: number,
  ) {
    const connectChat = await this.chatService.connectToChat(chatId, id);
    this.server.emit('connect', connectChat);
  }

  @SubscribeMessage('messages:get')
  async handleMessagesGet(
    client: Socket,
    @MessageBody() dialogId: number,
  ): Promise<void> {
    const messages = await this.chatService.getMessages(dialogId);
    this.server
      .to(client.handshake.query.postId as string)
      .emit('messages', messages);
  }

  @SubscribeMessage('message:post')
  async handleMessagePost(
    @MessageBody()
    payload: CreateMessageDto,
  ): Promise<void> {
    const createdMessage = await this.chatService.createMessage(payload);

    this.server.emit('message:post', createdMessage);

    // this.handleMessagesGet(payload.dialogId);
  }

  @SubscribeMessage('message:patch')
  async handleMessagePut(
    @MessageBody()
    payload: UpdateChatDto,
  ): Promise<void> {
    const updatedMessage = await this.chatService.updateMessage(payload);
    this.server.emit('message:patch', updatedMessage);
    // this.handleMessagesGet();
  }

  @SubscribeMessage('message:delete')
  async handleMessageDelete(
    @MessageBody()
    payload: {
      messageId: number;
      userId: number;
    },
  ) {
    const removedMessage = await this.chatService.deleteMessage(
      payload.messageId,
      payload.userId,
    );
    this.server.emit('message:delete', removedMessage);
    // this.handleMessagesGet();
  }
}
