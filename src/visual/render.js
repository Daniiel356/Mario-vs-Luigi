const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
canvas.width=1600;
canvas.height=800;
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
                ctx.fillStyle=elem==0? "#abf": elem==1?"#8c3700": "#fa0";
                ctx.fillRect(x*100, y*100, 100, 100);
            }
        }
        ctx.restore();
    }
    renderPlayer(player){
        ctx.save();
        ctx.fillStyle="#f00";
        ctx.fillRect(player.x, player.y, player.w, player.h);
        ctx.restore();
    }

    render(){
        ctx.clearRect(0, 0, 1600, 800);
        this.renderWorld();
        this.renderPlayer(this.#game.world.players.p1);
        this.renderPlayer(this.#game.world.players.p2);
    }
}
export {resizeCanvas, Render}