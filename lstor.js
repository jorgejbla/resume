function resetChanges(step) {

	if (step == 's6') {
		var canvas = document.getElementById("mySignature");
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Retrieve the object from storage
		var retrievedObject = JSON.parse(localStorage.getItem('mainInfo'));

		if (retrievedObject != null) {
			retrievedObject.signature = null;
			console.log("signature removed "+retrievedObject.signature);

			// Store the object as a JSON String
			localStorage.setItem('mainInfo', JSON.stringify(retrievedObject));
		}	


	}	

	var applyButton = document.querySelector("#apply");
	applyButton.style.backgroundColor="transparent";

	localStorage.setItem(step+'Apply', false);

	console.log("removed step "+step+ " : " +localStorage.getItem(step+'Apply'));	

}	


function saveChanges(step) {

	if (step == 's1') {
		var userid = document.querySelector("#yourUserId");
		var name = document.querySelector("#yourName");
		var email = document.querySelector("#email");
		var tel = document.querySelector("#tel");
		var url = document.querySelector("#url");		





	    var mainInfoObject = {'userid': userid.value
	    						,'name': name.value
	    						, 'email': email.value
	    						, 'tel': tel.value
	    						, 'url': url.value};

		// Store the object as a JSON String
		localStorage.setItem('mainInfo', JSON.stringify(mainInfoObject));
		 
		// Retrieve the object from storage
		var retrievedObject = JSON.parse(localStorage.getItem('mainInfo'));
		    
		console.log(retrievedObject.userid
					+ " " 
					+ retrievedObject.name 
					+ " " 
					+ retrievedObject.email 
					+ " " 
					+ retrievedObject.tel 
					+ " " 
					+ retrievedObject.url);
	}
	else if (step == 's2') {
		var age = document.querySelector("#age");

		// Retrieve the object from storage
		var retrievedObject = JSON.parse(localStorage.getItem('mainInfo'));

		if (retrievedObject != null) {
			retrievedObject.age = age.value;

			// Store the object as a JSON String
			localStorage.setItem('mainInfo', JSON.stringify(retrievedObject));
		}

	}
	else if (step == 's3') {
		var companyName = document.querySelector("#yourCompany");
		var companyLogo = document.querySelector("#list .thumb");

		// Retrieve the object from storage
		var retrievedObject = JSON.parse(localStorage.getItem('mainInfo'));

		if (retrievedObject != null) {
			retrievedObject.companyName = companyName.value;
			retrievedObject.companyLogo = companyLogo.src;
			console.log("logo "+retrievedObject.companyLogo);

			// Store the object as a JSON String
			localStorage.setItem('mainInfo', JSON.stringify(retrievedObject));
		}

	}
	else if (step == 's4')	 {
		var canvas = document.getElementById("myCanvas");
		var imageData = canvas.toDataURL();	


		// Retrieve the object from storage
		var retrievedObject = JSON.parse(localStorage.getItem('mainInfo'));

		if (retrievedObject != null) {
			retrievedObject.picture = imageData;
			console.log("picture "+retrievedObject.picture);

			// Store the object as a JSON String
			localStorage.setItem('mainInfo', JSON.stringify(retrievedObject));
		}			
	}
	else if (step == 's5') {

		var address1 = document.querySelector("#address1");
		var address2 = document.querySelector("#address2");
		var address3 = document.querySelector("#address3");
		var postcode = document.querySelector("#postcode");		
		var country = document.querySelector("#country");		


	    var addressObject = {'address1': address1.value
	    						, 'address2': address2.value
	    						, 'address3': address3.value
	    						, 'postcode': postcode.value
	    						, 'country': country.value};

		// Retrieve the object from storage
		var retrievedObject = JSON.parse(localStorage.getItem('mainInfo'));

		if (retrievedObject != null) {
			retrievedObject.address = addressObject;
			console.log("addressObject  "+retrievedObject.address);

			// Store the object as a JSON String
			localStorage.setItem('mainInfo', JSON.stringify(retrievedObject));
		}

	}
	else if (step == 's6')	 {
		var canvas = document.getElementById("mySignature");
		var imageData = canvas.toDataURL();	


		// Retrieve the object from storage
		var retrievedObject = JSON.parse(localStorage.getItem('mainInfo'));

		if (retrievedObject != null) {
			retrievedObject.signature = imageData;
			console.log("signature "+retrievedObject.signature);

			// Store the object as a JSON String
			localStorage.setItem('mainInfo', JSON.stringify(retrievedObject));
		}			
	}	


	var applyButton = document.querySelector("#apply");
	applyButton.style.backgroundColor="green";

	localStorage.setItem(step+'Apply', true);

	console.log("saved step "+step+ " : " +localStorage.getItem(step+'Apply'));

}

function paintSubNavigation(step) {
	var subnavigation = document.querySelector("#subnavigation");
	var listButtons = subnavigation.querySelectorAll("button");
	if (listButtons != null) {
		for (var i = 0; i < listButtons.length; i++) {
			var but = listButtons[i];
			var stepApply = localStorage.getItem(but.id+'Apply');
			if (stepApply != null && stepApply != 'undefined' && stepApply == 'true') {
				but.style.backgroundColor="green";
			}
			else {
				but.style.backgroundColor="transparent";
			}

			if (step == but.id) {
				but.style.color="red";
			}
		};
	}	
}


