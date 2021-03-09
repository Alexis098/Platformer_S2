class TableauTiled extends Tableau{

    preload() {
        super.preload();
        this.load.image('background', 'assets/tilemaps/background.png');
        
       
        this.load.image('tiles', 'assets/tilemaps/platformPack_tilesheet.png');
      
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/Tableau_Tiled.json');
    }
    create() {
        super.create();

        let ici=this;

        this.backgroundImage = this.add.image(0, 0,'background').setOrigin(0, 0);
        this.backgroundImage.setScale(2, 0.8);
        this.map = this.make.tilemap({ key: 'map' });
        this.tileset = this.map.addTilesetImage('platformPack_tilesheet', 'tiles');
        //const platforms = map.createLayer('Platforms', tileset, 0, 200);

       //on définit la taille du tableau
       let largeurDuTableau=2000;
       let hauteurDuTableau=600; //la hauteur est identique au cadre du jeu
       this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
       this.physics.world.setBounds(0, -64, largeurDuTableau,  hauteurDuTableau);

       this.cameras.main.startFollow(this.player, false, 0.05, 0.05);
    }
}