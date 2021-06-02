/**
 * Toutes les fonctions propres à un tableau dans notre jeu.
 * Cette classe n'est pas à utiliser directement, elle doit être extend !
 */
class Tableau extends Phaser.Scene{
    /**
     *
     * @param {String} key identifiant de la scène à jouer
     */

    constructor(key) {
        super(key);
        this.ptsVie=5;
        this.verif=1;
        this.verifTP=1;
        this.crush=0;
        this.sand=0;
        this.invicibleForEver = false;

        this.pressUp=false;




    }

    /**
     * Par défaut on charge un fond et le player
     */
    preload(){
        //this.load.image('sky', 'assets/ciel.png');
        //this.load.image('spike', 'assets/spike.png');
        //this.load.image('blood', 'assets/blood.png');
       /*this.load.spritesheet('player',
            'assets/player_3_couleurs.png',
            { frameWidth: 64, frameHeight: 64  }
        );*/
        this.load.spritesheet('player',
            'assets/animations/lumel/Run_test_35.png',/*Run_test_32OU 34.png*/
            { frameWidth: 64, frameHeight: 64  }
        );
        this.load.spritesheet('playerG',
            'assets/animations/lumel/Run_test_33_gauche.png',/*Run_test_32.png*/
            { frameWidth: 64, frameHeight: 64  }
        );
        this.load.spritesheet('player_stance',
            'assets/animations/lumel/Stance_test_15.png',/*Stance_test_15.png*/
            { frameWidth: 64, frameHeight: 64  }
        );

        this.load.spritesheet('spritesheet_chute',
            'assets/animations/lumel/spritesheet_chute.png',
            { frameWidth: 86, frameHeight: 86  }
        );
        // this.load.spritesheet('player_jump',
        //     'assets/player_jump1.png',
        //     { frameWidth: 32, frameHeight: 48  }
        // );

        this.load.spritesheet('dashDroite',
            'assets/animations/lumel/dash_test_12_75.png',/*dash_test_10_gauche*/
            { frameWidth: 64, frameHeight: 64  }
        );

        this.load.spritesheet('dashGauche',
            'assets/animations/lumel/dash_test_12_75_gauche.png',/*dash_test_9_gauche*/
            { frameWidth: 64, frameHeight: 64  }
        );

        this.load.spritesheet('dashDiagDroite',
            'assets/animations/lumel/dash_diag_1.png',
            { frameWidth: 64, frameHeight: 64  }
        );

        this.load.spritesheet('dashDiagGauche',
            'assets/animations/lumel/dash_diag_1_gauche.png',
            { frameWidth: 64, frameHeight: 64  }
        );



        //TIREUR
        this.load.spritesheet('tireurGauche',
            'assets/animations/tireur/tireur_test_2.png',
            { frameWidth: 64, frameHeight: 86  }
        );
        this.load.spritesheet('tireurDroite',
            'assets/animations/tireur/tireur_test_2_droit.png',
            { frameWidth: 64, frameHeight: 86  }
        );
        //PLANEUR
        this.load.spritesheet('planeur',
            'assets/animations/planeur/run_test_10.png',
            { frameWidth: 86, frameHeight: 172  }
        );
        //PATROUILLEUR
        this.load.spritesheet('patrouilleurGauche',
            'assets/animations/patrouilleur/stance_test_1_droite.png',
            { frameWidth: 86, frameHeight: 64  }
        );
        this.load.spritesheet('patrouilleurDroite',
            'assets/animations/patrouilleur/stance_test_1_gauche.png',
            { frameWidth: 86, frameHeight: 64  }
        );
        this.load.spritesheet('patrouilleurCourse',
            'assets/animations/patrouilleur/run_test_6.png',
            { frameWidth: 128, frameHeight: 64  }
        );




        //this.load.audio('track', 'assets/son/kamakura.mp3');




        this.load.audio('dashson', 'assets/son/dash_1.mp3');
        this.load.audio('tpson', 'assets/son/tp2.mp3');

        this.load.audio('shoes_run_sand', 'assets/son/shoes_run_sand_3.mp3');
       // this.load.audio('jump_sand_short', 'assets/son/jump_sand_short.mp3');


        this.load.image('5vies', 'assets/Vies/5_coeurs_128x64.png');
        this.load.image('4vies', 'assets/Vies/4_coeurs_128x64.png');
        this.load.image('3vies', 'assets/Vies/3_coeurs_128x64.png');
        this.load.image('2vies', 'assets/Vies/2_coeurs_128x64.png');
        this.load.image('1vies', 'assets/Vies/1_coeurs_128x64.png');
        this.load.image('0vies', 'assets/Vies/0_coeurs_128x64.png');

        this.load.image('5viesGrands', 'assets/Vies/grand/5_coeurs_grands.png');
        this.load.image('4viesGrands', 'assets/Vies/grand/4_coeurs_grands.png');
        this.load.image('3viesGrands', 'assets/Vies/grand/3_coeurs_grands.png');
        this.load.image('2viesGrands', 'assets/Vies/grand/2_coeurs_grands.png');
        this.load.image('1viesGrands', 'assets/Vies/grand/1_coeurs_grands.png');
        this.load.image('0viesGrands', 'assets/Vies/grand/0_coeurs_grands.png');



    }

