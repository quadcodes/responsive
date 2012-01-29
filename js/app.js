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
  var form          = $('form'),
      urlInput      = $('#url'),
      deviceSelect  = $('#device'),
      iframes       = $('iframe'),
      proxyUrlInput = $('#proxy-url');

  form.submit(function(e){
    e.preventDefault();
    var url      = urlInput.val(),
        device   = deviceSelect.val(),
        proxy    = device,
        proxyUrl = proxyUrlInput.val();

    if ( !url ) return;
    if ( !url.match(/^https?:\/\//) ) url = 'http://' + url;
    if ( device && proxyUrl ) url = proxyUrl + '?url=' + escape(url) + '&device=' + escape(device);

    iframes.each(function(){
      $(this).attr('src', url);
    });
  });
}