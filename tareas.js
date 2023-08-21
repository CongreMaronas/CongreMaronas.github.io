// URL de la API de Google Sheets
var csvUrl = "https://docs.google.com/spreadsheets/d/1kmwcFrbbZuHxIbjc8Ow13_ANCS1Vib85fgD_pgy6cUQ/export?format=csv";


var columna = 1;

//Número más cercano, retorna índice del array
const closestIndex = (num, arr) => {
    let curr = arr[0], diff = Math.abs(num - curr);
    let index = 0;
    for (let val = 0; val < arr.length; val++) {
        let newdiff = Math.abs(num - arr[val]);
        if (newdiff < diff) {
            diff = newdiff;
            curr = arr[val];
            index = val;
        };
    };
    return index;
};

//Carga fecha actual, elije la columna más cercana al día 
function loadDates() {
    fetch(csvUrl)
        .then(response => response.text())
        .then(data => {
            var lines = data.split('\n');
            const fechas = [];
            for (var i = 1; i < lines.length; i++) {
                var cells = lines[i].split(',');

                fechas.push(cells[0].match(/\d+/)[0]);

            }

            var actualDate = new Date().getDate();
            if (actualDate <= fechas[closestIndex(actualDate, fechas)]){
                columna = closestIndex(actualDate, fechas)+1;
            }else {
                columna = closestIndex(actualDate, fechas)+2;
            };
            

        }).catch(error => {
            console.error("Error al cargar el archivo CSV:", error);
        });

}

// Función para cargar los datos desde Google Sheets
function loadCsvData() {
    fetch(csvUrl)
        .then(response => response.text())
        .then(data => {
            var table = document.getElementById("csvTable");
            var lines = data.split('\n');

            // Limpia cualquier dato existente en la tabla
            table.innerHTML = "";

            // Procesa las líneas del archivo CSV
            var headers = lines[0].split(',');
            var cells = lines[columna].split(',');

            //Cambiar fecha
            var fecha = document.getElementById("date");
            fecha.textContent = cells[0];


            for (var i = 1; i < lines.length+1; i++) {

                var row = table.insertRow();

                // Agrega columna de encabezado
                var headerCell = row.insertCell(0);
                headerCell.textContent = headers[i]; // Restar 1 para evitar desbordamiento

                // Agrega columna de valor
                var valueCell = row.insertCell(1);
                valueCell.textContent = cells[i]; // Restar 1 para evitar desbordamiento


            }
        })
        .catch(error => {
            console.error("Error al cargar el archivo CSV:", error);
        });
}

// Carga los datos al cargar la página
window.addEventListener("load", loadDates);
window.addEventListener("load", loadCsvData);


// Botones

var buttonPlus = document.getElementById("buttonPlus");
var buttonMinus = document.getElementById("buttonMinus");


function columnPlus() {
    if (columna < 9) {
        columna++;
        loadCsvData();
    }
};

function columnMinus() {
    if (columna > 1) {
        columna--;
        loadCsvData();
    }
};



