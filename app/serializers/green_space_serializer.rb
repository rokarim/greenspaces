class GreenSpaceSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :is_admin

  def is_admin
    if @current_user.nil?
      false
    else
      @current_user[:admin]
    end
  end
end
