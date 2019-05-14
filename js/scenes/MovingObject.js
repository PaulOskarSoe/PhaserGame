let scoreText
let score = 0
let scores = []
localStorage.setItem('highscore', JSON.stringify(scores));

class MovingObject extends Phaser.Scene{
    constructor(){
        super({key:"MovingObject"});
    }
  
    preload ()
    {    
        this.load.spritesheet('mummy', 'assets/mummy37x45.png', { frameWidth: 37, frameHeight: 45 });    
        this.load.image('background', 'assets/bg.png')
        this.load.image('platform', 'assets/grounds1.png')
        this.load.spritesheet('player', 'assets/valdis.png', {frameWidth: 24 , frameHeight: 48})
        this.load.audio("backgroundmusic", 'Conceptart/music.mp3')
        this.load.image("endbackground", 'assets/endscreen.png')

    }
    create ()
    {
        let music = this.sound.add('backgroundmusic')
        music.play()
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background").setOrigin(0,0).setScrollFactor(0)
        scoreText = this.add.text(16, 16, 'Skoor: 0', { fontSize: '32px', fill: '#000' });

        //Zombie Pool and Group
        this.zombieGroup = this.add.group({
            removeCallback: function(zombie){
                zombie.scene.zombieSceen.add(zombie)
            }
        })
        this.zombiePool = this.add.group({
            removeCallback: function(zombie){
                zombie.scene.zombieGroup.add(zombie)
            }
        })

        //Platform Pool and Group
        this.platformGroup = this.add.group({
            removeCallback: function(platform){
                platform.scene.platformPool.add(platform)
            }
        })
        this.platformPool = this.add.group({
            removeCallback:function(platform){
                platform.scene.platformGroup.add(platform)
            }
        })


        this.playerJumps = 0
        this.addPlatform(game.config.width / 2, game.config.width /2, game.config.height * gameOptions.platformVerticalLimit[1])
        this.player = this.physics.add.sprite(gameOptions.playerStartPosition, gameConfig.height * 0.3, "player")
        this.player.setGravityY(gameOptions.playerGravity)
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("player", {start:0, end:1}), 
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: "run_mummy",
            frames: this.anims.generateFrameNumbers("mummy"),
            frameRate: 55,
            repeat: -1
        })

    
        setInterval(this.mummyProperties(), 1000)

        //collider for player
        this.physics.add.collider(this.player, this.platformGroup, function(){
            if(!this.player.anims.isPlaying){
                this.player.anims.play("run");
            }
        }, null, this)
 
        // checking for input
        this.input.on("pointerdown", this.jump, this);
    }

    mummyProperties(){
        this.mummy = this.physics.add.sprite(gameOptions.playerStartPosition * 0.4 , gameConfig.height * 0.1, "mummy")
        this.mummy.setGravityY(500)
        this.physics.add.collider(this.mummy, this.platformGroup, function(){
            this.mummy.setVelocityY(-200)
            this.mummy.setVelocityX(150)
            this.mummy.anims.play("run_mummy")
        }, null, this)

    }

    addPlatform(platformWidth, posX, posY){
        let platform
        if(this.platformPool.getLength()){
            platform = this.platformPool.getFirst()
            platform.x = posX
            platform.active = true
            platform.visible = true
            this.platformPool.remove(platform)
        }else{
            platform = this.physics.add.sprite(posX, posY, "platform")
            platform.setImmovable(true)
            platform.setVelocityX(Phaser.Math.Between(gameOptions.platformSpeedRange[0], gameOptions.platformSpeedRange[1]) * -1)
            this.platformGroup.add(platform)
        }
        platform.displayWidth = platformWidth
        this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1])
    }

    jump(){
        if(this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)){
            if(this.player.body.touching.down){
                this.playerJumps = 0
            }
            this.player.setVelocityY(gameOptions.jumpForce * - 1)
            this.playerJumps ++
            this.player.anims.stop()
        }   
    }
    

    update(delta){
    showScore()
    this.background.tilePositionX += 4
    if(this.player.y > game.config.height){
        scores = JSON.parse(localStorage.getItem('highscore'))
        scores.push(score)
        console.log(scores, "aaa");
        localStorage.setItem('highscore', JSON.stringify(scores))
        this.scene.start("EndScene");
        score = 0
    }
    if(this.mummy.y > game.config.height){
        this.mummyProperties()
        
    }
    if( this.physics.add.collider(this.mummy, this.player, function(){
        scores = JSON.parse(localStorage.getItem('highscore'))
        // scores.push(score)
        // localStorage.setItem('highscore', JSON.stringify(scores))
        scores.push(score)
        console.log(scores);
        localStorage.setItem('highscore', JSON.stringify(scores))
        this.scene.start("EndScene")
        score = 0
    }, null, this))
    this.player.x = gameOptions.playerStartPosition;

    let minDistance = game.config.width;
    let rightmostPlatformHeight = 0;
    this.platformGroup.getChildren().forEach(function(platform){
        let platformDistance = game.config.width - platform.x - platform.displayWidth / 2;
        if(platformDistance < minDistance){
            minDistance = platformDistance;
            rightmostPlatformHeight = platform.y;
        }
        if(platform.x < - platform.displayWidth / 2){
            this.platformGroup.killAndHide(platform);
            this.platformGroup.remove(platform);
        }
    }, this);

    // adding new platforms
    if(minDistance > this.nextPlatformDistance){
        let nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
        let platformRandomHeight = gameOptions.platformHeighScale * Phaser.Math.Between(gameOptions.platformHeightRange[0], gameOptions.platformHeightRange[1]);
        let nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
        let minPlatformHeight = game.config.height * gameOptions.platformVerticalLimit[0];
        let maxPlatformHeight = game.config.height * gameOptions.platformVerticalLimit[1];
        let nextPlatformHeight = Phaser.Math.Clamp(nextPlatformGap, minPlatformHeight, maxPlatformHeight);
        this.addPlatform(nextPlatformWidth, game.config.width + nextPlatformWidth / 2, nextPlatformHeight);
        }
    }
}

function showScore(){
    score += 1 
    scoreText.setText('Skoor: ' + score)
    //console.log(score);
    
}

function resize(){
    let canvas = document.querySelector("canvas");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowRatio = windowWidth / windowHeight;
    let gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}
    