    create(){


        Tableau.current=this;
        this.isMobile=this.game.device.os.android || this.game.device.os.iOS;


        if(this.game.device.os.android || this.game.device.os.iOS){
            //rien
        }else{
            this.shoes_run_sand = this.sound.add('shoes_run_sand', {volume: 1.3});
            //this.jump_sand_short = this.sound.add('jump_sand_short', {volume: 0.5});
            this.shoes_run_sand.loop = true;
        }

        this.sys.scene.scale.lockOrientation("landscape")
       // console.log("On est sur "+this.constructor.name+" / "+this.scene.key);
        /**
         * Le ciel en fond
         * @type {Phaser.GameObjects.Image}
         */
        this.sky=this.add.image(0, 0, 'sky').setOrigin(0,0);
        this.sky.displayWidth=14*64;
        this.sky.setScrollFactor(0,0);
        /**
         * Le joueur
         * @type {Player}
         */
        this.player=new Player(this,75,2000);
        //this.song = this.sound.add('track', {volume: 0.1})
        //this.song.play();
        this.blood=this.add.sprite(this.sys.canvas.width/2,this.sys.canvas.height/2,"blood")
        this.blood.displayWidth=64;
        this.blood.displayHeight=64;
        this.blood.visible=false;

        //DASH DU PLAYER
        this.boutonDash = this.input.keyboard.addKey('A');
        //TP DU PLAYER
        this.boutonTelep = this.input.keyboard.addKey('Z');

        this.cinqVies=this.add.sprite(800, 40, "5vies");
        //this.cinqVies.setOrigin(0,0);
        this.cinqVies.setDepth(1000);
        this.cinqVies.setScrollFactor(0);


        this.cinqviesGrands=this.add.sprite(1215, -160, "5viesGrands");
        this.cinqviesGrands.setDepth(1000);
        this.cinqviesGrands.setScrollFactor(0);
        this.cinqviesGrands.setScale(0.7);
        //this.cinqVies.fixedToCamera = true;
        //this.quatreVies.fixedToCamera = true;
        //this.troisVies.fixedToCamera = true;
        //this.deuxVies.fixedToCamera = true;
        //this.uneVies.fixedToCamera = true;
        //this.zeroVies.fixedToCamera = true;




    }
    imgVies(){
        /*let me=this;
        if(this.ptsVie===5) {


            } else if (this.player.x > 4000 && this.player.y <= 3000 || this.player.x < 3150) {


            }
        }*/
        if(this.ptsVie===4){
            //ANIM this.anim.play('exemple'); puis on charge l'image avec la vie en moins ? (il faut aussi loader la spritesheet dans le preload au dessus)
            this.quatreVies=this.add.sprite(800, 40, "4vies");
            this.quatreVies.setDepth(1000);
            this.quatreVies.setScrollFactor(0);
            this.cinqVies.destroy();

            if(this.player.x>=3150  && this.player.x<=4000){
                this.quatreVies.alpha=0;
            }else{
                this.quatreVies.alpha=1;
            }

            this.quatreViesGrands=this.add.sprite(1215, -160, "4viesGrands");
            this.quatreViesGrands.setDepth(1000);
            this.quatreViesGrands.setScrollFactor(0);
            this.quatreViesGrands.setScale(0.7);
            this.cinqviesGrands.destroy();

        }
        if(this.ptsVie===3){
            //ANIM this.anim.play('exemple'); puis on charge l'image avec la vie en moins ? (il faut aussi loader la spritesheet dans le preload au dessus)
            this.troisVies=this.add.sprite(800, 40, "3vies");
            this.troisVies.setDepth(1000);
            this.troisVies.setScrollFactor(0);
            this.quatreVies.destroy();

            if(this.player.x>=3150  && this.player.x<=4000){
                this.troisVies.alpha=0;
            }else{
                this.troisVies.alpha=1;
            }

            this.troisViesGrands=this.add.sprite(1215, -160, "3viesGrands");
            this.troisViesGrands.setDepth(1000);
            this.troisViesGrands.setScrollFactor(0);
            this.troisViesGrands.setScale(0.7);
            this.quatreViesGrands.destroy();
        }
        if(this.ptsVie===2){
            //ANIM this.anim.play('exemple'); puis on charge l'image avec la vie en moins ? (il faut aussi loader la spritesheet dans le preload au dessus)
            this.deuxVies=this.add.sprite(800, 40, "2vies");
            this.deuxVies.setDepth(1000);
            this.deuxVies.setScrollFactor(0);
            this.troisVies.destroy();

            if(this.player.x>=3150  && this.player.x<=4000){
                this.deuxVies.alpha=0;
            }else{
                this.deuxVies.alpha=1;
            }

            this.deuxViesGrands=this.add.sprite(1215, -160, "2viesGrands");
            this.deuxViesGrands.setDepth(1000);
            this.deuxViesGrands.setScrollFactor(0);
            this.deuxViesGrands.setScale(0.7);
            this.troisViesGrands.destroy();
        }
        if(this.ptsVie===1){
            //ANIM this.anim.play('exemple'); puis on charge l'image avec la vie en moins ? (il faut aussi loader la spritesheet dans le preload au dessus)
            this.uneVies=this.add.sprite(800, 40, "1vies");
            this.uneVies.setDepth(1000);
            this.uneVies.setScrollFactor(0);
            this.deuxVies.destroy();

            if(this.player.x>=3150  && this.player.x<=4000){
                this.uneVies.alpha=0;
            }else{
                this.uneVies.alpha=1;
            }

            this.uneViesGrands=this.add.sprite(1215, -160, "1viesGrands");
            this.uneViesGrands.setDepth(1000);
            this.uneViesGrands.setScrollFactor(0);
            this.uneViesGrands.setScale(0.7);
            this.deuxViesGrands.destroy();
        }
        if(this.ptsVie===0){
            //ANIM this.anim.play('exemple'); puis on charge l'image avec la vie en moins ? (il faut aussi loader la spritesheet dans le preload au dessus)
            this.zeroVies=this.add.sprite(800, 40, "0vies");
            this.zeroVies.setDepth(1000);
            this.zeroVies.setScrollFactor(0);
            this.uneVies.destroy();

            if(this.player.x>=3150  && this.player.x<=4000){
                this.zeroVies.alpha=0;
            }else{
                this.zeroVies.alpha=1;
            }

            this.zeroViesGrands=this.add.sprite(1215, -160, "0viesGrands");
            this.zeroViesGrands.setDepth(1000);
            this.zeroViesGrands.setScrollFactor(0);
            this.zeroViesGrands.setScale(0.7);
            this.uneViesGrands.destroy();

        }
    }



