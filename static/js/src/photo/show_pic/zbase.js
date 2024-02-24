class PIC extends WJY_GAME_OBJECT {
    constructor(photo, x, y, to_x, to_y, speed, pic_src) {
        super();
        this.photo = photo;
        this.speed = speed;
        this.pic_src = pic_src;
        this.ctx = this.photo.photo_map.ctx;
        this.x = x;
        this.y = y;
        this.to_x = to_x;
        this.to_y = to_y;
        this.move_length = GET_DIST(this.x, this.y, this.to_x, this.to_y);
        this.width = this.photo.width;
        this.height = this.photo.height;
        this.angle = Math.atan2(this.to_x - this.x, this.to_y - this.y);
        this.vx = Math.cos(this.angle);
        this.vy = Math.sin(this.angle);
        this.eps = 0.1;
    }

    start() {
    }

    render() {
        let outer = this;
        let img = new Image();
        img.src = this.pic_src;
        img.onload = function() {
            outer.ctx.drawImage(this, outer.x / 2, outer.y / 2, outer.width / 6, outer.height / 4);
        }
    }

    move_pic() {
        if(this.move_length > this.eps) {
        let moved = Math.min(this.move_length, this.speed * this.timedelta / 1000);
        this.x += moved * this.vx;
        this.y += moved * this.vy;
        this.move_length -= moved;
        }
    }

    update() {
        this.move_pic();
        this.render();
    }
}
