import eventEmitter from '@util/events'
import { Socket, Server } from 'socket.io'

const users: any[] = []
export const initSocket = (io: Server): void => {
  const nsp = io.of('/group')
  nsp.on('connection', function (socket: Socket) {
    users[socket.id] = socket.id
    socket.on('groupId', function (msg) {
      socket.join(msg)
    })
  })

  eventEmitter.on('groupChanged', (message) => {
    const group = JSON.parse(message)
    nsp.in(group._id).emit('groupData', message)
  })
}
