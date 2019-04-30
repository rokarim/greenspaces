class Vote < ApplicationRecord
  validates :thumbs, presence: true

  validates :user_id, uniqueness: { scope: [:review_id]}
end
