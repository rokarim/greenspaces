class Api::V1::VotesController < ApplicationController
  serialization_scope :current_user
  protect_from_forgery unless: -> { request.format.json? }
  def create
    response = JSON.parse(request.body.read)
    if Vote.find_by(review_id: params[:review_id], user_id: params[:user_id])
      vote = Vote.find_by(review_id: params[:review_id], user_id: params[:user_id])
      vote.update_attributes(thumbs: response["vote"])
      render json: vote[:thumbs]
    else
      vote = Vote.new(thumbs: response["vote"], user_id: params[:user_id], review_id: params[:review_id])
      if vote.save
        render json: vote[:thumbs]
      else
        render json: { error: review.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end
end