    update(){
        super.update();
        this.player.move();
        //this.hitFall();
        //this.imgVies();
        this.tp();
        this.dsh();
        this.saut();
        //console.log(this.player.body.velocity.y);






        //this.Projectile.recurrence();
        //DASH DU PLAYER, on vérifie à chaque frame si le bouton de dash est pressé et on execute la boucle si c'est le cas



        //comme pour le dash
        //On appelle la fonction teleportation() contenue dans player.js et on l'enclenche ici en vérifiant à chaque frame si la touche z est enfoncée





    }



    dsh(){
        if (Phaser.Input.Keyboard.JustDown(this.boutonDash) && this.verif===1){
            //this.player.anim();
            //this.player.setVelocityX(500);


            this.player.dash();
            this.dashson = this.sound.add('dashson', {volume: 0.8})
            this.dashson.play();
            this.pourPlayerPlaySandOff();

            //CAMERASHAKING au moment de faire le dash
            this.time.addEvent({
                delay: 100,
                callback: ()=>{
                    this.cameras.main.shake(100, 0.0027);
                },
                loop: false
            })



            //gravityDash() permet de supprimer la gravité le temps du dash pour ne pas retomber trop vite
            //this.gravityDash();
           // console.log('appuyer sur a');
            //cooldown de 700ms
            this.verif=0;
            this.time.addEvent({
                delay: 700,
                callback: ()=>{
                    this.verif=1;//mettre ici le code qui rend invulnérable de nouveau
                    //this.player.anims.play('right', false);//essayer stopper l'anim après avoir pris un coup
                },
                loop: false
            })

        }
    }

