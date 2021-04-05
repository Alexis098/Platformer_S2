class ObjetEnnemi extends ObjetPhysique{ //quand le monstre touche le player, il le tue
    /**
     * Quand Player touche cet objet, il a perdu
     * @param {Tableau} scene
     * @param {Number} x
     * @param {Number} y
     * @param {string} image
     */
    constructor(scene, x, y,image) {
        super(scene, x, y,image);
        scene.physics.add.overlap(
            scene.player,
            this,
            scene.hitMonster,
            null,
            scene
        );
    }
}