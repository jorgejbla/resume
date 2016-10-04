


    var db; // the database connection we need to initialize

function getUrlVars() {
var vars = {};
var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
vars[key] = value;
});
return vars;
}
     
    function createDatabase(callback, callback2) {
      if(!window.indexedDB) {
         window.alert("Your browser does not support a stable version of IndexedDB");
      }
      // This is what our customer data looks like.
      var resumeData = [
        { userid: "jblazquez", 
          name: "Jorge", 
          age: 40, 
          email:"jorge@company.com",
          tel:"(94) 4121212",
          url:"http://www.idex.com",
          companyName:"IBM",
          companyLogo:"@data...",
          picture: "@data...",
          signature: "@data...",
          address:{
                address1: "aaaaa",
                address2: "bbbbbb",
                address3: "ccccc",
                postcode: "ccddc",
                country: "dsddds"
          } 
        }

      ];
      var dbName = "ResumeDB";
      // version must be an integer, not 1.1, 1.2 etc...
      var request = indexedDB.open(dbName, 2);
      request.onerror = function(event) {
         // Handle errors.
         console.log("request.onerror errcode=" + event.target.error.name);
      };
      request.onupgradeneeded = function(event) {
          console.log("request.onupgradeneeded, we are creating a new version of the dataBase");
          db = event.target.result;
          // Create an objectStore to hold information about our
          // customers. We're going to use "ssn" as our key path because
          //  it's guaranteed to be unique
          var objectStore = db.createObjectStore("resumes",
                                                   { keyPath: "userid" });
          // Create an index to search customers by name. We may have            
          // duplicates so we can't use a unique index.
          objectStore.createIndex("name", "name", { unique: false });
          // Create an index to search customers by email. We want to
          // ensure that no two customers have the same email, so use a
          // unique index.
          objectStore.createIndex("email", "email", { unique: true });
          // Store values in the newly created objectStore.
          //for (var i in resumeData) {
          //    objectStore.add(resumeData[i]);
          //}
      }; // end of request.onupgradeneeded
      request.onsuccess = function(event) {
         // Handle errors.
         console.log("request.onsuccess, database opened, now we can add / remove / look for data in it!");
         // The result is the database itself
         db = event.target.result;

         if (callback2 != null) {
          callback(callback2);
         }
         else if (callback != null) {
         loadResumes(callback); 
         }

         
      };
    } // end of function createDatabase





    function addAResume(callback, callback2) {
       // 1 - get a transaction on the "resumes" object store
       // in readwrite, as we are going to insert a new object
       var transaction = db.transaction(["resumes"], "readwrite");
       // Do something when all the data is added to the database.
       // This callback is called after transaction has been completely
       // executed (committed)
       transaction.oncomplete = function(event) {
           //alert("All done!");
       };
       // This callback is called in case of error (rollback)
       transaction.onerror = function(event) {
          console.log("transaction.onerror errcode=" + event.target.error.name);
       };
       // 2 - Init the transaction on the objectStore
       var objectStore = transaction.objectStore("resumes");
       // 3 - Get a request from the transaction for adding a new object
       
    // Retrieve the object from storage
    var resumeObject = JSON.parse(localStorage.getItem('mainInfo'));


       var request = objectStore.add(resumeObject);

       // The insertion was ok
       request.onsuccess = function(event) {
           console.log("Resume with userid= " + event.target.result + " added.");
           loadResumes(callback);
           callback2();
       };
       // the insertion led to an error (object already in the store,
       // for example)
       request.onerror = function(event) {
           console.log("request.onerror, could not insert resume, errcode = " + event.target.error.name);
       };
    }




    function removeAResume(callback, callback2, userIdParam) {
       if(db === null || typeof(db) == 'undefined') {
        db = createDatabase(null);
         //alert('Database must be opened first, please click the Create ResumeDB Database first');
         //return;
       }
       var transaction = db.transaction(["resumes"], "readwrite");
       // Do something when all the data is added to the database.
       transaction.oncomplete = function(event) {
          console.log("All done!");
       };
       transaction.onerror = function(event) {
          console.log("transaction.onerror errcode=" + event.target.error.name);
       };
       var objectStore = transaction.objectStore("resumes");
       //var userIdParam = getUrlVars()["userid"];
       alert('removing resume with userid '+userIdParam);
       var request = objectStore.delete(userIdParam);
       request.onsuccess = function(event) {
          console.log("Resume removed.");
           loadResumes(callback);
           callback2();          
       };
       request.onerror = function(event) {
          alert("request.onerror, could not remove userid, errcode = " + event.target.error.name + ". The userid does not exist in the Database");
       };
    }


    function loadResumes(callback) {
       var objectStore = db.transaction("resumes").objectStore("resumes");
       var listResumes = new Array();
       objectStore.openCursor().onsuccess = function(event) {
         // we enter this callback for each object in the store
         // The result is the cursor itself
         var cursor = event.target.result;
         if (cursor) {
           //alert("Name for Userid " + cursor.key + " is " + cursor.value);
           // Calling continue on the cursor will result in this callback
           // being called again if there are other objects in the store
           listResumes.push(cursor.value);
           cursor.continue();
         } else {
           //callback(listResumes);
           var tableResumenes = document.getElementById("tableResumes");
           if (tableResumenes != null) {
            document.getElementById("mainData").removeChild(tableResumenes);
           }
           
           document.getElementById("mainData").appendChild(callback(listResumes));

         }
      }; // end of onsuccess...
    }


    function getResume(callback) {
       if(db === null || typeof(db) == 'undefined') {
        db = createDatabase(null);
         //alert('Database must be opened first, please click the Create ResumeDB Database first');
         //return;
       }
       var transaction = db.transaction(["resumes"], "readwrite");

       // Do something when all the data is added to the database.
       transaction.oncomplete = function(event) {
         console.log("All done!");
       };
       transaction.onerror = function(event) {
         console.log("transaction.onerror errcode=" + event.target.error.name);
       };
       var objectStore = transaction.objectStore("resumes");
       // Init a resume object with just the ssn property initialized
       // from the form
       var resumeToSearch={};

        var userIdParam = getUrlVars()["userid"];

       resumeToSearch.userid = userIdParam;
       console.log('Looking for resume for userid =' + resumeToSearch.userid);
       // Look for the resume corresponding to the ssn in the object
       // store
       var request = objectStore.get(resumeToSearch.userid);
       request.onsuccess = function(event) {
         console.log("Resume found" + event.target.result.name);
         callback(event.target.result);
       };
     
       request.onerror = function(event) {
         alert("request.onerror, could not find resume, errcode = " + event.target.error.name 
          + ".The userid is not in the Database");
      };
    }


    function loadResume(callback, userIdParam) {
       if(db === null || typeof(db) == 'undefined') {
        db = createDatabase(null);
         //alert('Database must be opened first, please click the Create ResumeDB Database first');
         //return;
       }
       var transaction = db.transaction(["resumes"], "readwrite");

       // Do something when all the data is added to the database.
       transaction.oncomplete = function(event) {
         console.log("All done!");
       };
       transaction.onerror = function(event) {
         console.log("transaction.onerror errcode=" + event.target.error.name);
       };
       var objectStore = transaction.objectStore("resumes");
       // Init a resume object with just the ssn property initialized
       // from the form
       var resumeToSearch={};

        //var userIdParam = getUrlVars()["userid"];

       resumeToSearch.userid = userIdParam;
       console.log('Looking for resume for userid =' + resumeToSearch.userid);
       // Look for the resume corresponding to the ssn in the object
       // store
       var request = objectStore.get(resumeToSearch.userid);
       request.onsuccess = function(event) {
         console.log("Resume found" + event.target.result.name);
         callback(event.target.result);
       };
     
       request.onerror = function(event) {
         alert("request.onerror, could not find resume, errcode = " + event.target.error.name 
          + ".The userid is not in the Database");
      };
    }

    function fillResume (mainData) {

        var mdUserId = document.querySelector("#mdUserId");
        mdUserId.innerHTML=mainData.userid;

        var mdName = document.querySelector("#mdName");
        mdName.innerHTML=mainData.name;

        var mdTel = document.querySelector("#mdTel");
        mdTel.innerHTML=mainData.tel;

        var mdAge = document.querySelector("#mdAge");
        mdAge.innerHTML=mainData.age;        

        var mdUrl = document.querySelector("#mdUrl");
        var mdUrlLink = document.querySelector("#mdUrlLink");
        mdUrlLink.setAttribute("href", mainData.url);
        mdUrl.innerHTML=mainData.url;

        var mdEmail = document.querySelector("#mdEmail");
        var mdEmailLink = document.querySelector("#mdEmailLink");
        mdEmailLink.setAttribute("href", "mailto:"+mainData.email);
        mdEmail.innerHTML=mainData.email;

        var mdCompanyName = document.querySelector("#mdCompanyName");
        mdCompanyName.innerHTML=mainData.companyName;

        var mdIntro = document.querySelector("#mdIntro");
        mdIntro.innerHTML=mainData.intro;        


        var mdPicture = document.querySelector("#mdPicture");
        mdPicture.setAttribute("src",mainData.picture);

        var mdSignature = document.querySelector("#mdSignature");
        mdSignature.setAttribute("src",mainData.signature);        

        var mdCompanyLogo = document.querySelector("#mdCompanyLogo");
        mdCompanyLogo.setAttribute("src",mainData.companyLogo);  

        var mdAddress1 = document.querySelector("#mdAddress1");
        mdAddress1.innerHTML=mainData.address.address1;

        var mdAddress2 = document.querySelector("#mdAddress2");
        mdAddress2.innerHTML=mainData.address.address2;

        var mdAddress3 = document.querySelector("#mdAddress3");
        mdAddress3.innerHTML=mainData.address.address3;

        var mdPostcode = document.querySelector("#mdPostcode");
        mdPostcode.innerHTML=mainData.address.postcode;

        var mdCountry = document.querySelector("#mdCountry");
        mdCountry.innerHTML=mainData.address.country;    



    }


    function fillLocalStorage (mainData) {
      alert("cargando " +mainData.userid);
    }



