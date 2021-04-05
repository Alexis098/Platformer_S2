class Petales extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "flowers");
        //pas de gravité
        this.body.allowGravity=false;

       
    
        this.setDepth(15);
        //définir les propriétés que l'on va utiliser dans notre animation

        // X
        this.originalX=x;
        this.minX=0;
        this.maxX=0;

        // Y
        this.originalY=y;
        this.minY=0;
        this.maxY=600;

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
                ease: 'Sine.easeInOut',
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