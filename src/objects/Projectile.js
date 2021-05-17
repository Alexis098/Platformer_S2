class Projectile extends ObjetEnnemi {
    constructor(scene, x, y) { //constructor est l'équivalent de Create dans une classe
        super(scene, x, y, "projo");
        this.body.allowGravity=false;
        this.setBounce(0);
        //this.setVelocityX(160);
        this.setDepth(1000);
        this.body.setSize(15,20);

        this.originalX=x;
        this.minX=x;
        this.maxX=x+100;

        this.x=this.minX;
        //let me=this;
        this.valeur=0;


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
    /*tir(){
        this.valeur+=1;
        console.log(this.valeur);
        if(this.valeur===100){
            this.destroy();
        }
    }
    update(){
        this.tir();
    }*/

    /*projo(){
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


    }*/


    //ne fonctionne pas il faudrait l'actualiser à chaque frame
    //permet de détruire le projectile quand il dépasse une certaine distance
    /*destru(){
        if(this.x>this.projo.x+300 || this.x<this.x-300){
            console.log('destroyyyyy');
            this.destroy();
            //this.projo.x=this.x;
        }
    }*/







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