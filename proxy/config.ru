require 'sinatra'
require './proxy'

root_dir = File.dirname(__FILE__)

set :environment, :production
set :root,  root_dir
disable :run
set :raise_errors, true

FileUtils.mkdir_p 'log' unless File.exists?('log')
log = File.new("log/sinatra.log", "a")
$stdout.reopen(log)
$stderr.reopen(log)

run Sinatra::Application