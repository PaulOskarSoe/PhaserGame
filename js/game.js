   let gameOptions = {
    //properties for game
    platformSpeedRange: [300, 400],
    spawnRange: [80, 300],
    platformSizeRange: [90, 300],
    platformHeightRange: [-10, 10],
    platformHeighScale: 10,
    platformVerticalLimit: [0.4, 0.8],
    playerGravity: 1000,
    jumpForce: 400,
    playerStartPosition: 500,
    jumps: 6
   }

   let gameConfig = {
    //setting game configuration
    type: Phaser.AUTO,
    width: 1334,
    height: 750,
    backgroundColor: 0x87CEEB,
    physics: {
        default: "arcade"
    },
    audio: {
        disableWebAudio: true
    },
     scene: [ IntroScene, MovingObject, EndScene ] 
    };

let game = new Phaser.Game(gameConfig);
resize()
window.addEventListener("resize", resize, false);

   