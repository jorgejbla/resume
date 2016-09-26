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



function onWidthChange(mq) {
	var bodyElem = document.querySelector("body");
    if(mq.matches) {
        bodyElem.style.backgroundColor='transparent';
    } else {
        bodyElem.style.backgroundColor='red';
    }
}


function checkMediaChange() {
	// First off, check we support the 'matchMedia' API
	if(window.matchMedia) {
	    var mq = window.matchMedia("(min-width: 960px)");
	    // Listen for dimension changes
	    mq.addListener(onWidthChange);
	    // As soon as the window loads, fire it off
	    onWidthChange(mq);
	}

}




