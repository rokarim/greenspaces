class GreenSpaceSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :reviews

  has_many :reviews
end
