class PHOTO_MAP extends WJY_GAME_OBJECT {
    constructor(photo) {
        super();
        this.photo = photo;
        this.$canvas = $(`<canvas></canvas>`);
        this.ctx = this.$canvas[0].getContext('2d');
        this.ctx.canvas.width = this.photo.width;
        this.ctx.canvas.height = this.photo.height;
        this.photo.$photo.append(this.$canvas);
        this.cnt = 1;
    }

    start() {
        this.add_listening_events();
    }

    add_listening_events() {
        let outer = this;
        let width = this.ctx.canvas.width;
        let height = this.ctx.canvas.height;
        let pic_srcs = ["/static/images/features/1.jpg","/static/images/features/9.jpg", "/static/images/features/2.jpg", "/static/images/features/3.jpg", "/static/images/features/4.jpg", "/static/images/features/5.jpg", "/static/images/features/6.jpg", "/static/images/features/7.jpg", "/static/images/features/8.jpg", "/static/images/pre.gif","/static/images/wjy1.jpg", "/static/images/wjy2.jpg" ];
        this.$canvas.mousedown(function(e) {
            let ee = e.which;
            if(ee === 1) {
                if(outer.cnt === 2) {
                    let $music = $(`<audio loop autoplay src="static/images/wjy.m4a"></audio>`);
                    outer.$canvas.append($music);
                }
                let mod = 10;
                if(outer.cnt % mod === 1) new PIC(outer.photo, width / 2, height / 2, 2.25 * width / 4, height / 1000, width * 0.15, pic_srcs[0]);
                if(outer.cnt % mod === 2) new PIC(outer.photo, width / 2, height / 2, 2.25 * width / 4, height / 1.7, width * 0.15, pic_srcs[1]);
                if(outer.cnt % mod === 3) new PIC(outer.photo, width / 2, height / 2, 1.7 * width / 4, height / 3, width * 0.15, pic_srcs[2]);
                if(outer.cnt % mod === 4) new PIC(outer.photo, width / 2, height / 2, 2.25 * width / 4, height / 3, width * 0.15, pic_srcs[3]);
                if(outer.cnt % mod === 5) new PIC(outer.photo, width / 2, height / 2, 2.8 * width / 4, height / 3, width * 0.15, pic_srcs[4]);
                if(outer.cnt % mod === 6) new PIC(outer.photo, width / 2, height / 2, 1 * width / 4, height * 1.8, width * 0.15, pic_srcs[5]);
                if(outer.cnt % mod === 7) new PIC(outer.photo, width / 2, height / 2, 2.25 * width / 4, height * 1.8, width * 0.15, pic_srcs[6]);
                if(outer.cnt % mod === 8) new PIC(outer.photo, width / 2, height / 2, 3.5 * width / 4, height * 1.8, width * 0.15, pic_srcs[7]);
                if(outer.cnt % mod === 9) new PIC(outer.photo, width / 2, height / 2, 1.625 * width / 4, height * 1.8, width * 0.15, pic_srcs[10]);
                if(outer.cnt % mod === 0) new PIC(outer.photo, width / 2, height / 2, 2.875 * width / 4, height * 1.8, width * 0.15, pic_srcs[11]);
                if(outer.cnt % mod === 1 && outer.cnt > mod) {
                    new PIC(outer.photo, width / 2, height / 2, 2.25 * width / 4, height / 1000, width * 0.15, pic_srcs[9]);
                    new PIC(outer.photo, width / 2, height / 2, 2.25 * width / 4, height / 1.7, width * 0.15, pic_srcs[9]);
                    new PIC(outer.photo, width / 2, height / 2, 1.7 * width / 4, height / 3, width * 0.15, pic_srcs[9]);
                    new PIC(outer.photo, width / 2, height / 2, 2.25 * width / 4, height / 3, width * 0.15, pic_srcs[9]);
                    new PIC(outer.photo, width / 2, height / 2, 2.8 * width / 4, height / 3, width * 0.15, pic_srcs[9]);
                    new PIC(outer.photo, width / 2, height / 2, 1 * width / 4, height * 1.8, width * 0.15, pic_srcs[9]);
                    new PIC(outer.photo, width / 2, height / 2, 2.25 * width / 4, height * 1.8, width * 0.15, pic_srcs[9]);
                    new PIC(outer.photo, width / 2, height / 2, 3.5 * width / 4, height * 1.8, width * 0.15, pic_srcs[9]);
                    new PIC(outer.photo, width / 2, height / 2, 1.625 * width / 4, height * 1.8, width * 0.15, pic_srcs[9]);
                    new PIC(outer.photo, width / 2, height / 2, 2.875 * width / 4, height * 1.8, width * 0.15, pic_srcs[9]);

                }
                outer.cnt ++;
            }
        });
    }

    update() {
        this.render();
    }

    render() {
        this.ctx.fillStyle = "rgba(255, 192, 203, 0.2)";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}
