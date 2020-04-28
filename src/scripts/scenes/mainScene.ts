//import AEItems from '../objects/aeitems';


export default class MainScene extends Phaser.Scene {
  private isHarvestCrop: boolean;
  private isHarvestTree: boolean;
  private isPlantSeed: boolean;
  private isPlantTree: boolean;
  private isTubeSet: boolean;
  private isSeedSet: boolean;
  private isIterate: boolean;
  

  private background: Phaser.GameObjects.TileSprite;
  private board: Phaser.GameObjects.TileSprite;
  private CS: Phaser.Physics.Arcade.Sprite;
  private AE: Phaser.Physics.Arcade.Sprite;
  private planttiles: Array<Phaser.GameObjects.TileSprite>;
  private watertiles: Phaser.GameObjects.TileSprite;
  private trees: Array<Phaser.GameObjects.TileSprite>;
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
  private wCount;
  private TreesAndMountains;
  private curInvHeight: integer;
  private curInvLength: integer;
  private curFarmHeight: integer;
  private curFarmLength: integer;
  private forrLocX: integer;
  private forrLocY: integer;
  private iteration: integer;
  private selector: Phaser.GameObjects.TileSprite; 


  


 
  private inventory: Array<Phaser.GameObjects.TileSprite>;
  private countArray: Array<Phaser.GameObjects.Text>;
  private plantInventory: Array<Phaser.GameObjects.TileSprite>;
  private cornTubes: Array<Phaser.GameObjects.TileSprite>;
  private hempTubes: Array<Phaser.GameObjects.TileSprite>;
  private wheatTubes: Array<Phaser.GameObjects.TileSprite>;
 
  private forrest: Array<Phaser.GameObjects.TileSprite>;
  private treeCount;
  private forrestCount;
  private saplingCount;
  private plasticCount;
  private timers: Array<Phaser.Time.TimerEvent>;
  private pollution: Array<Phaser.GameObjects.TileSprite>;
  private currentFarmIndex: integer;
  private invSize: integer;
  private isTaking: boolean;
  private plantsize: integer;
  private state: string;
  private stateText: Phaser.GameObjects.Text;
  

  

  




  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    
    //this.selector = this.add.tileSprite(32,32,32,32,"icons",0);
    //this.selector.visible = false;
    this.iteration = 0; 
    this.treeCount = 0;
    this.plasticCount = 0;
    this.plantsize = 0;
    this.state = "tutorial";
    this.stateText = this.add.text(256,1280,this.state,{ fontFamily: 'Arial', fontSize: 64, color: '#C9BE29 ' })


    this.currentFarmIndex = 0;
    this.wheatSeedsCount = 0;
    this.WheatCount = 0;
    this.hempSeedsCount = 0;
    this.HempCount = 0;
    this.cornSeedsCount = 0;
    this.CornCount = 0;
    this.mCount = 0;
    this.wCount = 0;
    this.forrestCount = 0;


    
    this.curFarmHeight = 160;
    this.curFarmLength = 544;
    this.forrLocY =  0;
    this.forrLocX = 0;
    
  

    this.inventory = new Array<Phaser.GameObjects.TileSprite>();
    this.trees = new Array<Phaser.GameObjects.TileSprite>();
    this.plantInventory = new Array<Phaser.GameObjects.TileSprite>();
    this.cornTubes = new Array<Phaser.GameObjects.TileSprite>();
    this.hempTubes = new Array<Phaser.GameObjects.TileSprite>();
    this.wheatTubes = new Array<Phaser.GameObjects.TileSprite>();
    this.forrest = new Array<Phaser.GameObjects.TileSprite>();
    this.countArray = new Array<Phaser.GameObjects.Text>();
    this.invSize = 0;

    console.log("generating world");
    
    this.selector = this.add.tileSprite(32,32,32,32,"icons", 0).setVisible(false);
    
