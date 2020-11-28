// eslint-disable-next-line no-undef
const socket = io()

const form = document.getElementById('form')
const message = document.getElementById('message')
const username = document.getElementById('username')
const output = document.getElementById('output')
const actions = document.getElementById('actions')

const processForm = (e) => {
  if (e.preventDefault) e.preventDefault()
  socket.emit('chat:message', {
    username: username.value,
    message: message.value
  })
  message.value = ''
}

form.addEventListener('submit', processForm)
message.addEventListener('keypress', () => {
  socket.emit('chat:typing', { username: username.value })
})

socket.on('chat:message', (data) => {
  actions.innerHTML = ''
  output.innerHTML += `<p>
    <strong>
      ${data.username}
    </strong>:
    ${data.message}
  </p>`
})

socket.on('chat:typing', (data) => {
  actions.innerHTML = `<p>
    <em>
      ${data.username} is writing
    </em>
  </p>`
})
