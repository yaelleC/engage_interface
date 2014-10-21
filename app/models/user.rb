class User < ActiveRecord::Base
  attr_accessible :country, :email, :encrypted_password, :name, :surname

  validates :name, :presence => true
  validates :email, :presence => true
  validates :encrypted_password, :presence => true
end
