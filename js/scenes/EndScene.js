let highscore;
let higherscore;
console.log("endscreen");

class EndScene extends Phaser.Scene{
    constructor(){
        super({key:"EndScene"});
    }

    preload(){
    }

    create(){
        highscore = this.add.text(16, 15, 'Skoor on: ', { fontSize: '32px', fill: 'black'});
        highscore.lineSpacing = 40
        this.add.text(500, 400, 'Press any key to start game', {fill: 'black'})
        //this.showScore()
        this.input.keyboard.on('keyup', function(event){
            if(event.key == 'D' || 'd'){
                this.scene.start("MovingObject")
            }
        }, this)
    } 
    update(){
        this.showHighScore()
    }
    
    showHighScore(){
        let score = JSON.parse(localStorage.getItem('highscore'))
        highscore.setText(score  + '\nSkoor: \n'  )
    } 
}



