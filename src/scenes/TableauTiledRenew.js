class TableauTiledRenew extends Tableau{
    /**
     * Ce tableau démontre comment se servir de Tiled, un petit logiciel qui permet de designer des levels et de les importer dans Phaser (entre autre).
     *
     * Ce qui suit est très fortement inspiré de ce tuto :
     * https://stackabuse.com/phaser-3-and-tiled-building-a-platformer/
     *
     * Je vous conseille aussi ce tuto qui propose quelques alternatives (la manière dont son découpées certaines maisons notamment) :
     * https://medium.com/@michaelwesthadley/modular-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6
     */

    constructor()
    {
        super("TableauTiledRenew");
    }

    preload() {
        super.preload();
        // ------pour TILED-------------
        // nos images
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet_3.png');
        //les données du tableau qu'on a créé dans TILED
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/level1_V028.json');

        // ---------Les monstres------------
        this.load.image('monster-fly', 'assets/monster-dragon.png');
        this.load.image('monster-katana', 'assets/monster_katana.png');
        this.load.image('tireur', 'assets/tireur.png');
        this.load.image('projo', 'assets/missile_2.png');


        // ---------Les étoiles-----------
        this.load.image('star', 'assets/truc.png');

        this.load.image('checkPoint', 'assets/soleil.png');

        this.load.image('PlateformMouv', 'assets/plateforme_1_3.png');
        this.load.image('platforms_longues', 'assets/platforms_longues.png');

        // -----et puis aussi-------------

        //this.load.image('night', 'assets/images/background.png');
        //atlas de texture généré avec https://free-tex-packer.com/app/
        //on y trouve notre étoiles et une tête de mort

        //-------------BACKGROUND PARALLAX--------------
        this.load.image('ciel', 'assets/background/ciel.jpg');
        this.load.image('voile', 'assets/background/voile_atmospherique.png');
        this.load.image('soleils', 'assets/background/arriere_plan_4_soleils.png');
        this.load.image('nuages', 'assets/background/arriere_plan_3_nuages.png');
        this.load.image('arriere_plan_2', 'assets/background/arriere_plan_2.png');
        this.load.image('arriere_plan_1', 'assets/background/arriere_plan_1.png');
        this.load.image('premier_plan', 'assets/background/premier_plan/premier_plan_sans_ombre_tour_2.png');
        this.load.image('premier_plan_ombre_tour', 'assets/background/premier_plan/premier_plan_ombre_tour_2.png');
        this.load.image('light', 'assets/background/premier_plan/light.png');
        this.load.image('plantes_arbres', 'assets/background/avant_plan/plantes_arbre.png');
        this.load.image('premiere_roche', 'assets/background/avant_plan/premiere_roche.png');
        this.load.image('roche_pilier', 'assets/background/avant_plan/roche_pilier.png');
        this.load.image('dalle', 'assets/background/premier_plan/dalleEnigme.png');
        this.load.image('rocher_devant', 'assets/background/premier_plan/rocher_devant.png');
        this.load.image('tuto_dash', 'assets/ecrans_narration/tuto_dash.png');
        this.load.image('tuto_tp', 'assets/ecrans_narration/tuto_tp.png');
        this.load.image('tuto_enigme', 'assets/ecrans_narration/tuto_enigme.png');
        this.load.image('texte_planete_1', 'assets/ecrans_narration/texte_planete_1_2.png');
        this.load.image('texte_planete_2', 'assets/ecrans_narration/texte_planete_2_2.png');
        this.load.image('rocher_obstacle', 'assets/rocher_obstacle_2.png');




        //this.load.video('dialogue1','assets/videos/dialogue1.mp4');
        //this.load.video('dialogue1', 'assets/videos/dialogue2.webm', 'loadeddata', false, true);

        //this.load.image('dalle', 'assets/64x86.png');

        this.load.video('smokeFx', 'assets/videos/FXs/dashtest3.webm', 'loadeddata', false, true);

        this.load.audio('track', 'assets/son/montée_tour_platformer_s2_musique_complete.mp3');

    }


    create() {
        super.create();
        this.compteur=0;
        this.smokeFx=this.add.video(5860, 2190, 'smokeFx');


        //this.projectile();
/*
        //this.img=this.add.sprite(5350,500,'dalle');
        this.img = this.physics.add.staticGroup();
        this.img.create(5350, 580, 'dalle');
        //this.img.setOrigin(0,0);
        this.img.setDepth(1000);
        this.physics.add.collider(this.img, this.player);
        // this.img.setSize(64,64);
        //on en aura besoin...
        //let ici=this;*/

        //--------chargement de la tile map & configuration de la scène-----------------------

        //notre map
        this.map = this.make.tilemap({ key: 'map' });
        //nos images qui vont avec la map
        this.tileset = this.map.addTilesetImage('kenny_simple_platformer', 'tiles');

        //on agrandit le champ de la caméra du coup
        let largeurDuTableau=this.map.widthInPixels;
        let hauteurDuTableau=this.map.heightInPixels;
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.cameras.main.startFollow(this.player, true, 0.08, 0.02);

        //---- ajoute les plateformes simples ----------------------------

        // this.solides = this.map.createLayer('solides', this.tileset, 0, 0);
        // this.lave = this.map.createLayer('lave', this.tileset, 0, 0);
        this.derriere = this.map.createLayer('derriere', this.tileset, 0, 0);
        this.devant = this.map.createLayer('Plateformes', this.tileset, 0, 32);
        this.mursInvisibles = this.map.createLayer('mursInvisibles', this.tileset, 0, 32);

        //on définit les collisions, plusieurs méthodes existent:

        // 1 La méthode que je préconise (il faut définir une propriété dans tiled pour que ça marche)
        //permet de travailler sur un seul layer dans tiled et des définir les collisions en fonction des graphiques
        //exemple ici https://medium.com/@michaelwesthadley/modular-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6
        this.devant.setCollisionByProperty({ collides: true }); //sert aussi pour déterminer quelle tuile joue quel son quand on marche dessus par ex a voir comment ça marche vraiment par contre
        //this.lave.setCollisionByProperty({ collides: true });
        this.mursInvisibles.setCollisionByProperty({ collides: true });




        // 2 manière la plus simple (là où il y a des tiles ça collide et sinon non)
        //this.devant.setCollisionByExclusion(-1, true);
        //this.lave.setCollisionByExclusion(-1, true);

        // 3 Permet d'utiliser l'éditeur de collision de Tiled...mais ne semble pas marcher pas avec le moteur de physique ARCADE, donc oubliez cette option :(
        //this.map.setCollisionFromCollisionGroup(true,true,this.plateformesSimples);
        //this.inZone=false;

        let ici=this;
        //PLATEFORMES
        this.Platforms = this.physics.add.group({
            allowGravity: false,
            immovable: true,
            bounceY:0,
            bounceX:0,
        });
        this.PlatformsObjects = this.map.getObjectLayer('Platforms')['objects'];
        // On crée des étoiles pour chaque objet rencontré
        this.PlatformsObjects.forEach(PlatformsObject => {
            // Pour chaque étoile on la positionne pour que ça colle bien car les étoiles ne font pas 64x64
            let Platforms = this.Platforms.create(PlatformsObject.x+32, PlatformsObject.y+16 /*, 'particles'*/, 'PlateformMouv');
        });
        //this.physics.add.collider(this.Platforms, this.player);

        //this.physics.add.collider(this.Platforms, this.player);
        this.physics.add.collider(this.Platforms, this.player, function () {

        });

        this.PlatformsInTower = this.physics.add.group({
            allowGravity: false,
            immovable: true,
            bounceY:0,
            bounceX:0,
        });
        this.PlatformsInTowerObjects = this.map.getObjectLayer('PlatformsInTower')['objects'];
        // On crée des étoiles pour chaque objet rencontré
        this.PlatformsInTowerObjects.forEach(PlatformsInTowerObject => {
            // Pour chaque étoile on la positionne pour que ça colle bien car les étoiles ne font pas 64x64
            let PlatformsInTower = this.PlatformsInTower.create(PlatformsInTowerObject.x+32, PlatformsInTowerObject.y+16 /*, 'particles'*/, 'PlateformMouv');
        });
        //this.physics.add.collider(this.Platforms, this.player);

        //this.physics.add.collider(this.Platforms, this.player);
        this.physics.add.collider(this.PlatformsInTower, this.player, function () {

        });

        this.PlatformsLongues = this.physics.add.group({
            allowGravity: false,
            immovable: true,
            bounceY:0,
            bounceX:0,

        });
        this.PlatformsLonguesObjects = this.map.getObjectLayer('PlatformsLongues')['objects'];
        // On crée des étoiles pour chaque objet rencontré
        this.PlatformsLonguesObjects.forEach(PlatformsLonguesObject => {
            // Pour chaque étoile on la positionne pour que ça colle bien car les étoiles ne font pas 64x64
            let PlatformsLongues = this.PlatformsLongues.create(PlatformsLonguesObject.x, PlatformsLonguesObject.y /*, 'particles'*/, 'platforms_longues');
        });
        //this.physics.add.collider(this.Platforms, this.player);

        //this.physics.add.collider(this.Platforms, this.player);
        this.physics.add.collider(this.PlatformsLongues, this.player, function () {

        });









        //----------les objets déplaçables ---------------------
        this.stars = this.physics.add.group({
            allowGravity: true,
            immovable: false,
            bounceY:0,
            bounceX:0.5,
            drag:0.5,
        });
        this.starsObjects = this.map.getObjectLayer('stars')['objects'];
        // On crée des étoiles pour chaque objet rencontré
        this.starsObjects.forEach(starObject => {
            // Pour chaque étoile on la positionne pour que ça colle bien car les étoiles ne font pas 64x64
            let star = this.stars.create(starObject.x+32, starObject.y+32 /*, 'particles'*/, 'star');
        });

         this.dalles = this.physics.add.group({
             allowGravity: false,
             immovable: true,
             bounceY:0,
             bounceX:0,
         });
         this.dallesObjects = this.map.getObjectLayer('dalles')['objects'];
         // On crée des étoiles pour chaque objet rencontré
         this.dallesObjects.forEach(dalleObject => {
             // Pour chaque étoile on la positionne pour que ça colle bien car les étoiles ne font pas 64x64
             let dalle = this.dalles.create(dalleObject.x+32, dalleObject.y+32 /*, 'particles'*/, 'dalle');
         });
         this.physics.add.collider(this.dalles, this.player);






        //----------les monstres volants (objets tiled) ---------------------

        let monstersContainer=this.add.container();
        //pour faire collider les monstres
        this.flyingMonstersObjects = this.map.getObjectLayer('flyingMonsters')['objects'];
        // On crée des monstres volants pour chaque objet rencontré

        this.flyingMonstersObjects.forEach(monsterObject => {
            let monster=new MonsterFly(this,monsterObject.x,monsterObject.y); //ici, on appelle le nom de la classe
            monstersContainer.add(monster);
        });


        //----------les monstres terrestres (objets tiled) ---------------------

        ici.katanaMonstersObjects = ici.map.getObjectLayer('katanaMonsters')['objects']; //katanaMonsters est le nom du calque objet dans tiled
        ici.katanaMonstersObjects.forEach(monsterObject => {
            let monster=new Patrouilleur(this,monsterObject.x,monsterObject.y); //ici, on appelle le nom de la classe
            //let ici déclare la variable monster en local donc n'existe pas en dehors de cette fonction
            monstersContainer.add(monster);
            this.physics.add.collider(monster, this.devant);
            this.physics.add.collider(monster, this.mursInvisibles);
        });


        ici.tireurMonstersObjects = ici.map.getObjectLayer('tireurMonsters')['objects']; //katanaMonsters est le nom du calque objet dans tiled
        ici.tireurMonstersObjects.forEach(monsterObject => {
            let monster=new Tireur(this,monsterObject.x,monsterObject.y); //ici, on appelle le nom de la classe
            //let projo=new Projectile(this,monsterObject.x,monsterObject.y);
            //let ici déclare la variable monster en local donc n'existe pas en dehors de cette fonction
            monstersContainer.add(monster);
            this.physics.add.collider(monster, this.devant);
            this.physics.add.collider(monster, this.Platforms);
            this.physics.add.collider(monster, this.PlatformsInTower);
            this.physics.add.collider(monster, this.PlatformsLongues);
        });

        ici.PlateformMouvObjects = ici.map.getObjectLayer('PlateformMouv')['objects']; //katanaMonsters est le nom du calque objet dans tiled
        ici.PlateformMouvObjects.forEach(monsterObject => {
            let monster=new PlateformMouv(this,monsterObject.x,monsterObject.y); //ici, on appelle le nom de la classe

            //let ici déclare la variable monster en local donc n'existe pas en dehors de cette fonction
            monstersContainer.add(monster);
            this.physics.add.collider(monster, this.player);

        });



        //Checkpoints
        this.checkPoints = this.physics.add.staticGroup();
        this.checkPointsObjects = this.map.getObjectLayer('checkPoints')['objects'];
        //on crée des checkpoints pour chaque objet rencontré
        this.checkPointsObjects.forEach(checkPointObject => {
            let point=this.checkPoints.create(checkPointObject.x,checkPointObject.y/*,"particles"*/,"checkPoint").setOrigin(0.5,1);
            point.blendMode=Phaser.BlendModes.COLOR_DODGE;
            point.checkPointObject=checkPointObject;
        });

        // this.videos = this.physics.add.staticGroup();
        // this.videosObjects = this.map.getObjectLayer('videos')['objects'];
        // //on crée des checkpoints pour chaque objet rencontré
        // this.videosObjects.forEach(videosObject => {
        //     let point=this.videos.create(videosObject.x,videosObject.y/*,"particles"*/,"videos").setOrigin(0.5,1);
        //     point.blendMode=Phaser.BlendModes.COLOR_DODGE;
        //     point.videosObject=videosObject;
        // });


        //AUTRE VIDEO
        //this.autreVideo=this.add.video(3000, 425, 'truc');
        //this.autreVideo.setDepth(1000);

        //Fin du niveau - zone menant à la suite du jeu
        // this.niveaux = this.physics.add.staticGroup();
        // this.niveauxObjects = this.map.getObjectLayer('niveaux')['objects'];
        // //on crée des checkpoints pour chaque objet rencontré
        // this.niveauxObjects.forEach(niveauObject => {
        //     let point=this.niveaux.create(niveauObject.x,niveauObject.y/*,"particles"*/,"checkPoint").setOrigin(0.5,1);
        //     point.blendMode=Phaser.BlendModes.COLOR_DODGE;
        //     point.niveauObject=niveauObject;
        // });



        //----------les monstres terrestres (objets tiled) ---------------------
        /*this.katanaMonstersObjects = this.map.getObjectLayer('katanaMonsters')['objects'];
        this.katanaMonstersObjects.forEach(monsterObject => {
            let monster=new Patrouilleur(this,monsterObject.x,monsterObject.y); //ici, on appelle le nom de la classe
            monstersContainer.add(monster);
        });*/


        //----------débug---------------------

        //pour débugger les collisions sur chaque layer
        let debug=this.add.graphics().setAlpha(this.game.config.physics.arcade.debug?0.75:0);
        if(this.game.config.physics.arcade.debug === false){
            debug.visible=false;
        }
        // //débug solides en vers
        // this.solides.renderDebug(debug,{
        //     tileColor: null, // Couleur des tiles qui ne collident pas
        //     collidingTileColor: new Phaser.Display.Color(0, 255, 0, 255), //Couleur des tiles qui collident
        //     faceColor: null // Color of colliding face edges
        // });
        // //debug lave en rouge
        // this.lave.renderDebug(debug,{
        //     tileColor: null, // Couleur des tiles qui ne collident pas
        //     collidingTileColor: new Phaser.Display.Color(255, 0, 0, 255), //Couleur des tiles qui collident
        //     faceColor: null // Color of colliding face edges
        // });


        //---------- parallax ciel (rien de nouveau) -------------

        this.ciel=this.add.sprite(3050, 1100, 'ciel');
        this.voile=this.add.sprite(3050, 1100, 'voile');
        this.soleils=this.add.sprite(3000, 1120, 'soleils');
        this.nuages=this.add.sprite(3000, 1120, 'nuages');
        this.arriere_plan_2=this.add.sprite(1720, 2050, 'arriere_plan_2');
        this.arriere_plan_1=this.add.sprite(3050, 1110, 'arriere_plan_1');
        this.premier_plan=this.add.sprite(3050, 1110, 'premier_plan');
        this.premier_plan_ombre_tour=this.add.sprite(3050, 1110, 'premier_plan_ombre_tour');
        this.light=this.add.sprite(3050, 1110, 'light');
        this.plantes_arbres=this.add.sprite(5760, 1970, 'plantes_arbres');
        this.roche_pilier=this.add.sprite(2600, 2075, 'roche_pilier');
        this.premiere_roche=this.add.sprite(1175, 2200, 'premiere_roche');
        this.rocher_devant=this.add.sprite(3000, 1110, 'rocher_devant');
        this.rocher_obstacle=this.add.sprite(1590, 2100, 'rocher_obstacle');
        //bulles de texte
        this.tuto_dash=this.add.sprite(300, 2000, 'tuto_dash');
        this.tuto_tp=this.add.sprite(1300, 2000, 'tuto_tp');
        this.tuto_enigme=this.add.sprite(5400, 1975, 'tuto_enigme');
        this.texte_planete_1=this.add.sprite(800, 2000, 'texte_planete_1');
        this.texte_planete_2=this.add.sprite(3000, 2000, 'texte_planete_2');





        //on change de ciel, on fait une tileSprite ce qui permet d'avoir une image qui se répète
        /*this.sky=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'night'
        );
        this.sky2=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'night'
        );

        this.sky.setOrigin(0,0);
        this.sky2.setOrigin(0,0);
        this.sky.setScrollFactor(0);//fait en sorte que le ciel ne suive pas la caméra
        this.sky2.setScrollFactor(0);//fait en sorte que le ciel ne suive pas la caméra
        this.sky2.blendMode=Phaser.BlendModes.ADD;*/

        //----------collisions---------------------

        //quoi collide avec quoi?
        this.physics.add.collider(this.player, this.devant);
        this.physics.add.collider(this.player, this.mursInvisibles);

        this.physics.add.collider(this.stars, this.devant);
        //this.physics.add.collider(this.katanaMonstersObjects, this.devant);
        //si le joueur touche une étoile dans le groupe...
        //this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);
        this.physics.add.collider(this.stars, this.player);
        //quand on touche la lave, on meurt
        this.physics.add.collider(this.player, this.lave,this.playerDie,null,this);

        //quand on touche un checkpoint
        this.physics.add.overlap(this.player, this.checkPoints, function(player, checkPoint)
         {
             ici.saveCheckPoint(checkPoint.checkPointObject.name);
         }, null, this);

        // this.physics.add.overlap(this.player, this.videos, function(player, videos)
        // {
        //     ici.enigmeNiveau(videos.videosObject.name);
        // }, null, this);



        //--------- Z order -----------------------


        //on définit les z à la fin
        let z=1000; //niveau Z qui a chaque fois est décrémenté.

        this.dalles.setDepth(1000);
        this.checkPoints.setDepth(98);
        this.Platforms.setDepth(1000);
        this.PlatformsInTower.setDepth(100);
        this.PlatformsLongues.setDepth(102);
        debug.setDepth(z--);
        //this.blood.setDepth(z--);

        monstersContainer.setDepth(99);
        this.stars.setDepth(z--);
        //starsFxContainer.setDepth(z--);

        this.devant.setDepth(103);
        this.mursInvisibles.setDepth(103);

        this.player.setDepth(102);

        this.derriere.setDepth(50);
        // this.sky2.setDepth(z--);
        this.ciel.setDepth(1);
        this.soleils.setDepth(2);
        this.nuages.setDepth(3);
        this.arriere_plan_2.setDepth(4);
        this.arriere_plan_1.setDepth(5);
        this.voile.setDepth(6);
        this.premier_plan.setDepth(99);
        this.light.setDepth(101);
        this.premier_plan_ombre_tour.setDepth(101);
        this.plantes_arbres.setDepth(104);
        this.premiere_roche.setDepth(104);
        this.roche_pilier.setDepth(104);
        this.dalles.setDepth(97);
        this.rocher_devant.setDepth(103);
        this.rocher_obstacle.setDepth(101);

        this.tuto_dash.setDepth(99);
        this.tuto_tp.setDepth(99);
        this.tuto_enigme.setDepth(99);
        this.texte_planete_1.setDepth(99);
        this.texte_planete_1.alpha=0;
        this.texte_planete_2.setDepth(99);

        this.restoreCheckPoint();

    }

    apparitionTexte(){
        if(this.player.x<500){
            //this.tuto_dash.alpha=1;
            Tableau.current.tweens.add({
                targets: Tableau.current.tuto_dash,
                alpha:1,
                duration: 100,
                ease: 'Sine.easeInOut',

            })
        }else if(this.player.x>=500){
            //this.tuto_dash.alpha=0;
            Tableau.current.tweens.add({
                targets: Tableau.current.tuto_dash,
                alpha:0,
                duration: 100,
                ease: 'Sine.easeInOut',

            })
        }
        if(1250<=this.player.x && this.player.x<=1750){
            //this.tuto_tp.alpha=1;
            Tableau.current.tweens.add({
                targets: Tableau.current.tuto_tp,
                alpha:1,
                duration: 100,
                ease: 'Sine.easeInOut',

            })
        }else{
            //this.tuto_tp.alpha=0;
            Tableau.current.tweens.add({
                targets: Tableau.current.tuto_tp,
                alpha:0,
                duration: 100,
                ease: 'Sine.easeInOut',

            })
        }
        if(750<=this.player.x && this.player.x<=1100){
            //this.texte_planete_1.alpha=1;
            Tableau.current.tweens.add({
                targets: Tableau.current.texte_planete_1,
                alpha:1,
                duration: 150,
                ease: 'Sine.easeInOut',

            })
        }else{
            //this.texte_planete_1.alpha=0;
            Tableau.current.tweens.add({
                targets: Tableau.current.texte_planete_1,
                alpha:0,
                duration: 150,
                ease: 'Sine.easeInOut',

            })
        }
        if(2750<=this.player.x && this.player.x<=3250){
            //this.texte_planete_2.alpha=1;
            Tableau.current.tweens.add({
                targets: Tableau.current.texte_planete_2,
                alpha:1,
                duration: 150,
                ease: 'Sine.easeInOut',

            })
        }else{
            //this.texte_planete_2.alpha=0;
            Tableau.current.tweens.add({
                targets: Tableau.current.texte_planete_2,
                alpha:0,
                duration: 150,
                ease: 'Sine.easeInOut',

            })
        }
        if(5150<=this.player.x){
            //this.tuto_enigme.alpha=1;
            Tableau.current.tweens.add({
                targets: Tableau.current.tuto_enigme,
                alpha:1,
                duration: 100,
                ease: 'Sine.easeInOut',

            })
        }else{
            //this.tuto_enigme.alpha=0;
            Tableau.current.tweens.add({
                targets: Tableau.current.tuto_enigme,
                alpha:0,
                duration: 100,
                ease: 'Sine.easeInOut',

            })
        }
        if(this.player.x>=3850){
            Tableau.current.tweens.add({
                targets: Tableau.current.premier_plan_ombre_tour,
                alpha:0,
                duration: 80,
                ease: 'Sine.easeInOut',

            })
        }else{
            Tableau.current.tweens.add({
                targets: Tableau.current.premier_plan_ombre_tour,
                alpha:1,
                duration: 80,
                ease: 'Sine.easeInOut',

            })
        }

    }



    projectile(){
        this.projo1=this.physics.add.sprite(200,400,"projo");
        this.projo1.setCollideWorldBounds(true);
        this.projo1.setBounce(0);
        this.projo1.body.allowGravity=false;
        this.projo1.setVelocityX(100);
        this.projo1.setDepth(1000);
        this.projo1.body.setSize(35,50);
        this.physics.add.overlap(this.player, this.projo1, this.hitMonster, null, this);

    }

    //Checkpoint
    saveCheckPoint(checkPointName){
        if (localStorage.getItem("checkPoint") !== checkPointName){
            console.log("on atteint le checkpoint", checkPointName);
            localStorage.setItem("checkPoint", checkPointName);
        }
    }
    restoreCheckPoint(){
        let storedCheckPoint=localStorage.getItem("checkPoint")
        if(storedCheckPoint){
            this.checkPointsObjects.forEach(checkPointObject => {
                if(checkPointObject.name === storedCheckPoint){
                    this.player.setPosition(checkPointObject.x, checkPointObject.y-64*2);
                    //console.log("on charge le checkpoint", checkPointName);
                }
            });
        }
    }

    /**
     * Permet d'activer, désactiver des éléments en fonction de leur visibilité dans l'écran ou non
     */
    optimizeDisplay(){
        //return;
        let world=this.cameras.main.worldView; // le rectangle de la caméra, (les coordonnées de la zone visible)

        //     // on va activer / désactiver les particules de lave
        //     for( let particule of this.laveFxContainer.getAll()){ // parcours toutes les particules de lave
        //         if(Phaser.Geom.Rectangle.Overlaps(world,particule.rectangle)){
        //             //si le rectangle de la particule est dans le rectangle de la caméra
        //             if(!particule.visible){
        //                 //on active les particules
        //                 particule.resume();
        //                 particule.visible=true;
        //             }
        //         }else{
        //             //si le rectangle de la particule n'est PAS dans le rectangle de la caméra
        //             if(particule.visible){
        //                 //on désactive les particules
        //                 particule.pause();
        //                 particule.visible=false;
        //             }
        //         }
        //     }
        //
        //     // ici vous pouvez appliquer le même principe pour des monstres, des étoiles etc...
    }




    /**
     * Fait se déplacer certains éléments en parallax
     */
    moveParallax(){
        //le ciel se déplace moins vite que la caméra pour donner un effet paralax
        /*this.sky.tilePositionX=this.cameras.main.scrollX*0.6;
        this.sky.tilePositionY=this.cameras.main.scrollY*0.6;
        this.sky2.tilePositionX=this.cameras.main.scrollX*0.7+100;
        this.sky2.tilePositionY=this.cameras.main.scrollY*0.7+100;*/
    }


//fx quand on active la pierre de l'énigme
    fxFin(){
        this.smokeFx.setDepth(101);
        this.smokeFx.play();
        console.log('smoke');
    }

    //rajouter la condition de réussir l'énigme pour passer à la suite

    finNiveau(){
        /*if(this.player.x>5300 && this.player.y>500){
            this.player.setVelocityX(0);
            //this.player.x=5300;

        }*/
        if(this.player.x<=this.map.widthInPixels-190 && this.player.x>=this.map.widthInPixels-260 && this.player.y>=2125/*this.player.getBounds().bottom < this.img.getBounds().top+30 *//*&& condition de réussite de l'énigme*/){
            //PLUS SIMPLE -> this.ecranFin=this.add.sprite(600, 40, "ecran de fin"); loaded au préalable dans preload avec this.load.image('');
            //this.song.stop();
            this.compteur+=1;
            this.dalles.setVelocityY(10);
            this.fxFin();
            //this.player.body.velocity.y=0.2;
            console.log(this.compteur);

            if(this.compteur===250){
                this.cameras.main.fadeOut(500, 0, 0, 0)
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () =>
                {
                    this.win();
                })

            }

        }else{
            if(this.compteur>0){
                this.dalles.setVelocityY(-10);
                this.compteur-=1;
                if(this.compteur<=0){
                    this.dalles.setVelocityY(0);
                }
                console.log(this.compteur);

            }
            //this.compteur=0;
            //this.dalles.y=580;



        }
    }

    /*enigmeNiveau(){
        //if(this.player.x>=3000){
        if(this.player.x>=5000){
            this.vidEnigme.alpha=1;
            //this.vidEnigme.active=true; //met en pause la video
            this.vidEnigme.play(false, 4, 20);
            this.time.addEvent({
                delay: 4000,
                callback: ()=>{

                },
                loop: false
            })




            // this.time.addEvent({
            //     delay: 500,
            //     callback: ()=>{
            //         this.vidEnigme.pause(true);
            //         console.log('pause');
            //     },
            //     loop: false
            // })
        }
        if(this.player.x<5000){
            this.vidEnigme.alpha=0;
            //this.vidEnigme.active=false;
            //console.log('alpha');
        }

    }*/

    fxTour(){
        this.camera = this.cameras.main;

        this.camera.setZoom(1);
        if(this.player.x>=3500  && this.player.x<=4500){
            this.song = this.sound.add('track', {volume: 0.5})
            this.song.play();
            this.camera.setZoom(0.5);
            //this.camera.pan(-100, -100, 100, 'Power2');
            //this.camera.zoomTo(0.5, 1, 'Power2');



            /*Tableau.current.tweens.add({
                targets: Tableau.current.camera,
                zoom: 0.5,
                duration: 100,
                ease: 'Sine.easeInOut',

            })*/

            /*Tableau.current.tweens.add({
            targets: Tableau.current.camera.zoom,
            ease: 'Sine.easeInOut',
            duration: 1000,
            loop: 0,
            tweens: [
                {
                    targets: Tableau.current.camera.zoom,
                    zoom: 0.5
                },
                {
                    targets: Tableau.current.camera.zoom,
                    zoom: 0.5
                },
            ]
        });*/
        }


        if(this.player.y<=1500){
            this.camera.setZoom(1);
            /*Tableau.current.tweens.add({
                targets: Tableau.current.camera,
                zoom: 1.5,
                duration: 100,
                ease: 'Sine.easeInOut',

            })*/
        }

    }





    update(){
        super.update();
        this.moveParallax();
        this.finNiveau();
        //this.enigmeNiveau();
        this.fxTour();
        this.apparitionTexte();







        //optimisation
        //teste si la caméra a bougé
        let actualPosition=JSON.stringify(this.cameras.main.worldView);
        if(
            !this.previousPosition
            || this.previousPosition !== actualPosition
        ){
            this.previousPosition=actualPosition;
            this.optimizeDisplay();
        }


    }




}