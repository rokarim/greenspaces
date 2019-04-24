class Api::V1::GreenSpacesController < ApplicationController
  def show
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
end
