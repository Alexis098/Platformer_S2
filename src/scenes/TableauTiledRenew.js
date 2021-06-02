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
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/level1_V039.json');

        // ---------Les monstres------------
        //this.load.image('monster-fly', 'assets/monster-dragon.png');

        //this.load.image('tireur', 'assets/animations/tireur/tireur_test_1.png');
        this.load.image('projo', 'assets/missile_2.png');


        //this.load.image('checkPoint', 'assets/soleil.png');

        this.load.image('PlateformMouv', 'assets/plateforme_1_3.png');
        this.load.image('platforms_longues', 'assets/platforms_longues.png');



        //-------------BACKGROUND PARALLAX--------------
        this.load.image('ciel', 'assets/background/ciel.jpg');
        this.load.image('voile', 'assets/background/voile_atmospherique.png');
        this.load.image('soleils', 'assets/background/arriere_plan_4_soleils.png');
        this.load.image('nuages', 'assets/background/arriere_plan_3_nuages.png');
        this.load.image('arriere_plan_2', 'assets/background/arriere_plan_2_5.png');/*2_4*/
        this.load.image('arriere_plan_1', 'assets/background/arriere_plan_1_7.png');/*1_6*/
        this.load.image('premier_plan', 'assets/background/premier_plan/premier_plan_sans_ombre_tour_8.png');
        this.load.image('premier_plan_ombre_tour', 'assets/background/premier_plan/premier_plan_ombre_tour_2.png');
        this.load.image('light', 'assets/background/premier_plan/light.png');
        this.load.image('plantes_arbres', 'assets/background/avant_plan/plantes_arbre_3.png');
        this.load.image('premiere_roche', 'assets/background/avant_plan/premiere_roche.png');
        this.load.image('roche_pilier', 'assets/background/avant_plan/roche_pilier.png');
        this.load.image('dalle', 'assets/background/premier_plan/dalleEnigme.png');
        this.load.image('rocher_devant', 'assets/background/premier_plan/rocher_devant_2.png');
        this.load.image('tuto_dash', 'assets/ecrans_narration/tuto_dash_2.png');
        this.load.image('tuto_tp', 'assets/ecrans_narration/tuto_tp_2.png');
        this.load.image('tuto_enigme', 'assets/ecrans_narration/tuto_enigme_2.png');
        this.load.image('texte_planete_1', 'assets/ecrans_narration/texte_planete_1_3.png');
        this.load.image('texte_planete_2', 'assets/ecrans_narration/texte_planete_2_3.png');
        this.load.image('rocher_obstacle', 'assets/rocher_obstacle_3.png');


        this.load.image('blackBar_top', 'assets/blackBar_top_2.png');
        this.load.image('blackBar_bottom', 'assets/blackBar_bottom_2.png');



        this.load.audio('track', 'assets/son/montée_tour_platformer_s2_musique_complete.mp3');
        this.load.audio('texte_planete', 'assets/son/son_planète_bulle_texte_2.mp3');

        this.load.audio('rocks', 'assets/son/rocks_2.mp3');
        this.load.audio('rocksup', 'assets/son/rocks_up_2.mp3');
        this.load.audio('stele_boom', 'assets/son/stele_boom_2.mp3');

        this.load.video('smokeFx', 'assets/videos/FXs/dashtest3.webm', 'loadeddata', false, true);
        this.load.video('vent', 'assets/videos/FXs/vent.webm', 'loadeddata', false, true);

        this.load.video('fleche_vent', 'assets/videos/FXs/fleche.webm', 'loadeddata', false, true);

        this.load.audio('chutefinale', 'assets/son/chutefinale.mp3');
    }


    create() {
        super.create();
        this.compteur=0;
        this.once=0;
        this.lecture_texte_planete=0;
        this.steleson=0;
        this.stelesonup=0;
        this.boom=0;
        this.flottant=0;
        this.cineStyle=0;

        this.camera = this.cameras.main;
        this.camera.setZoom(1);

        this.smokeFx=this.add.video(5860, 2190, 'smokeFx');
        this.vent=this.add.video(4700, 700, 'vent');
        this.fleche_vent=this.add.video(5150, 650, 'fleche_vent');
        this.vent.setDepth(103);
        this.fleche_vent.setDepth(103);









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


        this.derriere = this.map.createLayer('derriere', this.tileset, 0, 0);
        this.devant = this.map.createLayer('Plateformes', this.tileset, 0, 32);
        this.mursInvisibles = this.map.createLayer('mursInvisibles', this.tileset, 0, 32);
        this.mursInvisibles2 = this.map.createLayer('mursInvisibles2', this.tileset, -10, 32);

        //on définit les collisions, plusieurs méthodes existent:

        this.devant.setCollisionByProperty({ collides: true }); //sert aussi pour déterminer quelle tuile joue quel son quand on marche dessus par ex a voir comment ça marche vraiment par contre

        this.mursInvisibles.setCollisionByProperty({ collides: true });
        this.mursInvisibles2.setCollisionByProperty({ collides: true });






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
            Platforms.setSize(0,15);
        });



        this.physics.add.collider(this.Platforms, this.player, function () {
            //ici.rebond();
        });



        this.PlatformsInTower = this.physics.add.group({
            allowGravity: false,
            immovable: true,
            bounceY:0,
            bounceX:0,
        });
        this.PlatformsInTowerObjects = this.map.getObjectLayer('PlatformsInTower')['objects'];
        this.PlatformsInTowerObjects.forEach(PlatformsInTowerObject => {
            let PlatformsInTower = this.PlatformsInTower.create(PlatformsInTowerObject.x+32, PlatformsInTowerObject.y+16 /*, 'particles'*/, 'PlateformMouv');
            PlatformsInTower.setSize(0,15);
        });

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
            PlatformsLongues.setSize(0,15);
        });
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
        this.starsObjects.forEach(starObject => {
            let star = this.stars.create(starObject.x+32, starObject.y+32 /*, 'particles'*/, 'star');
        });

         this.dalles = this.physics.add.group({
             allowGravity: false,
             immovable: true,
             bounceY:0,
             bounceX:0,
         });
         this.dallesObjects = this.map.getObjectLayer('dalles')['objects'];
         this.dallesObjects.forEach(dalleObject => {
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
            this.physics.add.collider(monster, this.mursInvisibles2);

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


        //----------débug---------------------

        //pour débugger les collisions sur chaque layer
        let debug=this.add.graphics().setAlpha(this.game.config.physics.arcade.debug?0.75:0);
        if(this.game.config.physics.arcade.debug === false){
            debug.visible=false;
        }



        //---------- parallax ciel (rien de nouveau) -------------

        this.ciel=this.add.image(3050, 1100, 'ciel');
        this.voile=this.add.image(3050, 1100, 'voile');
        this.soleils=this.add.image(3000, 1120, 'soleils');
        this.nuages=this.add.image(3000, 1120, 'nuages');
        this.arriere_plan_2=this.add.image(/*1720*/3048, /*2050*/1120, 'arriere_plan_2');
        this.arriere_plan_1=this.add.image(3050, 1110, 'arriere_plan_1');
        this.premier_plan=this.add.image(3050, 1110, 'premier_plan');
        this.premier_plan_ombre_tour=this.add.image(3050, 1110, 'premier_plan_ombre_tour');
        this.light=this.add.image(3050, 1110, 'light');
        this.plantes_arbres=this.add.image(/*5760*/3015, /*1970*/1115, 'plantes_arbres');
        this.roche_pilier=this.add.image(2600, 2075, 'roche_pilier');
        this.premiere_roche=this.add.image(1175, 2200, 'premiere_roche');
        this.rocher_devant=this.add.image(3000, 1110, 'rocher_devant');
        this.rocher_obstacle=this.add.image(1590, 2100, 'rocher_obstacle');
        //bulles de texte
        this.tuto_dash=this.add.image(300, 2000, 'tuto_dash');
        this.tuto_tp=this.add.image(1300, 2000, 'tuto_tp');
        this.tuto_enigme=this.add.image(5400, 1975, 'tuto_enigme');
        this.texte_planete_1=this.add.image(800, 2000, 'texte_planete_1');
        this.texte_planete_2=this.add.image(3000, 2000, 'texte_planete_2');





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
        this.physics.add.collider(this.player, this.mursInvisibles2);

        this.physics.add.collider(this.stars, this.devant);
        //this.physics.add.collider(this.katanaMonstersObjects, this.devant);
        //si le joueur touche une étoile dans le groupe...
        //this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);
        this.physics.add.collider(this.stars, this.player);
        //quand on touche la lave, on meurt
        //this.physics.add.collider(this.player, this.lave,this.playerDie,null,this);

        //quand on touche un checkpoint
        this.physics.add.overlap(this.player, this.checkPoints, function(player, checkPoint)
         {
             ici.saveCheckPoint(checkPoint.checkPointObject.name);
         }, null, this);





        //--------- Z order -----------------------


        //on définit les z à la fin
        let z=1000; //niveau Z qui a chaque fois est décrémenté.

        this.dalles.setDepth(1000);
        this.checkPoints.setDepth(0);
        this.Platforms.setDepth(102);
        this.PlatformsInTower.setDepth(100);
        this.PlatformsLongues.setDepth(102);
        debug.setDepth(z--);
        //this.blood.setDepth(z--);

        monstersContainer.setDepth(105);
        this.stars.setDepth(z--);
        //starsFxContainer.setDepth(z--);

        this.devant.setDepth(102);
        this.mursInvisibles.setDepth(105);
        this.mursInvisibles2.setDepth(105);

        this.player.setDepth(104);

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
        this.plantes_arbres.setDepth(107);
        this.premiere_roche.setDepth(107);
        this.roche_pilier.setDepth(107);
        this.dalles.setDepth(97);
        this.rocher_devant.setDepth(107);
        this.rocher_obstacle.setDepth(103);

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
            if(this.lecture_texte_planete===0){

                if(this.game.device.os.android || this.game.device.os.iOS){
                    //rien
                }else{
                    this.texte_planete = this.sound.add('texte_planete', {volume: 0.5});
                    this.texte_planete.play();
                }




                this.lecture_texte_planete=1;
            }
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
        if(5400<=this.player.x){
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
            //console.log("on atteint le checkpoint", checkPointName);
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
        this.cameras.main.shake(125, 0.0007);
        //console.log('smoke');
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
            this.boom=0;
            if(this.steleson===0) {
                if(this.game.device.os.android || this.game.device.os.iOS){
                    //rien
                }else{
                    this.rocks = this.sound.add('rocks', {volume: 0.5})
                    this.rocks.play();
                }


                this.steleson=1;
                this.stelesonup=0;
                //this.rocksup.stop();
            }

            this.compteur+=1;
            this.dalles.setVelocityY(10);
            this.fxFin();


            //this.player.body.velocity.y=0.2;
            //console.log(this.compteur);

            if(this.compteur===250){
                if(this.game.device.os.android || this.game.device.os.iOS){
                    //rien
                }else{
                    this.rocks.stop();
                }
                this.cameras.main.fadeOut(500, 0, 0, 0)
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () =>
                {
                    this.win();
                })


            }

        }else{
            this.steleson=0;
            if(this.compteur>0){

                if(this.game.device.os.android || this.game.device.os.iOS){
                    //rien
                }else{
                    this.rocks.stop();
                }
                this.dalles.setVelocityY(-10);
                this.compteur-=1;
                if(this.stelesonup===0) {
                    if(this.game.device.os.android || this.game.device.os.iOS){
                        //rien
                    }else{
                        this.rocksup = this.sound.add('rocksup', {volume: 0.4});
                        this.rocksup.play();
                        this.stelesonup=1;
                    }


                }



                if(this.compteur<=0){
                    this.smokeFx.play();
                    this.dalles.setVelocityY(0);
                    this.stele_boom = this.sound.add('stele_boom', {volume: 1});
                    if(this.game.device.os.android || this.game.device.os.iOS){
                        //rien
                    }else{
                        this.rocksup.stop();
                    }

                    this.time.addEvent({
                        callback: ()=>{
                            this.cameras.main.shake(175, 0.002);
                        },
                        loop: false
                    })
                    if(this.boom===0){
                        if(this.game.device.os.android || this.game.device.os.iOS){
                            //rien
                        }else{
                            this.stele_boom.play();
                        }

                        this.boom=1;
                    }

                }
                //console.log(this.compteur);

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


        if(this.player.x>=2500 && this.player.x<=2600 && this.once===0){
            if(this.game.device.os.android || this.game.device.os.iOS){
                //rien
            }else{
                this.song = this.sound.add('track', {volume: 0.5})
                this.song.play();
            }

            this.once=1;


        }
        if(this.player.x>=3150  && this.player.x<=4000){
            //this.camera.setZoom(0.5);
            this.camera.zoomTo(0.5,3000);

            this.tweens.add({
                targets:  [Tableau.current.cinqVies,Tableau.current.quatreVies,Tableau.current.troisVies,Tableau.current.deuxVies,Tableau.current.uneVies,Tableau.current.zeroVies],
                alpha:   0,
                ease:'linear',
                duration: 400
            });

            this.tweens.add({
                targets:  [Tableau.current.cinqviesGrands,Tableau.current.quatreViesGrands,Tableau.current.troisViesGrands,Tableau.current.deuxViesGrands,Tableau.current.uneViesGrands,Tableau.current.zeroViesGrands],
                delay:5250,
                alpha:   1,
                ease:'linear',
                duration: 400
            });
        }

        if(this.player.x<3150){
            //this.camera.setZoom(0.5);

            this.camera.zoomTo(1,3000);
            this.tweens.add({
                targets:  [Tableau.current.cinqVies,Tableau.current.quatreVies,Tableau.current.troisVies,Tableau.current.deuxVies,Tableau.current.uneVies,Tableau.current.zeroVies],
                delay:4000,
                alpha:   1,
                ease:'linear',
                duration: 400
            });

            this.tweens.add({
                targets:  [Tableau.current.cinqviesGrands,Tableau.current.quatreViesGrands,Tableau.current.troisViesGrands,Tableau.current.deuxViesGrands,Tableau.current.uneViesGrands,Tableau.current.zeroViesGrands],
                alpha:   0,
                ease:'linear',
                duration: 200
            });
        }


        if(this.player.x>4000 && this.player.y<=1500 /*|| this.player.x<3150*/){
            //this.camera.setZoom(1);
            this.camera.zoomTo(1,5000);
            this.tweens.add({
                targets:  [Tableau.current.cinqVies,Tableau.current.quatreVies,Tableau.current.troisVies,Tableau.current.deuxVies,Tableau.current.uneVies,Tableau.current.zeroVies],
                delay:4000,
                alpha:   1,
                ease:'linear',
                duration: 400
            });

            this.tweens.add({
                targets:  [Tableau.current.cinqviesGrands,Tableau.current.quatreViesGrands,Tableau.current.troisViesGrands,Tableau.current.deuxViesGrands,Tableau.current.uneViesGrands,Tableau.current.zeroViesGrands],
                alpha:   0,
                ease:'linear',
                duration: 200
            });
        }

        if(this.player.x>=4650 && this.player.y<=601){
            //this.camera.pan(4850, 600, 1500, 'Sine');
            this.vent.alpha=0.25;
            this.fleche_vent.alpha=0.25;
            this.vent.play();
            this.fleche_vent.play();
        }

        if(this.player.x>=4550 && this.player.y<=801){
            this.tweens.add({
                targets:  this.song,
                volume:   0,
                ease:'linear',
                duration: 1200
            });
        }

    }

    finalEvent(){


            if(this.cineStyle===0 && this.player.x>=4800 && this.player.x<5200 && this.player.y>=700 && this.player.y<2000){
                this.cineStyle=1;
                this.player.setVelocityY(150);
                this.cameras.main.startFollow(this.player, true, 0.08, 0.2);

                if(this.game.device.os.android || this.game.device.os.iOS){
                    //rien
                }else{
                    this.chutefinale = this.sound.add('chutefinale', {volume: 0.5})
                    this.chutefinale.play();
                }
                //this.player.jump();
                //this.player.anims.play('chute_left', true);
                Tableau.current.pourPlayerPlaySandOff();

                this.blackBar_top=this.add.image(0, -15, 'blackBar_top');
                this.blackBar_bottom=this.add.image(0, 15, 'blackBar_bottom');
                this.blackBar_top.setOrigin(0,0);
                this.blackBar_bottom.setOrigin(0,0);
                this.blackBar_top.setDepth(1000);
                this.blackBar_bottom.setDepth(1000);
                this.blackBar_top.setScrollFactor(0);
                this.blackBar_bottom.setScrollFactor(0);

                this.tweens.add({
                    targets: this.blackBar_bottom,

                    y: {
                        from: 50,
                        to:18,
                        duration: 750,
                        ease: 'Sine.easeInOut',
                        yoyo: -1,
                        hold:2500


                    }
                });
                this.tweens.add({
                    targets: this.blackBar_top,

                    y: {
                        from: -50,
                        to:-18,
                        duration: 750,
                        ease: 'Sine.easeInOut',
                        yoyo: -1,
                        hold:2500

                    }
                });
            }
    }

    playchara(){
        if(this.player.x>=4800 && this.player.x<5200 && this.player.y>=700 && this.player.y<2000) {
            this.player.jump();
        }
    }




    update(){
        super.update();
        this.moveParallax();
        this.finNiveau();
        //this.enigmeNiveau();
        this.fxTour();
        this.apparitionTexte();
        this.finalEvent();
        this.playchara();







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

    rebond(){
        if(this.flottant===0) {
            Tableau.current.Platforms.setVelocityY(20);
            this.time.addEvent({
                delay: 100,
                callback: () => {
                    Tableau.current.Platforms.setVelocityY(-20);
                },
                loop: false
            })
            setTimeout(function(){
                Tableau.current.Platforms.setVelocityY(0);
            },200);

            this.flottant=1;
        }

    }







}