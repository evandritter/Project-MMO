class Player extends Phaser.Physics.Arcade.Image
{
    constructor(scene, x, y, key, frame)
    {
        super(scene, x, y, key, frame);
        
        this.scene = scene; //scene the container will be added to 

        this.velocity = 170; //velocity when moving player

        //enable physics
        this.scene.physics.world.enable(this);
        //set immovable if object collides with player
        this.setImmovable(false);
        //scale player
        this.setScale(2);
        //collide with world bounds
        this.setCollideWorldBounds(true);
        //add player to existing scene
        this.scene.add.existing(this);
        //camera follow player
        this.scene.cameras.main.startFollow(this);
    }

update(cursors) {
    this.body.setVelocity(0);
  
    if(cursors.left.isDown) {
      this.body.setVelocityX(-this.velocity);
    } else if(cursors.right.isDown) {
      this.body.setVelocityX(this.velocity);
    }
  
    if(cursors.up.isDown) {
      this.body.setVelocityY(-this.velocity);
    } else if(cursors.down.isDown) {
      this.body.setVelocityY(this.velocity);
    }
  }
}