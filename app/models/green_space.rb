class GreenSpace < ApplicationRecord
  validates :name, presence: true

  has_many :reviews
  has_many :users, through: :reviews
end
