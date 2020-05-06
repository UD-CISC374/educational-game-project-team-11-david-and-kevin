//import AEItems from '../objects/aeitems';


export default class MainScene extends Phaser.Scene {
  
  private board: Phaser.GameObjects.TileSprite;
  private CS: Phaser.Physics.Arcade.Sprite;
  private AE: Phaser.Physics.Arcade.Sprite;
  private planttiles: Array<Phaser.GameObjects.TileSprite>;

  private Keys: Phaser.Types.Input.Keyboard.CursorKeys;
  private wheatSeedsCount;
  private cornSeedsCount;
  private hempSeedsCount;
 
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
  private previous: Phaser.Tilemaps.Tile;
  private current: Phaser.Tilemaps.Tile;
  private next: Phaser.Tilemaps.Tile;



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
    this.mountainLayer = this.map.createBlankDynamicLayer("Mountain",this.tiles).setScale(2,2);
    this.farmLayer = this.map.createBlankDynamicLayer("Farm Layer",this.tiles);
    this.plantLayer = this.map.createBlankDynamicLayer("Plant Layer", this.tiles); 
    this.pondLayer = this.map.createBlankDynamicLayer("Pond Layer",this.tiles).setScale(2);
    this.controls = this.map.createBlankDynamicLayer("Controls",this.tiles);
  
     //console.log("forrest gen");
   
    //console.log("inv gen");
    this.generateInventory();
    
    //console.log("creating farm");
    
   

    this.worldGen();
    this.state = "active";
    this.player = "AE";
    
    this.mode1 = "Collect";
    this.mode2 = "Harvest";
    this.mode3 = "Plant";
    this.mode = this.mode1;
    var spawn = this.groundLayer.getTileAt(17,14);
   
    this.currentModeIndex = 7;
    
    
    this.AE = this.physics.add.sprite(spawn.getCenterX(),spawn.getCenterY(),"AE");
    this.AE.setCollideWorldBounds(true);
    this.CS = this.physics.add.sprite(spawn.getCenterX() + 32,spawn.getCenterY(),"CS");
    this.CS.setCollideWorldBounds(true);
    
    
    this.physics.add.overlap(this.forrestLayer,this.AE);
    this.physics.add.collider(this.mountainLayer,this.AE);
    this.physics.add.collider(this.pondLayer,this.AE);
    
    this.stateText = this.add.text(256,1280,this.state,{ fontFamily: 'Arial', fontSize: 64, color: '#C9BE29 ' });
    this.facing = this.add.text(256,1344,"Facing " + this.lookDirection,{ fontFamily: 'Arial', fontSize: 64, color: '#C9BE29 ' });
    this.status = new Array<Phaser.GameObjects.Text>();

