require 'sinatra'
require 'json'
require "bundler/setup"

get '/' do
  'Hello world!'
end

get '/example.json' do
  content_type :json
  { :key1 => 'value1', :key2 => 'value2' }.to_json
end