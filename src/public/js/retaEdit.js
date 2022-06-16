var myArray = [];
function readData(){
    var str = document.getElementById('data').value;
    myArray = str.split(" ", 10);
    getMonth(myArray[7]);
}

function getMonth(month){
    switch (month) {
        case "Jan":
            myArray[7] = "01";
            break;
        case "Feb":
            myArray[7] = "02";
            break;
        case "Mar":
            myArray[7] = "03";
            break;
        case "Apr":
            myArray[7] = "04";
            break;
        case "May":
            myArray[7] = "05";
            break;
        case "Jun":
            myArray[7] = "06";
            break;
        case "Jul":
            myArray[7] = "07";
            break;
        case "Aug":
            myArray[7] = "08";
            break;
        case "Sep":
            myArray[7] = "09";
            break;
        case "Oct":
            myArray[7] = "10";
            break;
        case "Nov":
            myArray[7] = "11";
            break;
        case "Dec":
            myArray[7] = "12";
            break;
    }
}

function assign(pos, cl, msg) {
    document.getElementById(pos).className = cl;
    document.getElementById(pos).textContent = msg;
}

function assignImg(img){
    document.getElementById('imgReta').src = img;
}

function categoryImg(e){
    const category = e.target.value;
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

function catImg(category){
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

function initialize(){
    const s = "px-3 pt-2 text-success";
    const d = "px-3 pt-2 text-danger";
    assign('nombreRetaFeedback', s, '¡Buen nombre!');
    assign('lugarRetaFeedback', s, '¡Lugar listo!');
    document.getElementById('category').value = myArray[0];
    catImg(myArray[0]);
    assign('categoriaRetaFeedback', s, '¡Categoría lista!');
    assign('minParticipantesRetaFeedback', s, '2 o más jugadores');
    assign('maxParticipantesRetaFeedback', s, 'Mayor o igual al mínimo');
    document.getElementById('date').value = myArray[9] + "-" + myArray[7] + "-" + myArray[8];
    assign('fechaRetaFeedback', s, '¡Fecha lista!');
    document.getElementById('time').value = String(myArray[4]) + ":" + String(myArray[5]);
    assign('horaRetaFeedback', s, 'Hora lista!');
    assign('duracionRetaFeedback', s, '0.5 o más horas');
    document.getElementById('is_private').value = myArray[1];
    assign('privacidadRetaFeedback', s, '¡Privacidad lista!');
}

function onInputChange(e) {
    var nom = e.target.name;
    const s = "px-3 pt-2 text-success";
    const d = "px-3 pt-2 text-danger";

    if (nom === "name") {
        if (e.target.value === '') {
            assign('nombreRetaFeedback', d, 'Sin nombre, escribe uno para tu reta.');
        } else {
            assign('nombreRetaFeedback', s, '¡Buen nombre!');
        }
    }

    else if (nom === "location") {
        if (e.target.value === '') {
            assign('lugarRetaFeedback', d, 'Sin ubicación, escribe una para tu reta.');
        } else {
            assign('lugarRetaFeedback', s, '¡Lugar listo!');
        }
    }

    else if (nom === "category") {
        if (e.target.value === '') {
            assign('categoriaRetaFeedback', d, 'Elige una categoría.');
        } else {
            assign('categoriaRetaFeedback', s, '¡Categoría lista!');
        }
    }

    else if (nom === "min_participants") {
        if (e.target.value === '' || Number(e.target.value) < 2) {
            assign('minParticipantesRetaFeedback', d, '2 o más jugadores');
        } else if(Number(e.target.value) > Number(document.getElementById("max_participants").value)) {
            assign('maxParticipantesRetaFeedback', d, 'Mayor o igual al mínimo');
        } else {
            assign('minParticipantesRetaFeedback', s, '2 o más jugadores');
            assign('maxParticipantesRetaFeedback', s, 'Mayor o igual al mínimo');
        }
    }

    else if (nom === "max_participants") {
        if (e.target.value === '' || Number(e.target.value) < Number(document.getElementById("min_participants").value)) {
            assign('maxParticipantesRetaFeedback', d, 'Mayor o igual al mínimo');
        } else {
            assign('maxParticipantesRetaFeedback', s, 'Mayor o igual al mínimo');
        }
    }

    else if (nom === "date") {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const inputDate = new Date(e.target.value.replace(/-/g, '/'));
        if (inputDate === '') {
            assign('fechaRetaFeedback', d, 'Elige una fecha.');
        } else if(inputDate < today) {
            assign('fechaRetaFeedback', d, 'La fecha ya ha pasado.');
        } else {
            assign('fechaRetaFeedback', s, '¡Fecha lista!');
        }
    }

    else if (nom === "time") {
        if (e.target.value === '') {
            assign('horaRetaFeedback', d, 'Elige una hora.');
        } else {
            assign('horaRetaFeedback', s, 'Hora lista!');
        }
    }

    else if (nom === "duration") {
        if (e.target.value === '' || Number(e.target.value) < 0.5) {
            assign('duracionRetaFeedback', d, '0.5 o más horas');
        } else {
            assign('duracionRetaFeedback', s, '0.5 o más horas');
        }
    }

    else if (nom === "is_private") {
        if (e.target.value === '') {
            assign('privacidadRetaFeedback', d, 'Elige la privacidad.');
        } else {
            assign('privacidadRetaFeedback', s, '¡Privacidad lista!');
        }
    } 
}

async function retaSubmit(e) {
    e.preventDefault();
    const inputs = {
        name: e.target.name.value,
        location: e.target.location.value,
        category: e.target.category.value,
        min_participants: e.target.min_participants.value,
        max_participants: e.target.max_participants.value,
        date: e.target.date.value,
        time: e.target.time.value,
        duration: e.target.duration.value,
        is_private: e.target.is_private.value,
    };
    let { name, location, category, min_participants, max_participants, date, time, duration, is_private } = inputs;
  
    let errorFound = false;
    if (!name) {
      errorFound = true;
    }
    if (!location) {
        errorFound = true;
    }
    if (!category) {
        errorFound = true;
    }
    if (!min_participants) {
        errorFound = true;
    }
    if (Number(min_participants) < 2) {
        errorFound = true;
    }
    if (!max_participants) {
        errorFound = true;
    }
    if (Number(max_participants) < Number(min_participants)) {
        errorFound = true;
    }
    if (!date) {
        errorFound = true;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const inputDate = new Date(date.replace(/-/g, '/'));
    if (inputDate < today) {
        errorFound = true;
    }
    if (!time) {
        errorFound = true;
    }
    if (!duration) {
        errorFound = true;
    }
    if (Number(duration) < 0.5) {
        errorFound = true;
    }
    if (!is_private) {
        errorFound = true;
    }
    if (errorFound) {
      return;
    }

var updateReta = new FormData();
updateReta = {
    name: inputs.name,
    description: "Soy una reta",
    location: inputs.location,
    category: inputs.category,
    min_participants: Number(inputs.min_participants),
    max_participants: Number(inputs.max_participants),
    date: new Date(inputs.date),
    hours: Number(inputs.time.split(":")[0]),
    minutes: Number(inputs.time.split(":")[1]),
    duration: Number(inputs.duration),
    is_private: inputs.is_private === "true",
    confirmed_users: null,
    admin: myArray[3],
    is_active: true,
    retaId: myArray[2]
};

    try {
      const response = await axios.put('/retas/', updateReta);
      numReta = response.data;
      console.log(numReta);
      window.location.assign('/retas/' + myArray[2]);
      // other sucess mesage
    } catch (error) {
        console.error(error);
        // show error 
    }
}

function init() {
    document.getElementById('retaForm').addEventListener('submit', retaSubmit);
    document.getElementById('name').addEventListener('input', onInputChange);
    document.getElementById('location').addEventListener('input', onInputChange);
    document.getElementById('category').addEventListener('input', onInputChange);
    document.getElementById('category').addEventListener('change', categoryImg);
    document.getElementById('is_private').addEventListener('input', onInputChange);
    document.getElementById('date').addEventListener('input', onInputChange);
    document.getElementById('time').addEventListener('input', onInputChange);
    document.getElementById('duration').addEventListener('input', onInputChange);
    document.getElementById('min_participants').addEventListener('input', onInputChange);
    document.getElementById('max_participants').addEventListener('input', onInputChange);
    readData();
    initialize();
}
  
document.addEventListener('DOMContentLoaded', init, false);