    this.status[0] = this.add.text(1023,63,"Player: " ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    this.status[1] = this.add.text(1151,63,this.player ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    
    this.status[2] = this.add.text(1023,127,"Mode: " ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    this.status[3] = this.add.text(1151,127,this.mode ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    
    this.status[4] = this.add.text(1023,191,"State: " ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    this.status[5] = this.add.text(1151,191,this.state ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    
    this.status[6] = this.add.text(1023,255,"Modes: " ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    this.status[7] = this.add.text(1279,255,this.mode1 + " 1" ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    
    this.status[8] = this.add.text(1279,319,this.mode2 + " 2" ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    this.status[9] = this.add.text(1279,383,this.mode3 + " 3",{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    
    this.status[10] = this.add.text(1407,255,"1" ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    this.status[11] = this.add.text(1407,319,"2" ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    
     this.status[12] = this.add.text(1407,383,"3" ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    this.status[13] = this.add.text(1151,575,"Current Item" ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
   this.status[14] =this.add.text(1023,703,"Press C: Computer Scientist" ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
   
   this.status[15] = this.add.text(1023,767,"Arrow keys to move" ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
    this.status[16] = this.add.text(1151,639,"Spacebar" ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
   this.status[17] =this.add.text(1023,831,"More instructions to come" ,{ fontFamily: 'Arial', fontSize: 32, color: '#C9BE29 ' });
   

   // this.previous = this.controls.putTileAt(31,32,19);
   this.current = this.controls.putTileAt(32,38,19);
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
this.input.keyboard.on('keyup-THREE', (event) =>{
 
this.modeChange(3);


})

    this.setControls();

  


    

  }

  modeChange(mode: integer){
      if(mode == 1){
        this.mode = this.mode1;
      }
      else if(mode == 2){
        this.mode = this.mode2;
      }
      else if(mode == 3){
        this.mode = this.mode3;
      }


  }

  update() {
    
   // this.movePlayerManager();
    this.status[1].text = this.player;
    this.status[3].text = this.mode;
    this.status[5].text = this.state;
    this.status[7].text = this.mode1;
    this.status[8].text = this.mode2;
    this.status[9].text = this.mode3;
    this.facing.text = this.lookDirection;
    
    
    
  }

  setControls(){
    
    this.input.keyboard.removeListener('keyup-RIGHT');
      this.input.keyboard.removeListener('keyup-LEFT');
      this.input.keyboard.removeListener('keyup-UP');
      this.input.keyboard.removeListener('keyup-DOWN');
    if(this.player == "AE"){
      
     
      this.input.keyboard.on('keyup-RIGHT', (event) =>{
        if(this.state == "active"){
        this.AE.x +=32;
        this.lookDirection = "right";
        }
        else if(this.state == "paused"){
          this.switchIndex("right");

        }

      })
      this.input.keyboard.on('keyup-LEFT', (event) =>{
        if(this.state == "active"){
        this.AE.x -=32;
        this.lookDirection = "left";
        }
        else if(this.state == "paused"){
          this.switchIndex("left");

        }

      })
      this.input.keyboard.on('keyup-UP', (event) =>{
        if(this.state == "active"){
        this.AE.y -=32;
        this.lookDirection = "up";
        }
        

      })
      this.input.keyboard.on('keyup-DOWN', (event) =>{
        if(this.state == "active"){
        this.AE.y +=32;
        this.lookDirection = "down";
        }
        

      })

    }
    else if(this.player=="CS"){
      
      this.input.keyboard.on('keyup-RIGHT', (event) =>{
        if(this.state == "active"){
        this.CS.x +=32;
        this.lookDirection = "right";
        }
        else if(this.state == "paused"){
          this.switchIndex("right");

        }

      })
      this.input.keyboard.on('keyup-LEFT', (event) =>{
        if(this.state == "active"){
        this.CS.x -=32;
        this.lookDirection = "left";
        }
        else if(this.state == "paused"){
          this.switchIndex("left");

        }

      })
      this.input.keyboard.on('keyup-UP', (event) =>{
        if(this.state == "active"){
        this.CS.y -=32;
        this.lookDirection = "up";
        }
        

      })
      this.input.keyboard.on('keyup-DOWN', (event) =>{
        if(this.state == "active"){
        this.CS.y +=32;
        this.lookDirection = "down";
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
    

    var xloc = 0;
    var yloc = 0;

    while(yloc < 31 && xloc < 31){
      var yesNo = Math.floor(((Math.random() * 8) + 1 ));
      if(yesNo == 1 || yesNo == 2 || yesNo == 3 || yesNo == 4 || yesNo == 5 || yesNo == 6){
        this.forrestLayer.weightedRandomize(xloc,yloc,2,2,[

        {index: -1, weight: 75},
        {index: 0, weight: 25},

        ]);
        xloc +=2;
      }
      else if(yesNo == 7){
        this.mountainLayer.putTileAt(28,xloc/2,yloc/2);
        xloc +=2;
        
      }
      else if(yesNo == 8){
        this.pondLayer.putTileAt(38,xloc/2,yloc/2);
        xloc +=2;
        
      }
      
      if((xloc >= 15 && yloc < 16) || (xloc >= 32)){
        xloc = 0;
        yloc +=2;
      }
      

    }

    this.forrestLayer.setCollision([0,1]);
    this.forrestLayer.setTileIndexCallback(0,this.harvestTree,this);
    this.farmLayer.setCollision(4);
    //this.farmLayer.setTileIndexCallback(4,,this)
    this.mountainLayer.setCollision(28);
    this.pondLayer.setCollision(38);

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
      this.countArray[0].text = this.cornSeedsCount.toString;
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
      this.mCount += 1;
      this.countArray[4].text = this.mCount;
    }
    else if(type == "water"){
      this.bucketCount += 1;
      this.countArray[5].text = this.bucketCount;
    }
    else if(type == "plastic"){
      this.plasticCount += 1;
      this.countArray[6].text = this.plasticCount;
    }

    
    





  }
 plantSeed(x,y,type: string){
      if(type == "corn" && this.cornSeedsCount > 0){
        console.log(this.physics.overlap(this.AE, this.farmLayer));
        Plant = this.add.tileSprite(x,y,32,32,"seedsandplants", 1);
        this.plantInventory[this.plantsize] = Plant;
        this.plantsize += 1;
        this.cornSeedsCount -= 1;
        console.log("Number: " + this.cornSeedsCount);
        this.countArray[0].text = this.cornSeedsCount.toString();
        console.log('PLANTED');
      }
      else if(type == "wheat" && this.wheatSeedsCount > 0){
        var Plant = this.add.tileSprite(x,y,32,32,"seedsandplants", 2);
        this.plantInventory[this.plantsize] = Plant;
        this.plantsize += 1;
        this.wheatSeedsCount -= 1;
        this.countArray[0].text = this.wheatSeedsCount.toString();
      }
      else if(type == "hemp" && this.hempSeedsCount > 0){
        var Plant = this.add.tileSprite(x,y,32,32,"seedsandplants", 0);
        this.plantInventory[this.plantsize] = Plant;
        this.plantsize += 1;
        this.hempSeedsCount -= 1;
        this.countArray[0].text = this.hempSeedsCount.toString();
      }
      else{
        //alert('Out of seeds!');
      }
      
  
  
    }
  

  settubing(x,y,type: string){
    



  }



  harvestTree(){
    this.forrestLayer.replaceByIndex(0,1,Math.floor(this.AE.x/32),Math.floor(this.AE.y/32),1,1);
    this.addInvItem("wood");
  
    
}

  



  harvestMoutain(AE,mount){
    mount.destroy(true);

  }

  playerSwitch(player: string){
    if(player == "CS"){
      this.mode1 = "Build";
      this.mode2 = "Set";
      this.mode3 = "Filter";
      this.mode = this.mode1;
      this.player = "CS";
      this.current.index = 5;
      this.currentItemIndex = 5;
      this.status[14].text = "Press A: Agricultural Engineer"
    }
    else if(player == "AE"){
      this.mode1 = "Collect";
      this.mode2 = "Plant";
      this.mode3 = "Harvest";
      this.mode = this.mode1;
      this.player = "AE";
      this.current.index = 32;
      this.status[14].text = "Press C: Computer Scientist"
    
  }
  this.setControls();
}


  switchIndex(direction:string){


    if(direction == "right"){
    if(this.player == "AE"){

      this.current.index += 1;
      if(this.current.index == 34){
        this.current.index = 31;

      }
    }
      else if(this.player == "CS"){

        this.current.index += 1;
        if(this.current.index == 27){
          this.current.index = 5;
  
        }
      
    }
  }
    else if(direction == "left"){
      if(this.player == "AE"){

        this.current.index -= 1;
        if(this.current.index == 30){
          this.current.index = 33;
  
        }
      }
        else if(this.player == "CS"){
  
          this.current.index -= 1;
          if(this.current.index == 4){
            this.current.index = 27;
    
          }
        
      }

    }
  }
 


  



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
       
     

  
    
    

  
    
    
  



}