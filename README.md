# Responsive
First of all, this is based on Lennart Schoors’ [gist](https://gist.github.com/1685127), it’s totally rewritten though.
Second of all, if you fork this or plan on using this, please make your own proxy (see below), don’t use mine. :)

## What is this?
* This is a simple HTML and JS page with many iframes set to many different resolutions.
* You can set a URL and all the iframes will get reloaded.
* You can change the User Agent string, only you have to have a proxy somewhere.
* Besides that there is a simple Sinatra proxy application in the `proxy` directory.

## Why would I need this?
If you need to check a page in many different resolutions and/or User Agents, this might be for you.

## Basic Instalation
`git clone git://github.com/ollie/responsive.git` and open up the `index.html` in your browser and you are ready to go. Beware though that if you want to change the User Agent string, you will need a proxy set up that responds to `url` and `device` parameters.

## Proxy Installation
This is a [Sinatra](http://www.sinatrarb.com/) app so you will need Ruby for that.

    $ cd ./proxy
    $ bundle install   # If you don’t have bundler, run "gem install bundler" first.
    $ ruby proxy.rb    # Start the proxy, visit "http://127.0.0.1:4567/?url=http://stackoverflow.com/" to see if it works.
    # Edit ./js/app.js and point the "proxyUrl" to your local proxy:
    # proxyUrl = 'http://127.0.0.1:4567/';
    # Open the index.html page and changing the User Agent should now work for your own localhost.

## User Agents so far
Look in `proxy/proxy.rb`:

    UA = {
      :firefox_windows => 'Mozilla/5.0 (Windows NT 6.1; rv:9.0.1) Gecko/20100101 Firefox/9.0.1',
      :firefox_macosx  => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:9.0.1) Gecko/20100101 Firefox/9.0.1',
      :android_firefox => 'Mozilla/5.0 (Android; Linux armv7l; rv:9.0) Gecko/20111216 Firefox/9.0 Fennec/9.0',
      :safari_iphone4  => 'Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3',
      :safari_ipad2    => 'Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3',
    }

This should get updated sooner or later.

## Passenger Integration
I use Apache so I have a virtual host like this:

    <VirtualHost *:80>
        ServerName proxy.insert-your-server-here.com
        DocumentRoot /some-path-to-the-repo/responsive/proxy/public
        ErrorLog     /some-path-to-the-repo/responsive/proxy/log/error.log
        CustomLog    /some-path-to-the-repo/responsive/proxy/log/access.log combined
        <Directory /some-path-to-the-repo/responsive/proxy/public>
            Allow from all
            AllowOverride all
            Order allow,deny
            Options -MultiViews
        </Directory>
    </VirtualHost>

Voilà, try visting http://proxy.insert-your-server-here.com/?url=http://stackoverflow.com/