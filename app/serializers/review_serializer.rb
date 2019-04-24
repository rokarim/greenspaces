class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :rating, :user_id, :created_at
end
