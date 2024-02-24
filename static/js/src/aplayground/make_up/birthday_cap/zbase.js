class CAP extends WJY_GAME_OBJECT {
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
        img.src = "https://img-blog.csdnimg.cn/bcaeff128dee41aeb0542ea3900786d4.png";
        img.onload = function() {
            outer.ctx.drawImage(this, player.x - player.radius / 1.04, player.y - player.radius * 3.54, player.radius * 5, player.radius * 5);
        }
    }
}
