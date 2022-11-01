import io from 'socket.io-client';
import events from 'events';
import { SOCKET_URL } from 'config';

const options = {
  transports: ['websocket'],
};

class SocketClient {
  socket = null;
  eventEmitter = new events.EventEmitter();

  establishSocketConnection(token) {
    try {
      console.log(SOCKET_URL, token);
      this.socket = io(SOCKET_URL, {
        ...options,
        query: { token },
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      this.socket.on('connect_error', error => {
        console.log('connect_error', error);
      });
      this.socket.on('disconnect', error => {
        console.log('disconnect', error);
      });
      this.socket.on('connect_timeout', error => {
        console.log('connect_timeout', error);
      });
      this.socket.on('reconnect_attempt', error => {
        console.log('reconnect_attempt', error);
      });
      this.socket.on('reconnect_error', error => {
        console.log('reconnect_error', error);
      });
      this.socket.on('reconnect_failed', error => {
        console.log('reconnect_failed', error);
      });
      this.socket.on('reconnecting', error => {
        console.log('reconnecting', error);
      });
      this.socket.on('reconnect', error => {
        console.log('reconnect', error);
      });
      // this.socket.on('ping', (error) => {
      //   console.log('ping', error);
      // });
      // this.socket.on('pong', (error) => {
      //   console.log('pong', error);
      // });
      this.socket.on('connect', data => {
        console.log('connect socket');
        this.eventEmitter.emit('connect');
      });
      this.socket.on('message', message => {
        this.eventEmitter.emit('message', message);
      });
      this.socket.on('team', event => {
        // console.log('\n team socket \n', event);
        this.eventEmitter.emit('team', event);
      });
      this.socket.on('room', event => {
        // console.log('\n room  socket\n', event);
        this.eventEmitter.emit('room', event);
      });
      this.socket.on('activity', event => {
        // console.log('\n activity  socket\n', event);
        this.eventEmitter.emit('activity', event);
      });
      this.socket.on('online_status', event => {
        console.log('\n online_status  socket\n', event);
        this.eventEmitter.emit('online_status', event);
      });
      this.socket.on('offline_status', event => {
        console.log('\n offline_status  socket\n', event);
        this.eventEmitter.emit('offline_status', event);
      });
    } catch (error) {
      console.log('Cannot connect to socket server');
    }
  }

  getChatRooms() {
    return new Promise((resolve, reject) => {
      this.socket.emit('chatrooms', null, (err, chatrooms) => {
        if (err) {
          return reject(err);
        }

        resolve(chatrooms);
      });
    });
  }

  joinChatroom(chatRoomId) {
    return new Promise((resolve, reject) => {
      this.socket.emit('join', chatRoomId, (err, chatHistory) => {
        if (err) {
          return reject(err);
        }

        resolve(chatHistory);
      });
    });
  }

  sendChannelMessage(chatroomId, message, visibleTo) {
    console.log('message ', message);
    return new Promise((resolve, reject) => {
      this.socket.emit(
        'message',
        {
          chatroomId,
          message,
          visibleTo,
        },
        (err, result) => {
          if (err) {
            return reject(err);
          }

          resolve(result);
        },
      );
    });
  }

  sendMessage(userId, message) {
    console.log('userId ', userId);
    console.log('message ', message);
    return new Promise((resolve, reject) => {
      this.socket.emit(
        'message',
        {
          userId,
          message,
        },
        (err, result) => {
          if (err) {
            return reject(err);
          }

          resolve(result);
        },
      );
    });
  }
}

export default new SocketClient();
