function saveChanges(step) {

	if (step == 's1') {

		var name = document.querySelector("#yourName");
		var email = document.querySelector("#email");
		var tel = document.querySelector("#tel");
		var url = document.querySelector("#url");		





	    var mainInfoObject = {'name': name.value
	    						, 'email': email.value
	    						, 'tel': tel.value
	    						, 'url': url.value};

		// Store the object as a JSON String
		localStorage.setItem('mainInfo', JSON.stringify(mainInfoObject));
		 
		// Retrieve the object from storage
		var retrievedObject = JSON.parse(localStorage.getItem('mainInfo'));
		    
		console.log(retrievedObject.name 
					+ " " 
					+ retrievedObject.email 
					+ " " 
					+ retrievedObject.tel 
					+ " " 
					+ retrievedObject.url);
	}

	var applyButton = document.querySelector("#apply");
	applyButton.style.backgroundColor="green";

	localStorage.setItem(step+'Apply', true);

	console.log("saved step "+step+ " : " +localStorage.getItem(step+'Apply'));

}

function restoreForm(step) {

	if (step == 's1') {

		var name = document.querySelector("#yourName");
		var email = document.querySelector("#email");
		var tel = document.querySelector("#tel");
		var url = document.querySelector("#url");

		var stepApply = localStorage.getItem(step+'Apply');

		if (stepApply != null && stepApply != 'undefined' && stepApply == 'true') {

			console.log(stepApply);

			// Retrieve the object from storage
			var retrievedObject = JSON.parse(localStorage.getItem('mainInfo'));
			
			if (retrievedObject != null && retrievedObject != 'undefined') {
				console.log("Objeto: "+retrievedObject.name 
						+ " " 
						+ retrievedObject.email 
						+ " " 
						+ retrievedObject.tel 
						+ " " 
						+ retrievedObject.url);


				name.value = retrievedObject.name;
				email.value = retrievedObject.email;
				tel.value = retrievedObject.tel;
				url.value = retrievedObject.url;
			}



		}

	}

	if (stepApply != null && stepApply != 'undefined' && stepApply == 'true') {
		var applyButton = document.querySelector("#apply");
		applyButton.style.backgroundColor="green";

		console.log("restored step "+step+ " : " +localStorage.getItem(step+'Apply'));	
	}

}