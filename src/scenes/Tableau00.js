class Tableau00 extends Phaser.Scene{

    preload() {
        //super.preload();
        //this.load.image('star', 'assets/rubis.png');
        this.load.image('artwork', 'assets/background1.jpg');
        //Il faudra charger un fond animé à la place une vidéo after effects avec des effets de vent qui passe âr dessus les dunes
    }
    create() {
        //super.create();
        this.image=this.add.image(game.config.width/2, game.config.height/2, 'artwork');

        this.input.keyboard.on('keydown-ENTER', function () //'keydown-SPACE', function ()
        {
            this.cameras.main.fadeOut(500, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>
            {
                /*if(Tableau.current){
                    Tableau.current._destroy();
                }
                this.game.scene.start(tableau);
                this.scene.start("aventureBegining");*/
                this.game.scene.start("TableauTiledRenew");
            })
        }, this);
        //this.image.setBodySize(0.5);
        //des étoiles
        /*this.star1=this.physics.add.sprite(200,100,"star");
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
        this.physics.add.overlap(this.player, this.star3, this.ramasserEtoile, null, this);*/

    }

}

