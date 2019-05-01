class GreenSpacesController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :authorize_user, except: [:index, :show]

  def index
    @green_spaces = GreenSpace.all
  end

  def show
    @green_space = GreenSpace.find(params[:id])
  end

  def new
    @green_space = GreenSpace.new
    @neighborhoods = Neighborhood.all.map { |neighborhood| [neighborhood.name, neighborhood.id] }
  end

  def create
    neighborhood_id = params[:green_space][:neighborhood]
    @green_space = GreenSpace.new(new_green_space_params)
    if Neighborhood.exists?(neighborhood_id)
      @green_space.neighborhood = Neighborhood.find(neighborhood_id)
    end
    if @green_space.save
      flash[:notice] = "Green Space added successfully"
      redirect_to green_space_path(@green_space)
    else
      @neighborhoods = Neighborhood.all.map { |neighborhood| [neighborhood.name, neighborhood.id] }
      flash.now[:alert] = @green_space.errors.full_messages.join(', ')
      render :new
    end
  end

  def destroy
    @green_space = GreenSpace.find(params[:id])
    @green_space.destroy
  end

  private

  def new_green_space_params
    params.require(:green_space).permit(:name, :description, :acres, :address, :longitude, :latitude)
  end

  def authorize_user
    if !current_user.admin?
      flash[:notice] = "You do not have access to this page."
      redirect_to root_path
    end
  end
end
