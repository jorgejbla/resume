var _table_ = document.createElement('table'),
    _tr_ = document.createElement('tr'),
    _th_ = document.createElement('th'),
    _td_ = document.createElement('td');

// Builds the HTML Table out of myList json data from Ivy restful service.
 function buildHtmlTable(arr, issubtable) {
     var table = _table_.cloneNode(false),
         columns = addAllColumnHeaders(arr, table);
     table.setAttribute("id","tableResumes");
     for (var i=0, maxi=arr.length; i < maxi; ++i) {
         var tr = _tr_.cloneNode(false);
         var userid = "";

        
         
         for (var j=0, maxj=columns.length; j < maxj ; ++j) {
             var td = _td_.cloneNode(false);
                 cellValue = arr[i][columns[j]];
                 if (typeof cellValue === 'object') {
                    continue;
                    
                    /*
                    var listAdress = new Array();
                    listAdress.push(cellValue);
                        
                       var subtable = buildHtmlTable(listAdress, true);
                       
                       td.appendChild(subtable);
                       tr.appendChild(td);
                       continue;

                       */
                 }
                else {
                    
                    if( typeof cellValue === 'undefined' || cellValue === null ){
                        td.appendChild(document.createTextNode(''));
                    }
                    else {
                        if (cellValue.startsWith("data:image")) {
                            var img = document.createElement('img');
                            img.setAttribute("src",cellValue);
                            img.setAttribute("width","64");
                            img.setAttribute("height","64");
                            td.appendChild(img);
                        }
                        else {
                            if (j === 0 && !issubtable) {

                                userid = arr[i][columns[j]];
                                var link = document.createElement('a');
                                link.setAttribute("href","yourresume_final.html?userid="+arr[i][columns[j]]);
                                link.setAttribute("title","view detail");
                                link.appendChild(document.createTextNode(arr[i][columns[j]] || ''));
                                td.appendChild(link);
                            }
                            else {
                                td.appendChild(document.createTextNode(arr[i][columns[j]] || ''));
                            }
                            
                        }


                     }
                }
  
             tr.appendChild(td);
         }

          if (!issubtable) {
            console.log(userid);
            
            var td = _td_.cloneNode(false);
            var link = document.createElement('a');
            var img = document.createElement('img');
            img.setAttribute("src","img/ic_delete_black_24dp_1x.png");
            img.setAttribute("width","24");
            img.setAttribute("height","24");

            link.setAttribute("href","#");
            link.setAttribute("title","delete resume");
            link.setAttribute("onclick","removeAResume(buildHtmlTable,resetResume,'" + userid + "')");
            link.appendChild(img);
            td.appendChild(link);
            tr.appendChild(td);

            td = _td_.cloneNode(false);
            link = document.createElement('a');
            img = document.createElement('img');
            img.setAttribute("src","img/ic_create_black_24dp_1x.png");
            img.setAttribute("width","24");
            img.setAttribute("height","24");

            link.setAttribute("href","#");
            link.setAttribute("title","load resume");
            link.setAttribute("onclick","loadResume(fillLocalStorage,'" + userid + "')");
            link.appendChild(img);
            td.appendChild(link);
            tr.appendChild(td);   

            td = _td_.cloneNode(false);
            link = document.createElement('a');
            img = document.createElement('img');
            img.setAttribute("src","img/ic_contacts_black_24dp_1x.png");
            img.setAttribute("width","24");
            img.setAttribute("height","24");

            link.setAttribute("href","#");
            link.setAttribute("title","detail resume");
            link.setAttribute("href","yourresume_final.html?userid=" + userid);
            link.appendChild(img);
            td.appendChild(link);
            tr.appendChild(td); 

         }
         else {
            
         }         
         

         table.appendChild(tr);
     }
     return table;
 }
 
 // Adds a header row to the table and returns the set of columns.
 // Need to do union of keys from all records as some records may not contain
 // all records
 function addAllColumnHeaders(arr, table)
 {
     var columnSet = [],
         tr = _tr_.cloneNode(false);

      


     for (var i=0, l=arr.length; i < l; i++) {
         for (var key in arr[i]) {
             if (arr[i].hasOwnProperty(key) && columnSet.indexOf(key)===-1) {
                 columnSet.push(key);
                 if(key == "address") {
                    continue;
                 }
                 var th = _th_.cloneNode(false);
                 th.appendChild(document.createTextNode(key));
                 tr.appendChild(th);
             }
         }
     }

    if (arr.length > 0) {
        var th2 = _th_.cloneNode(false);
         th2.appendChild(document.createTextNode("D"));
         tr.appendChild(th2);

            th2 = _th_.cloneNode(false);
         th2.appendChild(document.createTextNode("L"));
         tr.appendChild(th2);

            th2 = _th_.cloneNode(false);
         th2.appendChild(document.createTextNode("R"));
         tr.appendChild(th2);  
    }
      

     table.appendChild(tr);
     return columnSet;
 }
