class TableauLong extends Tableau{

    preload() {
        super.preload();
        this.load.image('star', 'assets/soleil.png');
        this.load.image('ground', 'assets/plateform_1.png');
        this.load.image('sky-2', 'assets/sky5.png');
        this.load.image('mid_ground', 'assets/mid_ground.png');
        this.load.image('avant_plan', 'assets/avantplan.png');
        this.load.image('flowers', 'assets/flowers.png');
        
        
        this.load.image('beach', 'assets/beach.png');
        this.load.image('flares', 'assets/flares_2.png');
        this.load.image('nuages', 'assets/nuages3.png');

        this.load.image('monster-skull', 'assets/monster-skull.png');
        this.load.image('monster-zelda', 'assets/monster-zelda.png');
        
        this.load.image('monster-fly', 'assets/monster-dragon.png');
        this.load.image('tireur', 'assets/tireur.png');
        
        this.load.image('monster-orange', 'assets/monster_katana.png');
        this.load.image('monster-boss', 'assets/monster-boss.png');
        this.load.image('monstre-volant', 'assets/monster-orange.png');
        
    }
    create() {
        super.create();
        
        
        
        this.star1=this.physics.add.sprite(1430,100,"star");
        this.star1.setCollideWorldBounds(true);
        this.star1.setBounce(0);
        this.physics.add.overlap(this.player, this.star1, this.ramasserEtoile, null, this);

        

        //on définit la taille du tableau
        let largeurDuTableau=2000;
        let hauteurDuTableau=600; //la hauteur est identique au cadre du jeu
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.physics.world.setBounds(0, -64, largeurDuTableau,  hauteurDuTableau);

        this.cameras.main.startFollow(this.player, false, 0.05, 0.05);

        //la caméra ne suit plus le personnage sur l'axe des Y, mettre 150 comme valeur de Y pour lemain camera setbounds
        //this.cameras.main.startFollow(this.player, false, 0.05, 0);


       /* //quelques étoiles et plateformes qui vont avec
        this.stars=this.physics.add.group();
        this.platforms=this.physics.add.staticGroup();
        for(let posX=20;posX<largeurDuTableau;posX+=100){
            let etoileY=350+Math.sin(posX)*100;
            let star=this.stars.create(posX ,etoileY,"rubis");
            star.body.allowGravity=false;
            let plate=this.platforms.create(posX ,etoileY+50,"ground");
            //plate.setDisplaySize(64,64);
            //change la taille de la hitbox
            //plate.body.setSize(64, 64);
            plate.refreshBody();
        }
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);
        this.physics.add.collider(this.player,this.platforms);*/

       /* this.platforms=this.physics.add.sprite(500,450,"ground");        
        this.platforms.setOrigin(0,0);//pour positionner plus facilement
        this.platforms.body.allowGravity=0   ; //la gravité n'a pas d'effet ici
        this.platforms.setImmovable(true); //ne bouge pas quand on rentre dedans
        this.physics.add.collider(this.player, this.platforms);//le joueur rebondit dessus*/

      //un groupe de plateformes statiques
      this.platforms = this.physics.add.staticGroup();
      this.platformzs.create(400, 450, 'ground');
      //this.platforms.create(500, 350, 'ground');
      this.platforms.create(600, 450, 'ground');
      //this.platforms.create(600, 250, 'ground');
      //this.platforms.create(500, 150, 'ground');
     
      this.platforms.create(1300, 450, 'ground');
      this.platforms.create(1400, 350, 'ground');
      this.platforms.create(1500, 450, 'ground');
      
     

      //pour chacun des enfants du groupe
      this.platforms.children.iterate(function (child) {
          //child.setTintFill(0x00FF00); //applique une couleur verte
          child.setOrigin(0,0);//pour positionner plus facilement
          child.refreshBody();//dit au groupe d'appliquer les changements
          //child.setScrollFactor(0);
      });

      this.physics.add.collider(this.player,this.platforms);//le joueur rebondit sur les plateformes du goupe vert
      //effet tween sur les pétales pour faire comme si elles tombaient sur le sol 
      // les séparées en plusieurs sprites pour faire plusieurs couches 
      //nuages changer la nuance de couleur pour les nuages en arrière plan *
      //trop de monstres
      //les plateformes ne doivent pas permettre de monter pour rien
      //regler la plage pour qu'elle aparaissent derrière les monstres (tester un setdepth dans la classe des monstres)
      this.star2=this.physics.add.sprite(432,440,"star");
        this.star2.setCollideWorldBounds(true);
        this.star2.setBounce(0);
        this.physics.add.overlap(this.player, this.star2, this.ramasserEtoile, null, this);
        this.physics.add.collider(this.star2, this.platforms);//l'étoile3 rebondit dessus

        this.star3=this.physics.add.sprite(632,440,"star");
        this.star3.setCollideWorldBounds(true);
        this.star3.setBounce(0);
        this.physics.add.overlap(this.player, this.star3, this.ramasserEtoile, null, this);
        this.physics.add.collider(this.star3, this.platforms);//l'étoile3 rebondit dessus 
        

        


        

        this.sky8=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'nuages'
        );
        this.sky8.setScrollFactor(0);
        this.sky8.setOrigin(0,0);

