//import AEItems from '../objects/aeitems';

var isAE: boolean = true;
var seed = 0;
var count = 0; 

export default class MainScene extends Phaser.Scene {
  
  private background: Phaser.GameObjects.TileSprite;
  private board: Phaser.GameObjects.TileSprite;
  private CS: Phaser.Physics.Arcade.Sprite;
  private AE: Phaser.Physics.Arcade.Sprite;
  private planttiles: Array<Phaser.GameObjects.TileSprite>;
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
  private curInvHeight: integer;
  private curInvLength: integer;
  private curFarmHeight: integer;
  private curFarmLength: integer;
  private forrLocX: integer;
  private forrLocY: integer;

  


 
  private inventory: Array<Phaser.GameObjects.TileSprite>;
  private timers: Array<Phaser.Time.TimerEvent>;
  private pollution: Phaser.Physics.Arcade.Group;
  private currentItem: string;
  private invSize: integer;

  

  




  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.currentItem = "";
    this.wheatSeedsCount = this.add.text;
    this.WheatCount = this.add.text;
    this.hempSeedsCount = this.add.text;
    this.HempCount = this.add.text;
    this.cornSeedsCount = this.add.text;
    this.CornCount = this.add.text;

    this.curInvHeight = 1088;
    this.curInvLength = 64;
    this.curFarmHeight = 160;
    this.curFarmLength = 544;
    this.forrLocY =  0;
    this.forrLocX = 0;
    this.timers = new Array<Phaser.Time.TimerEvent>();
  

    this.inventory = new Array<Phaser.GameObjects.TileSprite>();
    this.invSize = 0;
    
    this.board = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, "board")
    this.board.setOrigin(0, 0);
    this.background = this.add.tileSprite(512, 512, 1024, 1024, "background");
    this.physics.world.setBounds(0,0,1024,1024,true,true);

    this.planttiles = new Array<Phaser.GameObjects.TileSprite>();
    
    this.trees = this.physics.add.group();
    this.mountain = this.physics.add.group();
    this.pollution = this.physics.add.group();
    //this.generateMountainsAndTrees(this.scale.width,this.scale.height);
    this.forrestGen();
    this.generateInventory();

    this.createFarm();
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
    this.addInvItem(this.currentItem)
    
    
  }
  createFarm(){
    var farmtile = this.add.tileSprite(this.curFarmLength,this.curFarmHeight,32,32,"growarea");
    this.planttiles[0] = farmtile;
    this.curFarmLength += 32;
    for(let i = 1; i < 48; i++){
      
    var starterSeed = this.add.tileSprite(this.curFarmLength,this.curFarmHeight,32,32,"growarea");
    this.planttiles[i] = starterSeed;
    this.curFarmLength += 32;

    if(this.curFarmLength >= 800){
      this.curFarmLength = 544;
      this.curFarmHeight += 32;
    }

    }

  }
  mountainRiverGen(){




  }
  generateInventory(){

    for(let i = 0; i < 4; i++){
      if(i == 0){
      var starterSeed = this.add.tileSprite(this.curInvLength,this.curInvHeight,32,32,"seedsandplants", 1).setScale(2);
      this.inventory[0] = starterSeed;
      
      }
      else{
        this.inventory[i] = this.add.tileSprite(this.curInvLength,this.curInvHeight,32,32,"seedsandplants", 1).setScale(2);
      }
      this.curInvLength += 64;
      
    }
    this.invSize = this.inventory.length;

  }
  forrestGen(){
    
 
    
    this.forrLocY = Math.floor(((Math.random() * (1024 - 0 + 1) + 0)));
    this.forrLocY = Math.round(this.forrLocY / 32);
    
 
    this.forrLocX = Math.floor(((Math.random() * (1024 - 0 + 1) + 0)));
    this.forrLocX = Math.round(this.forrLocX / 32);
    if(this.forrLocX >= 16 && this.forrLocY <= 16){
      this.forrLocX = 1;
    }

    
    for(let i = 0; i<256;i++){
    var yesNo = Math.floor(((Math.random() * 6) + 1 ));
    if(yesNo == 1 || yesNo == 3 ||yesNo == 5){
      var newTree = this.add.sprite(this.forrLocX * 32 , this.forrLocY * 32, "Tree");
      this.trees.add(newTree);
      
    }
    this.forrLocX +=1;
    if(this.forrLocX >= 16 && this.forrLocY <= 16){
      this.forrLocX = 1;
      this.forrLocY += 1;
    }
    else if(this.forrLocX >= 16 && this.forrLocY >= 16 ){
      if(this.forrLocX >= 32){
        this.forrLocX = 1;
        this.forrLocY += 1;
      }
    this.timers[i] = this.time.addEvent({ delay: 30000, loop: false, paused: true })

    }

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
  addInvItem(){
    if(this.currentItem == ""){
      //this.currentItem = "";
    };
    if(this.currentItem == "corn seed"){
      var starterSeed = this.add.tileSprite(this.curInvLength,this.curInvHeight,32,32,"seedsandplants", 1).setScale(2);
      
      this.inventory[this.invSize - 1] = starterSeed;
      //this.currentItem = "";
    }
    else if(this.currentItem == "hemp seed"){
      var starterSeed = this.add.tileSprite(this.curInvLength,this.curInvHeight,32,32,"seedsandplants", 0).setScale(2);
      this.inventory[this.invSize - 1] = starterSeed;
     // this.currentItem = "";
      
    }
    else if(this.currentItem == "wheat seed"){
      var starterSeed = this.add.tileSprite(this.curInvLength,this.curInvHeight,32,32,"seedsandplants", 2).setScale(2);
      this.inventory[this.invSize - 1] = starterSeed;
     // this.currentItem = "";
    }
    else if(this.currentItem == "wood"){
      var starterSeed = this.add.tileSprite(this.curInvLength,this.curInvHeight,32,32,"icons", 2).setScale(2);
      this.inventory[this.invSize - 1] = starterSeed;
     // this.currentItem = "";
      
    }
    else if(this.currentItem == "rock"){
      var starterSeed = this.add.tileSprite(this.curInvLength,this.curInvHeight,32,32,"icons", 1).setScale(2);
      this.inventory[this.invSize - 1] = starterSeed;
      //this.currentItem = "";
    }
    this.invSize = this.inventory.length;
    
    this.curInvLength += 64;
    if(this.curInvLength == 512){
      this.curInvLength = 64;
      this.curInvHeight += 64;

    }
    this.currentItem = "";




  }
  harvestTree(AE,tree){
    
    
    tree.destroy(true);
    this.currentItem = "wood";
    
    //var sapling = this.add.sprite(x,y,"icons",3);
    //this.time.addEvent({ delay: 200, callback: myfunction, callbackScope: this, loop: false })


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


