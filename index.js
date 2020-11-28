const path = require('path')
const express = require('express')
const app = express()

// settings
app.set('port', process.env.PORT || 3000)

// static files
app.use(express.static(path.join(__dirname, '/public')))

const server = app.listen(app.get('port'), () => {
  console.log(`Server on http://localhost:${app.get('port')}`)
})

// websockets
const SocketIO = require('socket.io')
const io = SocketIO(server)

io.on('connection', (socket) => {
  console.log('new connection', socket.id)

  // escucha el evento chat:message y emite a todos los socket un evento chat:message con la data que recibe
  socket.on('chat:message', (data = {}) => {
    io.sockets.emit('chat:message', { ...data })
  })

  // escucha el evento typing excepto al que lo emitio socket.broadcast.emit('TYPO DE EVENTO', { ...data })
  socket.on('chat:typing', (data = {}) => {
    socket.broadcast.emit('chat:typing', { ...data })
  })

  socket.on('disconnect', (reason) => {
    console.log('user disconnected', reason)
  })
})
