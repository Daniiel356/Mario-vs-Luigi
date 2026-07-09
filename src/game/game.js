import {World} from "./world.js";
import {Render} from "../visual/render.js";
import { Engine } from "./logic.js";

class Player{
    x=0;y=0;
    w=100;h=160;
    v=5;
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

    constructor(){
        document.addEventListener("keydown", this.#engine.keydown);
        document.addEventListener("keyup", this.#engine.keyup);
    }

    init(p1, p2){
        this.#world.players.p1=new Player(p1.name);
        this.#world.players.p2=new Player(p2.name);
        if(this.#world.dat){
            const dat=this.#world.dat;
            this.#world.players.p1.x=dat.p1.x;
            this.#world.players.p1.y=dat.p1.y;
            this.#world.players.p2.x=dat.p2.x;
            this.#world.players.p2.y=dat.p2.y;
        }
        this.start();
    }

    start(){
        if(this.#inGame)return;
        this.#inGame=true;
        requestAnimationFrame(()=>this.loop());

    }
    pause(){
        this.#inGame=false;
    }

    loop(){
        this.render.render();
        if(this.#inGame) requestAnimationFrame(()=>this.loop());
    }
}
export {Game}