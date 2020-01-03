require 'stripe'
require 'sinatra'
set :public_folder, File.dirname(__FILE__)


Stripe.api_key = 'sk_test_DuAv1GHHwvjmKACrSjToCM1y'

get '/' do
    erb :index
end

get '/about' do
    erb :about
end

get '/stripe' do
    erb :stripe
end

get '/contact' do
    erb :contact
end

post '/charge' do
    token = params[:stripeToken]
    begin
        @charge = Stripe::Charge.create({
            amount: 100,
            currency: 'eur',
            description: 'Random charge',
            source: token,
        })
        rescue Stripe::StripeError => @error
            return erb :charge_failure
    end
    erb :charge_success
end