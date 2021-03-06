import { Physics } from "phaser";


export default class MainScene extends Phaser.Scene {
  
  private board: Phaser.GameObjects.TileSprite;
  private CS: Phaser.Physics.Arcade.Sprite;
  private AE: Phaser.Physics.Arcade.Sprite;
  private AES: Phaser.Physics.Arcade.Sprite;
  private CSS: Phaser.Physics.Arcade.Sprite;
  private planttiles: Array<Phaser.GameObjects.TileSprite>;

  private Keys: Phaser.Types.Input.Keyboard.CursorKeys;
  private keyP;
  private wheatSeedsCount;
  private cornSeedsCount;
  private hempSeedsCount;
  private randSeedArr; 
  private tutImage;
 
  private mCount;
  private wCount;


  private inventory: Array<Phaser.GameObjects.TileSprite>;
  private countArray: Array<Phaser.GameObjects.Text>;
  private plantInventory: Array<Phaser.GameObjects.TileSprite>;
 
  
  private bucketCount;
  private plasticCount;

  
  private plantsize: integer;
  private state: string;
  private status: Array<Phaser.GameObjects.Text>;
  private stateText: Phaser.GameObjects.Text;
  private charText: Phaser.GameObjects.Text;
  private map: Phaser.Tilemaps.Tilemap;
  private groundLayer: Phaser.Tilemaps.DynamicTilemapLayer;
  private forrestLayer: Phaser.Tilemaps.DynamicTilemapLayer;
  private farmLayer: Phaser.Tilemaps.DynamicTilemapLayer;
  private mineLayer: Phaser.Tilemaps.DynamicTilemapLayer;
  private tubeLayer: Phaser.Tilemaps.DynamicTilemapLayer;
  private plantLayer: Phaser.Tilemaps.DynamicTilemapLayer;
  private mountainLayer: Phaser.Tilemaps.DynamicTilemapLayer;
  private tiles: Phaser.Tilemaps.Tileset;
  private lookDirection: string;
  private facing: Phaser.GameObjects.Text;
  private player: string;
  private mode: string;
  private mode1: string;
  private mode2: string;
  private mode3: string;
  private currentMode: Phaser.GameObjects.TileSprite;
  private currentModeIndex: integer;
  private currentItemIndex: integer;
  private controls: Phaser.Tilemaps.DynamicTilemapLayer;
  private previousItem: Phaser.Tilemaps.Tile;
  private current: Phaser.Tilemaps.Tile;
  private nextItem: Phaser.Tilemaps.Tile;
  curFarmHeight: number;
  curFarmLength: number;
  private cornPaths: integer[][];
  private wheatPaths: integer[][];
  private hempPaths: integer[][];
  private score: integer;
  private scoreText: Phaser.GameObjects.Text;
  
  private enemies: Phaser.Physics.Arcade.Group;
  private : Phaser.Physics.Arcade.Group;
  private speed: integer;
  private storage: Phaser.Tilemaps.Tile;
  private iteration: integer;
  private iterationText: Phaser.GameObjects.Text;
  private farmHealth: integer;
  private healthText: Phaser.GameObjects.Text;
  private currentPlant: integer


  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
  
    this.currentPlant = 1;
    this.speed = 1;
    this.lookDirection = "down";
    this.map = this.make.tilemap({tileWidth: 32,
      tileHeight: 32,
      width: 48,
      height: 48});
     this.tiles =this.map.addTilesetImage("mappedTiles");

    this.plasticCount = 0;
    this.plantsize = 0;

    this.curFarmHeight = 160;
    this.curFarmLength = 544;
 

    this.randSeedArr = ["corn", "wheat", "hemp"]; 

