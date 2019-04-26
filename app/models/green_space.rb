class GreenSpace < ApplicationRecord
  validates :name, presence: true
  has_many :reviews
  has_many :users, through: :reviews
  has_many :categorizations
  has_many :features, through: :categorizations
end
