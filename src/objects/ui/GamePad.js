/**
 * Un objet qui écoute les touches du clavier et mouvements sur le pad et qui influent le déplacement du joueur
 */
class GamePad extends Phaser.GameObjects.Container{
    constructor(scene, x, y,size=100) {
        super(scene, x, y)


        scene.add.existing(this);



        this.size=size;
        let w=this.size;
        let dragW=this.size/2;
        let pad2=scene.add.container();

        let circle=scene.add.circle(-700,0,this.size/2,0xffffff,0.1)
        let circleDrag=scene.add.circle(-700,0,dragW/2,0xffffff,0.3)
        this.add(pad2);
        pad2.add(circle);
        pad2.add(circleDrag);
        pad2.x=w/2;
        pad2.y=w/2;

        circleDrag.setInteractive();
        scene.input.setDraggable(circleDrag, true);

        this.cursors = scene.input.keyboard.createCursorKeys();

        scene.input.keyboard.on('keydown', function(kevent){
            switch (kevent.key){
                case "ArrowRight":
                    Tableau.current.player.directionX=1;
                    break;

                case "ArrowLeft":
                    Tableau.current.player.directionX=-1;
                    break;

                case "ArrowUp":
                    Tableau.current.player.directionY=-1;
                    break;

                case "ArrowDown":
                    Tableau.current.player.directionY=1;
                    break;
                case "SPACE":
                    Tableau.current.player.dash();
                    break;
            }
        });
        scene.input.keyboard.on('keyup', function(kevent){
            switch (kevent.key){
                case "ArrowRight":
                    Tableau.current.player.directionX=0;
                    break;

                case "ArrowLeft":
                    Tableau.current.player.directionX=0;
                    break;

                case "ArrowUp":
                    Tableau.current.player.directionY=0;
                    break;

                case "ArrowDown":
                    Tableau.current.player.directionY=0;
                    break;
            }
        });

        circleDrag.on('drag', (pointer, dragX, dragY) => {
            circleDrag.x = dragX
            circleDrag.y = dragY
            circleDrag.x=Phaser.Math.Clamp(dragX,-w/2-700,w/2-700);
            circleDrag.y=Phaser.Math.Clamp(dragY,-w/2,w/2);
            if(dragX < (-w / 4) -700){
                Tableau.current.player.directionX=-1;
            }else if(dragX > (w / 4)-700){
                Tableau.current.player.directionX=1;
            }else{
                Tableau.current.player.directionX=0;
            }
            /*if(dragY < -w / 4){
                Tableau.current.player.directionY=-1;
            }else if(dragY > w / 4){
                Tableau.current.player.directionY=1;
            }else{
                Tableau.current.player.directionY=0;
            }*/

        });
        circleDrag.on('dragend', (pointer, dragX, dragY) => {
            circleDrag.x = -700;
            circleDrag.y = 0;
            Tableau.current.player.directionX=0;
            Tableau.current.player.directionY=0;
        });



        let btnUP=scene.add.circle(0,0,w/4,0xffffff,0.3).setInteractive();
        let btnLEFT=scene.add.circle(0,0,w/4,0xffffff,0.3).setInteractive();
        let btnRIGHT=scene.add.circle(0,0,w/4,0xffffff,0.3).setInteractive();





        this.add(btnUP);
        this.add(btnLEFT);
        this.add(btnRIGHT);




        btnUP.x=w*0.4;
        btnUP.y=w*0.3;
        btnLEFT.x=w*0;
        btnRIGHT.x=w*0.8;
        btnLEFT.y=w*0.9;
        btnRIGHT.y=w*0.9;



        btnLEFT.on('pointerdown',function(){
            Tableau.current.player.dash();
            Tableau.current.dsh()
        });
        btnRIGHT.on('pointerdown',function(){
            Tableau.current.player.teleportation();
            Tableau.current.tp();
        });
        btnUP.on('pointerdown',function(){
            Tableau.current.player.directionY=-1;
        });


        btnLEFT.on('pointerup',function(){
            Tableau.current.player.directionX=0;
        });
        btnRIGHT.on('pointerup',function(){
            Tableau.current.player.directionX=0;
        });
        btnUP.on('pointerup',function(){
            Tableau.current.player.directionY=-0;
        });





    }


}