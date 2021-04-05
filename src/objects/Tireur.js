class Tireur extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) { //constructor est l'équivalent de Create dans une classe
        super(scene, x, y, "tireur");


        this.body.allowGravity=true;
        //this.setBodySize(this.body.width,this.body.height);
        this.body.setSize(35,64);
        this.setOrigin(0,0);
        //this.setDisplaySize(64,64);
        this.setCollideWorldBounds(true);
        this.setBounce(0);

        this.setDepth(10);
        //this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);


        // X
        /*this.originalX=x;
        this.minX=x;
        this.maxX=x-200;

        // Y
        this.originalY=y;
        this.minY=600;
        this.maxY=600;
        // on applique les propriétés du début de l'animation
        this.x=this.minX;
        this.y=this.minY;
        this.alpha=0;
        let me=this;*/


    }
    /*set directionX(value){
        this._directionX=value;
    }*/


}

