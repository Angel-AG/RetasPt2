async function loginSubmit(e) {
  e.preventDefault();
  const inputs = {
    username: e.target.usuario.value,
    password: e.target.password.value,
  };
  let { username, password } = inputs;

  let errorFound = false;

  if (!username) {
    document.getElementById('usuarioFeedback').textContent =
      'Escribe tu nombre de usuario.';
    errorFound = true;
  } else {
    document.getElementById('usuarioFeedback').textContent = '';
  }

  if (!password) {
    document.getElementById('passwordFeedback').textContent =
      'Escribe tu contraseña.';
    errorFound = true;
  } else {
    document.getElementById('passwordFeedback').textContent = '';
  }

  if (errorFound) {
    return;
  }

  try {
    // eslint-disable-next-line no-undef
    const response = await axios.post('/user/login', inputs);
    console.log(response);
    sessionStorage.setItem("user", response.data.user);
    location.assign('/');
  } catch (error) {
    console.error(error);
    document.getElementById('passwordFeedback').textContent =
      error.response.data.message;
    // alert(error.msg);
  }
}

function init() {
  document.getElementById('loginForm').addEventListener('submit', loginSubmit);
}

document.addEventListener('DOMContentLoaded', init, false);
