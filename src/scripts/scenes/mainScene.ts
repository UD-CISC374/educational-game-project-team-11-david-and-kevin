import ExampleObject from '../objects/exampleObject';

var isAE: boolean = true;
var seed = 0;
var count = 0; 

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  private background: Phaser.GameObjects.TileSprite;
  private board: Phaser.GameObjects.TileSprite;
  private CS: Phaser.Physics.Arcade.Sprite;
  private AE: Phaser.Physics.Arcade.Sprite;
  private planttiles: Phaser.Physics.Arcade.Group;
  private watertiles: Phaser.GameObjects.TileSprite;
  private trees: Phaser.Physics.Arcade.Group;
  private mountain: Phaser.Physics.Arcade.Group;
  private Keys: Phaser.Types.Input.Keyboard.CursorKeys;
  
  private wheatSeedsCount;
  private cornSeedsCount;
  private hempSeedsCount;
  
  private CornCount;
  private WheatCount;
  private HempCount;

  private TubeCount;
  private TubesXCount;

  private mCount;
  private tCount;
  private TreesAndMountains;

 
  private inventory: Array<integer>;

  

  




  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.wheatSeedsCount = this.add.text;
    this.WheatCount = this.add.text;
    this.hempSeedsCount = this.add.text;
    this.HempCount = this.add.text;
    this.cornSeedsCount = this.add.text;
    this.CornCount = this.add.text;
    
  

    this.inventory = new Array<integer>(11);
    
    this.board = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, "board")
    this.board.setOrigin(0, 0);
    this.background = this.add.tileSprite(512, 512, 1024, 1024, "background");
    this.physics.world.setBounds(0,0,1024,1024,true,true);

    this.planttiles = this.physics.add.group();
    
    this.trees = this.physics.add.group();
    this.mountain = this.physics.add.group();
    this.generateMountainsAndTrees(this.scale.width,this.scale.height);
    
    this.generateInventory();

    this.createFarm(544,160);
    //Check farm size
    //this.add.text(128,1184,this.planttiles.getLength().toString(),{ fontFamily: 'Arial', fontSize: 64, color: '#C9BE29 ' });
       
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
    
    
  }
  createFarm(x,y){
    for(let i = 0; i < 8; i++){
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
      var newTree = this.add.sprite((Math.random() * 500) , (Math.random() * 1024),"Tree");
      this.trees.add(newTree); 
    }
    for(let i = 0; i < 50; i++){
      var newMountain = this.add.sprite((Math.random() * 500), (Math.random() * 1024),"Mountain");
      this.mountain.add(newMountain); 
    }

  }
  /*
    0: Hemp Seeds
    1: Corn Seeds
    2: Wheat Seeds
    3: Hemp(7.5pH)
    4: Corn(6.8pH)
    5: Wheat(6pH)
    6: Trees(+pH)
    7: Mountains(-pH)
    8: Plastic
    9: Tubes(Straight)
    10: Tubes(Crossed)

    generate inventory icons at 40,1280

  */
  generateInventory(){
        //hemp seeds
        this.inventory[0] = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        //corn seeds
        this.inventory[1] = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        //wheat seeds
        this.inventory[2] = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        for(let i= 3; i < this.inventory.length;i++){
          this.inventory[i] = 0;
        }
       this.add.tileSprite(32,1216, 32, 32, "seedsandplants", 0).setScale(2);
        this.hempSeedsCount = this.add.text(64,1184,this.inventory[0].toString(),{ fontFamily: 'Arial', fontSize: 64, color: '#C9BE29 ' });
       
        this.add.tileSprite(32,1280,32, 32,"seedsandplants", 1).setScale(2);
       this.cornSeedsCount = this.add.text(64,1248,this.inventory[1].toString(),{ fontFamily: 'Arial', fontSize: 64, color: '#C9BE29 ' });
    
       this.add.tileSprite(32,1344,32, 32,"seedsandplants", 2).setScale(2);
       this.wheatSeedsCount = this.add.text(64,1312,this.inventory[2].toString(),{ fontFamily: 'Arial', fontSize: 64, color: '#C9BE29 ' });
     
       this.add.tileSprite(1216,32,32, 32,"seedsandplants", 3).setScale(4);
       this.HempCount = this.add.text(1184,64,this.inventory[3].toString(),{ fontFamily: 'Arial', fontSize: 64, color: '#C9BE29 ' });
      
       this.add.tileSprite(1280,32,32, 32,"seedsandplants", 4).setScale(4);
       this.CornCount = this.add.text(1248,64,this.inventory[4].toString(),{ fontFamily: 'Arial', fontSize: 64, color: '#C9BE29 ' });
      
       this.add.tileSprite(1344,32,32, 32,"seedsandplants", 5).setScale(4);
       this.WheatCount = this.add.text(1312,64,this.inventory[5].toString(),{ fontFamily: 'Arial', fontSize: 64, color: '#C9BE29 ' });
     

  }
  harvestTree(AE,tree){
    tree.destroy(true);


  }
  harvestMoutain(AE,mount){
    mount.destroy(true);

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


