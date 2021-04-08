class GameScene extends Phaser.Scene {
    constructor() {
      super('Game');
    }
    init() {
      this.scene.launch('Ui');
      this.score = 0;
    }
    create() {
      this.createMap();
      this.createAudio();
      this.createChests(); 
      this.createInput();

      this.createGameManager();
      
    }
    
    update() {
      if (this.player) this.player.update(this.cursors);
    }
    createAudio() {
      this.goldPickupAudio = this.sound.add('goldSound', { loop: false, volume: 0.4 });
    }
    createPlayer(location) {
      this.player = new Player(this, location[0] * 2, location[1] * 2, 'characters', 7);
    }
    createChests() {
      //creating chest group
      this.chests = this.physics.add.group();
      //chest position array
      this.chestPositions = [[100,100],[200,200],[300,300],[400,400],[500,500]];
      //specify max num of chest
      this.maxNumberOfChests = 3;
      //spawn a chest
      for (let i = 0; i< this.maxNumberOfChests; i += 1) {
        this.spawnChest();
      }
    }
    spawnChest() {
      const location = this.chestPositions[Math.floor(Math.random() * this.chestPositions.length)];
      const chest = new Chest(this, location[0], location[1], 'items', 0);
      //add chest to chests group
      this.chests.add(chest);
    }
   
    createInput() {
      this.cursors = this.input.keyboard.createCursorKeys();
    }
    addCollisions() {
      //check for collisions between player and blocked layer
      this.physics.add.collider(this.player, this.map.blockedLayer);
      this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);
    }
    collectChest(player, chest) {
      //play gold sound
      this.goldPickupAudio.play();
      //update score
      this.score += chest.coins;
      //update score in ui
      this.events.emit('updateScore', this.score);
      //destroy chest
      chest.destroy();
      //spawn new chest
      this.time.delayedCall(1000, this.spawnChest, [], this);
    }
  
    createMap(){
      //create tile map
     this.map = new Map(this, 'map', 'background', 'background', 'blocked');
    }

    createGameManager() {
      this.events.on('spawnPlayer', (location) => {
      this.createPlayer(location);
      this.addCollisions();
    });
      this.gameManager = new GameManager(this, this.map.map.objects);
      this.gameManager.setup();
    }
}