class Api::V1::VotesController < ApplicationController
  serialization_scope :current_user
  protect_from_forgery unless: -> { request.format.json? }
  def create
  end
end
