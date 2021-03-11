class TableauTiled extends Tableau{

    preload() {
        super.preload();
        this.load.image('background', 'assets/images/background.png');
        this.load.image('spike', 'assets/images/spike.png');
        // At last image must be loaded with its JSON
        this.load.atlas('player', 'assets/images/kenney_player.png','assets/images/kenney_player_atlas.json');
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');
        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/level1.json');
    }
    create() {
        super.create();

        let ici=this;

        const backgroundImage = this.add.image(0, 0,'background').setOrigin(0, 0);
        backgroundImage.setScale(2, 0.8);
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('kenney_simple_platformer', 'tiles');

        this.backgroundImage = this.add.image(0, 0,'background').setOrigin(0, 0);
        this.backgroundImage.setScale(2, 0.8);
        this.map = this.make.tilemap({ key: 'map' });
        this.tileset = this.map.addTilesetImage('platformPack_tilesheet', 'tiles');
        //const platforms = map.createLayer('Platforms', tileset, 0, 200);
        const platforms = map.createStaticLayer('Platforms', tileset, 0, 200);

       //on définit la taille du tableau
       let largeurDuTableau=2000;
       let hauteurDuTableau=600; //la hauteur est identique au cadre du jeu
       this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
       this.physics.world.setBounds(0, -64, largeurDuTableau,  hauteurDuTableau);

       this.cameras.main.startFollow(this.player, false, 0.05, 0.05);
    }
}