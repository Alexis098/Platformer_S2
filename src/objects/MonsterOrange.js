class MonsterOrange extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) { //constructor est l'équivalent de Create dans une classe
        super(scene, x, y, "monster-orange");
    
        
        //this.setBodySize(this.body.width,this.body.height);
        this.body.setSize(64,64);
        this.setOrigin(0,0);
        this.setDisplaySize(64,64);
        this.setCollideWorldBounds(true);
        this.setBounce(1);
        this.setVelocityX(160);
        this.setDepth(10);
        //this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);


        // X
        this.originalX=x;
        this.minX=x+200;
        this.maxX=x-200;

        // Y
        this.originalY=y;
        this.minY=600;
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
        /*y: {
            from: this.minY,
            to:this.maxY,
            duration: 500,
            ease: 'Sine.easeInOut',
            yoyo: -1,
            repeat:-1
        }*/
    });
}
    
}

