
    var db; // the database connection we need to initialize
     
    function createDatabase() {
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
      };
    } // end of function createDatabase





    function addAResume() {
       // 1 - get a transaction on the "resumes" object store
       // in readwrite, as we are going to insert a new object
       var transaction = db.transaction(["resumes"], "readwrite");
       // Do something when all the data is added to the database.
       // This callback is called after transaction has been completely
       // executed (committed)
       transaction.oncomplete = function(event) {
           alert("All done!");
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
       };
       // the insertion led to an error (object already in the store,
       // for example)
       request.onerror = function(event) {
           console.log("request.onerror, could not insert resume, errcode = " + event.target.error.name);
       };
    }
