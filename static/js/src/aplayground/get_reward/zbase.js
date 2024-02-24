class GET_REWARD extends WJY_GAME_OBJECT {
    constructor(playground, x, y) {
        super();
        this.playground = playground;
        this.x = x;
        this.y = y;
        this.ctx = this.playground.game_map.ctx;
        this.text_content = ["+1生日快乐", "愿+1天天开心"];
        this.cnt = 0;
        this.spent_time = 0;
        this.change_delta = 1.5;
        this.control_pre = 0;
    }

    update() {
        let players = this.playground.players;
        if(players.length === 1 && players[0].is_me) {
            if(this.control_pre === 0) {
                this.cap = new CAP(this.playground, players[0], this.x, this.y);
                this.head_pic = new HEAD(this.playground, players[0], this.x, this.y);
                this.control_pre = 1;
            }
            this.spent_time += this.timedelta / 1000;
            if(this.spent_time > this.change_delta) {
                this.change_delta += 1.5;
                this.cnt = (this.cnt + 1) % 2;
            }

            for(let i = 0; i < 1; i ++ ) {
                for(let j = 0; j < 20 + Math.random() * 10; j ++ ) {
                    let x = this.playground.width * Math.random();
                    let y = this.playground.height * Math.random();
                    let radius = players[0].radius * Math.random() * 0.1;
                    let angle = Math.PI * 2 * Math.random();
                    let vx = Math.cos(angle), vy = Math.sin(angle);
                    let colors = ["red", "yellow", "gray", "green", "black", "white", "pink", "orange"];
                    let ss = Math.floor(Math.random() * 8);
                    let color = colors[ss];
                    let speed = players[0].speed * 8;
                    let move_length = radius * Math.random() * 50;
                    new Particle(this.playground, x, y, radius, vx, vy, color, speed, move_length);
                }
            }

            if(this.spent_time > 6) {
                window.alert("恭喜+1成功完成生日礼物挑战，你可以点击确定到主页！！")
                this.playground.hide();
            }
            this.render();
        }
        else if(players.length != 0){
            let s = 0;
            for(let i = 0; i < players.length; i ++ ) {
                if(players[i].is_me) s = 1;
            }
            if(s === 0) {
                window.alert("很遗憾挑战失败，可以再次挑战哦！加油+1,冲冲冲");
                if(this.spent_time === 0) this.playground.hide();
            }
        }
    }


    render() {
        this.ctx.font = "200px Arial";
        this.ctx.strokeText(this.text_content[this.cnt], this.x, this.y, 500);
    }
}
