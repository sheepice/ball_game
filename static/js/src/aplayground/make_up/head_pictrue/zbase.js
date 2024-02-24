class HEAD extends WJY_GAME_OBJECT {
    constructor(playground, player, x, y) {
        super();
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.player = player;
        this.x = x;
        this.y = y;
    }

    update() {
        this.render();
    }
    render() {
        let outer = this;
        let player = this.player;
        let img = new Image();
        img.src = "https://img-blog.csdnimg.cn/303e5e4fceb14d9ca43f56eb96f4c2d2.png";
        img.onload = function() {
            let rad = player.radius;
            outer.ctx.drawImage(this, player.x - rad, player.y - rad * 0.4, player.radius * 5, player.radius * 5);
        }
    }
}

