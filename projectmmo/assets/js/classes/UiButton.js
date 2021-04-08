class UiButton extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key, hoverKey, text, targetCallback) {
        super(scene, x, y);
        this.scene = scene; //the scen this container is added to
        this.x = x; //x position of container
        this.y = y; //y position of container
        this.key = key; //background image of button
        this.hoverKey = hoverKey; //image displayed when player hovers over button
        this.text = text; //text displayed on button
        this.targetCallback = targetCallback; //callback function called when button clicked
        
        this.createButton(); //create ui button
        this.scene.add.existing(this); //add container to phaser scene
    }
    createButton() {
        //create button
        this.button = this.scene.add.image(0, 0, 'button1');
        //make interactive
        this.button.setInteractive();
        //scale button
        this.button.setScale(1.4);

        //create button text
        this.buttonText = this.scene.add.text(0,0, this.text, {fontSize: '26px', fill: '#fff'});
        //center button text in button
        Phaser.Display.Align.In.Center(this.buttonText, this.button);

        //add two game objects to container
        this.add(this.button);
        this.add(this.buttonText);

        //listen for event
        this.button.on('pointerdown', () => {
            this.targetCallback();       
        });
        this.button.on('pointerover', () => {
            
            this.button.setTexture(this.hoverKey);
        });
        this.button.on('pointerout', () => {
            
            this.button.setTexture(this.key);
        });
    }
}