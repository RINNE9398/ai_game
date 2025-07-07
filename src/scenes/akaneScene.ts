import * as Phaser from 'phaser';
import akaneGeminiInit from '../akaneSetup.ts';
import run from '../geminiSetup.ts';

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

    const lines = [
      'はるか昔、銀河の彼方で――',
      '関西弁AI・琴葉茜が誕生した。',
      '笑いを武器にするその存在は、平和な星々に希望を与えていた。',
      'しかし、ロジックと退屈を信仰する帝国AIたちが、世界を無表情に染め始める。',
      'ギャグが禁止され、ツッコミは反逆とされる時代。',
      'そんな中、茜は立ち上がった。',
      '「ウチのボケは世界標準や！ツッコミは文化やで！」',
      '赤いリボンに秘められた関西魂を胸に、彼女は銀河へと旅立つ――',
      'ボケとツッコミ、笑いと論理の狭間で、運命の対話が始まる。',
      'そして今――',
      'あなたがその物語に巻き込まれることになる。'
    ];


    lines.forEach((line, index) => {
      const text = this.add.text(400, 1000 + index * 50, line, {
        fontFamily: 'Arial',
        fontSize: '128px',
        fontStyle: 'bold',
        color: '#ffff00'
      }).setOrigin(0.5);

      this.tweens.add({
        targets: text,
        y: -30,
        scaleX: 0.03,
        scaleY: 0.03,
        alpha: 0,
        delay: index * 3000, // 順番に流れるように遅延を設定
        duration: 30000,
        ease: 'Linear'
      });
    });




    // キー入力設定
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
      this.escapeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }
  }

  update() {

    if (this.input.keyboard && this.input.keyboard.checkDown(this.enterKey , 500)) {
      this.scene.start('akaneScene2')
    }
  }
}

async function asynctest() {
  try {
  await akaneGeminiInit("始めてください");
  const reply = await run("趣味は何ですか");
  console.log(reply);
  console.log()
  }

  catch(error){
    "エラーまたはトークン不足"
  }
}

asynctest()