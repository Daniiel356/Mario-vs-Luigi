const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
canvas.width=1600;
canvas.height=800;
ctx.imageSmoothingEnabled = false;
ctx.font="35px 'informal'";
ctx.textAlign="center";
ctx.textBaseline="middle";

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
        const img=player.img;
        let x=player.moving?player.frame*60:0;
        if(player.dir==1){
            ctx.drawImage(img, x, 0, 60, 64, player.x, player.y, player.w, player.h);
        }else{
            ctx.translate(player.x+player.w, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(img, x, 0, 60, 64, 0, player.y, player.w, player.h);
        }
        ctx.restore();
        ctx.fillText(player.name, player.x+player.w/2, player.y-10)
    }

    render(){
        ctx.clearRect(0, 0, 1600, 800);
        this.renderWorld();
        this.renderPlayer(this.#game.world.players.p1);
        this.renderPlayer(this.#game.world.players.p2);
    }
}

async function createPlayerFrames(color){
    const imgCanvas=document.createElement("canvas");
    const ctx=imgCanvas.getContext("2d");
    imgCanvas.width=240;
    imgCanvas.height=64;

    const img=new Image();
    img.src="../../assets/img/player.png";
    await img.decode();
    ctx.drawImage(img, 0, 0);

    const imgData=ctx.getImageData(0, 0, 240, 64);
    const data=imgData.data;
    for(let px=0; px<data.length; px+=4){
        if(data[px]==0&&data[px+1]==0&&data[px+2]==255){
            data[px]=color.r;
            data[px+1]=color.g;
            data[px+2]=color.b;
        }
    }
    ctx.putImageData(imgData, 0, 0);
    return imgCanvas;
}
export {resizeCanvas, Render, createPlayerFrames}