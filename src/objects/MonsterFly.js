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
        this.body.setSize(40,80);
        this.setOffset(30, 60);
        this.setDepth(102);
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
            key: 'planeur',
            frames: this.anims.generateFrameNumbers('planeur', { start: 0, end:7 }),
            frameRate: 9,
            repeat: -1
        });

        this.anims.play('planeur', true);

       

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