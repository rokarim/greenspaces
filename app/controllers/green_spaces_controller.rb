class GreenSpacesController < ApplicationController
  before_action :set_green_space, only: [:show]

  def index
    @green_spaces = GreenSpace.all
  end

  def show

  end

  def new
    @green_space = GreenSpace.new
  end

  def create
    @green_space = GreenSpace.new(new_green_space_params)
    if @green_space.save
      flash[:notice] = "Green Space added successfully"
      redirect_to green_space_path(@green_space)
    else
      flash.now[:alert] = @green_space.errors.full_messages.join(', ')
      render :new
    end
  end

  private

  def set_green_space
    @green_space = GreenSpace.find(params[:id])
  end

  def new_green_space_params
    require(:green_space).permit(:name, :description)
  end

end
