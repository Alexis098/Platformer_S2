class TableauZoo extends Tableau{

    preload() {
        super.preload();
        this.load.image('monster-violet', 'assets/monster-violet.png');
        this.load.image('monster-zelda', 'assets/monster-zelda.png');
        //this.load.image('monster-dragon', 'assets/monster-dragon.png');
        this.load.image('monster-fly', 'assets/monster-dragon.png');
        this.load.image('monstre-volant', 'assets/monstre-volant.png');
        
    }
    create() {
        super.create();

       
        //notre monstre
        this.monstre=this.physics.add.sprite(300,this.sys.canvas.height-140,"monster-violet");
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(64,64);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(1);
        this.monstre.setVelocityX(50);
        this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);

        //notre deuxième monstre
        this.monstre=this.physics.add.sprite(300,this.sys.canvas.height-70,"monster-zelda");
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(64,64);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(1);
        this.monstre.setVelocityX(40);
        this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);

        //notre troisième monstre
        /*this.monstre=this.physics.add.sprite(300,this.sys.canvas.height-70,"monster-dragon");
        //this.body.allowGravity=false;
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(64,64);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(1);
        this.monstre.setVelocityX(100);
        this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);*/

        //notre quatrième monstre
        this.monstre=this.physics.add.sprite(300,this.sys.canvas.height,"monster-zelda");
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(64,64);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(1);
        this.monstre.setVelocityX(70);
        this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);


        //notre cinquième monstre
        this.monstre=this.physics.add.sprite(300,this.sys.canvas.height-100,"monster-zelda");
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(64,64);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(1);
        this.monstre.setVelocityX(80);
        this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);

        new MonsterFly(this,600,100);
       
    }

}

