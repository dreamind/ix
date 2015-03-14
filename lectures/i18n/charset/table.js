var ix = ix || { tables: {} };
 
ix.tables.charset = {
  init: function (id) {
    var table = $('<table class="charset-table"/>'), tr, td;

    for (var i = 0; i < 16; i++) {
      tr = $("<tr/>");
      for (var j = 0; j < 16; j++) {
        td = $('<td/>'); 
        tr.append(td);
      }    
      table.append(tr);  
    }      
    $(id).append(table);      
  },
  update: function (id, charset) {
    var tds = $(id + ' table td');

    tds.each(function(i, td) {        
      var item = charset[i];
      var hex = i.toString(16).toUpperCase();
      hex = "00".substr(0, 2 - hex.length) + hex;
      var character = item && item.character || '&nbsp;';
      var codepoint = item && item.codepoint || '&nbsp;';        
      cell = '<div class="character">' + character + '</div>'; 
      cell += '<div class="byte">' + hex + '</div>';
      cell += '<div class="codepoint">' + codepoint + '</div>';      
      $(td).html(cell);       
    });    
  }      
}