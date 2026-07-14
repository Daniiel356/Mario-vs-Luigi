const ui=document.getElementById("ui");
const scenes=Object.freeze({
    MENU:"mainMenu",
    PLAYMENU:"playMenu",
    DUOSETTINGS:"duoSettings",
    GAME:"game"
});
let currentScene=scenes.MENU;

async function setScene(scene){
        document.body.style.background=scene!=scenes.GAME? "#fff":"#000";
        try{
            const res=await fetch("./resources/menus.html");
            const html=await res.text();

            const parser=new DOMParser();
            const doc=parser.parseFromString(html, "text/html");
            const content=doc.getElementById(scene).content.cloneNode(true);
            ui.innerHTML="";
            ui.append(content);
            currentScene=scene;
        }catch(err){
            console.error(`Error al cargar el menu '${scene}': `, err)
        }
    }

export {scenes, setScene, currentScene};