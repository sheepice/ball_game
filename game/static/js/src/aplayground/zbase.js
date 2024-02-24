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
