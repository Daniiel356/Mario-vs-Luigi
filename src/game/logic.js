export class Engine{
    #keys={};
    #code;
    #game;
    frec=1/60;
    lastTime=0;

    constructor(code, game){
        this.#code=code;
        this.#game=game;
    }

    keydown=(key)=>{
        this.#keys[key]=true;
    }
    keyup=(key)=>{
        this.#keys[key]=false;
    }

    update(){
        this.#game.world.players.p1=this.updatePlayer(this.#game.world.players.p1);
        this.#game.world.players.p2=this.updatePlayer(this.#game.world.players.p2, 1);
    }

    searchBlocksInPlayer(player, func){
        const sx=Math.max(Math.floor(player.x/100)-1, 0);
        const ex=Math.min(Math.ceil((player.x+player.w)/100)+1, 16);

        const sy=Math.max(Math.floor(player.y/100)-1, 0);
        const ey=Math.min(Math.ceil((player.y+player.h)/100)+1, 7);

        for(let x=sx; x<ex; x++){
            for(let y=sy; y<ey; y++){
                const b=this.#game.world.cont[x*8+y];
                func({type: b, x: x*100, y: y*100, w: 100, h: 100});
            }
        }
    }

    updatePlayer(player, type){
        const keys={a:"KeyA", d:"KeyD", w:"KeyW"};
        const dif={y:0,x:0};
        const dt=this.lastTime;
        if(type==1)Object.assign(keys, {a:"ArrowLeft", d:"ArrowRight", w:"ArrowUp"});

        //define estados
        if(this.#keys[keys.a]==true)player.vx-=player.v*dt;
        if(this.#keys[keys.d]==true)player.vx+=player.v*dt; 
        
        if(this.#keys[keys.w] && player.canJump){
            player.canJump=false;
            player.jumping=true;
            player.vy=-player.vj*dt;
        }

        const px={...player, x: player.x+player.vx};
        this.searchBlocksInPlayer(px, (block)=>{
            if(block.type==0||block.type==2)return;
            if(this.colides(px, block)){
                player.vx=0;
                
            }
        });
        //actualiza valores reales
        player.vx=player.vx>0? Math.min(player.vx, player.maxV*dt):player.vx<0? Math.max(player.vx, -player.maxV*dt):0;
        player.x+=player.vx;

        if(player.vx>0){
            player.vx-=this.#game.world.friction*dt;
            if(player.vx<0)player.vx=0;
        }else if(player.vx<0){
            player.vx+=this.#game.world.friction*dt;
            if(player.vx>0)player.vx=0;
        }else {
            player.x+=dif.x;
        }

        player.x=Math.min(1600-player.w, Math.max(player.x, 0))

        player.jumping=true;
        const py={...player, y:player.y+player.vy};
        const pg={...player, y:player.y+player.h+player.vy, h:0}
        this.searchBlocksInPlayer(py, (block)=>{
            if(block.type==0)return;

            if(this.colides(py, block)){
                if(player.vy>0 && this.colides(pg, {...block, h:player.vy+0.1})){
                    player.jumping=false;
                    player.canJump=true;
                    dif.y=block.y-player.y-player.h;
                }else{
                    if(block.type==2)return;
                    player.vy=0;
                    dif.y=player.y-block.y
                }
            }
        });
        
        if(player.jumping){
            player.y+=player.vy;
            player.vy+=this.#game.world.g*dt;
        }
        player.y+=dif.y;
        

        return player;
    }

    colides(a,b){
        return (
            a.x+a.w > b.x && a.x < b.x+b.w &&
            a.y+a.h > b.y && a.y < b.y+b.h
        );
    }
}