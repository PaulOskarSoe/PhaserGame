class IntroScene extends Phaser.Scene {
    constructor(){
        super({key:"IntroScene"});
    }

  
    preload ()
    {
        this.load.image('intro', 'Conceptart/ValdisIntroPic.jpg')
        
    }
    create ()
    {
        this.image = this.add.image(600, 300, 'intro')
    }
   
}
    