import 'pixi'
// import 'p2'
import * as Phaser from 'phaser'

class SimpleGame {

    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.WEBGL, 'content', { preload: this.preload, create: this.create });
    }

    game: Phaser.Game;

    preload() {
        this.game.load.image('logo', 'images/descarga.jpeg');
    }

    create() {
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
    }

}

window.onload = () => {

    var game = new SimpleGame();

};
