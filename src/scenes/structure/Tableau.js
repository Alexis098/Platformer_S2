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




    }

    /**
     * Par défaut on charge un fond et le player
     */
    preload(){
        this.load.image('sky', 'assets/ciel.png');
        this.load.image('spike', 'assets/spike.png');
        this.load.image('blood', 'assets/blood.png');
        this.load.spritesheet('player',
            'assets/player_3_couleurs.png',
            { frameWidth: 32, frameHeight: 48  }
        );
        this.load.spritesheet('player_stance',
            'assets/player_stance.png',
            { frameWidth: 32, frameHeight: 48  }
        );
        this.load.spritesheet('player_jump',
            'assets/player_jump1.png',
            { frameWidth: 32, frameHeight: 48  }
        );
        this.load.spritesheet('enemy',
            'assets/enemy_4.png',
            { frameWidth: 39, frameHeight: 48  }
        );
        this.load.spritesheet('lance',
            'assets/enemy_lance2.png',
            { frameWidth: 63, frameHeight: 48  }
        );
        this.load.spritesheet('enemy_ninja',
            'assets/enemy_ninja.png',
            { frameWidth: 60, frameHeight: 80  }
        );
        this.load.audio('track', 'assets/son/kamakura.mp3');

        this.load.image('5vies', 'assets/5vies.png');
        this.load.image('4vies', 'assets/4vies.png');
        this.load.image('3vies', 'assets/3vies.png');
        this.load.image('2vies', 'assets/2vies.png');
        this.load.image('1vies', 'assets/1vies.png');
        this.load.image('0vies', 'assets/0vies.png');

    }

    create(){
        Tableau.current=this;
        this.isMobile=this.game.device.os.android || this.game.device.os.iOS;

        this.sys.scene.scale.lockOrientation("landscape")
        console.log("On est sur "+this.constructor.name+" / "+this.scene.key);
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
        this.player=new Player(this,0,0);
        this.song = this.sound.add('track', {volume: 0.1})
        this.song.play();
        this.blood=this.add.sprite(this.sys.canvas.width/2,this.sys.canvas.height/2,"blood")
        this.blood.displayWidth=64;
        this.blood.displayHeight=64;
        this.blood.visible=false;

        //DASH DU PLAYER
        this.boutonDash = this.input.keyboard.addKey('A');
        //TP DU PLAYER
        this.boutonTelep = this.input.keyboard.addKey('Z');

        this.cinqVies=this.add.sprite(600, 40, "5vies");
        this.cinqVies.setDepth(1000);
        this.cinqVies.setScrollFactor(0);




    }
    imgVies(){
        if(this.ptsVie==4){
            //OU this.anim.play('exemple'); puis on charge l'image avec la vie en moins ? (il faut aussi loader la spritesheet dans le preload au dessus)
            this.quatreVies=this.add.sprite(600, 40, "4vies");
            this.quatreVies.setDepth(1000);
            this.quatreVies.setScrollFactor(0);
        }
        if(this.ptsVie==3){
            this.troisVies=this.add.sprite(600, 40, "3vies");
            this.troisVies.setDepth(1000);
            this.troisVies.setScrollFactor(0);
        }
        if(this.ptsVie==2){
            this.deuxVies=this.add.sprite(600, 40, "2vies");
            this.deuxVies.setDepth(1000);
            this.deuxVies.setScrollFactor(0);
        }
        if(this.ptsVie==1){
            this.uneVies=this.add.sprite(600, 40, "1vies");
            this.uneVies.setDepth(1000);
            this.uneVies.setScrollFactor(0);
        }
        if(this.ptsVie==0){
            this.zeroVies=this.add.sprite(600, 40, "0vies");
            this.zeroVies.setDepth(1000);
            this.zeroVies.setScrollFactor(0);
        }
    }
    update(){
        super.update();
        this.player.move();
        this.hitFall();
        this.imgVies();

        //this.Projectile.recurrence();
        //DASH DU PLAYER, on vérifie à chaque frame si le bouton de dash est pressé et on execute la boucle si c'est le cas
        if (Phaser.Input.Keyboard.JustDown(this.boutonDash) && this.verif==1){
            //this.player.anim();
            this.player.dash();

            //gravityDash() permet de supprimer la gravité le temps du dash pour ne pas retomber trop vite
            //this.gravityDash();
            console.log('appuyer sur a');
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


        //comme pour le dash
        //On appelle la fonction teleportation() contenue dans player.js et on l'enclenche ici en vérifiant à chaque frame si la touche z est enfoncée
        if (Phaser.Input.Keyboard.JustDown(this.boutonTelep) && this.verif==1 && this.verifTP==1){
            //tentative de delai avant la tp de 1 seconde
            //game.time.events.add(Phaser.Timer.SECOND * 1, teleportation, this);
            this.player.teleportation();
            this.invincibleTP();
            this.player.alpha=0.5;
            console.log('appuyer sur z');
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
                delay: 3000,
                callback: ()=>{
                    this.verifTP=1;//mettre ici le code qui rend invulnérable de nouveau
                    //this.player.anims.play('right', false);//essayer stopper l'anim après avoir pris un coup
                    this.player.alpha=1;
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
        this.song.stop();
        this.scene.restart();
    }

    hitFall(){
        if(this.player.y>=599){
            console.log("tombé");
            this.physics.pause();
            this.player.setTint(0xff0000);
            this.player.anims.play('turn');
            this.song.stop();
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
        if(monster.isDead !== true){ //si notre monstre n'est pas déjà mort
            if(
                // si le player descend
                player.body.velocity.y >= 0
                // et si le bas du player est plus haut que le monstre
                && player.getBounds().bottom < monster.getBounds().top+30

            ){
                ui.gagne();
                monster.body.enable = false//mettre ici le codequi rend invulnérable
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
                player.directionY=500;
                player.setVelocity(-300);
            } else{
                if(this.ptsVie>=2){
                    ui.ptv();
                    this.invincible();
                    this.ptsVie -= 1;
                    console.log('touché');
                    console.log(this.ptsVie);


                }
                //le joueur est mort
                else if (this.ptsVie<2) {
                    console.log('MORT');
                    if (!me.player.isDead) {
                        this.blood.setDepth(1000);
                        me.player.isDead = true;
                        me.player.visible = false;
                        //ça saigne...
                        me.saigne(me.player, function () {
                            //à la fin de la petite anim, on relance le jeu
                            me.blood.visible = false;
                            me.player.anims.play('turn');
                            me.player.isDead = false;
                            me.scene.restart();
                        })
                        this.song.stop();
                        this.verif=1;
                        this.verifTP=1;
                        me.scene.restart();

                    }
                    this.ptsVie=5;
                    console.log('ptsVie = 5');

                }
            }
        }

    }
    //trouver un moyen de rendre le perso mobile pendant cette invulnérabilité
    //invulnérable pendant un court instant quand on est touché par un ennemi
    invincible(){
        this.player.body.enable = false//mettre ici le codequi rend invulnérable
        //this.player.anims.play('right', true);//essayer de faire jouer une anim quand on prend un coup
        this.time.addEvent({
            delay: 500,
            callback: ()=>{
                this.player.body.enable = true;//mettre ici le code qui rend invulnérable de nouveau
                //this.player.anims.play('right', false);//essayer stopper l'anim après avoir pris un coup
            },
            loop: false
        })
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
        this.song.stop();
        this.scene.stop();
    }

    /**
     * Quand on a gagné
     */
    win(){
        this.song.stop();
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




}

/**
 * Le tableau en cours
 * @type {null|Tableau}
 */
Tableau.current=null;