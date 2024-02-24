class WJY_GAME_PLAYER extends WJY_GAME_OBJECT {
    constructor(playground, x, y, radius, color, is_me, speed) {
        super();
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.is_me = is_me;
        this.speed = speed;
        this.move_length = 0;
        this.eps = 0.1;
        this.cur_skill = null;
        this.damage_vx = 0;
        this.damage_vy = 0;
        this.damage_speed = 0;
        this.friction = 0.8;
        this.spent_time = 0;

        if(this.is_me) {
            this.img = new Image();
            this.img.src = this.playground.root.settings.photo;
        }
    }

    start() {
        if(this.is_me) {
            this.add_listening_events();
        }
        else {
            let tx = Math.random() * this.playground.height;
            let ty = Math.random() * this.playground.height;
            this.move_to(tx, ty);
        }
    }

    update() {
        this.spent_time += this.timedelta / 1000;
        if (!this.is_me && this.spent_time > 4 && Math.random() < 1 / 100.0) {
            let player = this.playground.players[Math.floor(Math.random() * this.playground.players.length)];
            let tx = player.x + player.speed * this.vx * this.timedelta / 1000 * 0.3;
            let ty = player.y + player.speed * this.vy * this.timedelta / 1000 * 0.3;
            this.shoot_fireball(tx, ty);
        }

        this.update_move();
        if(this.playground.players.length != 1) this.render();
    }

    add_listening_events() {
        let outer = this;
        this.playground.game_map.$canvas.on("contextmenu", function() {
            return false;
        });

        this.playground.game_map.$canvas.mousedown(function(e) {
            let ee = e.which;
            if(ee === 3) {
                outer.move_to(e.clientX, e.clientY);
            }
            else if(ee === 1) {
                if(outer.cur_skill === "fireball") {
                    outer.shoot_fireball(e.clientX, e.clientY);
                    outer.cur_skill = null;
                    return false;
                }
            }
        });
        $(window).keydown(function(e) {
            let ee = e.which;
            if(ee === 81) {
                outer.cur_skill = "fireball";
            }
        });
    }


    shoot_fireball(tx, ty) {
        let x = this.x;
        let y = this.y;
        let radius = this.playground.height * 0.01;
        let color = "orange";
        let angle = Math.atan2(ty - y, tx - x);
        let vx = Math.cos(angle);
        let vy = Math.sin(angle);
        let speed = this.playground.height * 0.5;
        let move_max_dist = this.playground.height * 0.8;
        new FIRE_BALL(this.playground,this, x, y, radius, color, speed, vx, vy, move_max_dist);
    }

    is_attacked(angle, damage) {
        for (let i = 0; i < 20 + Math.random() * 10; i ++ ) {
            let x = this.x, y = this.y;
            let radius = this.radius * Math.random() * 0.1;
            let angle = Math.PI * 2 * Math.random();
            let vx = Math.cos(angle), vy = Math.sin(angle);
            let color = this.color;
            let speed = this.speed * 10;
            let move_length = this.radius * Math.random() * 5;
            new Particle(this.playground, x, y, radius, vx, vy, color, speed, move_length);
        }

        this.radius -= damage;
        if(this.radius < 10) {
            this.destroy();
            return false;
        }
        this.damage_vx = Math.cos(angle);
        this.damage_vy = Math.sin(angle);
        this.damage_speed = damage * 100;
        this.speed * 0.9;
    }

    move_to(tx, ty) {
        this.move_length = GET_DIST(tx, ty, this.x, this.y);
        let angle = Math.atan2(ty - this.y, tx - this.x);
        this.vx = Math.cos(angle);
        this.vy = Math.sin(angle);
    }

    update_move() {
        if(this.damage_speed > 10) {
            this.vx = 0, this.vy = 0;
            this.move_length = 0;
            let wl_dist = this.damage_vx * this.damage_speed * this.timedelta / 1000;
            this.x += wl_dist;
            this.y += wl_dist;
            this.damage_speed *= this.friction;
        }
        else {
            if(this.move_length < this.eps) {
                this.vx = this.vy = 0;
                this.move_length = 0;
                if(!this.is_me) {
                    let tx = Math.random() * this.playground.height;
                    let ty = Math.random() * this.playground.height;
                    this.move_to(tx, ty);
                }
            }

            else {
                let moved = Math.min(this.move_length, this.speed * this.timedelta / 1000);
                this.x += this.vx * moved;
                this.y += this.vy * moved;
                this.move_length -= moved;
            }

        }
    }


    render() {
        if(this.is_me) {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            this.lineWidth = this.eps * 10;
            this.ctx.stroke();
            this.ctx.clip();
            this.ctx.drawImage(this.img, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
            this.ctx.restore();
        }
        else {
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
        }
    }

    on_destroy() {
        for(let i = 0; i < this.playground.players.length; i ++ ) {
            let now_player = this.playground.players[i];
            if(now_player === this) {
                this.playground.players.splice(i, 1);
                break;
            }
        }
    }

}


let GET_DIST = function(x1, y1, x2, y2) {
    let n1 = x1 - x2;
    let n2 = y1 - y2;
    return Math.sqrt(n1 * n1 + n2 * n2);
}
