20.times do
  arguments = { name: Faker::Address.street_name + " Park", description: Faker::Hipster.paragraph }
  GreenSpace.create(arguments)
end

10.times do
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

10.times do
  Feature.create(name: Faker::Coffee.blend_name)
end

40.times do
  g = GreenSpace.all.sample
  f = (Feature.all - g.features).sample
  Categorization.create(green_space: g, feature: f)
end
