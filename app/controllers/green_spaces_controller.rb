class GreenSpacesController < ApplicationController

  def index
    @green_spaces = GreenSpace.all
  end

  def show
      @green_space = GreenSpace.find(params[:id])
  end

end
