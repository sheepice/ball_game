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
