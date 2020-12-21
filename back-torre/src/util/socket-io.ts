import { Server as httpServer } from 'http'
import * as socketIO from 'socket.io'
import { initSocket as initSocket1 } from '../modules/groups/socket'

let io: socketIO.Server

export const getIOHandler = (): socketIO.Server => {
  return io
}
export const initSocket = (http: httpServer): socketIO.Server => {
  io = new socketIO.Server(http, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })

  const sockets = [initSocket1]
  for (const initSocketT of sockets) {
    initSocketT(io)
  }
  return io
}
