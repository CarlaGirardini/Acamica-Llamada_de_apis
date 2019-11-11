// La api usada está en https://github.com/thm/uinames


var hombre = document.getElementById('hombre');
var mujer = document.getElementById('mujer');
var otro = document.getElementById('otro');

const http = new XMLHttpRequest();
var generoElegido;
var name = document.getElementById('name');
var surname = document.getElementById('surname');
var gender = document.getElementById('gender');
var region = document.getElementById('region');
var cargando = document.getElementsByClassName('cargando');

// Lo ejecuta mal, pero no siempre
hombre.addEventListener('click', () => inicializar('?gender=male'));
mujer.addEventListener('click', () => inicializar('?gender=female'));
otro.addEventListener('click', () => inicializar(''));

function toggleCargando(){
    console.log('Ejecute toggle');
    console.log('cargando.item(0)', cargando.item(0));
    cargando.item(0).classList.toggle('hidden');
}

function inicializar(generoElegido) {
    toggleCargando();
    const url = `https://uinames.com/api/${generoElegido}`;
    http.open('GET', url);
    http.send();
    
    http.onreadystatechange = function () {
        toggleCargando();
        if (this.readyState == 4 && this.status == 200) {
            console.log('respuesta', http.responseText);
            const res = JSON.parse(this.responseText);
            name.innerText = res.name;
            surname.innerText = res.surname;
            // Agrego el if para que el género lo muestre en español:
            if(res.gender==='female'){
                gender.innerText = 'mujer';
            }
            else{
                gender.innerText = 'hombre';
            }
            region.innerText = res.region;
        }
    }
}