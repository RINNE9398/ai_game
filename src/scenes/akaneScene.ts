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
    // アセット読み込み
    this.load.image('mainMenu', '/assets/mainMenu.jpg');
  }

  create() {
    // 背景画像
    this.add.image(0, 0, 'mainMenu').setOrigin(0, 0).setDisplaySize(1024, 768);

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
