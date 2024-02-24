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


class Particle extends WJY_GAME_OBJECT {
    constructor(playground, x, y, radius, vx, vy, color, speed, move_length) {
        super();
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.speed = speed;
        this.move_length = move_length;
        this.friction = 0.9;
        this.eps = 1;
    }

    start() {
    }

    update() {
        if (this.move_length < this.eps || this.speed < this.eps) {
            this.destroy();
            return false;
        }

        let moved = Math.min(this.move_length, this.speed * this.timedelta / 1000);
        this.x += this.vx * moved;
        this.y += this.vy * moved;
        this.speed *= this.friction;
        this.move_length -= moved;
        this.render();
    }

    render() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}

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
class WJY_GAME_MAP extends WJY_GAME_OBJECT {
    constructor(playground) {
        super();
        this.playground = playground;
        this.$canvas = $(`<canvas></canvas>`);
        this.ctx = this.$canvas[0].getContext('2d');
        this.ctx.canvas.width = this.playground.width;
        this.ctx.canvas.height = this.playground.height;
        this.playground.$playground.append(this.$canvas);
    }

    start() {

    }

    update(){
        this.render();
    }

    render() {
        this.ctx.fillStyle = "rgba(196, 247, 196, 0.2)";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}
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
class WjyPlayground {
    constructor(root) {
        this.root = root;
        this.$playground = $(`<div class="wjy-playground"></div>`);
        this.hide();
        this.root.$wjy_game.append(this.$playground);
        this.start();
    }

    start() {
        this.add_listening_events();
    }

    add_listening_events() {
        let outer = this;
    }

    show() {

        this.width = this.$playground.width();
        this.height = this.$playground.height();
        this.rand_colors = ["red", "green", "yellow", "gray", "pink", "white", "purple"];
        this.game_map = new WJY_GAME_MAP(this);
        this.get_reward = new GET_REWARD(this, this.width / 2, this.height / 2);
        this.players = [];
        this.players.push(new WJY_GAME_PLAYER(this, this.width / 2, this.height / 2, this.height * 0.05, "white", true, this.height * 0.15));

        for(let i = 0; i < 10; i ++ ) { //加入四个玩家
            let color = this.rand_colors[Math.floor(Math.random() * 7)];
            this.players.push(new WJY_GAME_PLAYER(this, this.width / 2, this.height / 2, this.height * 0.05, color, false, this.height * 0.15));
        }
        this.$playground.show();
    }

