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
