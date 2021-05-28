class Tireur extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) { //constructor est l'équivalent de Create dans une classe
        super(scene, x, y, "tireur");
        this.dir = -1;
        this.isAlive = true;

        this.body.allowGravity=true;
        //this.setBodySize(this.body.width,this.body.height);
        this.body.setSize(35,86);
        this.setOrigin(0,0);
        //this.setDisplaySize(64,64);
        this.setCollideWorldBounds(true);
        this.setBounce(0);
        this.setOffset(0,0);

        this.setDepth(102);
        //execute une commande au bout de 1 seconde loop permet de lancer l'action en boucle à la manière d'un update pour savoir à chaque frame si il faut lancer la ligne de code
        scene.time.addEvent({ delay: 2000, callback: this.test, callbackScope: this, loop: true });
        //this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);

        //le tireur peut de nouveau tirer après qu'on l'ai touché
        scene.time.addEvent({ delay: 8000, callback: this.mort, callbackScope: this, loop: true });

        this.anims.create({
            key: 'tireurGauche',
            frames: this.anims.generateFrameNumbers('tireurGauche', { start: 0, end: 5 }),
            frameRate: 5,
            repeat: -1
        });


        this.anims.create({
            key: 'tireurDroite',
            frames: this.anims.generateFrameNumbers('tireurDroite', { start: 0, end: 5 }),
            frameRate: 5,
            repeat: -1
        });




        // X
        /*this.originalX=x;
        this.minX=x;
        this.maxX=x-200;

        // Y
        this.originalY=y;
        this.minY=600;
        this.maxY=600;
        // on applique les propriétés du début de l'animation
        this.x=this.minX;
        this.y=this.minY;
        this.alpha=0;
        let me=this;*/


    }
    /*set directionX(value){
        this._directionX=value;
    }*/




    test(){
        /*this.time.addEvent({
            delay: 5000,
            callback: ()=>{
                this.bullet = new Projectile(this.world,this.x, this.y-15,'projo').setVelocityX(250);
            },
            loop: true
        })*/

        this.vivant();
        this.pos();

        if(this.dir<0){
            this.anims.play('tireurGauche', true);
        }else{
            this.anims.play('tireurDroite', true);
        }

        if(this.isAlive) {
            if (this.scene.player.x > this.x - 300 && this.scene.player.x < this.x + 300 /*&& this.scene.player.y > this.y - 200 && this.scene.player.y < this.y + 25*/) {
                //this.shotSound.play({volume:.5});
                if(this.scene.player.y>this.y){
                    this.projo = new Projectile(this.scene, this.x, this.y + 35, 'projo').setVelocityX(150 * this.dir);
                    /*setTimeout(function(){
                        this.projo.destroy();
                    },500)*/
                }

                else if(this.scene.player.y<this.y){
                    this.projo = new Projectile(this.scene, this.x, this.y + 30, 'projo').setVelocity(150 * this.dir, -150);
                    /*setTimeout(function(){
                        this.projo.destroy();
                    },500)*/
                }

            }

        }






    }



    vivant() {
        if (this.body.touching.up && this.isAlive) {
            //this.scene.player.setVelocityY(-400);
            //this.killEffect();
            //this.disableBody(true, true);
            this.isAlive = false;
            console.log('tireur mort');
        }

    }

    mort(){
        if(this.isAlive==false){
            this.isAlive=true;
            console.log('vivant');
        }
    }

    pos(){
        if (this.x < this.scene.player.x)
        {
            this.dir = 1;
        }
        else if (this.x > this.scene.player.x)
        {
            this.dir = -1;
        }
    }




}