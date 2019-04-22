class GreenSpacesController < ApplicationController
  before_action :set_green_space, only: [:show]

  def index
    @green_spaces = GreenSpace.all
  end

  def show

  end

  private

  def set_green_space
    @green_space = GreenSpace.find(params[:id])
  end
end
