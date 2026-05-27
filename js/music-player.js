/**
 * Jackie's Blog - 本地音乐播放
 * 简单的播放/暂停按钮，放在右下角设置面板旁
 */
(function () {
  'use strict';

  // 配置：音乐文件路径列表
  // 将 /music/ 下的 mp3 文件列出来，如果后续有多个可以扩展为随机播放
  var TRACKS = [
    '/music/Theme Of Laura.mp3'
  ];

  var currentTrack = 0;
  var isPlaying = false;
  var audio = null;

  // 播放按钮图标
  var ICON_PLAY = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
  var ICON_PAUSE = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';

  function createMusicButton() {
    // 检查是否已存在
    document.getElementById('music-toggle')?.remove();

    var btn = document.createElement('div');
    btn.id = 'music-toggle';
    btn.className = 'music-toggle-btn rightside-icon';
    btn.innerHTML = ICON_PLAY;
    btn.title = '播放音乐';
    btn.setAttribute('role', 'button');
    btn.setAttribute('aria-label', '播放/暂停音乐');

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      togglePlay();
    });

    // 插入到设置面板 (#rightside-config-hide) 内部，#hide-aside-btn 之后
    var rightsideHide = document.getElementById('rightside-config-hide');
    if (rightsideHide) {
      rightsideHide.appendChild(btn);
    } else {
      // fallback: 插入到回到顶部按钮之前
      var goUp = document.getElementById('go-up');
      if (goUp && goUp.parentNode) {
        goUp.parentNode.insertBefore(btn, goUp);
      } else {
        btn.style.position = 'fixed';
        btn.style.right = '30px';
        btn.style.bottom = '90px';
        btn.style.top = 'auto';
        document.body.appendChild(btn);
      }
    }
  }

  function togglePlay() {
    var btn = document.getElementById('music-toggle');
    if (!btn) return;

    if (!audio) {
      audio = new Audio(TRACKS[currentTrack]);
      audio.volume = 0.6;
      audio.addEventListener('ended', function () {
        // 单曲循环
        audio.currentTime = 0;
        audio.play();
      });
    }

    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      btn.innerHTML = ICON_PLAY;
      btn.title = '播放音乐';
      btn.classList.remove('playing');
    } else {
      audio.play().then(function () {
        isPlaying = true;
        btn.innerHTML = ICON_PAUSE;
        btn.title = '暂停音乐';
        btn.classList.add('playing');
      }).catch(function () {
        // 浏览器阻止自动播放，需要用户手动触发
      });
    }
  }

  // DOM ready
  function init() {
    if (TRACKS.length === 0) return;
    createMusicButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
