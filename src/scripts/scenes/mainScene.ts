import ExampleObject from '../objects/exampleObject';

var isAE: boolean = true;
var seed = 0;
var count = 0; 

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  private background: Phaser.GameObjects.TileSprite;
  private CS: Phaser.Physics.Arcade.Sprite;
  private AE: Phaser.Physics.Arcade.Sprite;
  private planttiles: Phaser.Physics.Arcade.Group;
  private watertiles: Phaser.GameObjects.TileSprite;
  private trees: Phaser.Physics.Arcade.Group;
  private mountain: Phaser.Physics.Arcade.Group;
  private Keys: Phaser.Types.Input.Keyboard.CursorKeys;
  private wheatSeedsStart: integer;
  private cornSeedsStart: integer;
  private hempSeedsStart: integer;
  private Corn
  private Wheat

  private Hemp


  

  




  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    //hemp 200 nitro corn 
    this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, "background");
    this.background.setOrigin(0, 0);
    this.cornSeedsStart = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    this.hempSeedsStart = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    this.wheatSeedsStart = Math.floor(Math.random() * (5 - 1 + 1)) + 1;;
    this.planttiles = this.physics.add.group();
    this.trees = this.physics.add.group();
    this.mountain = this.physics.add.group();
    this.generateMountainsAndTrees(this.scale.width,this.scale.height);

    this.createFarm(544,160);
    this.Corn = this.add.text(10,10,"6.8pH Corn Seed Count= " + this.cornSeedsStart.toString())
    this.Hemp = this.add.text(400,10,"7.5pH Hemp Seed Count= " + this.hempSeedsStart.toString())
    this.Wheat = this.add.text(750,10,"6pH Wheat Seed Count= " + this.wheatSeedsStart.toString())
    this.AE = this.physics.add.sprite(768,416,"AE");
    this.AE.setCollideWorldBounds(true);
    this.CS = this.physics.add.sprite(704,416,"CS");
    this.CS.setCollideWorldBounds(true);

    this.Keys = this.input.keyboard.createCursorKeys();




    

  }

  update() {
    
    this.movePlayerManager();
    this.cornSeedsStart = 10;
    this.Corn.text = "6.8pH Corn Seed Count= " + this.cornSeedsStart.toString();
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
      this.planttiles.add(farmTileRow1);
      this.planttiles.add(farmTileRow2);
      this.planttiles.add(farmTileRow3);
      this.planttiles.add(farmTileRow4);
      this.planttiles.add(farmTileRow5);
      this.planttiles.add(farmTileRow6);
    }

  }
  generateMountainsAndTrees(x,y){
    for(let i = 0; i < 50; i++){
      var newTree = this.add.sprite((Math.random() * 500) , (Math.random() * y - 10),"Tree");
      this.trees.add(newTree); 
    }
    for(let i = 0; i < 50; i++){
      var newMountain = this.add.sprite((Math.random() * 500), (Math.random() * y - 10),"Mountain");
      this.mountain.add(newMountain); 
    }

  }

  movePlayerManager(){

    if(this.Keys.space?.isDown && isAE == true){
      isAE = false; 
      alert('Switched to Computer Scientist');
      console.log(isAE);
    }

    else if(this.Keys.space?.isDown && isAE == false){
      isAE = true; 
      alert('Switched to Agricultural Engineer');
      console.log(isAE); 
    }

    if(this.Keys.shift?.isDown){
      if(count < 9){
        var newTree = this.add.sprite(544 + seed, 160, "Tree");
        this.trees.add(newTree); 
        seed += 32;
        count++;

        /*
        if(this.cornSeedsStart > 0){
          this.cornSeedsStart--
        }
        else if(this.hempSeedsStart > 0){
          this.hempSeedsStart--
        }
        else if(this.wheatSeedsStart > 0){
          this.hempSeedsStart--
        }
        */
      }
    }


    if(isAE == true){
      if(this.Keys.left?.isDown){
        this.AE.x = this.AE.x - 4;
      }
    
      else if(this.Keys.right?.isDown) {
        this.AE.x = this.AE.x + 4;
       
      }
    
    
      if(this.Keys.up?.isDown){
        this.AE.y = this.AE.y - 4;
      }
      else if(this.Keys.down?.isDown){
        this.AE.y = this.AE.y + 4;
  
      }

    }
    else{
      if(this.Keys.left?.isDown){
        this.CS.x = this.CS.x - 4;
      }
    
      else if(this.Keys.right?.isDown) {
        this.CS.x = this.CS.x + 4;
       
      }
    
    
      if(this.Keys.up?.isDown){
        this.CS.y = this.CS.y - 4;
      }
      else if(this.Keys.down?.isDown){
        this.CS.y = this.CS.y + 4;
  
      }

    }



    
    }

    
  
}