    hide() {
        while(this.players && this.players.length > 0) {
            this.players[0].destroy();
        }
        if(this.game_map) this.game_map.destroy();
        if(this.get_reward) this.get_reward.destroy();
        this.$playground.empty();
        this.$playground.hide();
        this.root.menu.show();
    }
}
class WjyLetter {
    constructor(root) {
        this.root = root;
        this.$letter = $(`
<div class="wjy-photo">
    <div class="wjy-return-field">
        返回主页面
    </div>
    <div class="rule">
        <h1>给最好的+1</h1>
        <p>首先呢，祝+1生日快乐吧。然后正如今年新年所说的一样，在过去2022年最开心的一件事情就是遇见了+1！
        当时记得第一次见到你的时候，好像是在办公室打扫卫生的时候，那个时候你带着一个帽子，然后印象中和你
        对我的第一印象差不多哈哈哈：高冷。但是没想到很快就打破了我的印象，从叫你王嘉谊到叫你阿姨到叫你+1
        好像用的时间非常非常的少。真的在当时会非常非常开心认识到你！</p>
        <p>对于我而言的话，我可能网上的话尊滴非常的多，但是现实生活里其实还是算一个社恐。不过好像也在和你的
        相处中变得越来越愿意说话了。但是自己很多时候特别可能私下人比较少的时候，自己还是不太敢看着对方说话啥的，
        可能也是因为自己高中烂脸然后一直自卑上来的缘故吧。所以可能在生活里，你有时候的热情会被我泼冷水，导致有时候
        和我交流起来就是会很尴尬。但是我也有在好好的去拾起自己的自信心，然后也希望以后能够和大家多说一些嘿嘿！</p>
        <p>这封信呢如果说最开始写应该是在2023年过年的时候写的，和这个网站诞生的时间相同。而当我在新年之初第一次接触
        怎么去写一个简单的网站或者游戏的时候，第一个想到的也就是说能写一个生日礼物送给+1，可能网站略微简陋，但是也写了
        蛮长的一段时间。因为觉得于我而言也是一件特别特别有意义的事情！我也在写的过程锻炼了自己，也憧憬着收到这份礼物的你也可以有些开心hh。</p>
        <p>回顾一下大二上的时候。我一直有说+1像个天使一样，虽然你有可能不太喜欢这个词语?但是真的就是在自己很多的时候看到
        了你的身影，然后充满干劲！记忆很深很深的有两件事情：一个就是当时第一次办献血的时候，你即使那时候很晚很晚睡，但是第二天
        还是在凌晨赶到，真的在那天帮了很多很多，然后自己就没有那么的手忙脚乱。还有一次是我说我脚崴了，然后你跑着就过来了，然后
        跟我说买了云南白药，记得去取。当时我真的真的会泪崩。所以心里真的会被天使治愈！</p>
        <p>当然你给我的温暖太多太多了，以至于三言两语真的也说不完，不过vv一直都记在心里。我这个人其实上大学
        最大的改变可能就是，说话变多了，但是也更加不敢说了。以至于有的时候也很想和大家打闹在一块，说一些玩笑话，还有自己的观点。
        但是很多时候，发现自己压根也不会，可能说了还会尴尬。所以很多时候就不说了。那时在家的时候，你也说过我这个点，真的自己很能
        get到，所以有的时候可能在你们身边，我也许就隐形啦。但是我也有在努力，希望能够慢慢快乐的融入大家的氛围吧！</p>
        <p>最后的话，如果除了祝+1生日快乐天天开心的话，我还想说一句就是老生常谈的祝+1身体健康。因为其实感觉上学期虽然你说要
        好好的睡觉，但是很多时候你都熬夜到很晚很晚，熬夜的话年轻的时候可能受得了，但是真的以后对身体的影响尊滴会很大很大的，
        还是希望+1能够好好的休息，然后我们一起加油！<p>
        <p>最后的最后，+1之前也有说你怕话多，很多时候都会跟文件传输助手说话。如果你不嫌弃的话，有啥话然后找不到地说话的时候，只要我不在睡觉工作，一定特别特别愿意当一个倾听者vv！希望和+1做一辈汁的好朋友！！也爱+1一辈汁！！</p>
        <p>写于：2023/1/19</p>
    <div>
</div>
`);
        this.hide();
        this.root.$wjy_game.append(this.$letter);
        this.$return_btn = this.$letter.find('.wjy-return-field');
        this.start();
    }

    start() {
        this.add_listening_events();
    }

    add_listening_events() {
        let outer = this;
        this.$return_btn.click(function() {
            outer.hide();
            outer.root.menu.show();
        });
    }

    hide() {
        this.$letter.hide();
    }

    show() {
        this.$letter.show();
    }
}
class WjyMenu {
    constructor(root, OS) {
        this.root = root;
        this.OS = OS;
        this.$menu = $(`
<div class="wjy_menu">
    <div class="wjy-menu-field">
        <div class="wjy-game-rule wjy-menu-form">
            网站规则
        </div>
        <br>
        <div class="wjy-menu-presents wjy-menu-form">
            打开游戏赢惊喜
        </div>
        <br>
        <div class="wjy-menu-photos wjy-menu-form">
            存下美照别打我
        </div>
        <br>
        <div class="wjy-menu-comments wjy-menu-form">
            信件还未拆封
        </div>
        <br>
        <div class="wjy-return-login wjy-menu-form">
            退出登录
        </div>
    </div>
</div>
            `);
        this.root.$wjy_game.append(this.$menu);
        this.$wjy_present = this.$menu.find('.wjy-menu-presents');
        this.$wjy_photos = this.$menu.find('.wjy-menu-photos');
        this.$wjy_comments = this.$menu.find('.wjy-menu-comments');
        this.$wjy_rule = this.$menu.find('.wjy-game-rule');
        this.$wjy_return_login = this.$menu.find('.wjy-return-login');

        this.start();
    }

