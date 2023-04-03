(function() {
  // from https://stackoverflow.com/a/11744120
  var win = window,
    doc = document,
    docElem = doc.documentElement,
    body = doc.getElementsByTagName('body')[0],
    x = win.innerWidth || docElem.clientWidth || body.clientWidth,
    y = win.innerHeight|| docElem.clientHeight|| body.clientHeight;
  var r = 1.8 * x;
  var header = document.querySelector('header')
  if (r > y){
    header.style.height = y + "px";
  } else {
    header.style.height = r + "px";
  }
})();
