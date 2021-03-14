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
        this.load.image('star', 'assets/rubis.png');
        this.load.image('ground', 'assets/platform.png');
       

        
    }
    create() { // fonction que l'on appelle qu'une fois et fait apparaitre les événements 
        super.create();

        this.star1=this.physics.add.sprite(200,100,"star");
        this.star1.setCollideWorldBounds(true);
        this.star1.setBounce(0);

        //génère une plateforme
        let platforms = this.physics.add.sprite(10,200,'ground');
        platforms.setDisplaySize(150,50)//taille de l'objet
        this.physics.add.collider(this.player, platforms);//le joueur rebondit dessus
        platforms.setOrigin(0,0);//pour positionner plus facilement
        platforms.body.allowGravity=0   ; //la gravité n'a pas d'effet ici
        platforms.setImmovable(true); //ne bouge pas quand on rentre dedans

        //on crée un objet en appelant la classe correspondante ici
        new MonsterFly(this,600,100);//penser à importer l'image au début de cette page
        new MonstreVolant(this,500,68);//penser à rajouter un script dans l'index pour importer la classe
        new MonsterSkull(this,450,150);
        new MonsterZelda(this,300,100);
        new MonsterOrange(this, 500, height-140);
        new MonsterBoss(this, 500, height-140);

        this.physics.add.overlap(this.player, this.star1, this.ramasserEtoile, null, this);
        this.physics.add.collider(this.player,this.platforms);
        this.physics.add.collider(this.star1,this.platforms);
    }

}