    this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);


    
   

    this.inventory = new Array<Phaser.GameObjects.TileSprite>();
    this.plantInventory = new Array<Phaser.GameObjects.TileSprite>();
     this.countArray = new Array<Phaser.GameObjects.Text>();
    console.log("generating world");
    
    
    this.board = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, "board")
    this.board.setOrigin(0, 0);
    this.physics.world.setBounds(0,0,1024,1024,true,true);

   
    this.groundLayer = this.map.createBlankDynamicLayer("Ground Layer",this.tiles).setScale(2,2);
    this.forrestLayer = this.map.createBlankDynamicLayer("Forrest",this.tiles).setScale(2,2);
    this.mountainLayer = this.map.createBlankDynamicLayer("Mountain",this.tiles).setScale(6,6);
    this.farmLayer = this.map.createBlankDynamicLayer("Farm Layer",this.tiles).setScale(2,2);
    this.plantLayer = this.map.createBlankDynamicLayer("Plant Layer", this.tiles).setScale(2,2); 
    this.mineLayer = this.map.createBlankDynamicLayer("Mine Layer",this.tiles).setScale(2,2);
    this.controls = this.map.createBlankDynamicLayer("Controls",this.tiles).setScale(2,2);
  
     //console.log("forrest gen");
   
    //console.log("inv gen");
    this.generateInventory();
    
    //console.log("creating farm");

    this.worldGen();
    this.state = "active";
    this.player = "AE";
    
    this.mode1 = "Collect";
    this.mode2 = "Plant";
   
    this.mode = this.mode1;
    
   
    this.currentModeIndex = 7;
    
 
   var spawn = this.groundLayer.getTileAt(9,7);
   this.AE = this.physics.add.sprite(spawn.getCenterX(),spawn.getCenterY(),"AES", 6).setScale(2,2);
   this.anims.create({
     key: 'walk_up',
     repeat: 0,
     frameRate: 5, 
     frames: this.anims.generateFrameNames('AES', {start: 0, end: 2})
   });
   this.anims.create({
     key: 'walk_left',
     repeat: 0,
     frameRate: 5, 
     frames: this.anims.generateFrameNames('AES', {start: 3, end: 5})
   });
   this.anims.create({
     key: 'walk_right',
     repeat: 0,
     frameRate: 5, 
     frames: this.anims.generateFrameNames('AES', {start: 9, end: 11})
   });
   this.anims.create({
     key: 'walk_down',
     repeat: 0,
     frameRate: 5, 
     frames: this.anims.generateFrameNames('AES', {start: 6, end: 8})
   });
   
   this.AE.setCollideWorldBounds(true);

   this.CS = this.physics.add.sprite(spawn.getCenterX() + 64,spawn.getCenterY(),"CSS", 6).setScale(2,2);
   this.anims.create({
     key: 'Cwalk_up',
     repeat: 0,
     frameRate: 5, 
     frames: this.anims.generateFrameNames('CSS', {start: 0, end: 2})
   });
   this.anims.create({
     key: 'Cwalk_left',
     repeat: 0,
     frameRate: 5, 
     frames: this.anims.generateFrameNames('CSS', {start: 3, end: 5})
   });
   this.anims.create({
     key: 'Cwalk_right',
     repeat: 0,
     frameRate: 5, 
     frames: this.anims.generateFrameNames('CSS', {start: 9, end: 11})
   });
   this.anims.create({
     key: 'Cwalk_down',
     repeat: 0,
     frameRate: 5, 
     frames: this.anims.generateFrameNames('CSS', {start: 6, end: 8})
   });
   
   this.CS.setCollideWorldBounds(true);
   
   this.mineLayer.setCollision(39);
   this.enemies = this.physics.add.group({classType: Phaser.GameObjects.Sprite});
  
   this.addEnemy(1);
   this.addEnemy(2);
   this.physics.world.enable(this.enemies);
   this.mineLayer.setTileIndexCallback(39,this.destroyEnemy,this);
  // this.physics.add.collider(this.mineLayer,this.enemies,(tile,enemy)=> {
    //if(tile instanceof Phaser.Tilemaps.Tile && tile.index == 39){  
      
   
  
   



    this.physics.add.overlap(this.forrestLayer,this.AE);
    this.physics.add.collider(this.mountainLayer,this.AE);
    this.physics.add.collider(this.plantLayer,this.AE);
    //this.physics.add.collider(this.mineLayer,this.enemies);
    
    
    
    this.stateText = this.add.text(256,1280,this.state,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    this.stateText.text = "Use your AE(in white) to harvest forrest resources";
    
    this.facing = this.add.text(256,1344,"P for Instructions" + this.lookDirection,{ fontFamily: 'Arial', fontSize: 64, color: '#C9BE29 ' });
    this.status = new Array<Phaser.GameObjects.Text>();

    this.status[0] = this.add.text(1040,63,"Player: " ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    this.status[1] = this.add.text(1151,63,this.player ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    
    this.status[2] = this.add.text(1040,127,"Mode: " ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    this.status[3] = this.add.text(1151,127,this.mode ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });

   // this.previous = this.controls.putTileAt(31,32,19);
   this.current = this.controls.putTileAt(31,38,19);
   //this.next = this.controls.putTileAt(33,46,19);
  
    this.wheatSeedsCount = 0;
    
    this.hempSeedsCount = 0;
    
    this.cornSeedsCount = 0;
    this.bucketCount = 0;
   
    this.mCount = 0;
    this.wCount = 0;


   
    
    this.Keys = this.input.keyboard.createCursorKeys();

    this.input.keyboard.on('keyup-C', (event) =>{
        
      this.playerSwitch("CS");
    

})



this.input.keyboard.on('keyup-A', (event) =>{
 
    this.playerSwitch("AE");
  

})


this.input.keyboard.on('keyup-ONE', (event) =>{
 
this.modeChange(1);


})
this.input.keyboard.on('keyup-TWO', (event) =>{
 
this.modeChange(2);


})


this.input.keyboard.on('keyup-P', (event) =>{
 

  if(this.state == "paused"){
    this.tutImage.destroy();
    this.tutImage = null; 
    
    this.state = "active";
    // this.status[15].text = "Arrow keys to move " + this.player;

  }
  else{
    if(this.player == "AE"){
      this.tutImage = this.add.image(512, 512, 'aei').setScale(2);
    }
    else{
      this.tutImage = this.add.image(512, 512, 'csi').setScale(2);
    }
    this.state = "paused";
    // this.status[15].text = "Arrow keys to change items"
  }
  
  
  })

    this.addInvItem("corn");
    this.addInvItem("corn");
    this.addInvItem("corn");
    this.addInvItem("hemp");
    this.addInvItem("hemp");
    this.addInvItem("hemp");
    this.addInvItem("wheat");
    this.addInvItem("wheat");
    this.addInvItem("wheat");


    this.setControls();
    this.iteration = 0;
    this.iterationText = this.add.text(1407,1407,this.iteration.toString(),{ fontFamily: 'Arial', fontSize: 64, color: '#C9BE29 ' })
    this.farmHealth = 100;
    this.add.text(1087,1279,"Health: ", { fontFamily: 'Arial', fontSize: 64, color: '#C9BE29 ' })
    this.healthText = this.add.text(1279,1279,this.farmHealth.toString(),{ fontFamily: 'Arial', fontSize: 64, color: '#C9BE29 ' })
    this.score = 0;
    this.add.text(1087,1279 - 128,"Score: ", { fontFamily: 'Arial', fontSize: 64, color: '#C9BE29 ' })
    this.scoreText = this.add.text(1279,1279 - 128,this.score.toString(),{ fontFamily: 'Arial', fontSize: 64, color: '#C9BE29 ' })
 
  


    

  }

  /**
 * Changes the mode of the player 
 * @param {number} mode - The current mode of the player 
 * @return {void} Nothing
 */

  modeChange(mode: integer){
      if(mode == 1){
        this.mode = this.mode1;
      }
      else if(mode == 2){
        this.mode = this.mode2;
      }

      if(this.mode == "Collect"){
        this.stateText.text = "Collect resources for planting crops";
      }
      else if(this.mode == "Plant"){
        this.stateText.text = "Plant crops in given areas(the farm)"

      }
      if(this.mode == "Filter"){
        this.stateText.text = "Water and grow the current crop";
      }
      else if(this.mode == "Bomb"){
        this.stateText.text = "Place traps for the enemy aliens!"

      }
      


  }


  update() {
    this.status[1].text = this.player;
    this.status[3].text = this.mode;
  }

/**
 * Handles movement of CS and AE through keyboard
 * listeners
 * @return {void} Nothing
 */

  setControls(){
    
    this.input.keyboard.removeListener('keyup-RIGHT');
      this.input.keyboard.removeListener('keyup-LEFT');
      this.input.keyboard.removeListener('keyup-UP');
      this.input.keyboard.removeListener('keyup-DOWN');
      this.input.keyboard.removeListener('keyup-SPACE');
      
    if(this.player == "AE"){
      
     
      this.input.keyboard.on('keyup-RIGHT', (event) =>{
        if(this.state == "active"){
        this.AE.x +=64;
        this.AE.play("walk_right");
        this.lookDirection = "right";
        this.enemyHandler();
        this.lazyIterate();
        }
        else if(this.state == "paused"){
          this.switchIndex("right");

        }

      })
      this.input.keyboard.on('keyup-LEFT', (event) =>{
        if(this.state == "active"){
        this.AE.x -=64;
        this.AE.play("walk_left");
        this.lookDirection = "left";
        this.enemyHandler();
        this.lazyIterate();
        }
        else if(this.state == "paused"){
          this.switchIndex("left");

        }

      })
      this.input.keyboard.on('keyup-UP', (event) =>{
        if(this.state == "active"){
        this.AE.y -=64;
        this.AE.play("walk_up");
        this.lookDirection = "up";
        this.enemyHandler();
        this.lazyIterate();
        }
        

      })
      this.input.keyboard.on('keyup-DOWN', (event) =>{
        if(this.state == "active"){
        this.AE.y +=64;
        this.AE.play("walk_down");
        this.lookDirection = "down";
        this.enemyHandler();
        this.lazyIterate();
        }
        

      })
      this.input.keyboard.on('keyup-SPACE',  (event) =>{
        if(this.state == "active"){
        this.plantSeed();
        this.enemyHandler();
        this.lazyIterate();
        }
      })
        


    }
    else if(this.player=="CS"){
      
      this.input.keyboard.on('keyup-RIGHT', (event) =>{
        if(this.state == "active"){
        this.CS.x +=64;
        this.CS.play("Cwalk_right");
        this.lookDirection = "right";
        this.enemyHandler();
        this.lazyIterate();
        }
        else if(this.state == "paused"){
          this.switchIndex("right");

        }

      })
      this.input.keyboard.on('keyup-LEFT', (event) =>{
        if(this.state == "active"){
        this.CS.x -=64;
        this.CS.play("Cwalk_left");
        this.lookDirection = "left";
        this.enemyHandler();
        this.lazyIterate();
        }
        else if(this.state == "paused"){
          this.switchIndex("left");

        }

      })
      this.input.keyboard.on('keyup-UP', (event) =>{
        if(this.state == "active"){
        this.CS.y -=64;
        this.CS.play("Cwalk_up");
        this.lookDirection = "up";
        this.enemyHandler();
        this.lazyIterate();
        }
        

      })
      this.input.keyboard.on('keyup-DOWN', (event) =>{
        if(this.state == "active"){
        this.CS.y +=64;
        this.CS.play("Cwalk_down");
        this.lookDirection = "down";
        this.enemyHandler();
        this.lazyIterate();
        }
        

      })
      this.input.keyboard.on('keyup-SPACE',  (event) =>{
        if(this.state == "active"){
        this.CsHandler();
        this.enemyHandler();
        this.lazyIterate();
        
        }
      })
    
    }


  }

 /** Refreshes mountains, trees, and enemies on-screen
 * Changes the mode of the player 
 * @return {void} Nothing
 */

  lazyIterate(){
    if(this.farmHealth == 0){
      this.scene.restart();
    }
    this.iteration += 1;
    if(this.iteration == 8){
      this.forrestLayer.replaceByIndex(1,0,0,0,32,32);
      this.mountainLayer.replaceByIndex(28,27,0,0,32,32);
    }
    if(this.iteration == 16){
      this.forrestLayer.replaceByIndex(38,37,0,0,32,32);
    }
    if(this.iteration == 32){
      this.addEnemy(1);
      this.addEnemy(2);
      this.iteration = 0;
    }
    this.iterationText.text = this.iteration.toString();
  }

 /**
 * Will plant a bomb at CS location
 *  or swtich on tubing for CS when called 
 * @return {void} Nothing
 */

  CsHandler(){
    if(this.mode == "Bomb"){
      
    if(this.mCount > 5){
      this.mineLayer.putTileAtWorldXY(39,this.CS.x,this.CS.y)
      this.mCount -= 5;
      this.countArray[4].text = this.mCount.toString();
    }
    
    }
    else if(this.mode == "Filter"){
      this.tubing();
      
    }
  }

/**
 * Spawns enemies on-screen
 * @return {void} Nothing
 */

  addEnemy(type: integer){
    
    
    if(type == 1){
      var spawn = this.groundLayer.getTileAt(1,1);
      let newEnemy = this.physics.add.sprite(spawn.getCenterX(),spawn.getCenterY(),"enemy", 0).setScale(2,2);
      newEnemy.setData({location: 'top',itemIndex: 0});
      
      this.physics.add.overlap(newEnemy,this.mineLayer);
      this.enemies.add(newEnemy);
    }
    else if(type == 2){
      var spawn = this.groundLayer.getTileAt(15,15);
      let newEnemy = this.physics.add.sprite(spawn.getCenterX(),spawn.getCenterY(),"enemy", 3).setScale(2,2);
      newEnemy.setData({location: 'bot',itemIndex: 3});
      
      this.physics.add.overlap(newEnemy,this.mineLayer);
      this.enemies.add(newEnemy);
    }
    
  }

 /**
 * Will cause enemies to move closer to farm box and
 * decrease the health when it collides 
 * @return {void} Nothing
 */

  enemyHandler(){
    
    

    


    Phaser.Actions.Call(this.enemies.getChildren(),(enemy) =>{
      //543x351
      let moved = 0;
      if(enemy instanceof Phaser.GameObjects.Sprite){
        
      
      
      
      while(moved != this.speed){  
      

    
    
      if(enemy.getData('itemIndex') == 3 ||enemy.getData('itemIndex')  == 7){
        
        if(enemy.y > this.storage.getCenterY()){
          enemy.y -=64;
          
          moved += 1;
        }
        
        else if(enemy.y == this.storage.getCenterY()){
          let currIndex = enemy.getData('itemIndex') - 2;
          enemy.setData('itemIndex', currIndex);
          enemy.x -= 64;
          
          moved += 1;
        }
  /*
        else if(enemy.x > 543 && enemy.y == 351){
          enemy.x -= 32;
          let currIndex = enemy.getData('itemIndex') - 1;
          enemy.setData('itemIndex', currIndex);
          moved+=1;
          
        }*/
      }
      else if(enemy.getData('itemIndex') == 0 ||enemy.getData('itemIndex')  == 4){
        /*if(enemy.x == 543 && enemy.y == 576){
          enemy.destroy();
        }
      */
       if(enemy.x < this.storage.getCenterX()){
          enemy.x += 64;
          
          moved += 1;
        }
        else if(enemy.x == this.storage.getCenterX()){
          
          let currIndex = enemy.getData('itemIndex') + 2;
          enemy.setData('itemIndex', currIndex);
          enemy.y += 64;
          moved += 1;
        }
  
        
      }
      else if(enemy.getData('itemIndex') == 1 ||enemy.getData('itemIndex')  == 5){
        
        if(enemy.x > this.storage.getCenterX()){
          enemy.x -= 64;
          
          moved += 1;
        }
        
        
      }
  
      else if(enemy.getData('itemIndex') == 2 ||enemy.getData('itemIndex')  == 6){
        if(enemy.y < this.storage.getCenterY()){
          enemy.y += 64;
          
          moved += 1;
        }
        
      }
      
      
    }
    if(enemy.x == this.storage.getCenterX() && enemy.y == this.storage.getCenterY()){
      this.farmHealth -= 1;
      this.healthText.text = this.farmHealth.toString();
      enemy.destroy();
    }
    else{
    enemy.setFrame(enemy.getData('itemIndex'));
    }
  }
    
      

    },this);
  
    
  }

  


  /**
  * Adds item icons and corresponding inventory quantity
  * to the bottom of the screen
  * @return {void} Nothing
  */
  
  generateInventory(){

    var cornSeed = this.add.tileSprite(64,1088,32,32,"seedsandplants", 1)
    this.add.text(64,1056,"Corn Seed",{ fontFamily: 'Arial', fontSize: 16, color: '#C9BE29 ' })
    
    this.inventory[0] = cornSeed;
     

  
    var hempSeed = this.add.tileSprite(64,1152,32,32,"seedsandplants", 0)
    this.add.text(64,1140,"Rope Seed",{ fontFamily: 'Arial', fontSize: 16, color: '#C9BE29 ' })
    this.inventory[1] = hempSeed;

      var wheatSeed = this.add.tileSprite(64,1216,32,32,"seedsandplants", 2)
      
      this.add.text(64,1184,"Wheat Seed",{ fontFamily: 'Arial', fontSize: 16, color: '#C9BE29 ' })
    this.inventory[2] = wheatSeed;

      var wood = this.add.tileSprite(64,1280,32,32,"icons", 2)
      this.add.text(64,1248,"Wood",{ fontFamily: 'Arial', fontSize: 16, color: '#C9BE29 ' })
    
      this.inventory[3] = wood;

      var rock = this.add.tileSprite(64,1344,32,32,"icons", 1)
      this.inventory[4] = rock;
      this.add.text(64,1312,"Rock",{ fontFamily: 'Arial', fontSize: 16, color: '#C9BE29 ' })
    
      
      var bucket = this.add.tileSprite(64,1408,32,32,"bucket")
      this.add.text(64,1376,"Water",{ fontFamily: 'Arial', fontSize: 16, color: '#C9BE29 ' })
    
      this.inventory[5] = bucket;

      
      
      

      for(let i = 0;i<6;i++){
        this.countArray[i] = this.add.text(this.inventory[i].x + 64,this.inventory[i].y - 16,"0",{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' })  
    
      }
  }

/**
 * Generates tilemaps, layers, and corresponding collisions 
 * for the world 
 * @return {void} Nothing
 */

  worldGen(){
    this.groundLayer.weightedRandomize(0,0,16,16,[

      {index: 3, weight: 7},
      {index: 2, weight: 3}
    ]);
    this.farmLayer.fill(4,8,2,6,6);
    this.plantLayer.fill(4,8,2,6,6);
    this.plantLayer.putTileAt(29,7,2);
    this.plantLayer.fill(13,8,2,6,1);
    
    this.plantLayer.putTileAt(29,7,4);
    this.plantLayer.fill(13,8,4,6,1);
    
    this.plantLayer.putTileAt(29,7,6);
    this.plantLayer.fill(13,8,6,6,1);
    
    //128x576
    this.storage = this.plantLayer.putTileAt(41,15,2);
    //543x351

    var xloc = 0;
    var yloc = 0;

    while(yloc < 13 && xloc < 13){
      var yesNo = Math.floor(((Math.random() * 8) + 1 ));
      if(yesNo == 1 || yesNo == 2 || yesNo == 3 || yesNo == 4 || yesNo == 5){
        this.forrestLayer.weightedRandomize(xloc,yloc,2,2,[

        {index: -1, weight: 50},
        {index: 0, weight: 30},
        {index: 37, weight: 20},

        ]);
        xloc +=3;
      }
      else if( yesNo == 6 || yesNo == 7 || yesNo == 8){
        this.mountainLayer.putTileAt(27,xloc/3,yloc/3);
        xloc +=3;
        
      }
      
      if((xloc >= 6 && yloc < 9) || (xloc >= 13)){
        xloc = 0;
        yloc +=3;
      }
      

    }

    
    this.forrestLayer.setCollision([0,37]);
    this.forrestLayer.setTileIndexCallback(0,this.harvestTree,this);
    this.forrestLayer.setTileIndexCallback(37,this.harvestPond,this);
    this.farmLayer.setCollision(4);
    //this.farmLayer.setTileIndexCallback(4,,this)
    
    this.plantLayer.setCollision(4);
    this.plantLayer.setCollision([33,34,35]);
    this.plantLayer.setTileIndexCallback([33,34,35],this.harvestCrop,this);
    
    this.mountainLayer.setCollision(27);
    this.mountainLayer.setTileIndexCallback(27,this.harvestMountain,this);

}

/*
0: Corn Seeds
1: Hemp Seeds
2: Wheat Seeds
3: Wood(+pH)
4: Rock(-pH)
5: buckets
6: Plastic
*/
 
/**
 * Updates inventory quantity based on 
 * specific item added
 * @param {string} type the type of item
 * @return {void}  nothing
 */
  addInvItem(type: string){
    if(type == "corn"){
     
      this.cornSeedsCount += 1;
      this.countArray[0].text = this.cornSeedsCount;
    }
    else if(type == "hemp"){
      this.hempSeedsCount += 1;
      this.countArray[1].text = this.hempSeedsCount;
    }
    else if(type == "wheat"){
      this.wheatSeedsCount += 1;
      this.countArray[2].text = this.wheatSeedsCount;
    }
    else if(type == "wood"){
      this.wCount += 1;
      this.countArray[3].text = this.wCount;
      }
    else if(type == "rock"){
      this.mCount += 10;
      this.countArray[4].text = this.mCount;
    }
    else if(type == "water"){
      this.bucketCount += 2;
      this.countArray[5].text = this.bucketCount;
    }
    
  }

/**
 * Swaps out farm tile with seed tile to simulate 
 * planting a seed.
 * @return {void} Nothing
 */

  plantSeed(){
    if(this.mode == "Plant"){
      var tile = this.plantLayer.getTileAtWorldXY(this.AE.x, this.AE.y);
     
      if(tile.index == 4 && this.wCount > 2){
        if(tile.y == 3 && this.hempSeedsCount > 0){
          this.plantLayer.replaceByIndex(4,30,tile.x,tile.y,1,1);
          this.hempSeedsCount -= 1;
          this.countArray[1].text = this.hempSeedsCount;
          this.wCount -= 3;
        }
        else if(tile.y == 5&& this.cornSeedsCount > 0){
          this.plantLayer.replaceByIndex(4,31,tile.x,tile.y,1,1);
          this.cornSeedsCount -= 1;
          this.countArray[0].text = this.cornSeedsCount;
          this.wCount -= 3;
        }
        else if(tile.y == 7 && this.wheatSeedsCount > 0){
          this.plantLayer.replaceByIndex(4,32,tile.x,tile.y,1,1);
          this.wheatSeedsCount -= 1;
          this.countArray[2].text = this.wheatSeedsCount;
          this.wCount -= 3;
        }
        this.countArray[3].text = this.wCount;
        
      }
    } 
    
    
     }
  
/**
 * Replaces tubing tiles in farm area 
 * to simulate automated watering
 * @return {void} Nothing
 */

  tubing(){
    this.plantLayer.replaceByIndex(14,13,8,2,6,6);
    if(this.bucketCount > 1){
    if(this.currentPlant == 1){
      this.plantLayer.replaceByIndex(13,14,8,2,6,1);
      this.plantLayer.replaceByIndex(30,33,8,3,6,1);
      
    }
    else if(this.currentPlant == 2){
      this.plantLayer.replaceByIndex(13,14,8,4,6,1);
      this.plantLayer.replaceByIndex(31,34,8,5,6,1);
     
    }
    else if(this.currentPlant == 3){
      this.plantLayer.replaceByIndex(13,14,8,6,6,1);
      this.plantLayer.replaceByIndex(32,35,8,7,6,1);
      
    }
    this.currentPlant += 1;
    if(this.currentPlant == 4){
      this.currentPlant = 1;
    }
  }

  }


  
/**
 * Replaces tree sprite on collision with AE
 * and updates investory 
 * @return {void} Nothing
 */
  harvestTree(){
    if(this.mode == "Collect"){
    this.forrestLayer.replaceByIndex(0,1,Math.floor(this.AE.x/64),Math.floor(this.AE.y/64),1,1);
    this.addInvItem("wood");
    }
  }

/**
 * Replaces pond sprite on collision with AE
 * and updates inventory 
 * @return {void} Nothing
 */
    
    harvestPond(){
      if(this.mode == "Collect"){
      this.forrestLayer.replaceByIndex(37,38,Math.floor(this.AE.x/64),Math.floor(this.AE.y/64),1,1);
      this.addInvItem("water");
      }
  
    
}

/**
 * Replaces mountain sprite on collision with AE
 * and updates inventory 
 * @return {void} Nothing
 */
harvestMountain(){
  if(this.mode == "Collect"){
  this.mountainLayer.replaceByIndex(27,28,Math.floor(this.AE.x/192),Math.floor(this.AE.y/192),1,1);
  this.addInvItem("rock");
  }
  

  
}

/**
 * Swaps farm area tile and updates score and inventory 
 * on collision with AE only if seed has been watered
 * @return {void} Nothing
 */
harvestCrop(){
  if(this.mode == "Collect"){
    var tile = this.plantLayer.getTileAtWorldXY(this.AE.x,this.AE.y);
    if(tile.index == 33){
      this.plantLayer.replaceByIndex(33,4,Math.floor(this.AE.x/64),Math.floor(this.AE.y/64),1,1)
      this.addInvItem("hemp");
      this.score += 3;
    }
    else if(tile.index == 34){
      this.plantLayer.replaceByIndex(34,4,Math.floor(this.AE.x/64),Math.floor(this.AE.y/64),1,1)
      this.addInvItem("corn");
      this.addInvItem("corn");
      this.addInvItem("corn");
      this.score += 1;
    }
    else if(tile.index == 35){
      this.plantLayer.replaceByIndex(35,4,Math.floor(this.AE.x/64),Math.floor(this.AE.y/64),1,1)
      this.addInvItem("wheat");
      this.addInvItem("wheat");
      this.score += 2;
    }
    this.scoreText.text = this.score.toString();

  }
}

/**
 * Removes enemy from screen if it collides with bomb/mine
 * @param {sprite} enemy the current enenmy 
 * @param {sprite} bomb the bomb the CS has set 
 * @return {void} Nothing
 */
destroyEnemy(enemy,bomb){
  this.mineLayer.replaceByIndex(39,-1,Math.floor(enemy.x/64),Math.floor(enemy.y/64),1,1);
  enemy.destroy();
  
  
}




/**
 * Assigns player to correct sprite and mode functions
 * @param {string} player the current character 
 * @return {void} Nothing
 */
  playerSwitch(player: string){
    if(player == "CS"){
      this.mode1 = "Filter";
      this.mode2 = "Bomb";
      
      
      this.player = "CS";
      this.current.index = 5;
      this.currentItemIndex = 5;
      this.modeChange(1);
    }
    else if(player == "AE"){
      this.mode1 = "Collect";
      this.mode2 = "Plant";
      
      this.mode = this.mode1;
      this.player = "AE";
      this.current.index = 31;
      this.modeChange(1);  
  }
  this.setControls();
}

/**
 * Swaps out the tilemap numbers dependant on direction 
 * @param {string} direction where the character is facing
 * @return {void} Nothing
 */
  switchIndex(direction:string){


    if(direction == "right"){
    if(this.player == "AE"){

      this.current.index += 1;
      if(this.current.index == 33){
        this.current.index = 30;

      }
    }
      else if(this.player == "CS"){

        this.current.index += 2;
        if(this.current.index == 25){
          this.current.index = 5;
  
        }
      
    }
  }
    else if(direction == "left"){
      if(this.player == "AE"){

        this.current.index -= 1;
        if(this.current.index == 29){
          this.current.index = 32;
  
        }
      }
        else if(this.player == "CS"){
  
          this.current.index -= 1;
          if(this.current.index == 4){
            this.current.index = 26;
    
          }
        
      }

    }
  }
}
