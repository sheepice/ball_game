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
