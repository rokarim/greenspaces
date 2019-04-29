class Neighborhood < ApplicationRecord
  validates :name, presence: true

  has_many :green_spaces
end
