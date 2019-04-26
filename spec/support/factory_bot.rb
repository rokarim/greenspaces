require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "user#{n}@example.com" }
    first_name { 'Betty' }
    last_name { 'Boop' }
    password { 'password' }
    password_confirmation { 'password' }
  end

  factory :green_space do
    name { "Bark Park" }
    description { "Lots of open space." }
  end

  factory :review do
    title { "Great stuff" }
    rating { 4 }
    body { "For dessert, we ordered the chocolate drizzled churros and they were delicious too! They even came with some fresh fruit." }
    user_id { User.find_by(first_name: "Betty") }
    green_space_id { GreenSpace.find_by(name: "Bark Park") }
  end
end
