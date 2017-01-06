var item_url = "http://librarylab.law.harvard.edu/roundup/api/item";
$(document).ready(function() {

  showHopper();

});

function showHopper() {
  $.getJSON(item_url + '/recent?items=5&callback=?', function(data) {
    var items = [];
    $.each(data.items, function(key, val) {
      items.push('<div class="post"><div class="date"> ' + val.date + '</div><div class="content"><strong class="title"><a href="' + val.link + '">' + val.title + '</a></strong><span class="logline">' + val.description + '</span></div><div class="author">' + val.creator + '</div></div>');
    });
    var roundup = items.join('');
    $('#hopper').html(roundup);
  });
}
