import ExampleObject from '../objects/exampleObject';

var isAE: boolean = true;
var test: boolean = false; 
var seed = 0;
var seed2 = 0;
var seed3 = 0; 
var seed4 = 0;
var seed5 = 0;
var seed6 = 0;
var count = 0; 
var farmX = 544;
var farmY = 160;

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  private background: Phaser.GameObjects.TileSprite;
  private CS: Phaser.Physics.Arcade.Sprite;
  private AE: Phaser.Physics.Arcade.Sprite;
  private CS_left : Phaser.Physics.Arcade.Sprite;
  private AE_left : Phaser.Physics.Arcade.Sprite;
  private planttiles: Phaser.Physics.Arcade.Group;
  private watertiles: Phaser.GameObjects.TileSprite;
  private trees: Phaser.Physics.Arcade.Group;
  private mountain: Phaser.Physics.Arcade.Group;
  private Keys: Phaser.Types.Input.Keyboard.CursorKeys;
  private wheatSeedsStart: integer;
  private cornSeedsStart: integer;
  private hempSeedsStart: integer;
  private Corn
  private Wheat;
  private Character; 

  private Hemp;
  private mountainCount: integer;
  private treeCount: integer;
  private TreesAndMountains;

  

  




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

    this.createFarm(farmX,farmY);
    this.Corn = this.add.text(10,10,"6.8pH Corn Seed Count= " + this.cornSeedsStart.toString())
    this.Hemp = this.add.text(400,10,"7.5pH Hemp Seed Count= " + this.hempSeedsStart.toString())
    this.Wheat = this.add.text(750,10,"6pH Wheat Seed Count= " + this.wheatSeedsStart.toString())
    this.Character = this.add.text(750, 30, "Character: Ag. Engineer")
    this.AE = this.physics.add.sprite(768,416,"AE");
    this.AE.setCollideWorldBounds(true);
    this.CS = this.physics.add.sprite(704,416,"CS");
    this.CS.setCollideWorldBounds(true);

    this.physics.add.overlap(this.AE, this.trees, this.harvestTree);
    this.physics.add.overlap(this.AE, this.mountain, this.harvestMoutain);

    this.Keys = this.input.keyboard.createCursorKeys();




    

  }

  update() {
    
    this.movePlayerManager();
    this.cornSeedsStart = 10;
    this.Corn.text = "6.8pH Corn Seed Count= " + this.cornSeedsStart.toString();
    // this.input.onDown.addOnce(updateText, this);
    
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
      newTree.setScale(1.5);
      this.trees.add(newTree); 
    }
    for(let i = 0; i < 50; i++){
      var newMountain = this.add.sprite((Math.random() * 500), (Math.random() * y - 10),"Mountain");
      newMountain.setScale(4);
      this.mountain.add(newMountain); 
    }

  }

  harvestTree(AE,tree){
    tree.destroy(true);


  }
  harvestMoutain(AE,mount){
    mount.destroy(true);

  }

  /*
  plantCrop(){
    if(count < 9){
      var newTree = this.add.sprite(544 + seed, 160, "Tree");
      this.trees.add(newTree); 
      seed += 32;
      count++;
  }

  */

 movePlayerManager(){

  if(this.Keys.space?.isDown && isAE == true){
    isAE = false; 
    this.Character.setText("Character: Computer Sci.");
    console.log(isAE);
  }

  else if(this.Keys.space?.isDown && isAE == false){
    isAE = true; 
    this.Character.setText("Character: Ag Engineer");
    console.log(isAE); 
  }

  if(this.Keys.shift?.isDown){
    if(count < 9){
      var newTree = this.add.sprite(farmX + seed, farmY, "Tree");
      this.trees.add(newTree); 
      seed += 32;
      count++;
    }
    else if(count >= 9 && count < 18){
      var newTree = this.add.sprite(farmX + seed2, farmY + 32, "Tree");
      this.trees.add(newTree); 
      seed2 += 32;
      count++;

    }
    else if(count >= 18 && count < 27){
      var newTree = this.add.sprite(544 + seed3, farmY + 64, "Tree");
      this.trees.add(newTree); 
      seed3 += 32;
      count++;

    }
    else if(count >= 27 && count < 36){
      var newTree = this.add.sprite(544 + seed4, farmY + 96, "Tree");
      this.trees.add(newTree); 
      seed4 += 32;
      count++;
    }
    else if(count >= 36 && count < 45){
      var newTree = this.add.sprite(544 + seed5, farmY + 128, "Tree");
      this.trees.add(newTree); 
      seed5 += 32;
      count++;
    }
    else if(count >= 45 && count < 54){
      var newTree = this.add.sprite(544 + seed6, farmY + 160, "Tree");
      this.trees.add(newTree); 
      seed6 += 32;
      count++;
    }
    }
  


  if(isAE == true){
    if(this.Keys.left?.isDown){
      this.AE.setTexture('AE_left');
      this.AE.x = this.AE.x - 4;
    }
  
    else if(this.Keys.right?.isDown) {
      this.AE.setTexture('AE');
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
      this.CS.setTexture('CS_left');
      this.CS.x = this.CS.x - 4;
    }
  
    else if(this.Keys.right?.isDown) {
      this.CS.setTexture('CS');
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

