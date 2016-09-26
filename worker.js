
function timedCount() {
var d = new Date();
var datestring; 
		datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
		d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    postMessage(datestring);
    setTimeout("timedCount()",500);
}

timedCount(); 