    tp(){
        if (Phaser.Input.Keyboard.JustDown(this.boutonTelep) && this.verif===1 && this.verifTP===1 && 1400<=this.player.x && this.player.x<=1750){
            //tentative de delai avant la tp de 1 seconde
            //game.time.events.add(Phaser.Timer.SECOND * 1, teleportation, this);
            this.tpson = this.sound.add('tpson', {volume: 1.5})
            this.tpson.play();
            this.player.teleportation();
            this.invincibleTP();
            this.player.alpha=0;
         //   console.log('appuyer sur z');
            //cooldown pour le dash empeche l'utilisation en même temps
            this.verif=0;
            this.time.addEvent({
                delay: 700,
                callback: ()=>{
                    this.verif=1;//mettre ici le code qui rend invulnérable de nouveau
                    //this.player.anims.play('right', false);//essayer stopper l'anim après avoir pris un coup
                },
                loop: false
            })
            //cooldown propre à la TPde 3secs
            this.verifTP=0;
            this.time.addEvent({
                delay: 615,
                callback: ()=>{
                    this.verifTP=1;//mettre ici le code qui rend invulnérable de nouveau
                    //this.player.anims.play('right', false);//essayer stopper l'anim après avoir pris un coup
                    this.player.alpha=1;
                },
                loop: false
            })
            //Flash au moment de faire la TP
            this.time.addEvent({
                delay: 400,
                callback: ()=>{
                    this.cameras.main.flash(500);
                },
                loop: false
            })
        }
    }


    /**
     *
     * @param {Sprite} object Objet qui saigne
     * @param {function} onComplete Fonction à appeler quand l'anim est finie
     */
    saigne(object,onComplete){
        let me=this;
        me.blood.visible=true;
        me.blood.rotation = Phaser.Math.Between(0,6);
        me.blood.x=object.x;
        me.blood.y=object.y;
        me.tweens.add({
            targets:me.blood,
            duration:200,
            displayHeight:{
                from:40,
                to:70,
            },
            displayWidth:{
                from:40,
                to:70,
            },
            onComplete: function () {
                me.blood.visible=false;
                onComplete();
            }
        })
    }

    ramasserEtoile (player, star)
    {
        star.disableBody(true, true);
        ui.gagne();

        //va lister tous les objets de la scène pour trouver les étoies et vérifier si elles sont actives
        let totalActive=0;
        for(let child of this.children.getChildren()){
            if(child.texture && child.texture.key==="star"){
                if(child.active){
                    totalActive++;
                }
            }
        }
        if(totalActive===0){
            this.win();
        }
        /*
        // this.stars est un groupe (plus tard)
        if (this.stars.countActive(true) === 0)
        {
           this.win();
        }
         */
    }

    /**
     * Aïeee ça fait mal
     * @param player
     * @param spike
     */
    hitSpike (player, spike)
    {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        //this.song.stop();
        this.scene.restart();
    }

    hitFall(){
        if(this.player.y>=599){
          //  console.log("tombé");
            this.physics.pause();
            this.player.setTint(0xff0000);
            this.player.anims.play('turn');
            //this.song.stop();
            this.respawnTime();
            //this.ptsVie-=1; //pas nécessaire on recommence à un checkpoint
            //console.log(this.ptsVie);
        }
    }

    respawnTime(){
        this.scene.restart();
        //réinitialise les cooldownsdesdashs et TP à la mort
        this.verif=1;
        this.verifTP=1;
    }



