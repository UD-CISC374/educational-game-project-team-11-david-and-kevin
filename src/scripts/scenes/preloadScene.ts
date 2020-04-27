export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("background", "assets/images/alpha-map-background.png");
    this.load.image("Mountain", "assets/images/Mountain.png");
    this.load.image("Tree", "assets/images/Tree.png");
    this.load.image("watertile1", "assets/images/tiles01.png");
    this.load.image("watertile2", "assets/images/tiles02.png");
    this.load.image("watertile3", "assets/images/tiles03.png");
    this.load.image("watertile4", "assets/images/tiles04.png");
    this.load.image("watertile5", "assets/images/tiles05.png");
    this.load.image("watertile6", "assets/images/tiles06.png");
    this.load.image("watertile7", "assets/images/tiles07.png");
    this.load.image("watertile8", "assets/images/tiles08.png");
    this.load.image("watertile9", "assets/images/tiles09.png");
    this.load.image("watertile10", "assets/images/tiles10.png");
    this.load.image("growarea", "assets/images/tiles11.png");
    this.load.image("AE", "assets/spritesheets/AE.png");
    this.load.image("CS", "assets/spritesheets/CS.png");
    this.load.image("AE_left", "assets/spritesheets/AE_left.png");
    this.load.image("CS_left", "assets/spritesheets/CS_left.png");

    this.load.spritesheet("seedsandplants", "assets/spritesheets/seedsandplants.png",{
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
