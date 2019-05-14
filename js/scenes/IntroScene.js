class IntroScene extends Phaser.Scene { 
    constructor(){
        super({key:"IntroScene"})
    }

  
    preload ()
    {
        this.load.image('intro', 'Conceptart/ValdisIntroPic.jpg')
        this.load.image('button', 'assets/start_button.png')
       
        
    }
    create ()
    {
        this.image = this.add.image(620, 300, 'intro')
        this.add.text(500, 400, 'Press D to start game', {fill: 'black'})
        //this.showScore()
        this.input.keyboard.on('keyup', function(event){
            if(event.key == 'D' || 'd'){
                this.scene.start("MovingObject")
            }
        }, this)
        console.log("Tereee");
        
    }
   
}
    