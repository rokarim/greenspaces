require 'rails_helper'

feature 'Green Space New Form' do
  let!(:user1) { FactoryBot.create(:user, admin: true) }

  scenario 'user adds new green space successfully' do
    FactoryBot.create(:neighborhood, name: "Bay Village")
    sign_in user1
    visit new_green_space_path
    expect(page).to have_content "New Green Space Form"

    fill_in 'Name', with: "Boston Common"
    fill_in 'Description', with: "It is required you carry a shotgun at night."
    fill_in 'Address', with: "Boston MA"
    fill_in 'Acres', with: "5"
    fill_in 'Latitude', with: "42.3566423"
    fill_in 'Longitude', with: "-71.0557196"
    select 'Bay Village', from: 'Neighborhood'
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