        this.sky7=this.add.tileSprite(
            30,
            -30,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'flares'
        );

        this.sky7.setScrollFactor(0);
        this.sky7.setOrigin(0,0);

        this.sky6=this.add.tileSprite(
            0,
            45,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'beach'
        );
        this.sky6.setScrollFactor(0);
        this.sky6.setOrigin(0,0);


        
        this.sky4=this.add.tileSprite(
            0,
            75,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'flowers'
        );
        this.sky4.setScrollFactor(0);
        this.sky4.setOrigin(0,0);
        
        
        this.sky3=this.add.tileSprite(
            0,
            60,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'avant_plan'
        );
        this.sky3.setScrollFactor(0);
        this.sky3.setOrigin(0,0);
      

       
        this.sky2=this.add.tileSprite(
            0,
            60,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'mid_ground'
        );
        this.sky2.setScrollFactor(0);
        this.sky2.setOrigin(0,0);
        //this.sky2.alpha=0.2;
        //this.sky.tileScaleX=this.sky.tileScaleY=0.8;

        

        //on change de ciel, on fait une tileSprite ce qui permet d'avoir une image qui se répète
        this.sky=this.add.tileSprite(
            0,
            -30,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'sky-2'
        );
        this.sky.setOrigin(0,0);
        this.sky.setScrollFactor(0);//fait en sorte que le ciel ne suive pas la caméra
        


        //fait passer les éléments devant le ciel
        this.sky4.setDepth(15)
        this.platforms.setDepth(10)
        this.star1.setDepth(10)
        this.star2.setDepth(10)
        this.star3.setDepth(10)
        this.player.setDepth(10)
        this.sky3.setDepth(9)
        this.sky6.setDepth(5)
        this.sky7.setDepth(5)
        this.sky8.setDepth(10)
        

        //on crée un objet en appelant la classe correspondante ici
        new MonsterFly(this,600,350);//penser à importer l'image au début de cette page
        //new MonstreVolant(this,500,68);//penser à rajouter un script dans l'index pour importer la classe
        //new MonsterSkull(this,450,150);
        //new MonsterZelda(this,600,100);
        new MonsterOrange(this, 1500, height-140);
        new MonsterLance(this, 600, height-140);

        //new MonsterBoss(this, 600, height-140);
        //new Petales(this, 0,0);

        //new Tireur(this,200,height-140);
    }

    update(){
        super.update();
       //le ciel se déplace moins vite que la caméra pour donner un effet paralax
        this.sky.tilePositionX=this.cameras.main.scrollX*0.05;
        this.sky.tilePositionY=this.cameras.main.scrollY*0.2-31;
        //le deuxième ciel se déplace moins vite pour accentuer l'effet
        this.sky2.tilePositionX=this.cameras.main.scrollX*0.15-50;
        this.sky2.tilePositionY=this.cameras.main.scrollY*0.2+30;

        this.sky3.tilePositionX=this.cameras.main.scrollX*0.5;
        this.sky3.tilePositionY=this.cameras.main.scrollY*0.4;

        this.sky4.tilePositionX=this.cameras.main.scrollX*0.8;
        this.sky4.tilePositionY=this.cameras.main.scrollY*0.6;

        this.sky6.tilePositionX=this.cameras.main.scrollX*0.3;
        this.sky6.tilePositionY=this.cameras.main.scrollY*0.3;

        this.sky7.tilePositionX=this.cameras.main.scrollX*0.1;
        this.sky7.tilePositionY=this.cameras.main.scrollY*0.2-31;

        this.sky8.tilePositionX=this.cameras.main.scrollX*0.15;
        this.sky8.tilePositionY=this.cameras.main.scrollY*0.2;

        
    }

    



}

