class Api::V1::ReviewsController < ApplicationController
  serialization_scope :current_user
  protect_from_forgery unless: -> { request.format.json? }

  def create
    response = JSON.parse(request.body.read)
    review = Review.new(response)
    review.green_space_id = params["green_space_id"]
    if review.save
      render json: { review: review }
      # flash.now[:success] = "Review saved successfully."
    else
      # flash.now[:error] = review.errors.full_messages.join(', ')
      render json: { error: review.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
