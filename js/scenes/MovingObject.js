let player;
let cursors; 
let platforms;
let background;
let camera;
let tween;

class MovingObject extends Phaser.Scene{
    constructor(){
        super({key:"MovingObject"});
    }
    

    preload ()
    {        
        this.load.image('background', 'assets/background.png')
        this.load.image('ground', 'assets/grounds.png')
        this.load.spritesheet('dude', 'assets/dude.png', {frameWidth: 32 , frameHeight: 48})
    }
    create ()
    {
        this.background = this.add.tileSprite(10, 10, this.game.width, this.game.height,'background')
        this.background.setScale(4);
       
        platforms = this.physics.add.staticGroup();
        platforms.create(0, 930, 'ground').refreshBody();
        //this.platforms = this.add.tileSprite(0,0, this.game.width, this.game.height, 'ground')

        player = this.physics.add.sprite(120, 300, 'dude');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        camera = this.cameras.main;
        //camera.setPosition(0, -10)
        
        camera.startFollow(player);
        //this.camera.y + 10;

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        player.body.setGravityY(300)
        this.physics.add.collider(player, platforms);

    }


    update(delta){
    
    cursors = this.input.keyboard.createCursorKeys()
        //  Reset the players velocity (movement)
    player.body.velocity.x -= 3;
    //platforms.body.velocity.x -= 3
    this.background.tilePositionX -= 3
    //this.platforms.tilePositionX -= 10
    player.setVelocityX(120);
    player.anims.play('right', true);
    

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}
}
    