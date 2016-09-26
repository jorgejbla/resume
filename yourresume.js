




       var canvasSig, ctxSig, previousMousePos;
  



            function getMousePos(canvasSig, evt) {
                // necessary to take into account CSS boudaries
                var rect = canvasSig.getBoundingClientRect();
                return {
                    x: evt.clientX - rect.left,
                    y: evt.clientY - rect.top
                };
            }

            function drawLineImmediate(x1, y1, x2, y2) {
                // a line is a path with a single draw order
                // we need to do that in this example otherwise
                // at each mouse event we would draw the whole path
                // since the beginning. Remember that lines
                // normally are only usable in path mode
                ctxSig.beginPath();
                ctxSig.moveTo(x1, y1);
                ctxSig.lineTo(x2, y2);
                ctxSig.stroke();
            }

            function handleMouseMove(evt) {
                var mousePos = getMousePos(canvasSig, evt);

                // Let's draw some lines that follow the mouse pos
                if (painting) {
                    drawLineImmediate(previousMousePos.x, previousMousePos.y,
                            mousePos.x, mousePos.y);

                    previousMousePos = mousePos;
                }
            }
          
            function clicked(evt) {
                previousMousePos = getMousePos(canvasSig, evt);
                painting = true;
            }

            function released(evt) {
                painting = false;
            }
      


                 function dragLeaveHandler(event) {
              console.log("drag leave");
              // Set style of drop zone to default
              event.target.classList.remove('draggedOver');
           }
           function dragEnterHandler(event) {
              console.log("Drag enter");
              // Show some visual feedback
              event.target.classList.add('draggedOver');
           }
           function dragOverHandler(event) {
              //console.log("Drag over a droppable zone");
              // Do not propagate the event
              event.stopPropagation();
              // Prevent default behavior, in particular when we drop images or links
              event.preventDefault();
           }
           function dropHandler(event) {
              console.log('drop event');
              // Do not propagate the event
              event.stopPropagation();
              // Prevent default behavior, in particular when we drop images or links
              event.preventDefault();
              // reset the visual look of the drop zone to default
              event.target.classList.remove('draggedOver');
              // get the files from the clipboard
              var files = event.dataTransfer.files;
              var filesLen = files.length;
              var filenames = "";
              // iterate on the files, get details using the file API
              // Display file names in a list.
              for(var i = 0 ; i < filesLen ; i++) {
                 filenames += '\n' + files[i].name;
                 // Create a li, set its value to a file name, add it to the ol
                 var li = document.createElement('li');
                 li.textContent = files[i].name;
                 document.querySelector("#droppedFiles").appendChild(li);
              }
              console.log(files.length + ' file(s) have been dropped:\n' + filenames);
              readFilesAndDisplayPreview(files);
           }


           function handleFileSelect(evt) {
              var files = evt.target.files; // FileList object
              // do something with files... why not call
              // readFilesAndDisplayPreview!
             readFilesAndDisplayPreview(files);
           }
           
           function readFilesAndDisplayPreview(files) {
              // Loop through the FileList and render image files as thumbnails.
              for (var i = 0, f; f = files[i]; i++) {
              // Only process image files.
              if (!f.type.match('image.*')) {
                 continue;
              }
              var reader = new FileReader();
              //capture the file information.
              reader.onload = function(e) {
                 // Render thumbnail.
                 var span = document.createElement('span');
                 span.innerHTML = "<img class='thumb' width='100' src='" + e.target.result + "'/>";
                 document.getElementById('list').insertBefore(span, null);
              };
              // Read the image file as a data URL. Will trigger the call to the above callback when
              // the image file is completely loaded
              reader.readAsDataURL(f);
           }
        }


  function printValue(sliderID, textbox) {
     var x = document.getElementById(textbox);
     var y = document.getElementById(sliderID);
     x.value = y.value;
  }

  function checkPasswords() {
      var password1 = document.getElementById('password1');
      var password2 = document.getElementById('password2');
      if (password1.value != password2.value) {
          password2.setCustomValidity('Passwords do not match!');
      } else {
         password2.setCustomValidity('');
      }
   }  



//navigation

 //onclick="start('main','s1');"

 function start (page, goto) {
  var url ="yourresume_"+goto;
  if (page == 'main') {
    console.log("starting");
  }

  return "location.href='"+ url +".html';";

 }

