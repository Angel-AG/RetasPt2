function assign(pos, cl, msg) {
    document.getElementById(pos).className = cl;
    document.getElementById(pos).textContent = msg;
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
            assign('categoriaRetaFeedback', s, 'Categoría lista!');
        }
    }

    else if (nom === "min_participants") {
        if (e.target.value === '') {
            assign('minParticipantesRetaFeedback', d, '2 o más jugadores');
        } else {
            assign('minParticipantesRetaFeedback', s, '2 o más jugadores');
        }
    }

    else if (nom === "max_participants") {
        if (e.target.value === '') {
            assign('maxParticipantesRetaFeedback', d, 'Mayor o igual al mínimo');
        } else {
            assign('maxParticipantesRetaFeedback', s, 'Mayor o igual al mínimo');
        }
    }

    else if (nom === "date") {
        if (e.target.value === '') {
            assign('fechaRetaFeedback', d, 'Elige una fecha.');
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
        if (e.target.value === '') {
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
    if (!max_participants) {
        errorFound = true;
    }
    if (!date) {
        errorFound = true;
    }
    if (!time) {
        errorFound = true;
    }
    if (!duration) {
        errorFound = true;
    }
    if (!is_private) {
        errorFound = true;
    }
    if (errorFound) {
      return;
    }

var nuevaReta = new FormData();
nuevaReta = {
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
    admin: null,
    is_active: true
};

    try {
      const response = await axios.post('/retas/', nuevaReta);
      numReta = response.data.newReta.id;
      window.location.assign('/retas/' + numReta);
      // other sucess mesage
    } catch (error) {
        console.error(error);
        // show error 
    }
}

function init() {
    document.getElementById('retaForm').addEventListener('submit', retaSubmit);
    document.getElementById('name').addEventListener('change', onInputChange);
    document.getElementById('location').addEventListener('change', onInputChange);
    document.getElementById('category').addEventListener('change', onInputChange);
    document.getElementById('is_private').addEventListener('change', onInputChange);
    document.getElementById('date').addEventListener('change', onInputChange);
    document.getElementById('time').addEventListener('change', onInputChange);
    document.getElementById('duration').addEventListener('change', onInputChange);
    document.getElementById('min_participants').addEventListener('change', onInputChange);
    document.getElementById('max_participants').addEventListener('change', onInputChange);
}
  
document.addEventListener('DOMContentLoaded', init, false);
  