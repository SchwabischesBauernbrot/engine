

/* 
  Adding objects from the library
  
  INSTR:
  Double-click to add an image from the library to the engine.
  
*/

//
//$("#library .library-objects .objtoadd").dblclick(function () {
//
//  // Make sure there are no more than 10 objects
//  console.log(active_scene.object_count);
//
//  if (active_scene.object_count >= globals.MAX_object_count) {
//    alert("Sorry, you can't add any more.")
//    return;
//  } else {
//    active_scene.object_count++;
//  }
//
//  let o = objControls.addObj($(this).attr("src"));
//
//  objControls.moveObj(o);
//});


// temporary object constructor
function thingy(x, y, img, filter, size, interaction) {
  this.x = x;
  this.y = y;
  this.img = img;
  this.filter = filter;
  this.size = size;
  this.interaction = interaction;
}



// color change

$("input[type='color']").change(function () {
  
  $("#e").css("background", $("input[type='color']").val());

  active_scene.color = $("input[type='color']").val();
  
  console.log(active_scene.color);

});


//    console.log(active_scene);

  },

  // render all information from the scene
  getSceneInfo: function () {

    console.log(active_scene);

  },

  // OTHER HANDLERS

  updatePos: function (t) {
    let pos = $(t).position();
    console.log(pos);

    $(".__x").text(pos.left);
    $(".__y").text(pos.top);
  },

  // resets all objects on dom
  clearSelected: function () {

    $(".controls-selected").hide();

    // reset position

    $(".__x").text("");
    $(".__y").text("");

    $("#e .obj").each(function () {
      $(this)
        .css("box-shadow", "none")
        .attr("data-selected", "0")
      //      .draggable('disable');
    });

  }

};



/* 




      SCENE CONTROLS
      
      
      


*/




const sceneControls = {
  
  /* 
    getScene
    give x, y
    returns the index based on simple formula
    
  */
  
  getSceneIndex: function(x,y){
    let i = (parseInt(x) * globals.MAP_width) + parseInt(y); 
    
    return i;
    
  },
  
  /* 
    getScene
    give x, y
    returns scene object
  */
  
  
  getScene:function(x,y){
    
    let i = (parseInt(x) * globals.MAP_width) + parseInt(y); 
    
    return scenes.s[i];
  },

  /*
  
    switchScene
    i: index of new scene (NOT coordinate value)
    o: index of old scene
  
  */
  switchScene: function (i, o) {

    objControls.saveObjects();
    sceneControls.clearScene();
    
    // set to new active scene
    active_scene = scenes.s[i];
    
    sceneControls.loadColor();
    sceneControls.loadObjects();
    
    console.log("Switched scene to " + active_scene.x + "," + active_scene.y);
    
    // Updating active scene text
    $("._whatscene").text( active_scene.x + "," + active_scene.y );

  },

  
  /* saveScene writes all objects and settings to the active scene */
  saveScene: function () {

  objControls.saveObjects();

  },
  /* clearScene deletes all objects from the scene */
  clearScene: function () {

    // first, save objects on scene
//    objControls.saveObjects();

    $("#e *").each( function(){
      $(this).remove();
    });

  },

  loadColor: function (whatscene) {

    if(active_scene.color == 0){
      // defaults to black if color isn't set
      active_scene.color = "#000000"; 
    }
    
    $("#e").css("background", active_scene.color);

  },

  /*
    loadObjects brings back all the objects from the scene into the frame, lodaing it from the array of objects
  */

  loadObjects: function () {

    
    // iterate over each object
    (active_scene.objects).forEach(function (e) {
//      console.log(e);

      objControls.addObj(e.img, e.x, e.y, e.filter, e.size);
      // HELL YAAA
    })


  }

};

// handle image selection

// click handlers here
$("button[data-action='delete']").on('click', objControls.delObj());
