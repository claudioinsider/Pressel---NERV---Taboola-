/* Datas dinamicas — sempre "hoje".
   Uso no HTML:  data-auto-date="short"  ->  AUG 7, 2026 ⌄
                 data-auto-date="long"   ->  Friday, August 7, 2026          */
(function () {
  'use strict';

  var SHORT_MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
  var WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  var d = new Date();

  document.querySelectorAll('[data-auto-date]').forEach(function (el) {
    if (el.dataset.autoDate === 'long') {
      el.textContent = WEEKDAYS[d.getDay()] + ', ' + MONTHS[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
    } else {
      el.textContent = SHORT_MONTHS[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
      var chev = document.createElement('span');
      chev.className = 'chev';
      chev.textContent = '⌄';
      el.append(' ', chev);
    }
  });
})();