    start() {
        this.hide();
        this.add_listening_events();
    }

    add_listening_events() {
        let outer = this;
        this.$wjy_return_login.click(function(){
            outer.root.settings.logout_on_remote();
        });
        let now_time = new Date();
        let bir_time = new Date("2022/7/13 00:00:00");
        let date = new Date(bir_time).getTime() - now_time.getTime();
        let days = Math.floor(date / (24 * 3600 * 1000));
        let lv1 = date % (24 * 3600 * 1000);
        let hours = Math.floor(lv1 / (3600 * 1000));
        let lv2 = lv1 % (3600 * 1000);
        let minutes = Math.floor(lv2 / (60 * 1000));
        let lv3 = lv2 % (60 * 1000);
        let seconds = Math.floor(lv3 / 1000);
        this.$wjy_present.click(function() {
            if(date > 0) {
                window.alert("专属+1的网页还有" + days + "天" + hours + "个小时" + minutes + "分钟" + seconds + "秒才会开放哦！");
            }
            else {
                outer.hide();
                outer.root.playground.show();
            }
        });

        this.$wjy_photos.click(function() {
            console.log(outer.root.settings.username);
            if(date > 0) {
                window.alert("专属+1的网页还有" + days + "天" + hours + "个小时" + minutes + "分钟" + seconds + "秒才会开放哦！");
            }
            else if(outer.root.settings.username != "wjy") {
                window.alert("由于照片太美，只有wjy用户可以访问噢！")
            }
            else {

                outer.hide();
                outer.root.photo.show();
            }
        });
        this.$wjy_comments.click(function() {
            if(date > 0) {
                window.alert("专属+1的网页还有" + days + "天" + hours + "个小时" + minutes + "分钟" + seconds + "秒才会开放哦！");
            }
            else if(outer.root.settings.username != "wjy") {
                window.alert("这封信只有用户wjy才能看到噢！！！")
            }
            else {

                outer.hide();
                outer.root.letter.show();
            }
        });
        this.$wjy_rule.click(function() {
            if(date > 0) {
                window.alert("专属+1的网页还有" + days + "天" + hours + "个小时" + minutes + "分钟" + seconds + "秒才会开放哦！");
            }
            else {

                outer.hide();
                outer.root.rule.show();
            }
        });

    }

    show(){
        this.$menu.show();
    }

    hide() {
        this.$menu.hide();
    }


}
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
class WjyPhoto {
    constructor(root) {
        this.root = root;
        this.$photo = $(`<div class="wjy-photo"></div>`);
        this.hide();
        this.root.$wjy_game.append(this.$photo);
        this.start();
    }

    start() {
        this.add_listening_events();
    }

    add_listening_events() {
        let outer = this;
    }

    show() {
        this.width = this.$photo.width();
        this.height = this.$photo.height();
        this.photo_map = new PHOTO_MAP(this);
        this.$photo.show();
    }

