class Projectile extends ObjetEnnemi {
    constructor(scene, x, y) { //constructor est l'équivalent de Create dans une classe
        super(scene, x, y, "projo");
        this.body.allowGravity=false;
        this.setBounce(0);
        this.setVelocityX(160);
        this.setDepth(1000);
        this.body.setSize(15,30);

        this.originalX=x;
        this.minX=x;
        this.maxX=x+100;

        this.x=this.minX;
        let me=this;

        /*scene.tweens.add({
            targets:this,
            duration:200,
            delay:Math.random()*1000,
            alpha:{
                startDelay:Math.random()*5000,
                from:0,
                to:1,
            },
            onComplete: function () {
                me.projo();
            }
        })*/
    }

    projo(){
        this.scene.tweens.add({
            targets: this,
            x: {
                from: this.minX,
                to: this.maxX,
                //y: '-=150',
                ease: 'Sine.easeInOut',
                duration: 500,
                delay: 50
                //repeat: -1,
            }
        });
    }

    /*recurrence(){
        this.timedEvent = this.time.addEvent({ delay: 5000, callback: projo, callbackScope: this, loop: true });
    }*/

    /*tir(){
        this.time.addEvent({
            delay: 1000,
            callback: ()=>{
                this.projo();
            },
            loop: true
        })
    }*/


}