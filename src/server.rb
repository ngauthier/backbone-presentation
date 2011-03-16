require 'rubygems'
require 'sinatra'
require 'net/http'
require 'uri'
require 'haml'
require 'twitter'
require 'oa-oauth'
use OmniAuth::Strategies::Twitter, ENV['BITTER_KEY'], ENV['BITTER_SECRET']

def config_twitter
  Twitter.configure do |config|
    config.consumer_key = ENV['BITTER_KEY']
    config.consumer_secret = ENV['BITTER_SECRET']
    config.oauth_token = session[:token]
    config.oauth_token_secret = session[:secret]
  end
end


set :public, File.dirname(__FILE__) + '/public'
set :views, File.dirname(__FILE__) + '/templates'
set :haml, :format => :html5 
enable :sessions

get '/' do
  if session[:uid]
    haml :index
  else
    redirect '/auth/twitter'
  end
end

get '/auth/twitter/callback' do
  auth_hash = request.env['omniauth.auth']
  session[:uid] = auth_hash['uid']
  session[:name] = auth_hash['user_info']['name']
  session[:token] = auth_hash['credentials']['token']
  session[:secret] = auth_hash['credentials']['secret']

  redirect '/'
end

get '/auth/failure' do
  params[:message] + "<p><a href='/'>Try again</a></p>"
end

get '/logout' do
  session[:uid] = nil
  redirect '/'
end

get '/tweets' do
  uri = URI.parse "http://api.twitter.com/1/statuses/public_timeline.json"
  Net::HTTP.get(uri)
end

