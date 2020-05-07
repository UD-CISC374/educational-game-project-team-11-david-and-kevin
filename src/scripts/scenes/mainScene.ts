//import AEItems from '../objects/aeitems';


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
 
  private mCount;
  private wCount;


  private inventory: Array<Phaser.GameObjects.TileSprite>;
  private countArray: Array<Phaser.GameObjects.Text>;
  private plantInventory: Array<Phaser.GameObjects.TileSprite>;
 
  
  private bucketCount;
  private plasticCount;

  private flipFlop : boolean;

  
  private plantsize: integer;
  private state: string;
  private status: Array<Phaser.GameObjects.Text>;
  private stateText: Phaser.GameObjects.Text;
  private charText: Phaser.GameObjects.Text;
  private map: Phaser.Tilemaps.Tilemap;
  private groundLayer: Phaser.Tilemaps.DynamicTilemapLayer;
  private forrestLayer: Phaser.Tilemaps.DynamicTilemapLayer;
  private farmLayer: Phaser.Tilemaps.DynamicTilemapLayer;
  private pondLayer: Phaser.Tilemaps.DynamicTilemapLayer;
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



  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
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
   // this.background = this.add.tileSprite(511, 511, 1024, 1024, "forrestTile",1);
    this.physics.world.setBounds(0,0,1024,1024,true,true);

   
    this.groundLayer = this.map.createBlankDynamicLayer("Ground Layer",this.tiles);
    this.forrestLayer = this.map.createBlankDynamicLayer("Forrest",this.tiles);
    this.mountainLayer = this.map.createBlankDynamicLayer("Mountain",this.tiles).setScale(3,3);
    this.farmLayer = this.map.createBlankDynamicLayer("Farm Layer",this.tiles);
    this.plantLayer = this.map.createBlankDynamicLayer("Plant Layer", this.tiles); 
    //this.pondLayer = this.map.createBlankDynamicLayer("Pond Layer",this.tiles);
    this.controls = this.map.createBlankDynamicLayer("Controls",this.tiles);
  
     //console.log("forrest gen");
   
    //console.log("inv gen");
    this.generateInventory();
    
    //console.log("creating farm");
    
    // this.AE = this.physics.add.sprite(543,191,"AE")
    // this.AE.setCollideWorldBounds(true);
    // this.CS = this.physics.add.sprite(575,191,"CS");
    // this.CS.setCollideWorldBounds(true);
   
    this.worldGen();
    this.state = "active";
    this.player = "AE";
    
    this.mode1 = "Collect";
    this.mode2 = "Plant";
   
    this.mode = this.mode1;
    
   
    this.currentModeIndex = 7;
    
    /*
    this.AE = this.physics.add.sprite(spawn.getCenterX(),spawn.getCenterY(),"AE");
    this.AE.setCollideWorldBounds(true);
    this.CS = this.physics.add.sprite(spawn.getCenterX() + 32,spawn.getCenterY(),"CS");
    this.CS.setCollideWorldBounds(true);
    
    */
   var spawn = this.groundLayer.getTileAt(17,14);
   this.AE = this.physics.add.sprite(spawn.getCenterX(),spawn.getCenterY(),"AES", 6);
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

   this.CS = this.physics.add.sprite(spawn.getCenterX() + 32,spawn.getCenterY(),"CSS", 6);
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



    this.physics.add.overlap(this.forrestLayer,this.AE);
    this.physics.add.collider(this.mountainLayer,this.AE);
    //this.physics.add.collider(this.pondLayer,this.AE);
    
    this.stateText = this.add.text(256,1280,this.state,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    this.stateText.text = "Use your AE(in white) to harvest forrest resources";
    
    //this.facing = this.add.text(256,1344,"Facing " + this.lookDirection,{ fontFamily: 'Arial', fontSize: 64, color: '#C9BE29 ' });
    this.status = new Array<Phaser.GameObjects.Text>();

    this.status[0] = this.add.text(1023,63,"Player: " ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    this.status[1] = this.add.text(1151,63,this.player ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    
    this.status[2] = this.add.text(1023,127,"Mode: " ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    this.status[3] = this.add.text(1151,127,this.mode ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    
    this.status[4] = this.add.text(1023,191,"State: " ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    this.status[5] = this.add.text(1151,191,this.state ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    
    this.status[6] = this.add.text(1023,255,"Modes: " ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    this.status[7] = this.add.text(1023,319,this.mode1 + " 1" ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    
    this.status[8] = this.add.text(1023,383,this.mode2 + " 2" ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    this.status[9] = this.add.text(1215,255,"Number Key Selection",{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    
    this.status[10] = this.add.text(1220,319,"1" ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    this.status[11] = this.add.text(1220,383,"2" ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    
     this.status[12] = this.add.text(1407,383,"3" ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    this.status[13] = this.add.text(1151,575,"Current Item" ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
   this.status[14] =this.add.text(1023,703,"Press C: Computer Scientist" ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
   
   this.status[15] = this.add.text(1023,767,"Arrow keys to move " + this.player ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    this.status[16] = this.add.text(1151,639,"Spacebar" ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
   this.status[17] =this.add.text(1023,831,"P to Pause" ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
   

   // this.previous = this.controls.putTileAt(31,32,19);
   this.current = this.controls.putTileAt(31,38,19);
   //this.next = this.controls.putTileAt(33,46,19);
  
    this.wheatSeedsCount = 0;
    
    this.hempSeedsCount = 0;
    
    this.cornSeedsCount = 0;
   
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
    this.state = "active";
    this.status[15].text = "Arrow keys to move " + this.player;

  }
  else{
    this.state = "paused";
    this.status[15].text = "Arrow keys to change items"
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

  


    

  }

  modeChange(mode: integer){
      if(mode == 1){
        this.mode = this.mode1;
      }
      else if(mode == 2){
        this.mode = this.mode2;
      }

      if(this.mode == "Collect"){
        this.stateText.text = "Use your AE(in white) to harvest forrest resources";
      }
      else if(this.mode == "Plant"){
        this.stateText.text = "Plant objects with your AE(in white) in the farm area"

      }
      if(this.mode == "Build"){
        this.stateText.text = "Use your CS(in orange) to create tubing";
      }
      else if(this.mode == "Set"){
        this.stateText.text = "Set water paths through your tube objects"

      }
      


  }

  update() {
    
   // this.movePlayerManager();
    this.status[1].text = this.player;
    this.status[3].text = this.mode;
    this.status[5].text = this.state;
    this.status[7].text = this.mode1;
    this.status[8].text = this.mode2;
    
    //this.facing.text = this.lookDirection;
    
    
    
  }

  setControls(){
    
    this.input.keyboard.removeListener('keyup-RIGHT');
      this.input.keyboard.removeListener('keyup-LEFT');
      this.input.keyboard.removeListener('keyup-UP');
      this.input.keyboard.removeListener('keyup-DOWN');
      this.input.keyboard.removeListener('keyup-SPACE');
    if(this.player == "AE"){
      
     
      this.input.keyboard.on('keyup-RIGHT', (event) =>{
        if(this.state == "active"){
        this.AE.x +=32;
        this.AE.play("walk_right");
        this.lookDirection = "right";
        }
        else if(this.state == "paused"){
          this.switchIndex("right");

        }

      })
      this.input.keyboard.on('keyup-LEFT', (event) =>{
        if(this.state == "active"){
        this.AE.x -=32;
        this.AE.play("walk_left");
        this.lookDirection = "left";
        }
        else if(this.state == "paused"){
          this.switchIndex("left");

        }

      })
      this.input.keyboard.on('keyup-UP', (event) =>{
        if(this.state == "active"){
        this.AE.y -=32;
        this.AE.play("walk_up");
        this.lookDirection = "up";
        }
        

      })
      this.input.keyboard.on('keyup-DOWN', (event) =>{
        if(this.state == "active"){
        this.AE.y +=32;
        this.AE.play("walk_down");
        this.lookDirection = "down";
        }
        

      })
      this.input.keyboard.on('keyup-SPACE',  (event) =>{
        if(this.state == "active"){
        this.plantSeed();
        }
      })
        


    }
    else if(this.player=="CS"){
      
      this.input.keyboard.on('keyup-RIGHT', (event) =>{
        if(this.state == "active"){
        this.CS.x +=32;
        this.CS.play("Cwalk_right");
        this.lookDirection = "right";
        }
        else if(this.state == "paused"){
          this.switchIndex("right");

        }

      })
      this.input.keyboard.on('keyup-LEFT', (event) =>{
        if(this.state == "active"){
        this.CS.x -=32;
        this.CS.play("Cwalk_left");
        this.lookDirection = "left";
        }
        else if(this.state == "paused"){
          this.switchIndex("left");

        }

      })
      this.input.keyboard.on('keyup-UP', (event) =>{
        if(this.state == "active"){
        this.CS.y -=32;
        this.CS.play("Cwalk_up");
        this.lookDirection = "up";
        }
        

      })
      this.input.keyboard.on('keyup-DOWN', (event) =>{
        if(this.state == "active"){
        this.CS.y +=32;
        this.CS.play("Cwalk_down");
        this.lookDirection = "down";
        }
        

      })
      this.input.keyboard.on('keyup-SPACE',  (event) =>{
        if(this.state == "active"){
        this.tubing();
        }
      })
    
    }


  }



 
  

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
      
      var bucket = this.add.tileSprite(64,1408,32,32,"bucket").setScale(2);
      this.inventory[5] = bucket;

      var plastic = this.add.tileSprite(64,1472,32,32,"plastic").setScale(2);
      this.inventory[6] = plastic;

      for(let i = 0;i<7;i++){
        this.countArray[i] = this.add.text(this.inventory[i].x + 64,this.inventory[i].y - 16,"0",{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' })  
    
      }

  }
  worldGen(){
    this.groundLayer.weightedRandomize(0,0,32,32,[

      {index: 3, weight: 7},
      {index: 2, weight: 3}
    ]);
    this.farmLayer.fill(4,17,4,8,6);

    this.plantLayer.fill(4,17,4,8,6);

    var xloc = 0;
    var yloc = 0;

    while(yloc < 29 && xloc < 29){
      var yesNo = Math.floor(((Math.random() * 8) + 1 ));
      if(yesNo == 1 || yesNo == 2 || yesNo == 3 || yesNo == 4 || yesNo == 5 || yesNo == 6 || yesNo == 7){
        this.forrestLayer.weightedRandomize(xloc,yloc,2,2,[

        {index: -1, weight: 80},
        {index: 0, weight: 15},
        {index: 37, weight: 5},

        ]);
        xloc +=3;
      }
      else if(yesNo == 8){
        this.mountainLayer.putTileAt(27,xloc/3,yloc/3);
        xloc +=3;
        
      }
      
      if((xloc >= 14 && yloc < 17) || (xloc >= 29)){
        xloc = 0;
        yloc +=3;
      }
      

    }


    this.forrestLayer.setCollision([0,1]);
    this.forrestLayer.setTileIndexCallback(0,this.harvestTree,this);
    this.farmLayer.setCollision(4);
    //this.farmLayer.setTileIndexCallback(4,,this)
    
    this.plantLayer.setCollision(4);
    this.plantLayer.setTileIndexCallback(4,this.testPlantLayer,this);
    
    this.mountainLayer.setCollision(27);
    this.mountainLayer.setTileIndexCallback(27,this.harvestMountain,this);
    //this.pondLayer.setCollision(38);

    //this.forrestLayer.setTileIndexCallback()
  
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
    else if(type == "plastic"){
      this.plasticCount += 1;
      this.countArray[6].text = this.plasticCount;
    }

    
    





  }

testPlantLayer(){
  alert('WORKS');
  }

 plantSeed(){
   if(this.mode == "Plant"){
   var tile = this.plantLayer.getTileAtWorldXY(this.AE.x, this.AE.y);
   //alert(tile.index);
      if(this.current.index == 31 && this.cornSeedsCount > 0){
         // console.log(this.physics.overlap(this.AE, this.farmLayer));
        // Plant = this.add.tileSprite(x,y,32,32,"seedsandplants", 1);
          if(tile.index !== null){
            if (tile.index == 4) {
              this.plantLayer.replaceByIndex(4,this.current.index,Math.floor(this.AE.x/32),Math.floor(this.AE.y/32),1,1);
              // this.plantInventory[this.plantsize] = Plant;
              this.plantsize += 1;
              this.cornSeedsCount -= 1;
              console.log("Number: " + this.cornSeedsCount);
              this.countArray[0].text = this.cornSeedsCount.toString();
              console.log('PLANTED CORN'); 
            }
          }
          
      }
      else if(this.current.index == 32  && this.wheatSeedsCount > 0){
        // var Plant = this.add.tileSprite(x,y,32,32,"seedsandplants", 2);
        if(tile.index !== null){
          if(tile.index == 4){
            this.plantLayer.replaceByIndex(4,this.current.index,Math.floor(this.AE.x/32),Math.floor(this.AE.y/32),1,1);
            // this.plantInventory[this.plantsize] = Plant;
            this.plantsize += 1;
            this.wheatSeedsCount -= 1;
            this.countArray[2].text = this.wheatSeedsCount.toString();
            console.log('PLANTED WHEAT');
          }
        }
      }
      else if(this.current.index == 30 && this.hempSeedsCount > 0){
        // var Plant = this.add.tileSprite(x,y,32,32,"seedsandplants", 0);
        if(tile.index !== null){
          if(tile.index == 4){
            this.plantLayer.replaceByIndex(4,this.current.index,Math.floor(this.AE.x/32),Math.floor(this.AE.y/32),1,1);
            // this.plantInventory[this.plantsize] = Plant;
            this.plantsize += 1;
            this.hempSeedsCount -= 1;
            this.countArray[1].text = this.hempSeedsCount.toString();
            console.log('PLANTED HEMP');
          }

        }
        
      }
      else{
        //alert('Out of seeds!');
      }
    }
  
  
    }
  

  tubing(){
    if(this.mode == "Build"){
      var tile = this.plantLayer.getTileAtWorldXY(this.CS.x, this.CS.y);
      
        
         if(tile.index !== null){
           if (tile.index == 4) {
             if(this.lookDirection == "down"){
               this.current.index = this.plantLayer.getTileAtWorldXY(this.CS.x, this.CS.y - 32).index;
                if(this.current.index == 4||this.current.index == 5 || this.current.index==9 || this.current.index==11 ||this.current.index==13
                  || this.current.index==17 || this.current.index==23|| this.current.index==25){
                this.plantLayer.replaceByIndex(4,5,Math.floor(this.CS.x/32),Math.floor(this.CS.y/32),1,1);
           
                }
                else if(this.current.index == 7){
                  this.plantLayer.replaceByIndex(7,13,Math.floor(this.CS.x/32),Math.floor(this.CS.y/32)-1,1,1);
                  this.plantLayer.replaceByIndex(4,5,Math.floor(this.CS.x/32),Math.floor(this.CS.y/32),1,1);
           
                }
                else if(this.current.index == 15){
                  this.plantLayer.replaceByIndex(15,9,Math.floor(this.CS.x/32),Math.floor(this.CS.y/32)-1,1,1);
                  this.plantLayer.replaceByIndex(4,5,Math.floor(this.CS.x/32),Math.floor(this.CS.y/32),1,1);
           
                }
                else if(this.current.index == 19){
                  this.plantLayer.replaceByIndex(19,17,Math.floor(this.CS.x/32),Math.floor(this.CS.y/32)-1,1,1);
                  this.plantLayer.replaceByIndex(4,5,Math.floor(this.CS.x/32),Math.floor(this.CS.y/32),1,1);
           
                }
                else if(this.current.index == 21){
                  this.plantLayer.replaceByIndex(21,11,Math.floor(this.CS.x/32),Math.floor(this.CS.y/32)-1,1,1);
                  this.plantLayer.replaceByIndex(4,5,Math.floor(this.CS.x/32),Math.floor(this.CS.y/32),1,1);
                  
                }
                

             }
             else if(this.lookDirection == "right"){
              this.current.index = this.plantLayer.getTileAtWorldXY(this.CS.x - 32, this.CS.y).index;
               
              if(this.current.index == 4||this.current.index == 7 || this.current.index==9 || this.current.index==13 ||this.current.index==15
                || this.current.index==17 || this.current.index==19|| this.current.index==25){
              this.plantLayer.replaceByIndex(4,7,Math.floor(this.CS.x/32),Math.floor(this.CS.y/32),1,1);
         
              }
              else if(this.current.index == 11){
                this.plantLayer.replaceByIndex(11,9,Math.floor(this.CS.x/32)-1,Math.floor(this.CS.y/32),1,1);
                this.plantLayer.replaceByIndex(4,7,Math.floor(this.CS.x/32),Math.floor(this.CS.y/32),1,1);
         
              }
              else if(this.current.index == 21){
                this.plantLayer.replaceByIndex(21,15,Math.floor(this.CS.x/32)-1,Math.floor(this.CS.y/32),1,1);
                this.plantLayer.replaceByIndex(4,7,Math.floor(this.CS.x/32),Math.floor(this.CS.y/32),1,1);
         
              }
              else if(this.current.index == 23){
                this.plantLayer.replaceByIndex(23,13,Math.floor(this.CS.x/32)-1,Math.floor(this.CS.y/32),1,1);
                this.plantLayer.replaceByIndex(4,7,Math.floor(this.CS.x/32),Math.floor(this.CS.y/32),1,1);
         
              }
              else if(this.current.index == 5){
                this.plantLayer.replaceByIndex(5,19,Math.floor(this.CS.x/32)-1,Math.floor(this.CS.y/32),1,1);
                this.plantLayer.replaceByIndex(4,7,Math.floor(this.CS.x/32),Math.floor(this.CS.y/32),1,1);
                
              }
             }
             else if(this.lookDirection == "left"){
              this.current.index = this.plantLayer.getTileAtWorldXY(this.CS.x + 32, this.CS.y).index;
              if(this.current.index == 4||this.current.index == 7 || this.current.index==9 || this.current.index==13 ||this.current.index==15
                || this.current.index==17 || this.current.index==19|| this.current.index==25){
              this.plantLayer.replaceByIndex(4,7,Math.floor(this.CS.x/32),Math.floor(this.CS.y/32),1,1);
         
              }
              else if(this.current.index == 17){
                this.plantLayer.replaceByIndex(17,9,Math.floor(this.CS.x/32)+1,Math.floor(this.CS.y/32),1,1);
                this.plantLayer.replaceByIndex(4,7,Math.floor(this.CS.x/32),Math.floor(this.CS.y/32),1,1);
         
              }
              else if(this.current.index == 19){
                this.plantLayer.replaceByIndex(19,15,Math.floor(this.CS.x/32)+1,Math.floor(this.CS.y/32),1,1);
                this.plantLayer.replaceByIndex(4,7,Math.floor(this.CS.x/32),Math.floor(this.CS.y/32),1,1);
         
              }
              else if(this.current.index == 25){
                this.plantLayer.replaceByIndex(25,13,Math.floor(this.CS.x/32)+1,Math.floor(this.CS.y/32),1,1);
                this.plantLayer.replaceByIndex(4,7,Math.floor(this.CS.x/32),Math.floor(this.CS.y/32),1,1);
         
              }
              else if(this.current.index == 5){
                this.plantLayer.replaceByIndex(5,21,Math.floor(this.CS.x/32)+1,Math.floor(this.CS.y/32),1,1);
                this.plantLayer.replaceByIndex(4,7,Math.floor(this.CS.x/32),Math.floor(this.CS.y/32),1,1);
                
              }
             }

            }
            else{
              this.plantLayer.removeTileAtWorldXY(this.CS.x, this.CS.y);
              this.plantLayer.putTileAtWorldXY(4,this.CS.x, this.CS.y);
            }
          



    }
    
  

  }
  }


  



  harvestTree(){
    if(this.mode == "Collect"){
    this.forrestLayer.replaceByIndex(0,1,Math.floor(this.AE.x/32),Math.floor(this.AE.y/32),1,1);
    this.addInvItem("wood");
    }
    
  
    
}


harvestMountain(){
  if(this.mode == "Collect"){
  this.mountainLayer.replaceByIndex(27,28,Math.floor(this.AE.x/96),Math.floor(this.AE.y/96),1,1);
  this.addInvItem("rock");
  }
  

  
}





  playerSwitch(player: string){
    if(player == "CS"){
      this.mode1 = "Build";
      this.mode2 = "Set";
      
      
      this.player = "CS";
      this.current.index = 5;
      this.currentItemIndex = 5;
      this.modeChange(1);
      this.status[14].text = "Press A: Agricultural Engineer"
    }
    else if(player == "AE"){
      this.mode1 = "Collect";
      this.mode2 = "Plant";
      
      this.mode = this.mode1;
      this.player = "AE";
      this.current.index = 31;
      this.modeChange(1);
      this.status[14].text = "Press C: Computer Scientist"
    
  }
  this.setControls();
}


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
 


  
/*


  movePlayerManager(){
   if(this.state == "paused"){
     if(this.Keys.space?.isDown){
       this.state = "active";
     }
   }
   
   if(this.keyP.isDown){
     if(!this.flipFlop){
      var rand = Math.floor(Math.random()*3); 
      this.plantSeed(this.randSeedArr[rand]); 
      this.flipFlop = true;
     }
   }
   

   if (this.keyP.isUp) {
     this.flipFlop = false;
    }
   
    
   if(this.Keys.shift?.isDown){
     // alert('SHIFT PRESSED!');
     if(this.char == "AE"){
       this.char = "CS";
       this.charText.setText("CS");
     }
     else if(this.char == "CS"){
      this.char = "AE";
      this.charText.setText("AE");
     }
   }
   
   
   else if(this.state == "active"){
     console.log('WHATS HAPPENING');
    if(this.char == "AE"){
      if(this.Keys.left?.isDown){
        this.AE.x-=32;
        this.AE.play('walk_left');
        this.state = "paused";
      }
    
      else if(this.Keys.right?.isDown) {
        this.AE.x+=32;
        this.AE.play('walk_down');
        
        this.state = "paused";
      }
      
    
    
      if(this.Keys.up?.isDown){
        this.AE.y-=32;
        this.AE.play('walk_up');
        this.state = "paused";
      }
      else if(this.Keys.down?.isDown){
        console.log('WALKING');
        this.AE.y+=32;
        this.AE.play('walk_right');
        this.state = "paused";
  
      }
    }
    else if(this.char == "CS"){
      // alert('SWITCHED OCCURED');
      if(this.Keys.left?.isDown){
        this.CS.x-=32;
        this.CS.play('Cwalk_left');
        this.state = "paused";
      }
    
      else if(this.Keys.right?.isDown) {
        this.CS.x+=32;
        this.CS.play('Cwalk_down');
        
        this.state = "paused";
      }
      
    
    
      if(this.Keys.up?.isDown){
        this.CS.y-=32;
        this.CS.play('Cwalk_up');
        this.state = "paused";
      }
      else if(this.Keys.down?.isDown){
        this.CS.y+=32;
        this.CS.play('Cwalk_right');
        this.state = "paused";
      }
>>>>>>> ccfff98c288ca6ebe38dcdf4288fae37f9d0a9c1

  movePlayerManager(){
   /*
      
      if(this.Keys.shift?.isDown && this.player == "AE"){
        
          if(this.state == "active"){
            this.state = "paused";
          }
          else{
            this.playerSwitch("CS");

          }
          
        }
        else if(this.Keys.shift?.isDown && this.player == "CS"){
          if(this.state == "active"){
            this.state = "paused";
        }
        else{
          this.playerSwitch("AE");

        }
      }
      else if(this.Keys.right?.isDown&& this.player == "AE"){
        if(this.state == "active"){
          this.AE.x +=32;
          this.lookDirection = "right";
          this.state = "paused";
      }
      else if(this.state == "paused" ){
       this.switchIndex();
      }
      else if(this.Keys.left?.isDown){
        this.AE.x -= 32;
        this.lookDirection = "left";
      }
      else if(this.Keys.up?.isDown){
        this.AE.y -= 32;
        this.lookDirection = "up";
      }
      else if(this.Keys.down?.isDown){
        this.AE.y += 32;
        this.lookDirection = "down";
      }
    }
*/

      
      
    
  
  }
   
     
       //this.state = "active";
      // var seedStringArr = ["corn", "hemp", "wheat"];
       //var rand = Math.floor(Math.random() * 3);
       //this.plantSeed(this.AE.x,this.AE.y, seedStringArr[rand]);
       
     

  
    

  
    
    
  



