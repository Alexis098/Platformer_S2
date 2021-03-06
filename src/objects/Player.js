class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, "player")
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setCollideWorldBounds(true)
        this.setBounce(0.05);
        this.setGravityY(700)
        //this.body.allowGravity=true;
        this.setFriction(1, 1);


        this.sens = 1; //variable globale car elle est utilisée pour le sens du personnage affectant plusieurs fonctions, intégrer la fonction dans la fonction directement fait qu'elle ne sera pas prise en compte avec la deuxième fonction nécessaire pour ça
        //this.boutonDash;
        //this.temps = 0;
        this.recup = 0;
        this.speedFactor = 1;
        this.vitesse = 0;

        this.isDash = false;
        this.isDashDiag = false;
        this.sautPossible=false;
        this.chutePossible=false;

        this.staticY = false;



        //this.setOrigin(0,0);


        this.setBodySize(this.body.width - 50, this.body.height - 8);//taille de la hitbox
        this.setOffset(25, 8);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('playerG', {start: 11, end: 0/*3*/}),
            frameRate: 16,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', {start: 0/*7*/, end: 11/*10*/}),
            frameRate: 16,
            repeat: -1
        });
        this.anims.create({
            key: 'stance',
            frames: this.anims.generateFrameNumbers('player_stance', {start: 9, end: 15/*9*/}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'back',
            frames: this.anims.generateFrameNumbers('player_stance', {start: 0, end: 6}),
            frameRate: 5,
            repeat: -1
        });


        this.anims.create({
            key: 'chute_left',
            frames: this.anims.generateFrameNumbers('spritesheet_chute', {start: 0, end: 3/*3*/}),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'chute_right',
            frames: this.anims.generateFrameNumbers('spritesheet_chute', {start: 4, end: 7}),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'chuteSaut_left',
            frames: this.anims.generateFrameNumbers('chuteSaut', {start: 3, end: 0/*3*/}),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'chuteSaut_right',
            frames: this.anims.generateFrameNumbers('chuteSaut', {start: 4, end: 7}),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'dashDroite',
            frames: this.anims.generateFrameNumbers('dashDroite', {start: 0, end: 3}),
            frameRate: 10,
        });

        this.anims.create({
            key: 'dashGauche',
            frames: this.anims.generateFrameNumbers('dashGauche', {start: 3, end: 0}),
            frameRate: 10,
        });

        this.anims.create({
            key: 'dashDiagDroite',
            frames: this.anims.generateFrameNumbers('dashDiagDroite', {start: 0, end: 3}),
            frameRate: 8,
        });

        this.anims.create({
            key: 'dashDiagGauche',
            frames: this.anims.generateFrameNumbers('dashDiagGauche', {start: 3, end: 0}),
            frameRate: 8,
        });

        this.anims.create({
            key: 'sautGauche',
            frames: this.anims.generateFrameNumbers('saut', {start: 3, end: 0}),
            frameRate: 7,
        });
        this.anims.create({
            key: 'sautDroite',
            frames: this.anims.generateFrameNumbers('saut', {start: 4, end: 7}),
            frameRate: 7,
        });

        this.on('animationcomplete', function () {
            if (this.anims.currentAnim.key === 'dashDroite') {
                this.isDash = false;
            }
        });

        this.on('animationcomplete', function () {
            if (this.anims.currentAnim.key === 'dashGauche') {
                this.isDash = false;
            }
        });

        this.on('animationcomplete', function () {
            if (this.anims.currentAnim.key === 'dashDiagDroite') {
                this.isDashDiag = false;
            }
        });

        this.on('animationcomplete', function () {
            if (this.anims.currentAnim.key === 'dashDiagGauche') {
                this.isDashDiag = false;
            }
        });


        /*this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player_jump', { start: 5, end: 8  }),
            frameRate: 5,
            repeat: -1
        });*/

        /*this.anims.create({
            key: 'back',
            frames: [ { key: 'player', frame: 1 } ],
            frameRate: 20
        });*/

        this._directionX = 0;
        this._directionY = 0;

        /*import{gsap} from "gsap";
         import{CustomEase} from "gsap/CustomEase";*/

        //gsap.registerPlugin(CustomEase);
        //CustomEase.create("jump", "M0,0,C0.294,0,0.283,1,0.5,1,0.712,1,0.698,0,1,0");


    }


    set directionX(value) {
        this._directionX = value;
    }

    set directionY(value) {
        this._directionY = value;
    }

    /**
     * arrête le joueur
     */
    stop() {
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.directionY = 0;
        this.directionX = 0;
    }

    /**
     * Déplace le joueur en fonction des directions données
     */
    move() {
        /*var posX = this.x; // / 64;
        var posY = this.y;*/
        //let sens = 1;


        if (this.sautPossible) {
            if (this.sens === 1) {
                this.anims.play('sautDroite', true);
            } else if (this.sens === -1) {
                this.anims.play('sautGauche', true);
            }
        }

        if (this.chutePossible) {
            if (this.sens === 1) {
                this.anims.play('chuteSaut_right', true);
            } else if (this.sens === -1) {
                this.anims.play('chuteSaut_left', true);
            }
        }


        if (this.isDash) {
            this.sautPossible=false;
            this.chutePossible=false;

            if (this.sens === 1) {
                this.anims.play('dashDroite', true);
            } else if (this.sens === -1) {
                this.anims.play('dashGauche', true);
            }
        }



        if(this.isDashDiag){
            this.sautPossible=false;
            this.chutePossible=false;
            if(this.sens === 1){
                this.anims.play('dashDiagDroite', true);
            }else if (this.sens === -1){
                this.anims.play('dashDiagGauche', true);
            }
        }


        this.body.velocity.y = Math.min(500, Math.max(-500, this.body.velocity.y));
        //if(!this.sautPossible){
            //if(!this.chutePossible) {
                switch (true) {
                    case this._directionX < 0:
                        this.sens = -1;
                        this.setVelocityX(this.sens * 180 * this.speedFactor);
                        //this.anims.play('left', true);
                        this.vitesse = 1;
                        if(!this.sautPossible) {
                            if(!this.chutePossible) {
                                if (!this.isDash) {
                                    if(!this.isDashDiag) {
                                        this.anims.play('left', true);
                                    }
                                }
                            }
                        }

                        Tableau.current.pourPlayerPlaySand();
                        break;
                    case this._directionX > 0:
                        this.sens = 1;
                        this.setVelocityX(this.sens * 180 * this.speedFactor);
                        //this.anims.play('right', true);
                        this.vitesse = 1;
                        Tableau.current.pourPlayerPlaySand();
                        if(!this.sautPossible){
                            if(!this.chutePossible) {
                                if (!this.isDash) {
                                    if(!this.isDashDiag){
                                        this.anims.play('right', true);
                                    }
                                }
                            }
                        }

                        break;
                    default:
                        this.staticY = true;
                        Tableau.current.pourPlayerPlaySandOff();
                        this.setVelocityX(0);
                        this.vitesse = 0;
                        //this.anims.play('stance', true);
                        if(!this.sautPossible) {
                            if(!this.chutePossible) {
                                if (!this.isDash) {
                                    if (!this.isDashDiag) {
                                        this.anims.play(this.sens === -1 ? 'back' : 'stance', true); //équivalent d'un if, pour mémoriser la position du personnage pour qu'il regarde à gauche ou à droite en fonction du dernier déplacement effectué
                                    }
                                }
                            }
                        }

                    /*if(this.sens===-1){
                        this.anims.play('back',true);
                    }
                    if(this.sens===1){
                        this.anims.play('stance', true);
                    }*/

                }
            //}
       // }

        /*this.boutonDash = this.input.keyboard.addKey('A');
        if (this.Input.Keyboard.JustDown(boutonDash)){
            this.dash();
        }*/

        this.sauter();
        this.essaiSaut();
        this.chuteSaut();


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
    essaiSaut(){
        if(this.body.velocity.y<-2 && !this.isDash && !this.isDashDiag){
            this.sautPossible=true;
        }else{
            this.sautPossible=false;
        }
    }
    chuteSaut(){
        //console.log(this.body.velocity.y);
        if(this.body.velocity.y>0 && !this.isDash && !this.isDashDiag){
            this.chutePossible=true;
        }else{
            this.chutePossible=false;
        }
    }


    sauter() {



        if (this._directionY < 0) { //gère la hauteur du saut du perso
            //this.jump();//fonction gérant l'anim de saut
            Tableau.current.pourPlayerPlaySandOff();




            if (this.body.blocked.down || this.body.touching.down) {
                //this.setVelocityY(-500);
                /*this.scene.tweens.add({
                    targets: this,
                    y: '-=110',
                    ease: 'Power2',
                    //ease : CustomEase.create("custom", "M0,0,C0.126,0.382,0.282,0.674,0.44,0.822,0.522,0.899,0.618,0.943,0.694,0.969,0.73,0.981,0.785,0.993,0.785,0.993,1.056,1.07,0.998,0,1,0"),
                    duration: 400,
                })*/
                Tableau.current.tweens.timeline({
                    targets: Tableau.current.player.body.velocity,
                    ease: 'Circ.easeOut',//'Power2.easeInOut',
                    //ease : CustomEase.create("custom", "M0,0 C0.066,0.05 0.086,0.086 0.13,0.134 0.297,0.316 0.346,0.509 0.452,0.646 0.656,0.91 0.818,1.001 1,1"),
                    duration: 150,
                    loop: 0,
                    tweens: [
                        {
                            targets: Tableau.current.player.body.velocity,
                            y: -500
                        },
                        {
                            targets: Tableau.current.player.body.velocity,
                            y: 0
                        }
                    ]
                });

                //this.body.setVelocityY(10);
                /*gsap.to(this, {y: this.y-150, ease:
                        CustomEase.create("custom", "M0,0,C0.202,0,0.298,1,0.5,1,0.706,1,0.795,0.766,0.99,0.736,0.99,0.819,0.999,0.2,1,0.2")});
                */
                //recup dudash en diagonale quand on retombe au sol
                this.recup = 0;


            }


            /*if(this.body.touching.down || this.body.touching.platforms){
                this.anims.play('jump', false);
            }else{
                this.anims.play('jump', true);
            }*/

            //quand on redescend d'un saut, quand on se rapproche du sol
        }


    }


    //joue l'anim de saut
    jump() {
        this.chuteSaut();
        /*if (this.body.velocity.y > 0) {
            this.anims.play('chute_right', true);
        }*/
    }

    //Le reste des fonctions dash et teleportation se trouve dans le tableau avec la fonction move pour appeler la fonction dans le tableau
    dash() {


        //this.scene.time.addEvent({ delay: 100, callback: this.invu, callbackScope: this, loop: true });
        //this.scene.time.addEvent({ delay: 600, callback: this.vulne, callbackScope: this, loop: true });

        //permet de dasher en étant immobile
        this._directionX = this.sens;
        //this.speedFactor=3;
        this.speedFactorMax = 1;


        // this.ok=0;
        // this.suspendu=0;

        // if(this.ok===1){
        //     this.setVelocityX(this.sens*160);
        // }

        // setTimeout(function(){
        //     this.ok=1;
        // },300)


        if (this.speedFactor >= this.speedFactorMax) {
            this.speedFactor = 1;
        }

        let me = this;

        //permet de dire que si le perso est immobile etqu'il dash, il redevient immobile à la fin du dash
        if (this.vitesse === 0) {
            setTimeout(function () {
                me.speedFactor = 0;
                me._directionX = 0;
            }, 300)
        }
        //permet de faire revenir à la vitesse normale après un dash quand le perso est en mouvement
        if (this._directionX > 0 || this._directionX < 0) {
            setTimeout(function () {
                me.speedFactor = 1;
            }, 300)
        }


        //console.log('dash');
        this.posX = this.x;
        this.posY = this.y;
        var dir;


        if (this._directionX < 0 || this.sens === -1) { //sens===-1 pour dasher dans le sens ou on regarde quand on est immobile
            dir = this.posX - 5;
        } else if (this._directionX > 0 || this.sens === 1) {
            dir = this.posX + 5;
        }

        if (dir < this.posX) {

            if (/*this._directionY<0*/Tableau.current.pressUp && this.recup === 0 /*&& this.body.velocity.y>=-0.7 || this.body.velocity.y<=-2*/) {
                //ancienne ligne valide pour l'ancien dash
                ///this.animGaucheHaut();

                this.isDashDiag = true;
                this.isDash = false;

                this.scene.tweens.add({
                    targets: this,
                    speedFactor: '+=1,75', /*2*/
                    ease: 'Circ.easeInOut', //peut marcher pour la TP plutôt en terme de synergie
                    duration: 90, /*100*/
                });


                this.tween = this.scene.tweens.add({
                    targets: this,
                    y: '-=100',/*150*/
                    ease: 'Power2', //tester Circ (la mieux) Sine ou Expo aussi
                    //ease : CustomEase.create("custom", "M0,0,C0.126,0.382,0.318,0.616,0.468,0.796,0.546,0.876,0.712,0.982,1,1"),
                    duration: 500,
                    //delay: 30
                });
                //this.setVelocityX(-2*this.speedFactor);

                //this.setVelocity(-10,-160);

                //recup dudash en diagonale quand on retombe au sol
                this.recup = 1;
            } else {

                this.isDash = true;
                this.isDashDiag = false;

                //ancienne ligne valide pour l'ancien dash
                //this.animGauche();
                this.scene.tweens.add({
                    targets: this,
                    speedFactor: '+=2', /*3*/
                    ease: 'Circ.easeInOut', //peut marcher pour la TP plutôt en terme de synergie
                    duration: 90, /*100*/
                });


            }
            //this.setVelocityX(-3000);
            //this.setAccelerationX(-1000);
            // console.log('dash à gauche');
        } else if (dir > this.posX) {
            //this.accelerateTo(this.player, this.posX+500, this.posY+500 , 100 , 200, 200);

            if (/*this._directionY<0*/Tableau.current.pressUp && this.recup === 0 /*&& this.body.velocity.y>=-0.7 || this.body.velocity.y<=-2*/) {
                //ancienne ligne valide pour l'ancien dash
                //this.animDroiteHaut();

                this.isDashDiag = true;
                this.isDash = false;

                this.scene.tweens.add({
                    targets: this,
                    speedFactor: '+=1,75', /*2*/
                    ease: 'Circ.easeInOut', //peut marcher pour la TP plutôt en terme de synergie
                    duration: 90, /*100*/
                });


                this.tween = this.scene.tweens.add({
                    targets: this,
                    y: '-=100', /*150*/
                    ease: 'Power2', //tester Circ (la mieux) Sine ou Expo aussi
                    //ease : CustomEase.create("custom", "M0,0,C0.126,0.382,0.318,0.616,0.468,0.796,0.546,0.876,0.712,0.982,1,1"),
                    duration: 500,
                    //delay: 30
                });
                //this.setVelocityX(2*this.speedFactor);

                //this.setVelocity(10,-160);

                //recup du dash en diagonale quand on retombe au sol
                this.recup = 1;

            } else {
                this.isDash = true;
                this.isDashDiag = false;
                //ancienne ligne valide pour l'ancien dash
                //this.animDroite();

                this.scene.tweens.add({
                    targets: this,
                    speedFactor: '+=2', /*3*/
                    ease: 'Circ.easeInOut', //peut marcher pour la TP plutôt en terme de synergie
                    duration: 90, /*100*/
                });


            }

            //this.setVelocityX(3000);
            //this.setAccelerationX(1000)
            // console.log('dash à droite');
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

    }


    animDroite() {//tween pour l'avancement progressif du dash


        //this.body.setVelocityX(200);


        this.tween = this.scene.tweens.add({
            targets: this,
            x: '+=200',
            //speed: 4000,
            //y: '-=150',
            ease: 'Circ.easeInOut', //tester Circ (la mieux) Sine ou Expo aussi
            //ease : CustomEase.create("custom", "M0,0,C0.126,0.382,0.318,0.616,0.468,0.796,0.546,0.876,0.712,0.982,1,1"),
            //aussi tester entre easeInOut - easeIn et easeOut
            duration: 500,
            //delay: 30
        });

        //body.blocked sert quand on court et qu'on touche un bord mais pas quand on est immobile
        if (this.body.blocked.right || this.body.touching.right) {
            this.x -= 5;
        }

        //  console.log('ease sine');
        /*this.tween = this.tweens.add({
            targets: this.player,
            this.setVelocityX: '+=600',
            ease: 'Power2',
            paused: true
        });*/

        /*this.input.once('A', function () {
            tween.play();
        });*/
    }

    animDroiteHaut() {
        this.tween = this.scene.tweens.add({
            targets: this,

            x: '+=100',
            y: '-=150',
            ease: 'Circ.easeInOut', //tester Circ (la mieux) Sine ou Expo aussi
            //ease : CustomEase.create("custom", "M0,0,C0.126,0.382,0.318,0.616,0.468,0.796,0.546,0.876,0.712,0.982,1,1"),
            duration: 500,
            //delay: 30
        });
        this.body.setVelocityY(10);
    }

    animGauche() {
        this.scene.tweens.add({
            targets: this,

            x: '-=200',
            ease: 'Circ.easeInOut', //peut marcher pour la TP plutôt en terme de synergie
            duration: 500,
            //delay: 30
            /*x: '+=600',
            ease: 'Power2',
            paused: true*/
        });


        //  console.log('ease sine');
    }

    animGaucheHaut() {
        this.tween = this.scene.tweens.add({
            targets: this,

            x: '-=100',
            y: '-=150',
            ease: 'Circ.easeInOut', //tester Circ (la mieux) Sine ou Expo aussi
            //ease : CustomEase.create("custom", "M0,0,C0.126,0.382,0.318,0.616,0.468,0.796,0.546,0.876,0.712,0.982,1,1"),
            //aussi tester entre easuInOut - easeIn et easeOut
            duration: 500,
            //delay: 30


        });
        this.body.setVelocityY(10);//ralenti la chute car application d'une vélocité plus petite que celle par défaut dans ce cas
    }

    teleportation() {
        //if(1250<=this.player.x && this.player.x<=1750){
        //delay:2000
        this.posX = this.x;
        this.posY = this.y;
        //this.dashUse = scene.input.keyboard.addKey('SPACE');

        var dir;
        //petit rebond après la TP pour du feedback et enchainer avec du mouvement
        this.setVelocityY(-100);
        if (this._directionX < 0 || this.sens === -1) {
            dir = this.posX - 5;
        } else if (this._directionX > 0 || this.sens === 1) {
            dir = this.posX + 5;
        }
        if (dir < this.posX) {
            //this.x=this.posX-100;
            this.scene.tweens.add({
                targets: this,

                x: '-=250',
                ease: 'Expo.easeIn', //peut marcher pour la TP plutôt en terme de synergie
                duration: 500,
                delay: 50
                /*x: '+=600',
                ease: 'Power2',
                paused: true*/
            });

        } else if (dir > this.posX) {
            //this.x=this.posX+100;
            this.scene.tweens.add({
                targets: this,

                x: '+=250',
                ease: 'Expo.easeIn', //peut marcher pour la TP plutôt en terme de synergie
                duration: 500,
                delay: 50
                /*x: '+=600',
                ease: 'Power2',
                paused: true*/
            });

        }
        //}

    }

    /*invu(){
        this.body.enable=false;
    }

    vulne(){
        this.body.enable=true;
    }*/


    mobileDashDiag() {


        //this.scene.time.addEvent({ delay: 100, callback: this.invu, callbackScope: this, loop: true });
        //this.scene.time.addEvent({ delay: 600, callback: this.vulne, callbackScope: this, loop: true });

        //permet de dasher en étant immobile
        this._directionX = this.sens;
        //this.speedFactor=3;
        this.speedFactorMax = 1;


        // this.ok=0;
        // this.suspendu=0;

        // if(this.ok===1){
        //     this.setVelocityX(this.sens*160);
        // }

        // setTimeout(function(){
        //     this.ok=1;
        // },300)


        if (this.speedFactor >= this.speedFactorMax) {
            this.speedFactor = 1;
        }

        let me = this;

        //permet de dire que si le perso est immobile etqu'il dash, il redevient immobile à la fin du dash
        if (this.vitesse === 0) {
            setTimeout(function () {
                me.speedFactor = 0;
                me._directionX = 0;
            }, 300)
        }
        //permet de faire revenir à la vitesse normale après un dash quand le perso est en mouvement
        if (this._directionX > 0 || this._directionX < 0) {
            setTimeout(function () {
                me.speedFactor = 1;
            }, 300)
        }


        //console.log('dash');
        this.posX = this.x;
        this.posY = this.y;
        var dir;


        if (this._directionX < 0 || this.sens === -1) { //sens===-1 pour dasher dans le sens ou on regarde quand on est immobile
            dir = this.posX - 5;
        } else if (this._directionX > 0 || this.sens === 1) {
            dir = this.posX + 5;
        }

        if (dir < this.posX) {

            //if (this.recup === 0) {

                this.scene.tweens.add({
                    targets: this,
                    speedFactor: '+=1,75', /*2*/
                    ease: 'Circ.easeInOut', //peut marcher pour la TP plutôt en terme de synergie
                    duration: 90, /*100*/
                });


                this.tween = this.scene.tweens.add({
                    targets: this,
                    y: '-=100',/*150*/
                    ease: 'Power2', //tester Circ (la mieux) Sine ou Expo aussi
                    //ease : CustomEase.create("custom", "M0,0,C0.126,0.382,0.318,0.616,0.468,0.796,0.546,0.876,0.712,0.982,1,1"),
                    duration: 500,
                    //delay: 30
                });

                this.recup = 1;

            //}
        } else if (dir > this.posX) {
                //this.accelerateTo(this.player, this.posX+500, this.posY+500 , 100 , 200, 200);

                //if (this.recup === 0) {
                    this.scene.tweens.add({
                        targets: this,
                        speedFactor: '+=1,75', /*2*/
                        ease: 'Circ.easeInOut', //peut marcher pour la TP plutôt en terme de synergie
                        duration: 90, /*100*/
                    });


                    this.tween = this.scene.tweens.add({
                        targets: this,
                        y: '-=100', /*150*/
                        ease: 'Power2', //tester Circ (la mieux) Sine ou Expo aussi
                        //ease : CustomEase.create("custom", "M0,0,C0.126,0.382,0.318,0.616,0.468,0.796,0.546,0.876,0.712,0.982,1,1"),
                        duration: 500,
                        //delay: 30
                    });

                    this.recup = 1;


                //}

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

        }





}