    hide() {
        this.$photo.hide();
    }
}
class WjyRule {
    constructor(root) {
        this.root = root;
        this.$rule = $(`
<div class="wjy-photo">
    <div class="wjy-return-field">
        返回主页面
    </div>
        <div class="rule">
            <h1>网页规则</h1>
            <p>此网页请在电脑打开噢，手机也可以看，但是很多东西手机看起来非常怪或者就是看不到！！</p>
            <p>此网页共有三个模块:打开游戏赢惊喜，存下美照别打我， 信件还未拆封！因为自己也是第一次写这样的网站，可能会有一些bug或者有点卡加载不出来，如果有类似的情况刷新一下页面应该可以得到缓解！</p>
            <h2>打开游戏赢惊喜</h2>
            <p>这个板块主要是一款简单的射击游戏。当场上的球仅剩你操作的那一个的时候，游戏获胜。根据本身球剩余的大小，最后获胜的特效大小也略有不同。游戏操作简单，鼠标右键控制球的走向，点哪里走哪里。如果需要发射火球攻击，需要先按下键盘的【q】键然后点击鼠标左键即可发射</p>
            <p>游戏小tips:可以先走位让对面互相残杀。你的子弹受开发者影响，是无限发的，所以你可以疯狂发射技能击败敌人</p>
            <h2>存下美照别打我</h2>
            <p>这个板块需要你不断地点击鼠标左键，当你最后点出了很多蛋糕的时候，此板块结束。这些照片可一直保存着呢哈哈哈哈啊。照片也组成了当事人的名字噢。然后点击途中记得打开电脑声音，如果背景音乐不好听，可以直接屏蔽hh。对了这个页面需要刷新返回主页面噢！不刷新的话可能魔音贯耳hh</p>
            <h2>信件还未拆封</h2>
            <p>最后一个板块主要就是写了信给+1，祝+1生日快乐噢！！</p>
            <p>本网站专属+1哈哈，希望+1能够喜欢！！</p>
        </div>
</div>
`);
        this.hide();
        this.root.$wjy_game.append(this.$rule);
        this.$return_btn = this.$rule.find('.wjy-return-field');
        this.start();
    }

    start() {
        this.add_listening_events();
    }
    add_listening_events() {
        let outer = this;
        this.$return_btn.click(function() {
            outer.hide();
            outer.root.menu.show();
        });
    }
    hide() {
        this.$rule.hide();
    }

    show() {
        this.$rule.show();
    }
}

class Settings {
    constructor(root) {
        this.root = root;
        this.OS = this.root.OS;
        this.platform = "WEB";
        if(this.OS) platform = "OTHWERS";
        this.$settings = $(`
            <div class="ac-game-settings">
                <div class="ac-game-settings-login">
                    <div class="ac-game-settings-title">
                        登录
                    </div>
                    <div class="ac-game-settings-username">
                        <div class="ac-game-settings-item">
                            <input type="text" placeholder="用户名">
                        </div>
                    </div>
                    <div class="ac-game-settings-password">
                        <div class="ac-game-settings-item">
                            <input type="password" placeholder="密码">
                        </div>
                    </div>
                    <div class="ac-game-settings-submit">
                        <div class="ac-game-settings-item">
                            <button>登录</button>
                        </div>
                    </div>
                    <div class="ac-game-settings-error-message">
                    </div>
                    <div class="ac-game-settings-option">
                        注册
                    </div>
                    <br>
                </div>
                <div class="ac-game-settings-register">
                    <div class="ac-game-settings-title">
                        注册
                    </div>
                    <div class="ac-game-settings-username">
                        <div class="ac-game-settings-item">
                            <input type="text" placeholder="用户名">
                        </div>
                    </div>
                    <div class="ac-game-settings-password ac-game-settings-password-first">
                        <div class="ac-game-settings-item">
                            <input type="password" placeholder="密码">
                        </div>
                    </div>
                    <div class="ac-game-settings-password ac-game-settings-password-second">
                        <div class="ac-game-settings-item">
                            <input type="password" placeholder="确认密码">
                                        </div>
                                         </div>
                                         <div class="ac-game-settings-submit">
                                          <div class="ac-game-settings-item">
                                                <button>注册</button>
                                           </div>
                                             </div>
                                               <div class="ac-game-settings-error-message">
                                                        </div>
                                                         <div class="ac-game-settings-option">
                                                             登录
                                                           </div>
                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                `);
        this.$login = this.$settings.find(".ac-game-settings-login");
        this.$login_username = this.$login.find(".ac-game-settings-username input");
        this.$login_password = this.$login.find(".ac-game-settings-password input");
        this.$login_submit = this.$login.find(".ac-game-settings-submit button");
        this.$login_error_message = this.$login.find(".ac-game-settings-error-message");
        this.$login_register = this.$login.find(".ac-game-settings-option");

        this.$login.hide();

        this.$register = this.$settings.find(".ac-game-settings-register");
        this.$register_username = this.$register.find(".ac-game-settings-username input");
        this.$register_password = this.$register.find(".ac-game-settings-password-first input");
        this.$register_password_confirm = this.$register.find(".ac-game-settings-password-second input");
        this.$register_submit = this.$register.find(".ac-game-settings-submit button");
        this.$register_error_message = this.$register.find(".ac-game-settings-error-message");
        this.$register_login = this.$register.find(".ac-game-settings-option");

        this.$register.hide();

        this.$acwing_login = this.$settings.find('.ac-game-settings-acwing img');


        this.start();

        this.root.$wjy_game.append(this.$settings); // 将这个html对象加入到ac_game
    }

