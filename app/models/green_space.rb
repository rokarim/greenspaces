class GreenSpace < ApplicationRecord
  validates :name, presence: true
  validates :longitude, presence: true
  validates :latitude, presence: true

  belongs_to :neighborhood
  has_many :reviews, :dependent => :delete_all
  has_many :users, through: :reviews
  has_many :categorizations
  has_many :features, through: :categorizations

  def coordinates
    {lat: self.latitude, lng: self.longitude}
  end
end
