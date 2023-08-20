  // ID de tu hoja de cálculo de Google Docs
  var spreadsheetId = "ID_DE_TU_HOJA_DE_CÁLCULO";

  // URL de la API de Google Sheets
  var csvUrl = "https://docs.google.com/spreadsheets/d/1kmwcFrbbZuHxIbjc8Ow13_ANCS1Vib85fgD_pgy6cUQ/export?format=csv";


  var columna = 1;
  var fecha = document.getElementById("date");

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
              var fecha = document.getElementById("date");
              
              for (var i = 1; i < 11; i++) {
                  var cells = lines[columna].split(',');
                  var row = table.insertRow();
                   
                  
                  //Cambiar fecha
                  fecha.textContent = cells[0];

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
  window.addEventListener("load", loadCsvData);

  // Botones

  var buttonPlus = document.getElementById("buttonPlus");
  var buttonMinus = document.getElementById("buttonMinus");


function columnPlus(){
    if (columna < 9){
        columna++;
        loadCsvData();
        console.log("aaaa");
    }
};

    

    function columnMinus(){
        if(columna > 1){
            columna--;
            loadCsvData();
        }
    };

       
   
