$(document).ready(function() {
  focusOnUrlField();
  initReloader();
  initProportionsChanger();
});

function focusOnUrlField()
{
  $('#url').focus();
}

function initReloader()
{
  var form         = $('form'),
      urlInput     = $('#url'),
      deviceSelect = $('#device'),
      iframe       = $('iframe'),
      proxyUrl     = 'http://proxy.oldrichvetesnik.cz/'; // Please use your own proxy if possible.
      //proxyUrl     = 'http://127.0.0.1:4567/'; // Uncomment this if you use local proxy.

  form.submit(function(e) {
    e.preventDefault();
    var url    = urlInput.val(),
        device = deviceSelect.val();

    if ( !url ) return;
    if ( !url.match(/^https?:\/\//) ) url = 'http://' + url;
    if ( device && proxyUrl ) url = proxyUrl + '?url=' + escape(url) + '&device=' + escape(device);

    iframe.attr('src', url);
  });
}

function initProportionsChanger()
{
  $('.switches a').click(function(e) {
    e.preventDefault();
    var link   = $(this),
        frame  = $('.frame'),
        iframe = frame.find('iframe');

    // Only switch width & height
    if ( link.hasClass('orientation') )
    {
      var width  = iframe.attr('height'),
          height = iframe.attr('width'),
          text   = width + ' \u00d7 ' + height;
    }
    // Change the resolution
    else
    {
      // Mark current item
      link.parents('ul').find('a.resolution').removeClass('active');
      link.addClass('active');

      var width  = link.attr('data-width'),
          height = link.attr('data-height'),
          text   = link.html();
    }

    frame.css('width', width);
    iframe.css({ width: width, height: height });
    frame.find('h2').html(text);
    iframe.attr('width', width);
    iframe.attr('height', height);
    document.title = document.title.replace(/\(.*\)/, '(' + text + ')');
  });
}