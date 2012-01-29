require 'sinatra'
require './proxy'

root_dir = File.dirname(__FILE__)

set :environment, :production
set :root,  root_dir
set :protection, :except => :frame_options # Turn off the X-Frame-Options header to be able to display iframe contents
disable :run
set :raise_errors, true

FileUtils.mkdir_p 'log' unless File.exists?('log')
log = File.new("log/sinatra.log", "a")
$stdout.reopen(log)
$stderr.reopen(log)

run Sinatra::Application