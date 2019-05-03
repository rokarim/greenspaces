class Api::V1::ReviewsController < ApplicationController
  serialization_scope :current_user
  protect_from_forgery unless: -> { request.format.json? }

  def create
    response = JSON.parse(request.body.read)
    review = Review.new(response)
    review.green_space_id = params["green_space_id"]
    if review.save
      render json: review, serializer: ReviewSerializer
    else
      render json: { error: review.errors.full_messages.join(', ') }
    end
  end

  def destroy
    @review = Review.find(params[:id])
    @review.destroy
  end

  def show
    vote = Vote.find_by(review_id: params[:id], user_id: params[:user_id])
    vote_count = 0
    Vote.where(review_id: params[:id]).each do |vote|
      vote_count += vote.thumbs
    end

    if vote == nil
      render json: {vote: nil, vote_count: vote_count}
    else
      render json: {vote: vote.thumbs, vote_count: vote_count}
    end
  end
end
