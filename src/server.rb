require 'rubygems'
require 'sinatra'
require 'net/http'
require 'uri'
require 'haml'


set :public, File.dirname(__FILE__) + '/public'
set :views, File.dirname(__FILE__) + '/templates'
set :haml, :format => :html5 
enable :sessions

get '/' do
    haml :index
end

