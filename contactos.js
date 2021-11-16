const firebaseConfig = {
    apiKey: "AIzaSyCH1g75_Vml4Eak0CVftjD5tkao_yH-9Ws",
    authDomain: "app-registro-222c4.firebaseapp.com",
    projectId: "app-registro-222c4",
    storageBucket: "app-registro-222c4.appspot.com",
    messagingSenderId: "1011958544856",
    appId: "1:1011958544856:web:3aca761ac6044801d89aad",
    measurementId: "G-JHMQQ16QX0"
  };
  
  const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
  
  let nombre = document.getElementById("name");
  let cel = document.getElementById("celphone");
  let save_btn = document.getElementById("save-btn");
  let lista = document.getElementById("lista");
  save_btn.addEventListener("click", () => {
    let data = {
      nombre: nombre.value,
      celular: cel.value,
    };
    save_data_firebase(data);
  });
  
  const save_data_firebase = (d) => {
    db.collection("contactos")
      .add(d)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        get_data_firebase();
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };
  
  let contactos_arr = [];
  
  const get_data_firebase = () => {
    contactos_arr = [];
    db.collection("contactos")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          contactos_arr.push(doc.data());
        });
        buildList();
      });
  };
  
  const buildList = () => {
    lista.innerHTML = "";
    contactos_arr.forEach((e) => {
      lista.insertAdjacentHTML(
        "beforeend",
        `
       <li>${e.nombre} - ${e.celular}</li>
      `
      );
    });
  };
  
  get_data_firebase();