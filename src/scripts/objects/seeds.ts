export default class Seeds extends Phaser.GameObjects.Sprite {

    constructor(scene: Phaser.Scene, x: number, y: number, type: string) {
        super(scene, x, y, 'example-object');
        scene.add.existing(this);
    }
}
