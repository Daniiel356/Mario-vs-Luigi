const ui=document.getElementById("ui");
const scenes=Object.freeze({
    MENU:"mainMenu",
    PLAYMENU:"playMenu",
    DUOSETTINGS:"duoSettings",
    GAME:-1
});
let currentScene=scenes.MENU;

async function setScene(scene){
    if(scene!=-1){
        document.body.style.background="#fff";
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
    }else{
        document.body.style.background="#000";
    }
}

export {scenes, setScene, currentScene};