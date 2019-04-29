class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :rating, :created_at, :user_info

  belongs_to :green_space

    def user_info
      { name: object.user.name, user_id: object.user.id, profile_photo: object.user.profile_photo }
    end
end
