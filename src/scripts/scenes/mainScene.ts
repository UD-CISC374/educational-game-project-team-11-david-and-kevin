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
 
  private curFarmHeight: integer;
  private curFarmLength: integer;

  private inventory: Array<Phaser.GameObjects.TileSprite>;
  private countArray: Array<Phaser.GameObjects.Text>;
  private plantInventory: Array<Phaser.GameObjects.TileSprite>;
 
  
  private saplingCount;
  private plasticCount;

  
  private plantsize: integer;
  private state: string;
  private states: Array<string>;
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
  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.lookDirection = "down";
    this.map = this.make.tilemap({tileWidth: 32,
      tileHeight: 32,
      width: 1024,
      height: 1024});
     this.tiles =this.map.addTilesetImage("mappedTiles");

    this.plasticCount = 0;
    this.plantsize = 0;

    this.curFarmHeight = 160;
    this.curFarmLength = 544;
   

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
    
     console.log("forrest gen");
   
    console.log("inv gen");
    this.generateInventory();
    
    console.log("creating farm");
    
   

    this.worldGen();
    this.state = "paused";
    var spawn = this.groundLayer.getTileAt(17,4)
    
    this.AE = this.physics.add.sprite(spawn.getCenterX(),spawn.getCenterY(),"AE");
    this.AE.setCollideWorldBounds(true);
    this.CS = this.physics.add.sprite(spawn.getCenterX() + 32,spawn.getCenterY(),"CS");
    this.CS.setCollideWorldBounds(true);
    
    
    this.physics.add.overlap(this.forrestLayer,this.AE);
    this.physics.add.collider(this.mountainLayer,this.AE);
    this.physics.add.collider(this.pondLayer,this.AE);
    
    this.stateText = this.add.text(256,1280,this.state,{ fontFamily: 'Arial', fontSize: 64, color: '#C9BE29 ' })
    this.facing = this.add.text(256,1344,"Facing " + this.lookDirection,{ fontFamily: 'Arial', fontSize: 64, color: '#C9BE29 ' })
    
    this.wheatSeedsCount = 0;
    
    this.hempSeedsCount = 0;
    
    this.cornSeedsCount = 0;
   
    this.mCount = 0;
    this.wCount = 0;
   
    
    this.Keys = this.input.keyboard.createCursorKeys();




    

  }

  update() {
    
    this.movePlayerManager();
    this.stateText.text = this.state;
    this.facing.text = this.lookDirection;
    
    
    
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
  worldGen(){
    this.groundLayer.weightedRandomize(0,0,32,32,[

      {index: 3, weight: 7},
      {index: 2, weight: 3}
    ]);
    this.farmLayer.fill(4,17,4,8,6);

    var xloc = 0;
    var yloc = 0;

    while(yloc < 31 && xloc < 31){
      var yesNo = Math.floor(((Math.random() * 6) + 1 ));
      if(yesNo == 1 || yesNo == 2 || yesNo == 3){
        this.forrestLayer.weightedRandomize(xloc,yloc,2,2,[

        {index: -1, weight: 55},
        {index: 0, weight: 45},

        ]);
        xloc +=2;
      }
      else if(yesNo == 4 || yesNo == 5){
        this.mountainLayer.putTileAt(28,xloc/2,yloc/2);
        xloc +=2;
        
      }
      else if(yesNo == 6){
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

    this.countArray[3].text = this.wCount;
    





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
        alert('Out of seeds!');
      }
      
  
  
    }
  

  settubing(x,y,type: string){
    



  }



  harvestTree(){
    this.forrestLayer.replaceByIndex(0,1,Math.floor(this.AE.x/32),Math.floor(this.AE.y/32),1,1);
    this.addInvItem("wood");
    /*
    if(this.state == "active"){
      this.state = "paused";
    if(this.lookDirection == "down"){
      //this.state = "paused";
      this.forrestLayer.replaceByIndex(0,1,Math.round(this.AE.x/32),Math.round(this.AE.y/32)-1,1,2);
      this.addInvItem("wood");
      

    }

    else if(this.lookDirection == "up"){
     // this.state = "paused";
      this.forrestLayer.replaceByIndex(0,1,Math.round(this.AE.x/32),Math.round(this.AE.y/32),1,2);
      this.addInvItem("wood");
      

    }
    else if(this.lookDirection == "left"){
     // this.state = "paused";
      this.forrestLayer.replaceByIndex(0,1,Math.round(this.AE.x/32),Math.round(this.AE.y/32),2,1);
      this.addInvItem("wood");

    }
    else if(this.lookDirection == "right"){
      //this.state = "paused";
      this.forrestLayer.replaceByIndex(0,1,Math.round(this.AE.x/32)-1,Math.round(this.AE.y/32),2,1);
      this.addInvItem("wood");

    }
    
    
  }
*/
    
}

  



  harvestMoutain(AE,mount){
    mount.destroy(true);

  }


  movePlayerManager(){
   if(this.state == "paused"){
     if(this.Keys.space?.isDown){
       this.state = "active";
      // var seedStringArr = ["corn", "hemp", "wheat"];
       //var rand = Math.floor(Math.random() * 3);
       //this.plantSeed(this.AE.x,this.AE.y, seedStringArr[rand]);
       
     }
   }
   else if(this.state == "active"){
    if(this.Keys.left?.isDown){
      this.state = "paused";
      this.AE.x-=32;
      this.lookDirection = "left";
      
    }
  
    else if(this.Keys.right?.isDown) {
      this.state = "paused";
      this.AE.x+=32;
      this.lookDirection = "right";
      
     
    }
    
  
  
    if(this.Keys.up?.isDown){
      this.state = "paused";
      this.AE.y-=32;
      this.lookDirection = "up";
      
    }
    else if(this.Keys.down?.isDown){
      this.state = "paused";
      this.AE.y+=32;
      this.lookDirection = "down";
      

    }
    
    

  }
    
    
  
}

}
