$(document).ready(function(){
  //focusOnUrlField();
  doIt();
});

function focusOnUrlField()
{
  $('#url').focus();
}

function doIt()
{
  var form         = $('form'),
      urlInput     = $('#url'),
      deviceSelect = $('#device'),
      iframes      = $('iframe'),
      proxyUrl     = 'http://proxy.oldrichvetesnik.cz/'; // Please use your own proxy if possible.
      //proxyUrl     = 'http://127.0.0.1:4567/'; // Uncomment this if you use local proxy.

  form.submit(function(e){
    e.preventDefault();
    var url    = urlInput.val(),
        device = deviceSelect.val();

    if ( !url ) return;
    if ( !url.match(/^https?:\/\//) ) url = 'http://' + url;
    if ( device && proxyUrl ) url = proxyUrl + '?url=' + escape(url) + '&device=' + escape(device);

    iframes.each(function(){
      $(this).attr('src', url);
    });
  });
}