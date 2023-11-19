   
       
       // Import the functions you need from the SDKs you need
       import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
       import { getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
       
       // TODO: Add SDKs for Firebase products that you want to use
       // https://firebase.google.com/docs/web/setup#available-libraries
     
       // Your web app's Firebase configuration
       const firebaseConfig = {
        apiKey: "AIzaSyAZnjktraK3pDGm3aX1c38ZNPHI_LO8_i8",
        authDomain: "isom-86b29.firebaseapp.com",
        databaseURL: "https://isom-86b29-default-rtdb.firebaseio.com",
        projectId: "isom-86b29",
        storageBucket: "isom-86b29.appspot.com",
        messagingSenderId: "741442554813",
        appId: "1:741442554813:web:2e167ec8c84a7a1a0f60d4",
        measurementId: "G-ZTKNTRN0H5"
       };
     
       // Initialize Firebase
       const app = initializeApp(firebaseConfig);
       const database = getDatabase();

const dbRefHumedad = ref(database, "/humedad");
const dbRefTemperatura = ref(database, "/temperatura");
const dbRefHumo = ref(database, "/humo");
const dbRefLuz = ref(database, "/luz");
const dbRefMonoxido = ref(database, "/monoxido");

let alertaMostrada = false;

function mostrarAlerta() {
    const alerta = document.getElementById("alerta");
    alerta.style.display = "block";
}

function ocultarAlerta() {
    const alerta = document.getElementById("alerta");
    alerta.style.display = "none";
}

function leerValores() {
    // Leer humedad
    onValue(dbRefHumedad, (snapshotHumedad) => {
        if (snapshotHumedad.exists()) {
            const humedad = snapshotHumedad.val();
            console.log("Humedad leída:", humedad);
            document.getElementById("valor-humedad").textContent = `Humedad: ${humedad}%`;
        } else {
            console.log("No hay datos de humedad disponibles");
        }
    });

    onValue(dbRefLuz, (snapshotLuz) => {
        if (snapshotLuz.exists()) {
            const luz = snapshotLuz.val();
            console.log("Luz leída:", luz);
            document.getElementById("valor-luz").textContent = `Luz: ${luz}%`;
        } else {
            console.log("No hay datos de luz disponibles");
        }
    });

    // Leer monóxido de carbono
    onValue(dbRefMonoxido, (snapshotMonoxido) => {
        if (snapshotMonoxido.exists()) {
            const monoxido = snapshotMonoxido.val();
            console.log("Nivel de Monóxido de Carbono leído:", monoxido);
            document.getElementById("valor-monoxido").textContent = `Monóxido de Carbono: ${monoxido} ppm`;
        } else {
            console.log("No hay datos de monóxido de carbono disponibles");
        }
    });

    // Leer temperatura
    onValue(dbRefTemperatura, (snapshotTemperatura) => {
        if (snapshotTemperatura.exists()) {
            const temperatura = snapshotTemperatura.val();
            console.log("Temperatura leída:", temperatura);
            document.getElementById("valor-temperatura").textContent = `Temperatura: ${temperatura} °C`;
        } else {
            console.log("No hay datos de temperatura disponibles");
        }
    });

    //Leer humo
    onValue(dbRefHumo, (snapshotHumo) => {
        if (snapshotHumo.exists()) {
            const humo = snapshotHumo.val();
            console.log("Estado de humo leído:", humo);
            document.getElementById("valor-humo").textContent = `Humo: ${humo ? 'Detectado' : 'No detectado'}`;
            
            // Muestra u oculta la alerta según el estado de humo
            if (humo && !alertaMostrada) {
                mostrarAlerta();
            } else {
                ocultarAlerta();
            }
        } else {
            console.log("No hay datos de humo disponibles");
        }
    });


    
}


// Actualiza el valor cada 5 segundos
setInterval(leerValores, 1000);

// Llama a la función para actualizar el valor al cargar la página
leerValor();
