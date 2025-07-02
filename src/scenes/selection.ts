import * as Phaser from 'phaser';

export default class selection extends Phaser.Scene {
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  enterKey!: Phaser.Input.Keyboard.Key;
  escapeKey!: Phaser.Input.Keyboard.Key;
  selectedIndex: number = 0;//選択中のキャラのインデックス
  characterImages: Phaser.GameObjects.Image[] = [];


  constructor() {
    super('selection');
  }

  preload() {
    // アセット読み込み
    this.load.image('old_town_street', '/assets/old_town_street.jpg');
    this.load.image('zenAkane01', '/新琴葉姉妹/琴葉茜_キャラ素材/全/01.png')
    this.load.image('zenAoi01', '新琴葉姉妹/琴葉葵_キャラ素材/全/01.png')
    this.load.image('zenKiritan01', 'kiritan_pixel/sample/kiritan_001.png')
  }

  create() {
  this.lights.enable().setAmbientColor(0x555555);
  this.add.image(0, 0, 'old_town_street').setOrigin(0, 0).setDisplaySize(1024, 768);

  // ボックスのサイズと位置
  const boxWidth = 250;
  const boxHeight = 400;
  const boxY = 200;
  const boxMargin = 30;

  // 1つ目のボックス（左）
  const box1X = 107;
  // 2つ目のボックス（中央）
  const box2X = box1X + boxWidth + boxMargin;
  // 3つ目のボックス（右）
  const box3X = box2X + boxWidth + boxMargin;

  // グラフィックスで黒いボックスを3つ描画
  const graphics = this.add.graphics();
  graphics.fillStyle(0x444444, 0.7);
  graphics.fillRoundedRect(box1X, boxY, boxWidth, boxHeight, 20);
  graphics.fillRoundedRect(box2X, boxY, boxWidth, boxHeight, 20);
  graphics.fillRoundedRect(box3X, boxY, boxWidth, boxHeight, 20);

  // 人物画像をボックスの中央に重ねて配置
// 画像生成時
this.characterImages = [
  this.add.image(box1X + boxWidth / 2, boxY + boxHeight / 2, 'zenAkane01').setOrigin(0.5).setScale(0.53).setPipeline('Light2D'),
  this.add.image(box2X + boxWidth / 2, boxY + boxHeight / 2, 'zenAoi01').setOrigin(0.5).setScale(0.53).setPipeline('Light2D'),
  this.add.image(box3X + boxWidth / 2, boxY + boxHeight / 2, 'zenKiritan01').setOrigin(0.5).setScale(0.70).setPipeline('Light2D')
];
  //画像の配列を作成
  // this.add.image(box3X + boxWidth / 2, boxY + boxHeight / 2, 'キャラ画像キー').setOrigin(0.5, 0.5).setScale(0.7);

    // キャラクター選択テキストの背景色付きラベルを作成
    const labelBg = this.add.graphics();
    const labelWidth = 700;
    const labelHeight = 50;
    const labelX = 512 - labelWidth / 2;
    const labelY = 40 - labelHeight / 2;

    // 半透明の黒背景（透明度0.7）
    labelBg.fillStyle(0x000000, 0.7);
    labelBg.fillRoundedRect(labelX, labelY, labelWidth, labelHeight, 16);

    // テキスト（中央揃え）
    this.add.text(500, 40, 'キャラクターを選んでください', {
      fontFamily: 'chunk',
      fontSize: '32px',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: labelWidth - 40 }
    }).setOrigin(0.5);


    // キー入力設定
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
      this.escapeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    this.highlightSelected();
  }

highlightSelected() {
  // ライトを一度クリア
  this.lights.lights.forEach(light => this.lights.removeLight(light));

  this.characterImages.forEach((img, idx) => {
    if (idx === this.selectedIndex) {
      this.lights.addLight(img.x, img.y, 200).setIntensity(2).setColor(0xffffaa);
      img.setTint(0xffff66);
    } else {
      img.clearTint();
    }
  });
}


  update() {
    // 左右キーで選択
    if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
      this.selectedIndex = (this.selectedIndex + this.characterImages.length - 1) % this.characterImages.length;
      this.highlightSelected();
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
      this.selectedIndex = (this.selectedIndex + 1) % this.characterImages.length;
      this.highlightSelected();
    }

    // Enterキーで選択したキャラのシーンへ
    if (this.input.keyboard && this.input.keyboard.checkDown(this.enterKey, 500)) {
      if (this.selectedIndex === 0) {
        this.scene.start('akaneScene'); // 茜のシーンへ
      } else if (this.selectedIndex === 1) {
        this.scene.start('aoiScene'); // 葵のシーンへ
      } else if (this.selectedIndex === 2) {
        this.scene.start('kiritanScene'); // きりたんのシーンへ
      }
    }
  }
}