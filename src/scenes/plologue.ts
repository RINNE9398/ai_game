import * as Phaser from 'phaser';

export default class plologue extends Phaser.Scene {
  constructor() {
    // Phaser.Sceneのコンストラクタにはstringかオブジェクト（Phaser.Types.Scenes.SettingsConfig）を渡す
    // 以下は { key: 'plologue' } を渡したのと同義になる
    super('plologue');
  }

  preload() {
    // アセット読み込み
    this.load.image('mainMenu', '/assets/mainMenu.jpg');
  }

  create() {
    // 画面中央に画像とテキストを配置
    this.add.image(0, 0, 'mainMenu').setOrigin(0,0).setDisplaySize(1024,768);

      // テキストボックスのサイズと位置
  const boxWidth = 700;
  const boxHeight = 500;
  const boxX = 200; // 左上X
  const boxY = 30; // 左上Y

  // 青枠付きの四角形を描画
  const graphics = this.add.graphics();

  // 灰色で塗りつぶし（例: 0x444444, 透明度0.8）
  graphics.fillStyle(0x444444, 0.8);
  graphics.fillRoundedRect(boxX, boxY, boxWidth, boxHeight, 20);

  graphics.lineStyle(4, 0x2196f3, 1); // 青色, 太さ4
  graphics.strokeRoundedRect(boxX, boxY, boxWidth, boxHeight, 20); // 角丸20

  // テキストをボックス中央に配置
    const blinkText = this.add.text(boxX + boxWidth/2, boxY + boxHeight/2, 'AIと対話して、あなたの物語を紡ぎましょう。\nどんな恋が始まるのかは、あなた次第です。', {
        fontFamily: 'chunk',
        fontSize: '32px',
        color: '#ffffff',
        align: 'center',
        wordWrap: { width: boxWidth - 40 }
    }).setOrigin(0.5);

        this.tweens.add({
      targets: blinkText,
      alpha: 0,
      duration: 1000,
      yoyo: true,
      repeat: -1
    })

    // 何かキーが押されたらテキストボックスとテキストをフェードアウトして次のシーンへ
    this.input.keyboard?.on('keydown', () => {
    // テキストとボックスをまとめてフェードアウト
      this.tweens.add({
        targets: [graphics, blinkText],
        alpha: 0,
        duration: 800,
        onComplete: () => {
          this.scene.start('selection'); // 'selection'シーンに遷移
        }
    });
  });
}
}