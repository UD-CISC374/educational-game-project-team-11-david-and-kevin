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
    this.load.image("pond", "assets/images/pond.png");
    this.load.image("plastic", "assets/images/plastic.png");
    this.load.image("forrestTile", "assets/spritesheets/forrestTile.png");
    this.load.image("aei", "assets/images/aeinstructions.png");
    this.load.image("csi", "assets/images/csinstructions.png");
    
    this.load.image("plantsformap", "assets/spritesheets/seedsandplants.png")
    this.load.spritesheet("icons", "assets/spritesheets/icons.png",{
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("seedsandplants", "assets/spritesheets/seedsandplants.png",{
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet("AES", "assets/spritesheets/AE_sprites.png",{
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("CSS", "assets/spritesheets/CS_sprites.png",{
      frameWidth: 32,
      frameHeight: 32
    });


    this.load.image("tubing", "assets/spritesheets/tubing.png");
    this.load.tilemapTiledJSON("map", "assets/images/autoMap.json");
    this.load.image("mappedTiles", "assets/images/mappedTiles.png");
    this.load.spritesheet("enemy","assets/images/enemy.png",{ frameWidth: 32,
    frameHeight: 32})





  }

  create() {
    

    this.scene.start("MainScene");
  }
}
