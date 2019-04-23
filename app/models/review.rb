class Review < ApplicationRecord
  validates :title, presence: true
  validates :rating, inclusion: { in: 1..5 }
  validates :body, length: { minimum: 40 }


  belongs_to :user
  belongs_to :green_space
  validates :user_id, uniqueness: { scope: [:green_space_id] }
end
