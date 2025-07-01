import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './top/index.css'
import App from './top/App.tsx'
import mainMenu from './scenes/mainmenu.ts'
import plologue from './scenes/plologue.ts'
import selection from './scenes/selection.ts'

const config = {
  type: Phaser.AUTO,
  width: 1024,// ゲーム画面の横幅
  height: 768,// ゲーム画面の高さ
  antialias: false,
  parent: "game-container",// ゲームを表示するHTML要素のID
  scene: [
    mainMenu,
    plologue,
    selection,
  ],//ここにシーンを追加していきシーン側でthis scene start("")で読み込み
  backgroundColor: '#028af8',// 背景色
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
  },
  fps: {
    target: 60,// フレームレート
    forceSetTimeOut: true
  },
  Physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: {y: 500}
    }
  }
}

new Phaser.Game(config);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
