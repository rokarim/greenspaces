require 'open-uri'

GreenSpace.delete_all
Review.delete_all
Feature.delete_all
Categorization.delete_all
Neighborhood.delete_all


url = "http://gis.cityofboston.gov/arcgis/rest/services/EnvironmentEnergy/OpenData/MapServer/7/query?where=UPPER(OWNERSHIP)%20like%20%27%25CITY%20OF%20BOSTON%25%27%20AND%20ACRES%20%3E%3D%202%20AND%20ACRES%20%3C%3D%209000&outFields=SITE_NAME,DISTRICT,TypeLong,ACRES,ADDRESS&outSR=4326&f=json"
json = open(url).read
parsed = ActiveSupport::JSON.decode(json)
parsed['features'].each do |result|
  attributes = result['attributes']
  name = attributes['SITE_NAME']
  Feature.create({ name: attributes['TypeLong'] })
  feature = Feature.find_by(name: attributes['TypeLong'])
  Neighborhood.create({ name: attributes['DISTRICT'] })
  neighborhood = Neighborhood.find_by(name: attributes['DISTRICT'])
  green_space = GreenSpace.create!({ name: name, neighborhood: neighborhood })
  Categorization.create!({ green_space: green_space, feature: feature })
end

case Rails.env
when "development"
  100.times do
    first_name = Faker::Name.first_name
    arguments = { first_name: first_name, last_name: Faker::Name.last_name, email: Faker::Internet.safe_email(first_name), password: Faker::Internet.password(8, 12) }
    User.create(arguments)
  end

  User.all.each do |user|
    10.times do
      green_space = (GreenSpace.all - user.green_spaces).sample
      arguments = { title: Faker::Marketing.buzzwords, rating: rand(1..5), body: Faker::Restaurant.review, green_space: green_space, user: user }
      Review.create(arguments)
    end
  end
end
