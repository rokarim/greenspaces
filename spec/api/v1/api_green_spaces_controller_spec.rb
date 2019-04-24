require "rails_helper"

RSpec.describe Api::V1::GreenSpacesController, type: :controller do
  let!(:space) { GreenSpace.create(
    name: "Some Park",
    description: "This is the description for some park around the Boston area"
  )}

  describe "GET#show" do
    it "should return a show page for an specific Green Space" do
      get :show, params: {id: space.id}
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 1
      expect(returned_json["green_space"]["name"]).to eq "Some Park"
      expect(returned_json["green_space"]["description"]).to eq "This is the description for some park around the Boston area"
    end
  end
end
