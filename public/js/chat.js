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
  `

  socket.emit('chat:createAccount', {
    name,
    email,
    avatar,
  });

  socket.on('chat:newUsers', data => addUser(data));

  socket.emit('chat:getUsers', users => users.map(user => addUser(user)));

  socket.on('chat:message', data => {
    console.log(data);
  })
}

document.getElementById('users_list').addEventListener('click', (e) => {
  if (e.target && e.target.matches('li.user_name_list')) {
    const idUser = e.target.getAttribute('idUser');

    socket.emit('chat:initPrivate', {idUser}, (room) => {
      room_id = room.id;
    })
  }
})


document.getElementById('user_message').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const message = e.target.value;
    e.target.value = '';

    socket.emit('chat:message', {message, room_id})
  }
})

function addUser(user) {
  const findUser = document.getElementById(`user_${user._id}`);
  if (findUser) return;
  const userList = document.getElementById("users_list")
  userList.innerHTML += `
  <li class="user_name_list" id="user_${user._id}" idUser="${user._id}">
  <img class="nav_avatar" src="${user.avatar}" />
  ${user.name}
  </li>
  `
};

onLoad();
