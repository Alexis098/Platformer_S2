class MonstreVolant extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "monstre-volant");
        //pas de gravité
        this.body.allowGravity=false;

        //gestion de la taille
        this.setDisplaySize(64,64);

        //on réduit un peu la zone de hit
        /*this.setBodySize(this.body.width,this.body.height);
        this.setOffset(150, 250);*/
        this.body.setSize(1400,1500);

        //définir les propriétés que l'on va utiliser dans notre animation

        // X
        this.originalX=x;
        this.minX=x+200;
        this.maxX=x-200;

        // Y
        this.originalY=y;
        this.minY=y-5;
        this.maxY=y+300;

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

    }

    start(){
        this.scene.tweens.add({
            targets: this,
            x: {
                from: this.minX,
                to:this.maxX,
                duration: 10*1000,
                ease: 'Circ.easeInOut',
                yoyo: -1,
                repeat:-1,
                flipX:true,
            },
            y: {
                from: this.minY,
                to:this.maxY,
                duration: 800,
                ease: 'Circ.easeInOut',
                yoyo: -1,
                repeat:-1
            }
        });
    }

}