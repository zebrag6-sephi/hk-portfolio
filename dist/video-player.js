(() => {
  const button = document.querySelector('#video-play');
  const preview = document.querySelector('.video-preview');
  const mount = document.querySelector('#video-mount');
  const status = document.querySelector('#video-status');
  if (!button || !preview || !mount) return;
  let player, timer, failed = false;
  const fallback = () => {
    if (failed) return;
    failed = true;
    clearTimeout(timer);
    if (player && typeof player.destroy === 'function') player.destroy();
    mount.hidden = true;
    preview.hidden = false;
    button.hidden = true;
    status.textContent = '이 브라우저에서는 영상 재생을 연결할 수 없습니다. 미리보기를 눌러 YouTube에서 감상해 주세요.';
    preview.focus();
  };
  button.hidden = false;
  button.addEventListener('click', () => {
    button.disabled = true;
    status.textContent = '영상을 불러오는 중입니다…';
    timer = setTimeout(fallback, 20000);
    const start = () => {
      if (failed) return;
      const iframe = document.createElement('iframe');
      iframe.title = '2026년 ComfyUI 깊게 공부하지 않아도 됩니다';
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      const params = new URLSearchParams({enablejsapi: '1', playsinline: '1', rel: '0', origin: location.origin});
      iframe.src = 'https://www.youtube-nocookie.com/embed/QaxFdb8AYcY?' + params;
      mount.replaceChildren(iframe);
      preview.hidden = true;
      mount.hidden = false;
      player = new YT.Player(iframe, {events: {
        onReady: event => {
          if (failed) return;
          clearTimeout(timer);
          button.hidden = true;
          status.textContent = '';
          event.target.playVideo();
        },
        onStateChange: event => {
          if (event.data === 1) {
            const music = document.querySelector('#site-music');
            if (music) music.pause();
            const toggle = document.querySelector('#music-toggle');
            if (toggle) {
              toggle.setAttribute('aria-pressed', 'false');
              toggle.querySelector('.music-state').textContent = '음악 켜기';
              toggle.querySelector('.music-icon').textContent = '♪';
            }
          }
        },
        onError: fallback
      }});
    };
    if (window.YT && window.YT.Player) start();
    else {
      window.onYouTubeIframeAPIReady = start;
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.onerror = fallback;
      document.head.append(script);
    }
  }, {once: true});
})();
