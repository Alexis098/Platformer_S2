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
            'assets/player_jump.png',
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
        this.player=new Player(this,0,536);
        this.song = this.sound.add('track', {volume: 0.1})
        this.song.play();
        this.blood=this.add.sprite(this.sys.canvas.width/2,this.sys.canvas.height/2,"blood")
        this.blood.displayWidth=64;
        this.blood.displayHeight=64;
        this.blood.visible=false;


        this.boutonDash = this.input.keyboard.addKey('A');
    }
    update(){
        super.update();
        this.player.move();
        if (Phaser.Input.Keyboard.JustDown(this.boutonDash)){
            this.player.dash();
            console.log('appuyer sur a');
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

    /**
     * Quand on touche un monstre
     * si on le touche par en haut on le tue, sinon c'est lui qui nous tue
     * @param {Player} player
     * @param {Phaser.Physics.Arcade.Sprite} monster
     */
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

    }


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