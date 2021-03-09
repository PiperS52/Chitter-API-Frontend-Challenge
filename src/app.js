
function showPeeps() {
  var x = document.getElementById("toDislay");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = 'none';
  }
}

fetch("https://chitter-backend-api-v2.herokuapp.com/peeps"
)
.then((response) => response.json())
.then((data) => {

  data.forEach(item => {
    console.log(item.user.handle)
    let peep = item.body
    let created = "posted at " + (item.created_at).slice(0, 16).replace('T',' ')
    let author = "by @" + item.user.handle

    let html = `<div class="indiv-peep">
    <p class="body">${peep}</p>
    <p class="created">${created}</p>
    <p class="author">${author}</p>`

    document.getElementById('peepsList').insertAdjacentHTML('afterend', html);
  })
});

document.getElementById("signUpButton").onclick = function() {
  const newUser = document.getElementById("username").value;
  console.log(newUser)
  const newPassword = document.getElementById("password").value;
  fetch("https://chitter-backend-api-v2.herokuapp.com/users",{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( { "user": {"handle":newUser, "password":newPassword}} )
  })
  .then(response => {
    if (response.ok) {
      $('#signUpNotification').text('Thank you - You have now signed up')
    } else {
      $('#signUpNotification').text('Those details are already taken - please try again')
    }
  })
  .catch(error => {
    console.log(error);
  });
};


document.getElementById("signInButton").onclick = function() {
  const prevUser = document.getElementById("prevUsername").value;
  const prevPassword = document.getElementById("prevPassword").value;
  fetch("https://chitter-backend-api-v2.herokuapp.com/sessions", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( { "session": {"handle":prevUser, "password":prevPassword}} )
  })
  .then(res => res.json())
  .then(response => {
    if (response.user_id) {
      // console.log(response.user_id)
      // console.log(response.session_key)
      $('#signInNotification').text('You are signed in');
      saveSessionDetails(response, prevUser)
    } else {
      $('#signInNotification').text('Unsuccessful - please try again')
    }
  })
  .catch(error => {
    console.log(prevUser);
  });
};

function saveSessionDetails(response, username){
  sessionStorage.setItem('username', username);
  sessionStorage.setItem('id', response.user_id);
  sessionStorage.setItem('session_key', response.session_key);
  console.log("saved - success!");
  console.log(response.session_key);
}

document.getElementById("postPeep").onclick = function() {
  const newPeep = document.getElementById("newPeep").value;
  const key = sessionStorage.getItem('session_key');
  const id = sessionStorage.getItem('id');
  fetch("https://chitter-backend-api-v2.herokuapp.com/peeps", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token token=${sessionStorage.getItem('session_key')}`
    },
    body: JSON.stringify( { "peep": {"user_id":sessionStorage.getItem('id'), "body":newPeep}} )
  })
  .then(res => res.json())
  .then(response => {
    if (response.body === newPeep) {
      console.log('Successful posting', response);
      $('#peepPostNotification').text('Peep successfully posted!')
    } else {
      $('#peepPostNotification').text('Unsuccessful - please try posting again')
    }
  })
  .catch(error => {
    console.log(error);
  });
}



// kay: user_id: 34
