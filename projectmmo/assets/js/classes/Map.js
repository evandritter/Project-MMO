class Map{
    constructor(scene, key, tileSetName, bgLayerName, blockedLayerName) {
        this.scene = scene; //scene map belongs to
        this.key = key; //tiled JSON file key name
        this.tileSetName = tileSetName; //tiled tileset image key name
        this.bgLayerName = bgLayerName; //name of layer created in tiled
        this.blockedLayerName= blockedLayerName; //name of layer created in tiled for blocked areas
        this.createMap();

    }
    createMap(){
        //create tile map
        this.map = this.scene.make.tilemap({key: this.key});
        //add tileset image
        this.tiles = this.map.addTilesetImage(this.tileSetName, this.tileSetName, 32, 32, 1, 2);
        //create background
        this.backgroundLayer = this.map.createStaticLayer(this.bgLayerName, this.tiles, 0, 0);
        this.backgroundLayer.setScale(2);
        //create blocked layer
        this.blockedLayer = this.map.createStaticLayer(this.blockedLayerName, this.tiles, 0, 0);
        this.blockedLayer.setScale(2);
        this.blockedLayer.setCollisionByExclusion(-1);
  
        //update world bounds
        this.scene.physics.world.bounds.width = this.map.widthInPixels * 2;
        this.scene.physics.world.bounds.height = this.map.widthInPixels * 2;
  
        //limit camera to map
        this.scene.cameras.main.setBounds(0,0,this.map.widthInPixels * 2, this.mapheightInPixels* 2);
      }
}