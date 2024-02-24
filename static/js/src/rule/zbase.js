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
