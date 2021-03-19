class MonsterFly extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "monster-fly"); //on fait un srpite étendu, une déclinaisaon d'un sprite donc obligé de suivre cette syntaxe de phaser
        //pas de gravité
        this.body.allowGravity=false;
        this.setOrigin(0,0);
        //gestion de la taille
        //this.setDisplaySize(64,64);

        //on réduit un peu la zone de hit
        //this.setBodySize(this.body.width,this.body.height);
        this.body.setSize(40,65);
        this.setOffset(10, 8);
        this.setDepth(10);
        //définir les propriétés que l'on va utiliser dans notre animation


        // X
        this.originalX=x;
        this.minX=x+30;
        this.maxX=x-200;

        // Y
        this.originalY=y;
        this.minY=y-5;
        this.maxY=y+5;

        // on applique les propriétés du début de l'animation
        this.x=this.minX;
        this.y=this.minY;
        this.alpha=0;
        let me=this;

        //on fait apparaitre notre objet avec un petit delay, puis on lance l'animation
        //ceci a pour effet de décaler les animations pour ce même objet
        scene.tweens.add({
                targets:this,
                duration:200,
                delay:Math.random()*1000,
                alpha:{
                    startDelay:Math.random()*5000,
                    from:0,
                    to:1,
                },
                onComplete: function () {
                    me.start();
                }
            })
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('enemy_ninja', { start: 0, end: 2 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.play('left', true);

    }

    start(){
        this.scene.tweens.add({
            targets: this,
            x: {
                from: this.minX,
                to:this.maxX,
                duration: 10*200,
                ease: 'Sine.easeInOut',
                yoyo: -1,
                repeat: -1,
                flipX:true,
            },
            y: {
                from: this.minY,
                to:this.maxY,
                duration: 1000,
                ease: 'Sine.easeInOut',
                yoyo: -1,
                repeat:-1
            }
        });
    }

}