import {createPlayerFrames} from "./render.js";

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
        throw new Error(`Error al cargar el menu '${scene}': `, err)
    }
    await configScene();
}

async function configScene(){
    if(currentScene==scenes.DUOSETTINGS){
        for(const div of [ui.children[1], ui.children[2]]){
            const s=div.querySelector("select");
            const c=div.querySelector("canvas");
            const ctx=c.getContext("2d");
            c.width=c.clientWidth;
            c.height=c.clientHeight;

            const change=async ()=>{
                const color={r:0, g:0, b:0};
                if(s.value=="r")color.r=225;
                if(s.value=="g")color.g=225;
                if(s.value=="b")color.b=225;
                if(s.value=="p"){color.r=150; color.b=200};
                if(s.value=="y"){color.r=225; color.g=225};
                
                const data= await createPlayerFrames(color);
                const w=c.width, h=c.height;

                ctx.save();
                ctx.fillRect(0,0, w, h);
                ctx.translate(w/2, h/2);
                ctx.drawImage(data, 0, 0, 60, 64, -w/4, -h/4, 60*(w/120), 64*(h/128));
                ctx.restore();
            }
            s.addEventListener("change", change);
            change();
        }
    }
}

export {scenes, setScene, currentScene};