    /**
     * Quand on touche un monstre
     * si on le touche par en haut on le tue, sinon c'est lui qui nous tue
     * @param {Player} player
     * @param {Phaser.Physics.Arcade.Sprite} monster
     */
    /*hitMonster(player, monster){
        let me=this;
        this.blood.setDepth(1000);
        if(monster.isDead !== true){ //si notre monstre n'est pas déjà mort
            if(
                // si le player descend
                player.body.velocity.y >= 0
                // et si le bas du player est plus haut que le monstre
                && player.getBounds().bottom < monster.getBounds().top+30

            ){
                ui.gagne();
                monster.isDead=true; //ok le monstre est mort
                monster.disableBody(true,true);//plus de collisions
                this.saigne(monster,function(){
                    //à la fin de la petite anim...ben il se passe rien :)
                })
                //notre joueur rebondit sur le monstre
                player.directionY=500;
            }else{
                //le joueur est mort
                if(!me.player.isDead){
                    this.blood.setDepth(1000);
                    me.player.isDead=true;
                    me.player.visible=false;
                    //ça saigne...
                    me.saigne(me.player,function(){
                        //à la fin de la petite anim, on relance le jeu
                        me.blood.visible=false;
                        me.player.anims.play('turn');
                        me.player.isDead=false;
                        me.scene.restart();
                    })
                    this.song.stop();
                    me.scene.restart();

                }


            }
        }

    }*/


    hitMonster(player, monster){
        let me=this;

        this.blood.setDepth(1000);
        if(this.invicibleForEver!==true){
            if(monster.isDead !== true){ //si notre monstre n'est pas déjà mort
                if(
                    // si le player descend
                    player.body.velocity.y >= 0
                    // et si le bas du player est plus haut que le monstre
                    && player.getBounds().bottom < monster.getBounds().top+30

                ){
                    ui.gagne();
                    this.tweens.add({
                        targets: monster,
                        alpha: {
                            from: 1,
                            to:0.1, //on monte de 20 px
                            duration: 200,// une demi seconde pour monter (et donc la même chose pour descendre)
                            ease: 'Sine.easeInOut', //courbe d'accélération/décélération
                            yoyo: -1, // de haut en bas, puis de bas en haut
                            repeat:3 //se répète à l'infini
                        }
                    });
                    this.time.addEvent({
                        delay: 100,
                        callback: ()=>{
                            this.cameras.main.shake(125, 0.003);
                        },
                        loop: false
                    })

                    monster.body.enable = false;//mettre ici le codequi rend invulnérable

                    //this.player.anims.play('right', true);//essayer de faire jouer une anim quand on prend un coup
                    this.time.addEvent({
                        delay: 1500,
                        callback: ()=>{
                            monster.body.enable = true;//mettre ici le code qui rend invulnérable de nouveau
                            //this.player.anims.play('right', false);//essayer stopper l'anim après avoir pris un coup
                        },
                        loop: false
                    })
                    /*monster.isDead=true; //ok le monstre est mort
                    monster.disableBody(true,true);//plus de collisions*/

                    /*this.saigne(monster,function(){
                        //à la fin de la petite anim...ben il se passe rien :)
                    })*/
                    //notre joueur rebondit sur le monstre
                    //player.directionY=500;
                    player.setVelocityY(-300);
                } else{
                    if(this.ptsVie>=2){
                        ui.ptv();
                        this.invincible();
                        this.fxHit();
                        this.ptsVie -= 1;

                        this.time.addEvent({
                            delay: 210,
                            callback: ()=>{
                                this.cameras.main.shake(125, 0.003);
                            },
                            loop: false
                        })

                        //  console.log('touché');
                        //  console.log(this.ptsVie);
                        this.imgVies();

                    }
                    //le joueur est mort
                    else if (this.ptsVie<2) {
                        //  console.log('MORT');
                        if (!me.player.isDead) {
                            this.blood.setDepth(0);
                            me.player.isDead = true;
                            me.player.visible = false;
                            //ça saigne...
                            /*me.saigne(me.player, function () {
                                //à la fin de la petite anim, on relance le jeu
                                me.blood.visible = false;
                                me.player.anims.play('turn');
                                me.player.isDead = false;
                                me.scene.restart();
                            })*/
                            //this.song.stop();
                            this.verif=1;
                            this.verifTP=1;
                            me.scene.restart();

                        }
                        this.ptsVie=5;
                        //  console.log('ptsVie = 5');

                    }
                }
            }
        }


    }
    //trouver un moyen de rendre le perso mobile pendant cette invulnérabilité
    //invulnérable pendant un court instant quand on est touché par un ennemi
    invincible(){




        this.invicibleForEver = true;
        this.time.addEvent
        ({
            delay: 1000,
            callback: ()=>
            {
                this.invicibleForEver = false;
            },
            loop: false
        })



        /*this.player.body.enable = false//mettre ici le codequi rend invulnérable
        //this.player.anims.play('right', true);//essayer de faire jouer une anim quand on prend un coup
        this.time.addEvent({
            delay: 500,
            callback: ()=>{
                this.player.body.enable = true;//mettre ici le code qui rend invulnérable de nouveau
                //this.player.anims.play('right', false);//essayer stopper l'anim après avoir pris un coup
            },
            loop: false
        })*/
    }

