class GreenSpace < ApplicationRecord
  validates :name, presence: true

  belongs_to :neighborhood
  has_many :reviews, :dependent => :delete_all
  has_many :users, through: :reviews
  has_many :categorizations
  has_many :features, through: :categorizations
end
