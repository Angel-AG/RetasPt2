async function logout() {
    try {
        // eslint-disable-next-line no-undef
        const response = await axios.post('/user/logout');
        console.log(response);
        sessionStorage.setItem("user", "");
        location.assign('/');
      } catch (error) {
        console.error(error);
        // alert(error.msg);
      }
}

function init() {
    document.getElementById('logout-button').addEventListener('click', logout);
}
  
document.addEventListener('DOMContentLoaded', init, false);