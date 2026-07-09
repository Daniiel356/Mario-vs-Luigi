const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
let scale=0;

function resizeCanvas(){
    const width=document.body.clientWidth;
    const height=document.body.clientHeight;
    let w=width-(width%2==0? 0:1), h=w/2;

    if(h>height){
        h=height-(height%2==0? 0:1);
        w=h*2;
    }
    
    canvas.style.width=w+"px";
    canvas.style.height=h+"px";
    canvas.width=w;
    canvas.height=h;
    scale=Math.round(w/16);
}

class Render{
    world;
    #game;

    constructor(Game){
        this.#game=Game;
    }
    renderWorld(){
        ctx.save();
        for(let x=0; x<16; x++){
            for(let y=0; y<8; y++){
                const elem=this.world[x*8+y];
                ctx.fillStyle=elem==0? "#abf":"#8c3700";
                ctx.fillRect(x*scale, y*scale, scale, scale);
            }
        }
        ctx.restore();
    }
    renderPlayer(player){
        ctx.save();
        ctx.fillStyle="#f00";
        ctx.fillRect((player.x/100)*scale, (player.y/100)*scale, (player.w/100)*scale, (player.h/100)*scale);
        ctx.restore();
    }

    render(){
        ctx.clearRect(0, 0, scale*16, scale*8);
        this.renderWorld();
        this.renderPlayer(this.#game.world.players.p1);
        this.renderPlayer(this.#game.world.players.p2);
    }
}
export {resizeCanvas, Render}