    fxHit(){
        this.cameras.main.shake(125, 0.003);
        this.animHit=this.tweens.add({
            targets: this.player,
            alpha: {
                from: 1,
                to:0.1, //on monte de 20 px
                duration: 125,// une demi seconde pour monter (et donc la même chose pour descendre)
                ease: 'Sine.easeInOut', //courbe d'accélération/décélération
                yoyo: -1, // de haut en bas, puis de bas en haut
                repeat:2 //se répète à l'infini
            }
        });

        // this.time.addEvent({
        //     delay: 500,
        //     callback: ()=>{
        //         this.animHit=false;
        //     },
        //     loop: false
        // })


    }



    //permettre le tween de tp tout en restant invulnérable pendant l'anim, on peut tout traverser comme ça
    invincibleTP(){
        this.player.body.enable = false//mettre ici le codequi rend invulnérable
        //this.player.alpha=0.01;
        this.time.addEvent({
            delay: 600,
            callback: ()=>{
                this.player.body.enable = true;//mettre ici le code qui rend invulnérable de nouveau
                //this.player.alpha=1;
            },
            loop: false
        })
    }

    //gravityDash() permet de supprimer la gravité le temps du dash pour ne pas retomber trop vite
    /*gravityDash(){
        this.player.body.allowGravity=false;
        this.time.addEvent({
            delay: 600,
            callback: ()=>{
                this.player.body.allowGravity=true;
            },
            loop: false
        })
    }*/






    /**
     * Pour reset cette scène proprement
     * @private
     */
    _destroy(){
        this.player.stop();
        //this.song.stop();
        this.scene.stop();
    }

    /**
     * Quand on a gagné
     */
    win(){
        //this.song.stop();
        Tableau.suivant();

    }

    /**
     * Va au tableau suivant
     */
    static suivant(){
        let ceSeraLaSuivante=false;
        let nextScene=null;
        if(Tableau.current){
            for(let sc of game.scene.scenes){
                if(sc.scene.key !== "ui"){
                    if(!nextScene){
                        if(ceSeraLaSuivante){
                            nextScene=sc;
                        }
                        if(sc.scene.key === Tableau.current.scene.key){
                            ceSeraLaSuivante=true;
                        }
                    }
                }
            }
        }
        if(!nextScene){
            nextScene = game.scene.scenes[0];
        }
        Tableau.goTableau(nextScene);
    }

    static goTableau(tableau){
        if(Tableau.current){

            Tableau.current._destroy();
        }
        game.scene.start(tableau);
    }

    pourPlayerPlaySand(){
        if(this.sand===0){
            //this.shoes_run_sand = this.sound.add('shoes_run_sand', {volume: 1});

            if(this.game.device.os.android || this.game.device.os.iOS){
                //rien
            }else{
                this.shoes_run_sand.play();
            }
            this.sand=1;
        }

    }

    pourPlayerPlaySandOff(){
        if(this.game.device.os.android || this.game.device.os.iOS){
            //rien
        }else{
            this.shoes_run_sand.stop();
        }

        this.sand=0;
    }

    saut(){
        if(this.player._directionY<0){


            //Tableau.current.player.sauter();
            this.time.addEvent
            ({
                delay: 200,
                callback: ()=>
                {
                    this.player._directionY=0;
                },
                loop: false
            })
        }
        if(this.player.body.velocity.y<-2 || this.player.body.velocity.y>2){
            this.pourPlayerPlaySandOff();
        }

    }


}









/**
 * Le tableau en cours
 * @type {null|Tableau}
 */
Tableau.current=null;