function editFields() {

        document.querySelector("#mdName").contentEditable = true;
        document.querySelector("#mdTel").contentEditable = true;
        document.querySelector("#mdAge").contentEditable = true;
        document.querySelector("#mdUrl").contentEditable = true;
        document.querySelector("#mdEmail").contentEditable = true;
        document.querySelector("#mdCompanyName").contentEditable = true;
        document.querySelector("#mdIntro").contentEditable = true;
        document.querySelector("#mdAddress1").contentEditable = true;
        document.querySelector("#mdAddress2").contentEditable = true;
        document.querySelector("#mdAddress3").contentEditable = true;
        document.querySelector("#mdPostcode").contentEditable = true;
        document.querySelector("#mdCountry").contentEditable = true;


}


function cancelEdition() {

        document.designMode = 'off';

        document.body.style.backgroundColor = "transparent";

        document.querySelector("#mdName").contentEditable = false;
        document.querySelector("#mdTel").contentEditable = false;
        document.querySelector("#mdAge").contentEditable = false;
        document.querySelector("#mdUrl").contentEditable = false;
        document.querySelector("#mdEmail").contentEditable = false;
        document.querySelector("#mdCompanyName").contentEditable = false;
        document.querySelector("#mdIntro").contentEditable = false;
        document.querySelector("#mdAddress1").contentEditable = false;
        document.querySelector("#mdAddress2").contentEditable = false;
        document.querySelector("#mdAddress3").contentEditable = false;
        document.querySelector("#mdPostcode").contentEditable = false;
        document.querySelector("#mdCountry").contentEditable = false;
}

function editAll() {

        document.designMode = 'on';

        document.body.style.backgroundColor = "lightblue";

}

