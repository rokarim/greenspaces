class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :rating, :created_at, :user_info

  belongs_to :green_space

    def user_info
      object.user.name
    end
end
