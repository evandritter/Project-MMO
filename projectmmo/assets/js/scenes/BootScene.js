class BootScene extends Phaser.Scene {
    constructor() {
      super('Boot');
    }
    
    preload() {
      //load images
     this.loadImages();
      //load spritesheets
      this.loadSpriteSheets();
      //load audio
      this.loadAudio();
      //load tilemap
      this.loadTileMap();
    }
    loadImages(){
      this.load.image('button1', 'assets/images/ui/blue_button01.png');
      this.load.image('button2', 'assets/images/ui/blue_button02.png');
      //load the map tileset image
      this.load.image('background', 'assets/level/background-extruded.png');
    }
    loadSpriteSheets() {
      this.load.spritesheet('items', 'assets/images/items.png', { frameWidth: 32, frameHeight: 32 });
      this.load.spritesheet('characters', 'assets/images/characters.png', { frameWidth: 32, frameHeight: 32 });
    }
    loadAudio() {
      this.load.audio('goldSound', ['assets/audio/Pickup.wav']);
    }
    loadTileMap() {
      //load in JSON map file
      this.load.tilemapTiledJSON('map', 'assets/level/large_level.json');
    }
    create() {
      this.scene.start('Game');
    }
  }