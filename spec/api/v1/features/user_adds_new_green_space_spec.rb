require 'rails_helper'

feature 'Green Space New Form' do
  before :each do
    user1 = FactoryBot.create(:user, email: 'user1@example.com', admin: true)
    user2 = FactoryBot.create(:user, email: 'user2@example.com', admin: false)
    visit new_user_session_path
    fill_in 'Email', with:'user1@example.com'
    fill_in 'Password', with: 'password'
    click_button 'Log in'
  end

  scenario 'user adds new green space successfully' do
    visit new_green_space_path
    expect(page).to have_content "New Green Space Form"

    fill_in 'Name', with: "Boston Common"
    fill_in 'Description', with: "It is required you carry a shotgun at night."
    click_button "Add Green Space"

    expect(current_path).to eq green_space_path(GreenSpace.find_by(name: "Boston Common"))
    expect(page).to have_content "Green Space added successfully"
  end

  scenario 'user does not specify a name' do
    visit new_green_space_path
    click_button "Add Green Space"

    expect(current_path).to eq green_spaces_path
    expect(page).to have_content "Name can\'t be blank"
  end
end
