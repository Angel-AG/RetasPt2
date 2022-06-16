const retaId = document.getElementById('reta-id').innerHTML;
async function toggleAttendance(e) {
    e.preventDefault();
    try {
        // eslint-disable-next-line no-undef
        await axios.put('/user/toggle_attendance', {
            retaId
        });
        // alert(JSON.stringify(response));
        window.location.reload();        
      } catch (error) {
        console.error(error);
        // alert(error.msg);
      }
}

async function deleteReta() {
    alert("Delete reta");
}

function assignImg(img){
    document.getElementById('retaImg').src = img;
}

function setImg(){
    const category = document.getElementById('data').value;
    if (category === 'Futbol'){
        assignImg('/images/futbol_cat.jpg');
    }
    else if (category === 'Golf'){
        assignImg('/images/golf_cat.jpg');
    }
    else if (category === 'Voleibol'){
        assignImg('/images/voley_cat.jpg');
    }
    else if (category === 'Baloncesto'){
        assignImg('/images/basket_cat.jpg');
    }
    else if (category === 'Ajedrez'){
        assignImg('/images/chess_cat.jpg');
    }
    else if (category === 'Raquetbol'){
        assignImg('/images/raquet_cat.jpg');
    }
    else if (category === 'eSports'){
        assignImg('/images/esport_cat.jpg');
    }
    else if (category === 'Otro'){
        assignImg('/images/other_cat.jpg');
    }
    else{
        assignImg('/images/other_cat.jpg');
    }
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
    setImg();
}
  
document.addEventListener('DOMContentLoaded', init, false);