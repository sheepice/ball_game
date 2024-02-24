class FIRE_BALL extends WJY_GAME_OBJECT{
    constructor(playground, player, x, y, radius, color, speed, vx, vy, move_max_dist) {
        super();
        this.player = player;
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.vx = vx;
        this.vy = vy;
        this.move_max_dist = move_max_dist;
        this.eps = 0.1;
    }

    start() {

    }

    update() {
        this.update_move();
        let now_p = this.playground.players;
        let now_p_len = this.playground.players.length;
        let s = false;
        for(let i = 0; i < now_p_len; i ++ ) {
            if(now_p[i].is_me) s = true;
        }
        if(s === true) {
            for(let i = 0; i < now_p_len; i ++ ) {
                if(now_p[i] != this.player && this.is_collision(now_p[i])) {
                    this.attack(now_p[i]);
                    this.destroy();
                }
            }
        }
        this.render();
    }

    is_collision(player) {
        let dist = 0;
        if(!player) return false;
        dist = GET_DIST(this.x, this.y, player.x, player.y);
        if(dist < this.radius + player.radius) return true;
        else return false;
    }

    attack(player) {
        let px = player.x, py = player.y;
        let angle = Math.atan2(py - this.y, px - this.x);
        let damage = this.playground.height * 0.01;
        player.is_attacked(angle, damage);
    }

    render() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    update_move() {
        if(this.move_max_dist < this.eps) {
            this.destroy();
            return false;
        }

        else {
            let moved = Math.min(this.move_max_dist, this.speed * this.timedelta / 1000);
            this.x += this.vx * moved;
            this.y += this.vy * moved;
            this.move_max_dist -= moved;
        }
    }
}
