class Api::V1::GreenSpacesController < ApplicationController
  serialization_scope :current_user

  def index
    render json: GreenSpace.all, serializer: GreenSpaceIndexSerializer
  end

  def show
    render json: GreenSpace.find(params[:id])
  end

  def destroy
    @green_space = GreenSpace.find(params[:id])
    @green_space.destroy
  end

  def search
    greenspaces = GreenSpace.where("name ILIKE ? OR description ILIKE ?", "%#{params['search_string']}%", "%#{params['search_string']}%")
    render json: greenspaces
  end
end
