require 'sinatra'
require 'open-uri'

set :protection, :except => :frame_options # Turn off the X-Frame-Options header to be able to display iframe contents

UA = {
  :firefox_windows => 'Mozilla/5.0 (Windows NT 6.1; rv:9.0.1) Gecko/20100101 Firefox/9.0.1',
  :firefox_macosx  => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:9.0.1) Gecko/20100101 Firefox/9.0.1',
  :android_firefox => 'Mozilla/5.0 (Android; Linux armv7l; rv:9.0) Gecko/20111216 Firefox/9.0 Fennec/9.0',
  :safari_iphone4  => 'Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3',
  :safari_ipad2    => 'Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3',
}

get '/' do
  return unless url = params[:url]
  uri = URI.parse url
  device = params[:device] ? params[:device].to_sym : nil

  options = {
    'Host' =>         uri.host.to_s,
    'User-Agent'      => env['HTTP_USER_AGENT'].to_s,
    'Accept'          => env['HTTP_ACCEPT'].to_s,
    'Accept-Language' => env['HTTP_ACCEPT_LANGUAGE'].to_s,
    'Accept-Charset'  => env['HTTP_ACCEPT_CHARSET'].to_s,
    'Connection'      => env['HTTP_CONNECTION'].to_s,
    'Cookie'          => env['HTTP_COOKIE'].to_s,
    'Cache-Control'   => env['HTTP_CACHE_CONTROL'].to_s,
  }

  options['User-Agent'] = UA[device] if device && UA[device]

  res = open(uri.to_s, options).read
  res.gsub!( %r{(href|src)=(['"])(/[^"']+)(['"])}, "\\1=\\2#{ uri.to_s.gsub(%r{/$}, '') }\\3\\4" )
  res
end