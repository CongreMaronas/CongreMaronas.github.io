  $(document).ready(function() {
    $.ajax({
        url: 'https://docs.google.com/spreadsheets/d/1kmwcFrbbZuHxIbjc8Ow13_ANCS1Vib85fgD_pgy6cUQ/export?format=csv',
      dataType: 'text',
      success: function(data) {
        var rows = data.split('\n');
        var table = '<table>';
  
        for (var i = 0; i < rows.length; i++) {
          var cells = rows[i].split(',');
          var rowTag = (i === 0) ? 'th' : 'td'; // Use 'th' for the first row (header row), 'td' for other rows
          var rowClass = (i % 2 === 0 && i !== 0) ? 'par-row' : ''; // Apply 'data-row' class to alternate data rows
          table += '<tr class="' + rowClass + '">';
  
          for (var j = 0; j < cells.length; j++) {
            table += '<' + rowTag + '>' + cells[j] + '</' + rowTag + '>';
          }
  
          table += '</tr>';
        }
  
        table += '</table>';
        $('#spreadsheet-container').html(table);
      }
    });
  });
