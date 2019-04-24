class Api::V1::GreenSpacesController < ApplicationController
  serialization_scope :current_user

  def show
    @current_user = current_user
    render json: {
      greenspace: serialized_greenspace,
      reviews: serialized_reviews
    }
  end

  def serialized_greenspace
    ActiveModel::SerializableResource.new(GreenSpace.find(params[:id]), serializer: GreenSpaceSerializer)
  end

  def serialized_reviews
    ActiveModel::Serializer::ArraySerializer.new(GreenSpace.find(params[:id]).reviews, each_serializer: GreenSpaceSerializer)
  end

  def destroy
    @green_space = GreenSpace.find(params[:id])
    @green_space.destroy
  end
end
