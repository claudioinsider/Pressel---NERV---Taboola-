/* Datas dinâmicas da página (sempre exibem a data atual do visitante) */
(function () {
  var d = new Date()

  // Data do artigo — "AUG 4, 2026 ⌄"
  var articleDate = document.getElementById("articleDate")
  if (articleDate) {
    var monthsShort = [
      "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
      "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
    ]
    articleDate.innerHTML =
      monthsShort[d.getMonth()] +
      " " +
      d.getDate() +
      ", " +
      d.getFullYear() +
      ' <span class="chev">&#8964;</span>'
  }

  // Data do aviso de urgência — "Tuesday, August 4, 2026"
  var vidwarnDate = document.getElementById("vidwarnDate")
  if (vidwarnDate) {
    var weekdays = [
      "Sunday", "Monday", "Tuesday", "Wednesday",
      "Thursday", "Friday", "Saturday",
    ]
    var monthsLong = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ]
    vidwarnDate.textContent =
      weekdays[d.getDay()] +
      ", " +
      monthsLong[d.getMonth()] +
      " " +
      d.getDate() +
      ", " +
      d.getFullYear()
  }
})()