    this.board = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, "board")
    this.board.setOrigin(0, 0);
    this.background = this.add.tileSprite(511, 511, 1024, 1024, "forrestTile",1);
    this.physics.world.setBounds(0,0,1024,1024,true,true);

    this.planttiles = new Array<Phaser.GameObjects.TileSprite>();
    
   // this.trees = this.physics.add.group();
    //this.mountain = this.physics.add.group();
    //this.pollution = new Array<Phaser.GameObjects.TileSprite>();
    //this.generateMountainsAndTrees(this.scale.width,this.scale.height);
    console.log("forrest gen");
    this.forrestGen();
    console.log("inv gen");
    this.generateInventory();
    this.addInvItem("corn");
    this.addInvItem("corn");
    this.addInvItem("corn");
    this.addInvItem("hemp");
    this.addInvItem("hemp");
    this.addInvItem("hemp");
    this.addInvItem("wheat");
    this.addInvItem("wheat");
    this.addInvItem("wheat");
    console.log("creating farm");
    this.createFarm();
    //Check farm size
    //this.add.text(128,1184,this.planttiles.getLength().toString(),{ fontFamily: 'Arial', fontSize: 64, color: '#C9BE29 ' });
       
    this.AE = this.physics.add.sprite(768,416,"AE");
    this.AE.setCollideWorldBounds(true);
    this.CS = this.physics.add.sprite(704,416,"CS");
    this.CS.setCollideWorldBounds(true);

    //this.physics.add.overlap(this.AE, this.trees, this.harvestTree);
    //this.physics.add.overlap(this.AE, this.mountain, this.harvestMoutain);

    this.Keys = this.input.keyboard.createCursorKeys();




    

  }

  update() {
    if(this.state == "tutorial"){
      this.state = "plant mode";

    }
    this.movePlayerManager();
    this.stateText.text = this.state;
    this.selector.x = this.planttiles[this.currentFarmIndex].x;
    this.selector.y = this.planttiles[this.currentFarmIndex].y;
    
    
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
   /*
    0: Corn Seeds
    1: Corn Seeds
    2: Hemp Seeds
    3: Wood(+pH)
    4: Rock(-pH)
    5: Sapling
    6: Plastic
   
    generate inventory icons at 64,1088

  */

  generateInventory(){

    var cornSeed = this.add.tileSprite(64,1088,32,32,"seedsandplants", 1).setScale(2);
      
    this.inventory[0] = cornSeed;
     

  
    var hempSeed = this.add.tileSprite(64,1152,32,32,"seedsandplants", 0).setScale(2);
    this.inventory[1] = hempSeed;
  
      

    
      var wheatSeed = this.add.tileSprite(64,1216,32,32,"seedsandplants", 2).setScale(2);
      this.inventory[2] = wheatSeed;
    
 
    
      var wood = this.add.tileSprite(64,1280,32,32,"icons", 2).setScale(2);
      this.inventory[3] = wood;

      var rock = this.add.tileSprite(64,1344,32,32,"icons", 1).setScale(2);
      this.inventory[4] = rock;
      
      var sapling = this.add.tileSprite(64,1408,32,32,"icons", 3).setScale(2);
      this.inventory[5] = sapling;

      var plastic = this.add.tileSprite(64,1472,32,32,"plastic").setScale(2);
      this.inventory[6] = plastic;

      for(let i = 0;i<7;i++){
        this.countArray[i] = this.add.text(this.inventory[i].x + 64,this.inventory[i].y,"0",{ fontFamily: 'Arial', fontSize: 64, color: '#C9BE29 ' })  
    
      }

  }
  forrestGen(){
    for(let i = 0; i<32;i++){
    while(this.forrLocX < 16){  
    var newForrestTile = this.add.tileSprite(((this.forrLocX + 1) * 32) - 1 , ((this.forrLocY + 1) * 32) - 1, 32, 32, "forrestTile",1);
    this.forrest[this.forrestCount] = newForrestTile;
    this.forrestCount += 1;  
    var yesNo = Math.floor(((Math.random() * 6) + 1 ));
    if(yesNo == 1 || yesNo == 3 ||yesNo == 5){
      this.trees[this.treeCount] = this.add.tileSprite(((this.forrLocX + 1) * 32) - 1 , ((this.forrLocY + 1) * 32) - 1, 32, 32, "Tree")
      this.treeCount += 1;
    }
    this.forrLocX +=1;
  }
  this.forrLocX = 0;
  this.forrLocY += 1;
    
    
   // this.timers[i] = this.time.addEvent({ delay: 30000, loop: false, paused: true })

    }
    

    
    


  
}
/*
0: Corn Seeds
1: Hemp Seeds
2: Wheat Seeds
3: Wood(+pH)
4: Rock(-pH)
5: Sapling
6: Plastic
*/
 
  addInvItem(type: string){
    if(type == "corn"){
     
      this.cornSeedsCount += 1;
      this.countArray[0].text = this.cornSeedsCount.toString;
    }
    else if(type == "hemp"){
      this.hempSeedsCount += 1;
      this.countArray[1].text = this.hempSeedsCount.toString;
    }
    else if(type == "wheat"){
      this.wheatSeedsCount += 1;
      this.countArray[2].text = this.wheatSeedsCount.toString;
    }
    else if(type == "wood"){
      this.wCount += 1;
      this.countArray[3].text = this.wCount.toString;
    }
    else if(type == "rock"){
      this.mCount += 1;
      this.countArray[4].text = this.mCount.toString;
    }
    else if(type == "sapling"){
      this.saplingCount += 1;
      this.countArray[5].text = this.saplingCount.toString;
    }
    else if(type == "plastic"){
      this.plasticCount += 1;
      this.countArray[6].text = this.plasticCount.toString;
    }





  }
  plantSeed(x,y,type: string){
    if(type == "corn"){
      var  Plant = this.add.tileSprite(x,y,32,32,"seedsandplants", 1);
      this.plantInventory[this.plantsize] = Plant;
      this.plantsize += 1;
      this.cornSeedsCount -= 1;
      this.countArray[0].text = this.cornSeedsCount.toString;
    }
    else if(type == "wheat"){
      var Plant = this.add.tileSprite(x,y,32,32,"seedsandplants", 2);
      this.plantInventory[this.plantsize] = Plant;
      this.plantsize += 1;
      this.wheatSeedsCount -= 1;
      this.countArray[0].text = this.wheatSeedsCount.toString;
    }
    else if(type == "hemp"){
      var Plant = this.add.tileSprite(x,y,32,32,"seedsandplants", 0);
      this.plantInventory[this.plantsize] = Plant;
      this.plantsize += 1;
      this.hempSeedsCount -= 1;
      this.countArray[0].text = this.hempSeedsCount.toString;
    }
    


  }

  placetubing(x,y,type: string){


  }



  harvestTree(AE,tree){
    
   // this.currentItem = "wood";
    tree.destroy;
    this.isTaking = true;
    
    
    
    //this.time.addEvent({ delay: 200, callback: myfunction, callbackScope: this, loop: false })


  }

  



  harvestMoutain(AE,mount){
    mount.destroy(true);

  }


  movePlayerManager(){
    if(this.Keys.shift?.isDown){
     // if(this.state == "tutorial"){
      this.state = "plant mode";
      this.selector.x = this.planttiles[this.currentFarmIndex].x;
      this.selector.y = this.planttiles[this.currentFarmIndex].y;
      this.selector.setVisible(true);

     // }

      
    }
    else if(this.Keys.space?.isDown){
      if(this.state == "plant mode"){
        this.plantSeed(this.selector.x,this.selector.y,"corn");
        this.currentFarmIndex += 1;
      }

    }
    else if(this.Keys.right?.isDown) {
      if(this.state == "plant mode"){
        if(this.currentFarmIndex < 47){
          this.currentFarmIndex += 1;
        }
        else{
          this.currentFarmIndex = 0;
          this.selector.x = this.planttiles[this.currentFarmIndex].x;
          this.selector.y = this.planttiles[this.currentFarmIndex].y;
        }

      }
     
    }


  /*
    if(this.isSeedSet == true){

      if(this.Keys.left?.isDown){
        this.AE.x = this.AE.x - 4;
      }
    
      else if(this.Keys.right?.isDown) {
        this.AE.x = this.AE.x + 4;
       
      }
    
    
      else if(this.Keys.up?.isDown){
        this.AE.y = this.AE.y - 4;
      }
      else if(this.Keys.down?.isDown){
        this.AE.y = this.AE.y + 4;
  
      }

    }

    /*
    if(this.Keys.space?.isDown){
      
    }

    else if(this.Keys.space?.isDown){
      
    }

    if(this.Keys.shift?.isDown){
      
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
    */



    
    }

    
  
}


