// Contraseña para habilitar la edición (deberías cambiarla a algo privado)
const password = "samuel";

let isEditing = false;

// Solicitar la contraseña para activar el modo de edición
function promptPassword() {
    const userPassword = prompt("Por favor, ingresa la contraseña para editar:");
    
    if (userPassword === password) {
        toggleEditMode(true);
        document.getElementById('saveButton').style.display = 'inline'; // Mostrar botón de guardar
        alert("Modo de edición activado.");
    } else {
        alert("Contraseña incorrecta. No tienes permisos para editar.");
    }
}

// Habilitar o deshabilitar el modo de edición
function toggleEditMode(enableEditing) {
    isEditing = enableEditing;

    const editableElements = document.querySelectorAll('[contenteditable]');
    editableElements.forEach(element => {
        element.setAttribute('contenteditable', isEditing);
    });
}

// Guardar los cambios en el almacenamiento local
function saveChanges() {
    if (isEditing) {
        const sections = document.querySelectorAll('[contenteditable]');
        sections.forEach((section, index) => {
            localStorage.setItem('editable-section-' + index, section.innerHTML);
        });

        toggleEditMode(false);
        document.getElementById('saveButton').style.display = 'none'; // Ocultar botón de guardar
        alert("Los cambios se han guardado localmente.");
    } else {
        alert("No hay cambios que guardar.");
    }
}

// Cargar el contenido guardado al cargar la página
window.onload = function() {
    const sections = document.querySelectorAll('[contenteditable]');
    sections.forEach((section, index) => {
        const savedContent = localStorage.getItem('editable-section-' + index);
        if (savedContent) {
            section.innerHTML = savedContent;
        }
    });
};