    start() {
        this.getinfo();
        this.add_listening_events();
    }

    add_listening_events() {
        this.add_register_listening_events();
        this.add_login_listening_events();
    }

    add_register_listening_events() {
        let outer = this;
        this.$register_login.click(function() {
            outer.login();
        });
        this.$register_submit.click(function(){
            outer.register_on_remote();
        });
    }

    add_login_listening_events() {
        let outer = this;
        this.$login_register.click(function() {
            outer.register();
        });
        this.$login_submit.click(function() {
            outer.login_on_remote();
        })
    }

    register_on_remote() {
        let outer = this;
        let username = this.$register_username.val();
        let password = this.$register_password.val();
        let password_confirm = this.$register_password_confirm.val();
        this.$register_error_message.empty();

        $.ajax({
            url:"https://app4515.acapp.acwing.com.cn/settings/register",
            type:"GET",
            data:{
                username:username,
                password:password,
                password_confirm:password_confirm,
            },
            success: function(resp){
                console.log(resp);
                if(resp.result === "success") {
                    location.reload();
                    outer.hide();
                }
                else {
                    outer.$register_error_message.html(resp.result);
                }
            }
        });
    }

    login_on_remote()  //在远程服务器登录
    {
        let outer = this;
        let username = this.$login_username.val();
        let password = this.$login_password.val();
        this.$login_error_message.empty();

        $.ajax({
            url:"https://app4515.acapp.acwing.com.cn/settings/login/",
            type:"GET",
            data: {
                username:username,
                password:password,
            },
            success:function(resp){
                if (resp.result === "success"){
                    outer.hide();
                    location.reload();
                }
                else {
                    outer.$login_error_message.html(resp.result);
                }
            }
        });
    }

    logout_on_remote() {
        let outer = this;
        if(this.platform === "OTHERS") return false;
        $.ajax({
            url:"https://app4515.acapp.acwing.com.cn/settings/logout/",
            type:"GET",
            success:function(resp){
                if(resp.result === "success") {
                    location.reload();
                }
            },
        });
    }

    login() {
        this.$register.hide();
        this.$login.show();
    }

    register()
    {
        this.$login.hide();
        this.$register.show();
    }

    hide()
    {
        this.$settings.hide();
    }

    show()
    {
        this.$settings.show();
    }

    getinfo() {
        let outer = this;
        $.ajax({
            url:"https://app4515.acapp.acwing.com.cn/settings/getinfo/",
            type:"GET",
            data: {
                platform: outer.platform,
            },
            success: function(resp) {
                if(resp.result === "suceess") {
                    outer.root.menu.show();
                    console.log(resp.photo);
                    outer.hide();
                    outer.username = resp.username;
                    outer.photo = resp.photo;
                }
                else {
                    outer.root.menu.hide();
                    outer.login();
                }
            },
        });
    }
}
export class WJY {
    constructor(id, OS) {
        this.id = id;
        this.OS = OS;
        this.$wjy_game = $('#' + id);
        this.settings = new Settings(this);
        this.menu = new WjyMenu(this);
        this.playground = new WjyPlayground(this);
        this.photo = new WjyPhoto(this);
        this.rule = new WjyRule(this);
        this.letter = new WjyLetter(this);
        this.start();
    }

    start() {

    }
    end() {
    }
}
