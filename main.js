import {scenes, setScene, currentScene} from "./src/visual/scenes.js";
import {resizeCanvas} from "./src/visual/render.js";
import {Game} from "./src/game/game.js"

window.setScene=setScene;
window.scenes=scenes;

resizeCanvas();
window.addEventListener("resize", (e)=>{
    resizeCanvas();
});
const game=new Game();

window.initGame=async()=>{
    if(!currentScene==scenes.DUOSETTINGS)return;
    let name1= document.getElementById("p1Name");
    let name2= document.getElementById("p2Name");
    if(name1==null || name2==null)return;

    name1=name1.textContent||"Luigi"; name2=name2.textContent||"Mario";
    document.getElementById("ui").innerHTML="";
    setScene(scenes.GAME);

    await game.world.loadWorld("./resources/worlds/plataforms.json");
    game.init({name: name1},{name: name2});
}

await setScene(scenes.DUOSETTINGS);
await initGame();