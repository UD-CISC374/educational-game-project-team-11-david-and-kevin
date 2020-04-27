export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("board", "assets/images/updatebackground.png");

    this.load.image("background", "assets/images/alpha-map-background.png");
    this.load.image("Mountain", "assets/images/Mountain.png");
    this.load.image("Tree", "assets/images/Tree.png");
    this.load.image("watertile", "assets/spritesheets/BasicMapTiles.png");

    this.load.image("growarea", "assets/images/tiles11.png");
    this.load.image("AE", "assets/spritesheets/AE.png");
    this.load.image("CS", "assets/spritesheets/CS.png");
    this.load.image("bucket", "assets/images/bucket.png");
    this.load.image("plastic", "assets/images/plastic.png");

    this.load.spritesheet("seedsandplants", "assets/spritesheets/seedsandplants.png",{
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("icons", "assets/spritesheets/icons.png",{
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("tubing", "assets/spritesheets/tubing.png",{
      frameWidth: 32,
      frameHeight: 32
    });





  }

  create() {
    

    this.scene.start("MainScene");
  }
}
