import * as Phaser from 'phaser';
import run from '../geminiSetup.ts'

export default class akaneScene extends Phaser.Scene {
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  enterKey!: Phaser.Input.Keyboard.Key;
  escapeKey!: Phaser.Input.Keyboard.Key;

  constructor() {
    super('akaneScene');
  }

  preload() {
    this.textures.remove('old_town_street')//old_town_streetのキャッシュを削除
    this.load.spritesheet('akane_nata', '/assets/akane_nata.png', {
      frameWidth: 1080,
      frameHeight: 1080
    });
    this.load.image('stump', 'assets/kirikabu_01.png')
  }

  create() {
    // 背景画像
    this.add.image(0, 0, 'mainMenu').setOrigin(0, 0).setDisplaySize(1024, 768);

    this.add.image(760, 550, 'stump').setScale(0.2)

    this.anims.create({
      key: 'bunbun',
      frames: this.anims.generateFrameNumbers('akane_nata', {
        start: 0,   // 開始フレーム番号
        end: 6      // 終了フレーム番号（画像による）
      }),
      frameRate: 10,   // 毎秒フレーム数
      repeat: -1       // -1で無限ループ
    });

    const akane = this.add.sprite(800, 470, 'akane_nata').setScale(0.2);
    akane.play('bunbun');

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

async function testGemini(prompt: string) {
  const response = await run(prompt);
  console.log(response);
}
testGemini("こんにちは");
