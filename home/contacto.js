const input_text = document.querySelector('#nombre-text');
const input_numero = document.querySelector('#numero');
const form = document.querySelector('#formulario');
const lista = document.querySelector('#lista');
const deletedBtn = document.querySelector('.btn-deleted')
let validationInput = false;

form.addEventListener ('submit', async e => {
    e.preventDefault();

   // Servidor // ----------------

    if (input_numero.value === '') {
 
    } else {
        const responseJSON = await fetch('http://localhost:3000/contacto', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    
    body: JSON.stringify({nombre: input_text.value, numero: input_numero.value}),
});
    response = await responseJSON.json();
    }

    
    




//  Fin del servidor // ----------

    input_numero.classList = 'numero';
    if(!validationInput) {
        alert('Complete el campo');
        input_numero.classList = 'invalidNumber';
    } else if (input_numero.value === '') {
        console.log('Por favor, introduzca un numero');
    } 
    else {
    const nombre = input_text.value;
    const numero = input_numero.value;
    const contacto = document.createElement('li');
    contacto.innerHTML =`
        <li class="contacto-item" id="${response.id}">
            <p>${nombre}</p>
            <p class="number">${numero}</p>
            <button class="btn-deleted">✖</button>
        </li>
    `;
    
    lista.append(contacto);
    input_text.value = '';
    input_numero.value = '';
    localStorage.setItem('lista', lista.innerHTML);
    }
    
    validationInput = false;
})

lista.addEventListener('click',async e => {
    if (e.target.classList.contains('btn-deleted')) {
        const id = e.target.parentElement.id;
        await fetch(`http://localhost:3000/contacto/${id}`, {method: 'DELETE'});
        e.target.parentElement.remove();
    }
})

const getContactos = async () => {
    const response = await fetch('http://localhost:3000/contacto', {method: 'GET'});
    const contactos = await response.json();
    // console.log(contactos);
    contactos.forEach(contacto => {
        const lisItem = document.createElement('li');
        lisItem.innerHTML = `
        <li class="contacto-item" id="${contacto.id}">
            <p>${contacto.nombre}</p>
            <p class="number">${contacto.numero}</p>
            <button class="btn-deleted">✖</button>
        </li>
        `;
        lista.append(lisItem);
        })
}

getContactos();


input_numero.addEventListener ('input', e => {
    const PHONE_REGEX = /^([0-9]){3}-[0-9]{7}$/;
    const isValid = PHONE_REGEX.test(e.target.value);
    

    if(isValid == true) {
        input_numero.setAttribute('class','validNumber' )
        validationInput = true;
    } else {
        validationInput = false;
        input_numero.setAttribute('class', 'invalidNumber' )

    }
   })


const memory = () => {
    lista.innerHTML = localStorage.getItem('lista');
    const array = [...contacto.children];
    array.forEach(li => {
        li.children[0].addEventListener('click', e => {
            e.target.parentElement.remove();
            localStorage.setItem('lista', lista.innerHTML);
        })
    })
}
