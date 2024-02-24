let ALL_GAME_OBJECT = [];

class WJY_GAME_OBJECT {
    constructor() {
        ALL_GAME_OBJECT.push(this);
        this.is_started = false;
        this.timedelta = 0;

    }

    start() {

    }

    update() {

    }

    destroy() {
        this.on_destroy();
        for(let i = 0; i < ALL_GAME_OBJECT.length; i ++ ) {
            if(ALL_GAME_OBJECT[i] === this) {
                ALL_GAME_OBJECT.splice(i, 1);
                break;
            }
        }
    }

    on_destroy() { //在销毁前只执行一次

    }
}

let last_timestamp;

let WJY_GAME_ANIMATION = function(timestamp) {
    for(let i = 0; i < ALL_GAME_OBJECT.length; i ++ ) {
        let obj = ALL_GAME_OBJECT[i];
        if(!ALL_GAME_OBJECT[i].is_started) {
            obj.start();
            ALL_GAME_OBJECT[i].is_started = true;
        }
        else {
            obj.update();
            obj.timedelta = timestamp - last_timestamp;
        }
    }
    last_timestamp = timestamp;

    requestAnimationFrame(WJY_GAME_ANIMATION);
}

requestAnimationFrame(WJY_GAME_ANIMATION);


