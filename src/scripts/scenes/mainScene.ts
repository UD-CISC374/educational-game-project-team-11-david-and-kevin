import ExampleObject from '../objects/exampleObject';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  private background: Phaser.GameObjects.TileSprite;
  private CS: Phaser.Physics.Arcade.Sprite;
  private AE: Phaser.Physics.Arcade.Sprite;
  private planttiles: Phaser.GameObjects.TileSprite;
  private watertiles: Phaser.GameObjects.TileSprite;
  private trees: Phaser.Physics.Arcade.Group;
  private mountain: Phaser.Physics.Arcade.Group;
  private Keys: Phaser.Types.Input.Keyboard.CursorKeys;

  

  




  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, "background");
    this.background.setOrigin(0, 0);
    this.createFarm(544,160);
    
    this.AE = this.physics.add.sprite(768,416,"AE");
    this.AE.setCollideWorldBounds(true);
    this.CS = this.physics.add.sprite(704,416,"CS");
    this.CS.setCollideWorldBounds(true);

    this.Keys = this.input.keyboard.createCursorKeys();


    

  }

  update() {
    //cant get them to move
    this.movePlayerManager();
  }
  createFarm(x,y){
    for(let i = 0; i < 9; i++){
      var farmTileRow1 = this.add.tileSprite(x,y,32,32,"growarea");
      var farmTileRow2 = this.add.tileSprite(x,y + 32,32,32,"growarea");
      var farmTileRow3 = this.add.tileSprite(x,y + 64,32,32,"growarea");
      var farmTileRow4 = this.add.tileSprite(x,y + 96,32,32,"growarea");
      var farmTileRow5 = this.add.tileSprite(x,y + 128,32,32,"growarea");
      var farmTileRow6 = this.add.tileSprite(x,y + 160,32,32,"growarea");
      x += 32;
    }
  }
  movePlayerManager(){
    if(this.Keys.left?.isDown){
      this.AE.setVelocityX(-32);
    }
  
    else if(this.Keys.right?.isDown) {
      this.AE.setVelocityX(32);
     
    }
    else{
      this.AE.setVelocityX(0);
    }
  
  
    if(this.Keys.up?.isDown){
      this.AE.setVelocityY(-32);
    }
    else if(this.Keys.down?.isDown){
      this.AE.setVelocityY(32);

    }
    else{
      this.AE.setVelocityY(0);
    }
    }
  
}


