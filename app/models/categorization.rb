class Categorization < ApplicationRecord
  belongs_to :feature
  belongs_to :green_space

  validates :feature_id, presence: true
  validates :green_space_id, presence: true

end
