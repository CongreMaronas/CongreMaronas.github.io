var csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRkf5Mm5Lvr4LGWiaej9RAD7J1Jt1jfYz8XG1zLnIeFSsB04VZ0UxSGRfYONf57SpP6vt2GlKuRMiAY/pub?gid=980669826&single=true&output=csv";

function loadCsvData() {
    fetch(csvUrl)
        .then(response => response.text())
        .then(data => {
            var table = document.getElementById("vymTable");
            var lines = data.split('\n');
            // Limpia cualquier dato existente en la tabla
            table.innerHTML = "";

            // Procesa las líneas del archivo CSV               

            for (var i = 0; i < lines.length; i++) {
                var row = table.insertRow();
                var cells = lines[i].split(',');



                cells.forEach(cell => {
                    var rowCell = row.insertCell();
                    rowCell.textContent = cell
                });

            }
        })
        .catch(error => {
            console.error("Error al cargar el archivo CSV:", error);
        });
}

function constructTable() {
    fetch(csvUrl)
    .then(response => response.text())
    .then(data => {
        var table = document.getElementById("vymTable");
        var lines = data.split('\n');
        // Limpia cualquier dato existente en la tabla
        table.innerHTML = "";
        var semana = 0

        lines.forEach(csvLine => {    
            if (csvLine == ",,,,,,,"){
                semana++
                return;
            }
        var row = table.insertRow();
        var cells = csvLine.split(',');
        cells.forEach(cell => {
            var rowCell = row.insertCell();
            rowCell.textContent = cell
        });
        
        });
      console.log(semana);
    })
    .catch(error => {
        console.error("Error al cargar el archivo CSV:", error);
    });
    
    

}

class week {

constructor(presidente, tesoros, perlas){
    this.presidente = presidente;
    this.tesoros = tesoros;
    this.perlas = perlas;
}

}
window.addEventListener("load", constructTable);