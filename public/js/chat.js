const socket = io('http://localhost:3333');

let room_id;

function onLoad() {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name');
  const email = urlParams.get('email');
  const avatar = urlParams.get('avatar');

  document.querySelector('.user_logged').innerHTML += `
    <img
      class="avatar_user_logged"
      src="${avatar}"
    />
    <strong id="user_logged">${name}</strong>
  `;

  socket.emit('chat:createAccount', {
    name,
    email,
    avatar,
  });

  socket.on('chat:newUsers', (data) => addUser(data));

  socket.emit('chat:getUsers', (users) => users.map((user) => addUser(user)));

  socket.on('chat:message', (data) => {
    if (data.message.room_id === room_id) {
      addMessage(data);
    }
  });

  socket.on('chat:notification', ({ room_id: roomId, from }) => {
    if (room_id === roomId) return;
    const userDiv = document.getElementById(`user_${from._id}`);

    userDiv.insertAdjacentHTML(
      'afterbegin',
      `
      <div class="notification"/>
    `
    );
  });
}

document.getElementById('users_list').addEventListener('click', (e) => {
  const messageInput = document.getElementById('user_message');
  messageInput.classList.remove('hidden');

  document
    .querySelectorAll('li.user_name_list')
    .forEach((item) => item.classList.remove('user_in_focus'));

  document.getElementById('message_user').innerHTML = '';
  if (e.target && e.target.matches('li.user_name_list')) {
    const idUser = e.target.getAttribute('idUser');
    const notification = document.querySelector(
      `#user_${idUser} .notification`
    );

    e.target.classList.add('user_in_focus');

    if (notification) notification.remove();

    socket.emit('chat:initPrivate', { idUser }, (room, messages) => {
      room_id = room.id;
      messages.map((message) => addMessage({ message }));
    });
  }
});

document.getElementById('user_message').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const message = e.target.value;
    e.target.value = '';

    socket.emit('chat:message', { message, room_id });
  }
});

function addMessage(data) {
  const messages = document.getElementById('message_user');

  messages.innerHTML += `
  <span class="user_name user_name_date">
    <img class="img_user" src="${data.message.from.avatar}" />
    <strong>${data.message.from.name}</strong>
    <span class="message_date">${dayjs(data.message.created_at)
      .utc()
      .format('DD/MM/YYYY [às] HH:mm')}</span>
  </span>
  <div class="messages">
    <span class="chat_message">${data.message.message}</span>
  </div>
  `;
}

function addUser(user) {
  const findUser = document.getElementById(`user_${user._id}`);
  if (findUser) return;
  const userList = document.getElementById('users_list');
  userList.innerHTML += `
  <li class="user_name_list" id="user_${user._id}" idUser="${user._id}">
    <img class="nav_avatar" src="${user.avatar}" />
    ${user.name}
  </li>
  `;
}

onLoad();
