class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "player")
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setBounce(0.3);
        this.setGravityY(700)
        this.setFriction(1,1);

        this.setBodySize(this.body.width-4,this.body.height);
        this.setOffset(0, 0);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'stance',
            frames: this.anims.generateFrameNumbers('player_stance', { start: 4, end: 7  }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'back',
            frames: this.anims.generateFrameNumbers('player_stance', { start: 0, end: 3  }),
            frameRate: 5,
            repeat: -1
        });


        /*this.anims.create({
            key: 'back',
            frames: [ { key: 'player', frame: 1 } ],
            frameRate: 20
        });*/

        this._directionX=0;
        this._directionY=0;

    }

    set directionX(value){
        this._directionX=value;
    }
    set directionY(value){
        this._directionY=value;
    }

    /**
     * arrête le joueur
     */
    stop(){
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.directionY=0;
        this.directionX=0;
    }

    /**
     * Déplace le joueur en fonction des directions données
     */
    move(){

        let sens = 1;

        switch (true){
            case this._directionX<0:
                this.sens=-1;
                this.setVelocityX(-160);
                this.anims.play('left', true);
                break;
            case this._directionX>0:
                this.sens=1;
                this.setVelocityX(160);
                this.anims.play('right', true);
                break;
            default:
                this.setVelocityX(0);
                this.anims.play('stance', true);
                /*if(this.sens=-1){
                    this.anims.play('back',true);
                } if(this.sens=1){
                this.anims.play('stance', true);
            }*/

        }



        if(this._directionY<0){ //gère la hauteur du saut du perso
            if(this.body.blocked.down || this.body.touching.down){
                this.setVelocityY(-500);
            }
        }


    }


} 