//navigation

 //onclick="start('main','s1');"

 function startF (page, goto) {
  var url ="yourresume_"+goto;
  
    if (page == 'main') {
      console.log("starting");
    }

//window.location.replace(url +".html");
//
//self.location=url +".html";
//document.location.href = "file:///C:/JORGE/IBM/HTML5/resume/" + url +".html";
document.location.href = url +".html";
}


 function gotoF (goto) {
  var url ="yourresume_"+goto;
  document.location.href = url +".html";
}


