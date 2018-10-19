$(document).ready(function(){
  // header + nav should appx. fill screen on home page
  var h = $(window).height();
  var w = $(window).width();
  var r = 1.8 * w;
  if (r > h){
    $('body.home header').height(h);
  } else {
    $('body.home header').height(r);
  }
});
