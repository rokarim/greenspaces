class Api::V1::GreenSpacesController < ApplicationController
  def show
    render json: GreenSpace.find(params[:id]), serializer: GreenSpaceSerializer
  end
end
