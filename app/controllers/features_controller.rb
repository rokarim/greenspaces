class FeaturesController < ApplicationController

  def index
    @features= Feature.all
  end

  def show
    @feature = Feature.find(params[:id])
    @green_spaces = @feature.green_spaces
  end
end
