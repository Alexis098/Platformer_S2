class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "player")
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setBounce(0.3);
        this.setGravityY(700)
        this.setFriction(1,1);
        this.sens = 1; //variable globale car elle est utilisée pour le sens du personnage affectant plusieurs fonctions, intégrer la fonction dans la fonction directement fait qu'elle ne sera pas prise en compte avec la deuxième fonction nécessaire pour ça
        //this.boutonDash;
        this.setBodySize(this.body.width-4,this.body.height);//taille de la hitbox
        this.setOffset(0, 0);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'stance',
            frames: this.anims.generateFrameNumbers('player_stance', { start: 4, end: 7  }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'back',
            frames: this.anims.generateFrameNumbers('player_stance', { start: 0, end: 3  }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player_jump', { start: 5, end: 8  }),
            frameRate: 5,
            repeat: -1
        });


        /*this.anims.create({
            key: 'back',
            frames: [ { key: 'player', frame: 1 } ],
            frameRate: 20
        });*/

        this._directionX=0;
        this._directionY=0;


    }

    set directionX(value){
        this._directionX=value;
    }
    set directionY(value){
        this._directionY=value;
    }

    /**
     * arrête le joueur
     */
    stop(){
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.directionY=0;
        this.directionX=0;
    }

    /**
     * Déplace le joueur en fonction des directions données
     */
    move(){
        /*var posX = this.x; // / 64;
        var posY = this.y;*/
        //let sens = 1;

        switch (true){
            case this._directionX<0:
                this.sens=-1;
                this.setVelocityX(-160);
                this.anims.play('left', true);
                break;
            case this._directionX>0:
                this.sens=1;
                this.setVelocityX(160);
                this.anims.play('right', true);
                break;
            default:
                this.setVelocityX(0);
                //this.anims.play('stance', true);
                this.anims.play(this.sens===-1 ? 'back' : 'stance' ,true); //équivalent d'un if, pour mémoriser la position du personnage pour qu'il regarde à gauche ou à droite en fonction du dernier déplacement effectué
                /*if(this.sens===-1){
                    this.anims.play('back',true);
                }
                if(this.sens===1){
                    this.anims.play('stance', true);
                }*/

        }
        /*this.boutonDash = this.input.keyboard.addKey('A');
        if (this.Input.Keyboard.JustDown(boutonDash)){
            this.dash();
        }*/



        if(this._directionY<0){ //gère la hauteur du saut du perso
            //this.anims.play('jump', true);
            if(this.body.blocked.down || this.body.touching.down){
                this.setVelocityY(-500);

                //this.anims.play('jump', true);
            }

            /*if(this.body.touching.down || this.body.touching.platforms){
                this.anims.play('jump', false);
            }else{
                this.anims.play('jump', true);
            }*/


        }


        /*dash(){ // la vitesse est la pour le dash //target est la cible du dash
            var posX = this.x / 64;
            posX = Math.trunc(posX);

            var target;
            if (this._directionX > 0){
                target = posX + 4;
            }
            else if (this._directionX < 0){
                target = posX - 4;
            }
            else {
                target = posX;
            }

            if (target > posX){
                this.setVelocityX(3000);
            }
            else if (target < posX){
                this.setVelocityX(-3000);
            }
        }*/

    }

    //Le reste des fonctions dash et teleportation se trouve dans le tableau avec la fonction move pour appeler la fonction dans le tableau
    dash() {
        console.log('dash');
        this.posX = this.x;
        this.posY = this.y;
        //this.dashUse = scene.input.keyboard.addKey('SPACE');

        var dir;

        if (this._directionX < 0 || this.sens===-1) {
            dir = this.posX - 5;
        } else if (this._directionX > 0 || this.sens===1) {
            dir = this.posX + 5;
        }

        if (dir < this.posX) {
            this.setVelocityX(-3000);
            //this.setAccelerationX(-1000);
            console.log('dash à gauche');
        } else if (dir > this.posX) {
            //this.accelerateTo(this.player, this.posX+500, this.posY+500 , 100 , 200, 200);

            this.setVelocityX(3000);
            //this.setAccelerationX(1000)
            console.log('dash à droite');
        }
        //cooldown
        /*if (this.dashAvailable == false){
            //console.log("recharge"); //on attends
            this.delayDash -= delta;
            if (this.delayDash < 0){
                //console.log("Sort recup"); //on recup
                this.dashAvailable = true;
                this.delayDash = this.dashBasic;
            }
        }*/
       /*this.tween = this.tweens.add({
            targets: this.player,
            this.setVelocityX: '+=600',
            ease: 'Power2',
            paused: true
        });

        this.input.once('A', function () {
            tween.play();
        });*/
    }

    teleportation() {
        console.log('téléportation');
        this.posX = this.x;
        this.posY = this.y;
        //this.dashUse = scene.input.keyboard.addKey('SPACE');

        var dir;

        if (this._directionX < 0 || this.sens===-1) {
            dir = this.posX - 5;
        } else if (this._directionX > 0 || this.sens===1) {
            dir = this.posX + 5;
        }

        if (dir < this.posX) {
            this.x=this.posX-100;
            //this.setAccelerationX(-1000);
            console.log('TP à gauche');
        } else if (dir > this.posX) {
            //this.accelerateTo(this.player, this.posX+500, this.posY+500 , 100 , 200, 200);

            this.x=this.posX+100;
            //this.setAccelerationX(1000)
            console.log('TP à droite');
        }
    }




}

