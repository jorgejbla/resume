
       var displayCoords, myAddress; 
  
       function getLocation() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
          } else {
          displayCoords.innerHTML="Geolocation API not supported by your browser.";
       }
     }
  
  
      // Called when position is available
    function showPosition(position) {
        displayCoords.innerHTML="Latitude: " + position.coords.latitude + 
            "<br />Longitude: " + position.coords.longitude;    
        showOnGoogleMap(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
 
    }
 
      var geocoder;
      var map;
      var infowindow = new google.maps.InfoWindow();
      var marker;
      
      function initialize() {
        displayCoords=document.getElementById("msg");
        myAddress = document.getElementById("address");
        
        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(5, -5);
        var mapOptions = {
          zoom: 8,
          center: latlng,
          mapTypeId: 'roadmap'
        }
        map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions); 
      }
 
    function showOnGoogleMap(latlng) {
 
        geocoder.geocode({'latLng': latlng}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              map.setZoom(11);
              marker = new google.maps.Marker({
                  position: latlng,
                  map: map
              });
              infowindow.setContent(results[1].formatted_address);
              infowindow.open(map, marker);
              
              // Display address as text in the page
              //myAddress.innerHTML="Adress: " + results[0].formatted_address;
              
              // Call the function that parses the results and fills
              // the input fields
              parseResult(results[0].address_components);
            } else {
              alert('No results found');
            }
          } else {
            alert('Geocoder failed due to: ' + status); 
          }
        });
    }     
      
      var country, postalCode, state, route, streetNumber, locality, areaLvl1, areaLvl2;
      
      function parseResult(result) {
        for(i in result){
          // Let's print all the data we can collect from the reverse geocoder,
          // Look at the debug console to see what we get...
          console.log("type = " + result[i].types[0] + " long_name = " + 
                       result[i].long_name);

          if(result[i].types[0] == 'postal_code')
            postalCode = result[i].long_name;
          if(result[i].types[0] == 'country')
            country= result[i].long_name;
          if(result[i].types[0] == 'street_number')
           
            streetNumber= result[i].long_name;
          if(result[i].types[0] == 'route')
            route= result[i].long_name;
           if(result[i].types[0] == 'locality')
            locality= result[i].long_name;
          if(result[i].types[0] == 'state')
            state= result[i].long_name;
          if(result[i].types[0] == 'administrative_area_level_2')
            arealLvl2= result[i].long_name;
          if(result[i].types[0] == 'administrative_area_level_1')
            areaLvl1= result[i].long_name;
        }
        
        console.log("postalCode = " + postalCode);
        console.log("country = " + country);
        console.log("streetNumber = " + streetNumber);
        console.log("route = " + route);
        console.log("locality = " + locality);
        console.log("Administrative area level 1 " + areaLvl1);
        console.log("Administrative area level 2 " + areaLvl2);
        
        // fill input fields now, check if variables are undefined
        if((route != undefined) && (streetNumber != undefined)) {
          console.log("let's fill the street");
          document.querySelector("#address1").value = streetNumber + " " + route;
        }
         if(locality != undefined) {
          console.log("let's fill the city");
          document.querySelector("#address2").value =  locality;
        }
        if(country != undefined) {
          console.log("let's fill the country");
          document.querySelector("#country").value =  country;
        } 
        if(postalCode != undefined) {
          console.log("let's fill the postalCode");
          document.querySelector("#postcode").value =  postalCode;
        } 
        if(areaLvl1 != undefined) {
          console.log("let's fill the State/Region");
          document.querySelector("#address3").value =  areaLvl1;
        } 
      }
