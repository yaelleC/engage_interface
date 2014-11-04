class Developer < ActiveRecord::Base
  self.table_name = "developer"
  attr_accessible :email, :password, :name, :surname
  validates :name, :presence => true
  validates :email, :presence => true
  validates :password, :presence => true

end
