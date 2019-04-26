feature 'Green Space Index' do
  scenario 'user visits features path' do
    visit features_path

    expect(page).to have_content("Features")
  end
  scenario 'user sees the name of each feature' do
    feature = FactoryBot.create(:feature)
    visit features_path

    expect(page).to have_content(feature.name)
    expect(page).to have_link(feature.name)
  end
end
