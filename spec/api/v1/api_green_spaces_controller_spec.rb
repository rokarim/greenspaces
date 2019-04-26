require "rails_helper"

RSpec.describe Api::V1::GreenSpacesController, type: :controller do
  describe "GET#show" do
    let!(:user) { FactoryBot.create(:user) }
    let!(:space) { FactoryBot.create(:green_space) }

    it "should return a show page for a specific Green Space with reviews" do
      FactoryBot.create(:review, user: user, green_space: space)
      get :show, params: {id: space.id}
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 1
      expect(returned_json["green_space"]["name"]).to eq space.name
      expect(returned_json["green_space"]["description"]).to eq space.description
      expect(returned_json["green_space"]["reviews"].length).to eq 1
      expect(returned_json["green_space"]["reviews"][0]["title"]).to eq space.reviews[0].title
    end

  describe "DELETE" do
    it "should delete the selected greenspace" do
      space1 = FactoryBot.create(:green_space)
      space2 = FactoryBot.create(:green_space)
      space3 = FactoryBot.create(:green_space)

      delete :destroy, params: {id: space1.id}

      expect(GreenSpace.all).not_to include space1
    end
  end
  end
end
