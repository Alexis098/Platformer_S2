class Tableau05 extends Tableau04{//créer le même tableau que le tableau 4, on rajoute ensuite quelques éléments pour le compléter, très utile quand on veut faire beaucoup de tableau qui reposent tous sur la même base.
    preload() {
        super.preload();
        this.load.image('sky-2', 'assets/sky-2.jpg');

    }
    create() {
        super.create();

        //on change de ciel, on fait une tileSprite ce qui permet d'avoir une image qui se répète
        this.sky=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'sky-2'
        );
        this.sky.setOrigin(0,0);
        //fait passer les éléments devant le ciel
        this.platforms.setDepth(10)
        this.stars.setDepth(10)
        this.player.setDepth(10)



        //modifie les plateformes
        this.platforms.children.iterate(function (child) {
            child.setDisplaySize(64,32);
            child.setX(child.x+28);
            child.setBounce(1);
        });

        //modifie les étoiles
        let me=this;
        this.stars.children.iterate(function(child){
            me.tweens.add(//tween signifie globalement faire bouger des choses
                {
                    targets:child,
                    rotation:Phaser.Math.DegToRad(360),
                    duration:1000,
                    repeat:-1
                }// tween ici fait que les étoiles tournent sur elles-mêmes dans ce tableau
            )
        })

    }
    update(){//permet de faire boucler à l'infini le ciel en fond pour qu'il se déplace,         c'est une fonction qui set à faire boucler à l'infini ce qui se trouve dedans, exécuter à chaque frame
        super.update();
        this.sky.tilePositionX++;//on ajoute +1 à la position du ciel à chaque frame 
    }

}

