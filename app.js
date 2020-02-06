// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWdIyYqysnDoSss6hG-kkhkQiD6GiFcH0",
  authDomain: "crud-de-usuarios-aa233.firebaseapp.com",
  databaseURL: "https://crud-de-usuarios-aa233.firebaseio.com",
  projectId: "crud-de-usuarios-aa233",
  storageBucket: "crud-de-usuarios-aa233.appspot.com",
  messagingSenderId: "416479328180",
  appId: "1:416479328180:web:e028e177d48c6f2e6da4e1",
  measurementId: "G-XTL71Z7RVS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();

/* Guardar datos */
function guardar() {
  var nombre = document.getElementById('nombre').value;
  var apellido = document.getElementById('apellido').value;
  var fecha = document.getElementById('fecha').value;

  db.collection("users").add({
    first: nombre,
    last: apellido,
    born: fecha
  })
    .then(function (docRef) {

      console.log("Document written with ID: ", docRef.id);

      Swal.fire({
        title: '',
        text: 'Document written with ID: ' + docRef.id,
        icon: 'success',
        confirmButtonText: 'Ok'
      })

      document.getElementById('nombre').value = '';
      document.getElementById('apellido').value = '';
      document.getElementById('fecha').value = '';
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);

      Swal.fire({
        title: '',
        text: "Error adding document: " + error,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    });
}

/* Obtener datos */
var table = document.getElementById('tabla');

//db.collection("users").get().then((querySnapshot) => {
db.collection("users").onSnapshot((querySnapshot) => {
  table.innerHTML = '';
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);

    table.innerHTML +=
      `<tr>
        <th scope="row">${doc.id}</th>
          <td>${doc.data().first}</td>
          <td>${doc.data().last}</td>
          <td>${doc.data().born}</td>
          <th><button class="btn btn-warning" onclick="actualizar('${doc.id}', '${doc.data().first}', '${doc.data().last}', '${doc.data().born}')">Editar</button></th>
          <th><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></th>
      </tr>`
  });
});

/* Borrar datos */
function eliminar(id) {

  Swal.fire({
    icon: 'question',
    text: '¿Está seguro qué desea eliminar el registro?',
    showCancelButton: true,
    showCloseButton: true,
    confirmButtonText: 'Si',
    cancelButtonText: 'Cancelar'
  }).then(result => {

    if (result.value) {
      db.collection("users").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");

        Swal.fire({
          title: '',
          text: 'Document successfully deleted!',
          icon: 'success',
          confirmButtonText: 'Ok'
        })

      }).catch(function (error) {
        console.error("Error removing document: ", error);

        Swal.fire({
          title: '',
          text: "Error removing document: " + error,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      });
    }
  })
}

/* Actualizar datos */
function actualizar(id, nombre, apellido, fecha) {  

  Swal.fire({
    title: 'Actualizar datos',
    html:
      `<input type="text" name="nombre" id="nombre2" placeholder="nombre" class="form-control my-3" value="${nombre}">
       <input type="text" name="apellido" id="apellido2" placeholder="apellido" class="form-control my-3" value="${apellido}">
       <input type="text" name="fecha" id="fecha2" placeholder="fecha" class="form-control my-3" value="${fecha}">`,
    showCancelButton: true,
    showCloseButton: true,
    confirmButtonText: 'Actualizar',
    cancelButtonText: 'Cancelar'
  }).then(result => {

    if (result.value) {

      var userRef = db.collection("users").doc(id);
      var nombre2 = document.getElementById('nombre2').value;
      var apellido2 = document.getElementById('apellido2').value;
      var fecha2 = document.getElementById('fecha2').value;

      return userRef.update({
        first: nombre2,
        last: apellido2,
        born: fecha2
      })
        .then(function () {
          console.log("Document successfully updated!");

          Swal.fire({
            title: '',
            text: 'Document successfully updated!',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);

          Swal.fire({
            title: '',
            text: "Error updating document: " + error,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        });
    }
  })
}