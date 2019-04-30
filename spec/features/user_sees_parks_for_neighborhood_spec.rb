feature 'Show Page' do
  scenario 'user visits neighborhood show path' do
    show_neighborhood = FactoryBot.create(:neighborhood, name: 'Dorchester')
    mr_green = FactoryBot.create(:green_space, neighborhood: show_neighborhood)
    visit neighborhood_path(show_neighborhood)
    expect(page).to have_content("Bark Park")
    expect(page).to have_link("Bark Park")
    expect(page).to have_content(show_neighborhood.name)
  end
end
