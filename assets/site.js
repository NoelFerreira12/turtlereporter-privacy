(function () {
  var root = document.documentElement;
  if (!root.hasAttribute('data-bilingual')) return;

  function apply(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang === 'en' ? 'en' : 'pt-PT');
    var buttons = document.querySelectorAll('[data-set-lang]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', String(buttons[i].getAttribute('data-set-lang') === lang));
    }
    var title = root.getAttribute('data-title-' + lang);
    if (title) document.title = title;
    try { localStorage.setItem('turtlereporter-lang', lang); } catch (e) {}
  }

  var saved = null;
  try { saved = localStorage.getItem('turtlereporter-lang'); } catch (e) {}
  var browser = (navigator.language || 'pt').toLowerCase();
  apply(saved === 'en' || saved === 'pt' ? saved : (browser.indexOf('pt') === 0 ? 'pt' : 'en'));

  document.addEventListener('click', function (event) {
    var target = event.target.closest ? event.target.closest('[data-set-lang]') : null;
    if (target) apply(target.getAttribute('data-set-lang'));
  });
})();
