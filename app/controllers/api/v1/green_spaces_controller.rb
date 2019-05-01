class Api::V1::GreenSpacesController < ApplicationController
  serialization_scope :current_user

  def show
    render json: GreenSpace.find(params[:id])
  end

  def destroy
    @green_space = GreenSpace.find(params[:id])
    @green_space.destroy
  end
end
