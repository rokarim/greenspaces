require 'rails_helper'

feature 'Green Space New Form for Admin' do
  before :each do
    user = FactoryBot.create(:user, email: 'user1@example.com', admin: true)
    visit new_user_session_path
    fill_in 'Email', with:'user1@example.com'
    fill_in 'Password', with: 'password'
    click_button 'Log in'
  end

  scenario 'admin adds new green space successfully' do
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

feature 'Green Space New Form for Not Admin' do
  before :each do
    user = FactoryBot.create(:user, email: 'user2@example.com', admin: false)
    visit new_user_session_path
    fill_in 'Email', with:'user2@example.com'
    fill_in 'Password', with: 'password'
    click_button 'Log in'
  end

  scenario 'not admin user is unable to access the new green space page' do
    visit new_green_space_path
    expect(page).to have_content "You do not have access to this page."
  end
end
