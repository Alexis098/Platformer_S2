class Tableau01 extends Phaser.Scene /*Tableau00*/{
    constructor()
    {
        super("Skip");
    }
    preload() {
        //super.preload();
        /*this.load.image('star', 'assets/rubis.png');
        this.load.image('ground', 'assets/test.png');*/
        this.load.video('cinematique', 'assets/videos/Cinematique_V006_compress.mp4')
    }
    create() {
        this.isMobile=this.game.device.os.android || this.game.device.os.iOS;

        this.sys.scene.scale.lockOrientation("landscape")
        //super.create();
        //this.cine.setDepth(1000);
        this.cine=this.add.video(448, 224, 'cinematique');
        this.cine.play();

        this.time.addEvent({
            delay: 53000,
            callback: ()=>{
                this.scene.start("TableauTiledRenew");
            },
            loop: false
        })
        this.input.on('pointerdown', function(){
            this.cameras.main.fadeOut(500, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () =>
            {
                /*if(Tableau.current){
                    Tableau.current._destroy();
                }
                this.game.scene.start(tableau);
                this.scene.start("aventureBegining");*/
                this.scene.start("TableauTiledRenew");
            })

        },this);


        //this.add.text(800, 10, 'Cliquez pour passer', { font: '"Press Start 2P"' });
         this.skip = this.add.text(790, 10, 'Cliquez pour passer', {
              font:'12px "Press Start 2P"',
             fill: '#000'
         });




/*
        //la plateforme rouge
        let rouge=this.physics.add.sprite(10,200,"ground");
        rouge.setDisplaySize(250,50)//taille de l'objet
        //rouge.setTintFill(0xFF0000);//applique une couleur rouge
        rouge.setOrigin(0,0);//pour positionner plus facilement
        rouge.body.allowGravity=0   ; //la gravité n'a pas d'effet ici
        rouge.setImmovable(true); //ne bouge pas quand on rentre dedans
        this.physics.add.collider(this.player, rouge);//le joueur rebondit dessus
        this.physics.add.collider(this.star1, rouge);//l'étoile1 rebondit dessus
        this.physics.add.collider(this.star2, rouge);//l'étoile2 rebondit dessus
        this.physics.add.collider(this.star3, rouge);//l'étoile3 rebondit dessus

        //autre méthodes

        //un groupe de plateformes statiques
        let groupeVert = this.physics.add.staticGroup();
        groupeVert.create(300, 250, 'ground');
        groupeVert.create(350, 260, 'ground');
        groupeVert.create(400, 270, 'ground');
        groupeVert.create(450, 280, 'ground');
        groupeVert.create(500, 290, 'ground');
        groupeVert.create(700, 300, 'ground');

        //pour chacun des enfants du groupe
        groupeVert.children.iterate(function (child) {
            //child.setTintFill(0x00FF00); //applique une couleur verte
            child.setDisplaySize(40,50);//taille de l'objet
            child.setOrigin(0,0);//pour positionner plus facilement
            child.refreshBody();//dit au groupe d'appliquer les changements
        });

        this.physics.add.collider(this.player, groupeVert);//le joueur rebondit sur les plateformes du goupe vert
        this.physics.add.collider(this.star1, groupeVert);//l'étoile1 rebondit sur les plateformes du goupe vert
        this.physics.add.collider(this.star2, groupeVert);//l'étoile1 rebondit sur les plateformes du goupe vert
        this.physics.add.collider(this.star3, groupeVert);//l'étoile1 rebondit sur les plateformes du goupe vert
*/
    }

}

