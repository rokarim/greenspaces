require 'rails_helper'

feature 'Green Space New Form' do
  let!(:user1) { FactoryBot.create(:user, admin: true) }

  scenario 'user adds new green space successfully' do
    FactoryBot.create(:neighborhood, name: "South End")
    sign_in user1
    visit new_green_space_path
    expect(page).to have_content "New Green Space Form"

    fill_in 'Name', with: "Boston Common"
    fill_in 'Description', with: "It is required you carry a shotgun at night."
    select 'South End', from: 'Neighborhood'
    click_button "Add Green Space"

    expect(page).to have_content "Green Space added successfully"
  end

  scenario 'user does not specify a name' do
    sign_in user1
    visit new_green_space_path
    click_button "Add Green Space"

    expect(current_path).to eq green_spaces_path
    expect(page).to have_content "Name can\'t be blank"
  end
end
