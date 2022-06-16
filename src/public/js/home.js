function categories(e) {
    console.log('categories');
}

function init() {
    document.getElementById('btnCat1').addEventListener('click', categories);
    console.log('init');
}
  
document.addEventListener('DOMContentLoaded', init, false);