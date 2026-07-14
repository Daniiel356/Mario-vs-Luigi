import {World} from "./world.js";
import {Render} from "../visual/render.js";
import { Engine } from "./logic.js";
import { currentScene, scenes } from "../visual/scenes.js";

class Player{
    x=0;y=0;
    w=90;h=160;
    v=250; vj=1600;
    maxV=750;
    vx=0; vy=0;
    isJumping=false;
    canJump=true;
    constructor(name){
        this.name=name;
    }
}

class Game{
    #inGame=false;
    #world=new World(this); get world(){ return this.#world; };
    render=new Render(this);
    #code=Symbol();
    #engine=new Engine(this.#code, this);
    #lastTime;

    constructor(){
        document.addEventListener("keydown", (e)=>this.#engine.keydown(e.code));
        document.addEventListener("keyup", (e)=>this.#engine.keyup(e.code));
    }

    init(p1, p2){
        if(currentScene!=scenes.GAME)throw new Error("Para iniciar el juego se necesita que la escena actual sea 'GAME'");
        this.#world.players.p1=new Player(p1.name);
        this.#world.players.p2=new Player(p2.name);
        if(this.#world.dat){
            const dat=this.#world.dat;
            this.#world.players.p1.x=dat.p1.x;
            this.#world.players.p1.y=dat.p1.y;
            this.#world.players.p2.x=dat.p2.x;
            this.#world.players.p2.y=dat.p2.y;
        }
        const content=document.getElementById("gameContent");
        const right=content.children[0].children;
        const left=content.children[1].children;

        let def=(elem, key)=>{
            elem.addEventListener("touchstart", ()=>this.#engine.keydown(key));
            elem.addEventListener("touchend", ()=>this.#engine.keyup(key));
        }
        def(right[0], "KeyA");
        def(right[1], "KeyD");
        def(right[2], "KeyW");
        def(left[0], "ArrowLeft");
        def(left[1], "ArrowRight");
        def(left[2], "ArrowTop");

        document.addEventListener("visibilitychange", () => {
            if (!document.hidden) {
                this.#lastTime=performance.now();
                this.#engine.lastTime=0;
            }
        });        
        this.start();
    }

    start(){
        if(this.#inGame)return;
        this.#inGame=true;
        this.#lastTime=performance.now();
        requestAnimationFrame((x)=>this.loop(x));

    }
    pause(){
        this.#inGame=false;
    }

    loop(actTime){
        const deltaTime=Math.min((actTime-this.#lastTime)/1000, 1);
        this.#lastTime=actTime;

        this.#engine.lastTime+=deltaTime;
        if(this.#engine.lastTime>=this.#engine.frec){
            this.#engine.update();
            this.#engine.lastTime-=this.#engine.frec;
        }

        this.render.render();
        if(this.#inGame) requestAnimationFrame((x)=>this.loop(x));
    }
}
export {Game}