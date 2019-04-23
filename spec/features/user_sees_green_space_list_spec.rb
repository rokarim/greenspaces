require 'rails_helper'

feature 'Green Space Index' do
  scenario 'user visits root path' do
    visit root_path

    expect(page).to have_content("Green Spaces")
  end
  scenario 'user sees the name of each green space' do
    green_space = FactoryBot.create(:green_space)
    visit green_spaces_path

    expect(page).to have_content(green_space.name)
    expect(page).to have_link(green_space.name)
  end
end
