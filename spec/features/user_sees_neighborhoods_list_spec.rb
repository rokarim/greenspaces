feature 'Green Space Index' do
  scenario 'user visits neighborhoods path' do
    visit neighborhoods_path

    expect(page).to have_content("Neighborhoods")
  end
  scenario 'user sees the name of each feature' do
    neighborhood = FactoryBot.create(:neighborhood)
    visit neighborhoods_path

    expect(page).to have_content(neighborhood.name)
    expect(page).to have_link(neighborhood.name)
  end
end
