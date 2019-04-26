require "rails_helper"

RSpec.describe Api::V1::ReviewsController, type: :controller do
  describe "POST#create" do
    let!(:user) { FactoryBot.create(:user) }
    let!(:space) { FactoryBot.create(:green_space) }
    
    it "should create a new review" do
      params = {title: "New review",
                    rating: 2,
                    body: 'This is a super long body for the review',
                    user_id: user.id}
      post :create, params: {green_space_id: space.id}, body:(params).to_json
      expect(Review.last.title).to eq "New review"
    end
  end
end
