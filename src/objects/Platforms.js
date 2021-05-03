class Platforms extends ObjetPhysique {
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) { //constructor est l'équivalent de Create dans une classe
        super(scene, x, y, "Platforms");


        //this.body.allowGravity=false;
        //this.setBodySize(this.body.width,this.body.height);
        //this.body.setSize(64,64);
        //this.setOrigin(0,0);
        //this.setDisplaySize(64,64);
        //this.setCollideWorldBounds(true);
        //this.setBounce(0);








       /* // Y
        this.originalY=y;
        this.minY=y;
        this.maxY=y-100;
        // on applique les propriétés du début de l'animation
        this.x=this.minX;

        this.y=this.minY;
        this.alpha=0;
        let me=this;
        scene.tweens.add({
            targets:this,
            duration:200,
            delay:Math.random()*1000,
            alpha:{
                startDelay:Math.random()*5000,
                from:0,
                to:1,
            },
            onComplete: function () {
                me.start();
            }
        })*/





    }
    /*start(){

        if(this.inZone==true){
            this.scene.tweens.add({
                targets: this.Platforms,
                y: {
                    from: this.y,
                    to:this.y-=100,
                    duration: 1000,
                    ease: 'Sine.easeInOut',
                    yoyo: -1,
                    repeat:0
                }
            });
        }



    }*/



}