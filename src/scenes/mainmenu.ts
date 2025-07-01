import * as Phaser from 'phaser';

export default class MainMenu extends Phaser.Scene {
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  enterKey!: Phaser.Input.Keyboard.Key;
  escapeKey!: Phaser.Input.Keyboard.Key;

  constructor() {
    super('myscene');
  }

  preload() {
    // アセット読み込み
    this.load.image('mainMenu', '/assets/mainMenu.jpg');
  }

  create() {
    // 背景画像
    this.add.image(0, 0, 'mainMenu').setOrigin(0, 0).setDisplaySize(1024, 768);

    // タイトルテキスト
    this.add.text(400, 200, 'DOKIDOKI!ROMANCEAI', {
      fontFamily: 'chunk',
      fontSize: '64px',
      color: 'white'
    }).setOrigin(0.5);

    const blinkText = this.add.text(512, 700, 'Pless Enter Key', {
      fontFamily: "chunk",
      fontSize: '32px',
      color: 'Blue'
    }).setOrigin(0.5);

    this.tweens.add({
      targets: blinkText,
      alpha: 0,
      duration: 1000,
      yoyo: true,
      repeat: -1
    })

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