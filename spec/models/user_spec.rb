require 'rails_helper'

RSpec.describe User, type: :model do
  context 'when user has been created' do
    it 'has login information' do
      user_one = FactoryBot.create(:user)
      expect(User.first.first_name).to eq user_one.first_name
      expect(User.first.last_name).to eq user_one.last_name
    end
  end

  describe "#admin?" do
    it "is not an admin if the admin boolean is false" do
      user = FactoryBot.create(:user, admin: false)
      expect(user.admin?).to eq(false)
    end

    it "is an admin if the admin boolean is true" do
      user = FactoryBot.create(:user, admin: true)
      expect(user.admin?).to eq(true)
    end
  end
end
