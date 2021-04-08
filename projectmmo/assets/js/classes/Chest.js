class Chest extends Phaser.Physics.Arcade.Image
{
    constructor(scene, x, y, key, frame)
    {
        super(scene, x, y, key, frame);
        
        this.scene = scene; //scene this game obj added to

        this.coins = 10; //amount of coins this chest contains

        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
    }
}