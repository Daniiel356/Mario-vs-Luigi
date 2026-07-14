export class World{
    players={p1: null, p2: null};
    balls=[];
    friction=225;
    g=110;
    #game;
    #json={}
    get cont(){ return this.#json.cont; }
    get dat(){ return this.#json.dat; }

    constructor(Game){
        this.#game=Game;
    }

    async loadWorld(url){
        try{
            const json=JSON.parse(await (await fetch(url)).text());
            if(!json)throw new Error("Error al cargar");
            this.#json=json;
            this.#game.render.world=json.cont;
        }catch(err){
            throw new Error("Error al cargar:", err);
        }
    }
}