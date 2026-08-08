/* ==========================================================================
   RASTREIO DE CLIQUE — RedTrack
   Pega/recebe o clickid e injeta em TODOS os links de oferta da pagina.
   Sem isso a conversao nao e atribuida. Ajuste apenas o CONFIG abaixo.
   ========================================================================== */
(function () {
  'use strict';

  var CONFIG = {
    trackerDomain: 'https://track.healthforlifis3.online',
    campaignId: '6a6784e1880f3130000ecd1c',
    // Trecho que identifica os links de oferta no HTML:
    offerPath: '/preclick'
  };

  var params = new URLSearchParams(location.search);
  var campaignId = CONFIG.campaignId || params.get('rtkcmpid');
  var cachebuster = Math.round(Date.now() / 1000);

  /* Acrescenta clickid + cachebuster em todos os links de oferta. */
  function stampLinks(clickId) {
    document.querySelectorAll('a[href]').forEach(function (a) {
      var href = a.getAttribute('href');

      if (href.indexOf('clickid={clickid}') > -1) {
        a.href = href.replace('{clickid}', clickId) + '&rtkck=' + cachebuster;
        return;
      }

      if (href.indexOf(CONFIG.trackerDomain + CONFIG.offerPath) > -1) {
        var base = href.replace(/\/$/, '');
        a.href = base + (base.indexOf('?') > -1 ? '&' : '?') +
                 'clickid=' + clickId + '&rtkck=' + cachebuster;
      }
    });
  }

  /* Avisa o tracker que a presell foi visualizada. */
  function registerView(clickId) {
    fetch(CONFIG.trackerDomain + '/preview?clickid=' + encodeURIComponent(clickId),
          { keepalive: true }).catch(function () {});
  }

  var incomingClickId = params.get('rtkcid');

  if (incomingClickId) {
    // clickid ja veio na url — usa direto.
    stampLinks(incomingClickId);
    registerView(incomingClickId);
    return;
  }

  if (!campaignId) return;

  // Sem clickid: pede um novo ao tracker, repassando os params da url.
  var url = CONFIG.trackerDomain + '/' + campaignId + '?format=json' +
            (params.toString() ? '&' + params.toString() : '');

  fetch(url)
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) {
      if (!data || !data.clickid) return;
      stampLinks(data.clickid);
      registerView(data.clickid);
    })
    .catch(function () {});
})();
