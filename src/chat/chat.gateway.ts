import { CreateMessageDto } from './dto/create-message.dto';
import { UserService } from './../user/user.service';
import { ChatService } from './chat.service';
import { UpdateChatDto } from './dto/update-message.dto';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway(80, {
  cors: true,
  namespace: 'chat',
})
export class ChatGateway {
  constructor(private chatService: ChatService) {}

  @WebSocketServer()
  server: Socket;

  @SubscribeMessage('user:connected')
  async connectChat(
    @MessageBody() payload: { chatId: number; userId: number },
  ) {
    const connectChat = await this.chatService.connectToChat(
      payload.chatId,
      payload.userId,
    );
    this.server.emit('user:connected', connectChat);
    await this.handleMessagesGet(payload.chatId);
  }

  @SubscribeMessage('user:leave')
  async leaveChat(@MessageBody() payload: { chatId: number; userId: number }) {
    const connectChat = await this.chatService.leaveToChat(
      payload.chatId,
      payload.userId,
    );
    this.server.emit('user:leave', connectChat);
  }

  @SubscribeMessage('messages:get')
  async handleMessagesGet(@MessageBody() postId: number) {
    const messages = await this.chatService.getMessages(postId);
    console.log('get', postId);
    this.server.emit('messages:get', messages);
    return messages;
  }

  @SubscribeMessage('message:post')
  async handleMessagePost(
    @MessageBody()
    payload: CreateMessageDto,
  ) {
    const { text, dialogID, userIdTo, isRead, userIdFrom } = payload;
    const createdMessage = await this.chatService.createMessage({
      text,
      dialogID,
      userIdTo,
      isRead,
      userIdFrom,
    });
    this.server.emit('message:post', createdMessage);
    await this.handleMessagesGet(dialogID);
  }

  @SubscribeMessage('message:patch')
  async handleMessagePut(
    @MessageBody()
    payload: UpdateChatDto,
  ): Promise<void> {
    const updatedMessage = await this.chatService.updateMessage(payload);
    this.server.emit('message:patch', updatedMessage);
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
  }
}
