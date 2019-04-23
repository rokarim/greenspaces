require 'rails_helper'

RSpec.describe User, type: :model do
  context 'when user has been created' do
    it 'has login information' do
      user_one = FactoryBot.create(:user)
      expect(User.first.first_name).to eq user_one.first_name
      expect(User.first.last_name).to eq user_one.last_name
    end
  end
end
