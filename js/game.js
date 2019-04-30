   let gameOptions = {
       platFormStartSpeed: 350,
       spawnRange: [100, 350],
       platformSizeRange: [50, 250],
       playerGravity: 900,
       jumpForce: 400,
       playerStartPosition: 200,
       jumps: 2
   }

    let config = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 200 },
                debug: false
            }
        },
        scene: [ IntroScene, MovingObject ] 
    };
    let game = new Phaser.Game(config);
 
   