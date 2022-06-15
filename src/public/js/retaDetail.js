const retaId = document.getElementById('reta-id').innerHTML;
async function toggleAttendance(e) {
    e.preventDefault();
    try {
        // eslint-disable-next-line no-undef
        const response = await axios.post('/user/toggle_attendance', {
            retaId
        });
        console.log(response);
        window.location.reload();        
      } catch (error) {
        console.error(error);
        document.getElementById('passwordFeedback').textContent =
          error.response.data.message;
        // alert(error.msg);
      }
}

async function deleteReta() {
    alert("Delete reta");
}

function init() {
    const editRetaBtn = document.getElementById("edit-reta-button");
    const toLoginBtn = document.getElementById("to-login-btn");
    const toggleAttendanceBtn = document.getElementById("toggle-attendance-btn");
    const deleteRetaBtn = document.getElementById("delete-reta-btn");
    if (deleteRetaBtn && editRetaBtn) {
        editRetaBtn.addEventListener('click', () => location.assign('/retas/edit_reta/' + retaId));
        deleteRetaBtn.addEventListener('click', () => deleteReta());
    } else if (toLoginBtn) {
        toLoginBtn.addEventListener('click', () => location.assign('/login')); 
    } else {
        toggleAttendanceBtn.addEventListener('click', toggleAttendance);
    }
}
  
document.addEventListener('DOMContentLoaded', init, false);