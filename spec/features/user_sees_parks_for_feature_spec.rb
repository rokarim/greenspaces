feature 'Show Page' do
  scenario 'user visits feature show path' do
    mr_green = FactoryBot.create(:green_space)
    show_feature = FactoryBot.create(:feature)
    FactoryBot.create(:categorization, green_space: mr_green, feature: show_feature)
    visit feature_path(show_feature)
    expect(page).to have_content("Bark Park")
    expect(page).to have_link("Bark Park")
    expect(page).to have_content(show_feature.name)
  end
end
