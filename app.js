   
       
       // Import the functions you need from the SDKs you need
       import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
       import { getDatabase, ref, onValue, set} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
       
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
const dbRefVent = ref(database, "/ventilador");

//////////////


// Utiliza la referencia correcta para el ventilador

// Obtener referencia al botón y al span para mostrar el estado
const btnVentilador = document.getElementById("btn-ventilador");
const spanEstadoVentilador = document.getElementById("valor-actual-humo");

// Variable para almacenar el estado actual del ventilador
let ventiladorEncendido = false;

// Función para cambiar el estado del ventilador y enviar el valor a la base de datos
function toggleVentilador() {
    ventiladorEncendido = !ventiladorEncendido;

    if (ventiladorEncendido) {
        btnVentilador.textContent = "Apagar Ventilador";
        spanEstadoVentilador.textContent = "Encendido";
        btnVentilador.style.backgroundColor = "#DB3434"; // Rojo
        set(dbRefVent, true);
    } else {
        btnVentilador.textContent = "Encender Ventilador";
        spanEstadoVentilador.textContent = "Apagado";

        btnVentilador.style.backgroundColor = "#4CAF50"; // Verde
        set(dbRefVent, false);
    }
}

// Agregar un listener de clic al botón
btnVentilador.addEventListener("click", toggleVentilador);

// Función para leer el estado inicial del ventilador al cargar la página
function leerEstadoInicialVentilador() {
    onValue(dbRefVent, (snapshot) => {
        if (snapshot.exists()) {
            ventiladorEncendido = snapshot.val();
            actualizarTextoBoton();
        } else {
            console.log("No hay datos disponibles para el ventilador");
        }
    });
}

// Función para actualizar el texto del botón según el estado actual del ventilador
function actualizarTextoBoton() {
    if (ventiladorEncendido) {
        btnVentilador.textContent = "Apagar Ventilador";
        spanEstadoVentilador.textContent = "Encendido";
    } else {
        btnVentilador.textContent = "Encender Ventilador";
        spanEstadoVentilador.textContent = "Apagado";
    }
}

// Llama a la función para leer el estado inicial al cargar la página
leerEstadoInicialVentilador();


/////////////////



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