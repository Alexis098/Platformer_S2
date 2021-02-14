class MonsterBoss extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "monster-boss"); //on fait un srpite étendu, une déclinaisaon d'un sprite donc obligé de suivre cette syntaxe de phaser
        this.setOrigin(0,0);
        this.setDisplaySize(64,64); //permet de réduire l'image à la taille de 64 pixels par 64 pixels mais ne doit pas être utilisé dans le code. On doit faire les bonnes tailles d'iamges directement dans photoshop
        this.setCollideWorldBounds(true);
        this.setBounce(1);
        this.setVelocityX(70);
        //this.physics.add.overlap(this.player, this.monstre, this.hitMonster, null, this)


    }
}