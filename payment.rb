require 'stripe'
require 'sinatra'
set :public_folder, File.dirname(__FILE__)


Stripe.api_key = STRIPE_SK_TEST
# 'sk_test_DuAv1GHHwvjmKACrSjToCM1y'

get '/' do
    send_file 'index.html'
end

get '/stripe' do
    send_file 'stripe.html'
end

get '/contact' do
    send_file 'contact.html'
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