function restoreForm(step) {

	paintSubNavigation(step);




	var stepApply = localStorage.getItem(step+'Apply');
	console.log(stepApply);

	if (step == 's1') {
		var userid = document.querySelector("#yourUserId");
		var name = document.querySelector("#yourName");
		var email = document.querySelector("#email");
		var tel = document.querySelector("#tel");
		var url = document.querySelector("#url");

		

		if (stepApply != null && stepApply != 'undefined' && stepApply == 'true') {

			// Retrieve the object from storage
			var retrievedObject = JSON.parse(localStorage.getItem('mainInfo'));
			
			if (retrievedObject != null && retrievedObject != 'undefined') {
				console.log("Objeto: "+retrievedObject.userid 
						+ " "
						+ retrievedObject.name 
						+ " " 
						+ retrievedObject.email 
						+ " " 
						+ retrievedObject.tel 
						+ " " 
						+ retrievedObject.url);


				userid.value = retrievedObject.userid;
				name.value = retrievedObject.name;
				email.value = retrievedObject.email;
				tel.value = retrievedObject.tel;
				url.value = retrievedObject.url;
			}



		}

	}
	else if (step == 's2') {
		var age = document.querySelector("#age");

		// Retrieve the object from storage
		var retrievedObject = JSON.parse(localStorage.getItem('mainInfo'));
		
		if (retrievedObject != null && retrievedObject != 'undefined') {
			console.log("Objeto:Age "+retrievedObject.age);
			age.value = retrievedObject.age;
		}
	}
	else if (step == 's3') {
		var yourCompany = document.querySelector("#yourCompany");
		var companyLogoList = document.querySelector("#list");
	// Retrieve the object from storage
		var retrievedObject = JSON.parse(localStorage.getItem('mainInfo'));
		
		if (retrievedObject != null && retrievedObject != 'undefined') {
			console.log("Objeto:Company name "+retrievedObject.companyName);
			if (retrievedObject.companyName != null) {
				yourCompany.value = retrievedObject.companyName;
			}
			

			if (companyLogoList != null && retrievedObject.companyLogo != null) {
				companyLogoList.innerHTML = "<span><img src='"+retrievedObject.companyLogo+"' /></span>";
			}	

		}
	}
	else if (step == 's4')	 {
		var canvas = document.getElementById("myCanvas");


		// Retrieve the object from storage
		var retrievedObject = JSON.parse(localStorage.getItem('mainInfo'));

		if (retrievedObject != null && retrievedObject != 'undefined') {
			console.log("Objeto:Picture "+retrievedObject.picture);
			if (retrievedObject.picture != null) {

			    var ctx = canvas.getContext("2d");
		        // load image from data url
		        var imageObj = new Image();
		        imageObj.onload = function() {
		          ctx.drawImage(this, 0, 0);
		        };
		        imageObj.src = retrievedObject.picture;
			}
		}			
	}
	else if (step == 's5') {

		var address1 = document.querySelector("#address1");
		var address2 = document.querySelector("#address2");
		var address3 = document.querySelector("#address3");
		var postcode = document.querySelector("#postcode");		
		var country = document.querySelector("#country");	

		if (stepApply != null && stepApply != 'undefined' && stepApply == 'true') {
			// Retrieve the object from storage
			var retrievedObject = JSON.parse(localStorage.getItem('mainInfo'));
			if (retrievedObject != null && retrievedObject != 'undefined') {

			    var addressObject = retrievedObject.address;

				if (addressObject != null) {
					address1.value = addressObject.address1;
					address2.value = addressObject.address2;
					address3.value = addressObject.address3;
					postcode.value = addressObject.postcode;
					country.value = addressObject.country;
				}
			}



		}

	}	
	else if (step == 's6')	 {
		var canvas = document.getElementById("mySignature");


		// Retrieve the object from storage
		var retrievedObject = JSON.parse(localStorage.getItem('mainInfo'));

		if (retrievedObject != null && retrievedObject != 'undefined') {
			console.log("Objeto:signature "+retrievedObject.signature);
			if (retrievedObject.signature != null) {

			    var ctx = canvas.getContext("2d");
		        // load image from data url
		        var imageObj = new Image();
		        imageObj.onload = function() {
		          ctx.drawImage(this, 0, 0);
		        };
		        imageObj.src = retrievedObject.signature;
			}
		}			
	}		



	if (stepApply != null && stepApply != 'undefined' && stepApply == 'true') {
		var applyButton = document.querySelector("#apply");
		applyButton.style.backgroundColor="green";

		console.log("restored step "+step+ " : " +localStorage.getItem(step+'Apply'));	
	}

}

function resetResume() {
	localStorage.setItem('mainInfo', null);
	for (var i = 1; i < 8; i++) {
		var step = "s"+i;
		localStorage.setItem(step+'Apply', false);
	};
}