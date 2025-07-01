import * as Phaser from 'phaser';

export default class selection extends Phaser.Scene {
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  enterKey!: Phaser.Input.Keyboard.Key;
  escapeKey!: Phaser.Input.Keyboard.Key;

  constructor() {
    super('selection');
  }

  preload() {
    // アセット読み込み
    this.load.image('old_town_street', '/assets/old_town_street.jpg');
    this.load.image
  }

  create() {
    // 背景画像
    this.add.image(0, 0, 'old_town_street').setOrigin(0, 0).setDisplaySize(1024, 768);

    // キー入力設定
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
      this.escapeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }
  }

  update() {

    if (this.input.keyboard && this.input.keyboard.checkDown(this.enterKey , 500)) {
      this.scene.start('plologue')
    }
  }
}