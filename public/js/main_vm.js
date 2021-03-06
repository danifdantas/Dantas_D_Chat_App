import ChatMessage from './modules/ChatMessage.js';

const socket = io();
function logConnect({ sID, message }) {
  // debugger;
  console.log(sID, message);
  vm.socketID = sID;
}

function appendMessage(message) {
  vm.messages.push(message);
}

// create Vue instance
const vm = new Vue({
  data: {
    socketID: "",
    nickname: "",
    message: "",
    messages: [],
    users: []
  },
  methods: {
    saveUser() {
      // this.users.push(this.nickname);
      socket.emit('nickname', this.nickname);
      let chat = document.querySelector('#chat');
      chat.classList.remove('hidden');
      let login = document.querySelector('#login');
      login.style.display = "none";
    },
    dispatchMessage() {
      var d = new Date();
      var time = '[' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + '] ';
      // emit message event from the client side if nickname is nothing set it to anonymous
      socket.emit('chat message', { content: this.message, name: time + this.nickname || "Anonymous" });
      //reset the message field
      this.message = "";
    }
  },
  components: {
    newmessage: ChatMessage
  }
}).$mount(`#app`);

socket.on('connected', logConnect);
socket.addEventListener('chat message', appendMessage);
socket.addEventListener('disconnect', appendMessage);