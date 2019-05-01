class GreenSpaceSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :acres, :address, :coordinates, :reviews, :is_admin, :user_id, :neighborhood

  has_many :reviews
  has_many :features
  belongs_to :neighborhood

  def user_id
    if current_user.nil?
      ""
    else
      current_user[:id]
    end
  end

  def is_admin
    if current_user.nil?
      false
    else
      current_user[:admin]
    end
  end
end
