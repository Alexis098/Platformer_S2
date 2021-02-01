class TableauZoo extends Tableau{

    preload() {
        super.preload();
        this.load.image('monster-skull', 'assets/monster-skull.png');
        this.load.image('monster-zelda', 'assets/monster-zelda.png');
        //this.load.image('monster-dragon', 'assets/monster-dragon.png');
        this.load.image('monster-fly', 'assets/monster-dragon.png');
        //this.load.image('monstre-volant', 'assets/monstre-volant.png');
        this.load.image('monster-orange', 'assets/monster-orange.png');
        this.load.image('monster-boss', 'assets/monster-boss.png');
        this.load.image('monstre-volant', 'assets/monster-orange.png');
        this.load.image('rubis', 'assets/rubis.png');

        
    }
    create() {
        super.create();

        this.star1=this.physics.add.sprite(200,100,"rubis");
        this.star1.setCollideWorldBounds(true);
        this.star1.setBounce(0);

        //on crée un objet en appelant la classe correspondante ici
        new MonsterFly(this,600,100);//penser à importer l'image au début de cette page
        new MonstreVolant(this,500,68);//penser à rajouter un script dans l'index pour importer la classe
        new MonsterSkull(this,450,150);
        new MonsterZelda(this,300,100);
        new MonsterOrange(this, 500, height-140);
        new MonsterBoss(this, 500, height-140);

        this.physics.add.overlap(this.player, this.star1, this.ramasserEtoile, null, this);
    }

}

