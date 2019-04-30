class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  mount_uploader :profile_photo, ProfilePhotoUploader
  
  validates :first_name, presence: true
  validates :last_name, presence: true

  has_many :reviews
  has_many :green_spaces, through: :reviews

  def name
    "#{first_name} #{last_name}"
  end
end
