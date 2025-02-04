// CORE
// Contains globals and such

var globals = {

  // maximum objects allowed per scene
  MAX_object_count: 20,

  // map width (columns)
  MAP_width: 5,

  // map height (rows)
  MAP_height: 5

}



/* SCENES */
// collection of all scenes

const scenes = {

  title: null,
  
  scene_count: 1,
  start_scene: {
    x: 0,
    y: 0
  },
  cartridge: null, // will be the starting screen to the game
  audio: null,
  audio_loop: true,
  font: "default",

  // ALL THE SCENESKMFAKSF
  s: new Array(globals.MAP_width * globals.MAP_height)
};
