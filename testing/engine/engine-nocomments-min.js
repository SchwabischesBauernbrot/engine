console.log("loaded engine.js, Engine's playmode");const cartridge=$("#cartridge").text();var scenes=null;if(!testJSON(cartridge))throw $("#play h2").text("Corrupted or empty game"),new Error;if(!(scenes=JSON.parse(cartridge)))throw $("#play h2").text("Corrupted or empty game"),new Error;function testJSON(e){if("string"!=typeof e)return!1;try{return"object"==typeof JSON.parse(e)}catch(e){return!1}}console.log("Loaded: ",scenes),$("#btn-play").on("click",function(){Tplayer.init(),$(this).text("RELOAD")});const globals={MAX_object_count:15,MAP_width:4,MAP_height:4},c={getSceneIndex:function(e,t){return parseInt(e)*globals.MAP_width+parseInt(t)},getScene:function(e,t){let a=parseInt(e)*globals.MAP_width+parseInt(t);return scenes.s[a]},textConvert:function(e){return e.replace(/\\n/g,"\n")}},Tplayer={active:scenes.s[0],init:function(){Tplayer.clearGame(),Tplayer.loadCartridge(),$("#e-cartridge").fadeIn(1e3),setTimeout(function(){$("#e-cartridge").fadeOut("slow"),$("#play h2").html("<span>Playing</span><span class='_playwhatscene'></span> "),$("._playwhatscene").text(Tplayer.active.x+","+Tplayer.active.y)},3e3),$("#play").css("cursor","not-allowed").css("pointer-events","none").delay(4e3).css("pointer-events","auto").css("cursor","auto"),Tplayer.loadPlay(scenes.start_scene.x,scenes.start_scene.y)},loadCartridge:function(){$("#play h2").text("Starting game..."),scenes.cartridge.objects.forEach(function(e){let t="";t="<img class='obj' data-selected='0' src='"+e.img+"' style='",e.x&&e.y&&(t+="top:"+e.y+"px; left:"+e.x+"px;"),e.filter&&(t+="filter:"+e.filter+";"),e.size&&(t+="width:"+e.size+"; height:"+e.size+";"),t+="'>";let a=$(t).hide().fadeIn(500);$("#e-cartridge").append(a)}),$("#e-cartridge").css("background",scenes.cartridge.color)},loadPlay:function(e,t){$("#play h2").html("<span>Starting Game...</span>").fadeIn("slow"),Tplayer.active=scenes.s[c.getSceneIndex(e,t)],setTimeout(function(){$("#play h2").html("<span>Play</span><span class='_playwhatscene'></span> "),$("._playwhatscene").text(Tplayer.active.x+","+Tplayer.active.y)},3e3),Tplayer.loadScene(e,t),$("#e-play").css("background",Tplayer.active.color)},clearGame:function(){$("#e-cartridge").html(""),$("#e-controls a").each(function(e,t){$(this).removeClass("-inaccessible").addClass("-inaccessible").attr("data-target","null").unbind("click",Tplayer.loadTarget)}),Tplayer.clearScene()},loadTarget:function(){let e=$(this).attr("data-target"),t=e.split(",")[0],a=e.split(",")[1];null!=t&&null!=a&&(Tplayer.loadScene(t,a),Tplayer.animatePulse())},animatePulse:function(){let e=$("#play");e.css("transform","scale(1.03)"),setTimeout(function(){e.css("transform","scale(0.99)")},500)},updateSceneNavigation(){$("#e-controls a").each(function(e,t){$(this).removeClass("-inaccessible").attr("data-target","null").unbind("click",Tplayer.loadTarget);var a=$(this).data("direction"),l=Tplayer.convertCoord(a,Tplayer.active.x,Tplayer.active.y);if(null!=l){let e=l.toString().split(",");if(null==c.getScene(e[0],e[1]))return void $(this).addClass("-inaccessible");$(this).attr("data-target",e[0]+","+e[1]).bind("click",Tplayer.loadTarget)}else $(this).addClass("-inaccessible")})},convertCoord:function(e,t,a){let l,n;switch(e){case"n":l=t>0?t-1:null,n=a;break;case"e":n=a<globals.MAP_width-1?a+1:null,l=t;break;case"w":n=a>0?a-1:null,l=t;break;case"s":l=t<globals.MAP_height-1?t+1:null,n=a}return null==l||null==n?null:[l+","+n]},loadScene:function(e,t){Tplayer.clearScene(),Tplayer.active=c.getScene(e,t),$("#e-play textarea").hide().delay(2e3).fadeIn("slow").val(c.textConvert(Tplayer.active.textoverlay)),Tplayer.active.objects.forEach(function(e){let t="";t="<img class='obj' data-selected='0' src='"+e.img+"' style='",e.x&&e.y&&(t+="top:"+e.y+"px; left:"+e.x+"px;"),e.filter&&(t+="filter:"+e.filter+";"),e.size&&(t+="width:"+e.size+"; height:"+e.size+";"),t+="'>";let a=$(t).hide().fadeIn(2e3);$("#e-play").append(a)}),$("._playwhatscene").text(Tplayer.active.x+","+Tplayer.active.y),Tplayer.loadColor(),Tplayer.updateSceneNavigation()},loadColor:function(){let e=Tplayer.active.color;0==e&&(e="#000000"),$("#e-play").css("background",e),$("body").css("background",e)},clearScene:function(){$("#e-text textarea").val(""),$("#e-play img.obj").each(function(){$(this).remove()})}};