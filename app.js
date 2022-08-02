/*
    * descomenta solo los // y completa el codigo que falta
    * utiliza estas variables ya inicializadas
    * analiza el html para entender la estructura
*/
const random_colors = ["#c2ff3d","#ff3de8","#3dc2ff","#04e022","#bc83e6","#ebb328"];
let notes = {}
const noteInput = document.getElementById('noteInput');
const template = document.getElementById('template').content
const listNotes = document.getElementById('list-notes')
/* ***** */

/* crea el fragment */
const fragment = document.createDocumentFragment()
/* ***** */

document.addEventListener('DOMContentLoaded', () => {
    noteInput.select()
    if (localStorage.getItem('notes')) {
        notes = JSON.parse(localStorage.getItem('notes'))
    }
    printNotes()
})

noteInput.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        /* almancena en text el valor del textarea mediante su id  */
        const text = document.getElementById('noteInput').value;
        createStickyNote(text);
    }
});

/* agrega el evento click a la lista de notas y conecta con la funcion clickNote */
listNotes.addEventListener("click", (e)=>{clickNote(e)});
/* ******** */

const createStickyNote = text => {
    if (text.trim() === '') {
        return
    }
    const index = parseInt(Math.random() * (6 - 0) + 0); 
    const color = random_colors[index]; 
    const newNote = {  
        id: Date.now(),
        color,
        text
    };
    noteInput.value = ''; 
    notes[newNote.id] = newNote 
    console.log(notes);
    printNotes()
}

const printNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes))
    /* deja vacio el contenido de la lista de notas  */
    listNotes.innerHTML=''
    /* ******** */

    Object.values(notes).forEach(note => {
        const clone = template.cloneNode(true)
        /* apartir de la plantilla 'clone' busca .detail y agrega el texto de la nota */
        clone.querySelector('.detail').textContent=note.text
        /* ******** */
       
        /* apartir de la plantilla 'clone' busca .note agrega el color de la nota y agregale el atributo id de la nota */
        clone.querySelector('.note').style.background=note.color
        clone.querySelectorAll('.note')[0].dataset.id=note.id
        /* ******** */

        /* opten el primer nodo del fragment como nodo de referencia */
        const referenceNode = fragment.firstChild;
        /* ******** */

        /* inserta clone como primer elemento en el fragment utilizando el nodo de referencia obtenido  */
        fragment.insertBefore(clone,referenceNode)
        /* ******** */

    })
    /* inserta el fragment en la lista de notas */
    listNotes.appendChild(fragment);
    /* ******** */
    console.log(notes);
}

const clickNote = e => {
    console.log(e);
    if(e.target.ariaLabel === 'delete') {
        const note = e.srcElement.parentElement
        /* opten el atributo id de note */
        const id = note.getAttribute("data-id");
        /* ******** */
        console.log(note);
        console.log(id);
        /* elimina el elemento note */
        note.remove();
        /* ******** */
        delete notes[id]
        localStorage.setItem('notes', JSON.stringify(notes))
    }
    e.stopPropagation()
}
