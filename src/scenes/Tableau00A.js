class Tableau00A extends Phaser.Scene{



    preload() {
        //super.preload();
        this.load.image('ecranFin', 'assets/ecran_de_fin_V001.jpg');
    }
    create() {
        this.isMobile=this.game.device.os.android || this.game.device.os.iOS;

        this.sys.scene.scale.lockOrientation("landscape")
        //super.create();

        this.image=this.add.image(game.config.width/2, game.config.height/2, 'ecranFin');

        this.input.keyboard.on('keydown-ENTER', function () //'keydown-SPACE', function ()
        {
            this.cameras.main.fadeOut(500, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>
            {
                this.scene.restart("Accueil");
            })
        }, this);
        this.input.on('pointerdown', function(pointer){
            this.cameras.main.fadeOut(500, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>
            {
                this.scene.restart("Accueil");
            })

        },this);


        /*
                //des étoiles
                this.star1=this.physics.add.sprite(200,100,"star");
                this.star1.setCollideWorldBounds(true);
                this.star1.setBounce(0);

                this.star2=this.physics.add.sprite(400,100,"star");
                this.star2.setCollideWorldBounds(true);
                this.star2.setBounce(0.5);

                this.star3=this.physics.add.sprite(600,100,"star");
                this.star3.setCollideWorldBounds(true);
                this.star3.setBounce(1);

                //quand le joueur touche une étoile on appelle la fonction ramasserEtoile
                this.physics.add.overlap(this.player, this.star1, this.ramasserEtoile, null, this);
                this.physics.add.overlap(this.player, this.star2, this.ramasserEtoile, null, this);
                this.physics.add.overlap(this.player, this.star3, this.ramasserEtoile, null, this);
        */
    }

}

