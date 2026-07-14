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

    name1=name1.value||"Luigi"; name2=name2.value||"Mario";
    
    const calcColor=(x)=>{
    const s=document.getElementById("ui").children[x].querySelector("select");
    const color={r:0, g:0, b:0};
    if(s.value=="r")color.r=225;
    if(s.value=="g")color.g=225;
    if(s.value=="b")color.b=225;
    if(s.value=="p"){color.r=150; color.b=200};
    if(s.value=="y"){color.r=225; color.g=225};
    return color;
    }
    const color1=calcColor(1), color2=calcColor(2);
    await setScene(scenes.GAME);

    await game.world.loadWorld("./assets/worlds/plataforms.json");
    await game.init({name: name1, color: color1},{name: name2, color: color2});
}

await setScene(scenes.MENU);