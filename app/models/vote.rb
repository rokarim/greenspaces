class Vote < ApplicationRecord
  validates :thumbs, presence: true, inclusion: {in: [-1,0,1]}

  validates :user_id, uniqueness: { scope: [:review_id]}
end
