class Feature < ApplicationRecord
  validates :name, presence: :true
  has_many :categorizations
  has_many :green_spaces, through: :categorizations
end
