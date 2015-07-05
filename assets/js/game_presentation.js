$(function() {
  var template = swig.compile($('#game-presentation-template').html());
  $.ajax({
    dataType: 'json',
    url: 'data/works.json',
    success: function(json) {
      $('#game-presentation').html(
        template({
          works: json.sort(function(a,b){return Math.random()>.5 ? -1 : 1;})  // 乱序
        })
      );
      $(window).resize();
    }
  })
});

$(window).resize(function() {
  $('.preview').each(function(i,e){
    $(e).children('.image').outerHeight(330 - $(e).children('.options').outerHeight());
  });
})