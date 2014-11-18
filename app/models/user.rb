class User < ActiveRecord::Base
  belongs_to :role
  has_one :developer
  has_one :teacher
  has_one :student

  authenticates_with_sorcery!
  attr_accessible :username, :email, :password, :password_confirmation, :role_id
  
  validates_confirmation_of :password
  validates_presence_of :password, :on => :create
  validates_presence_of :username
  validates_uniqueness_of :username
  validates_presence_of :email
  validates_uniqueness_of :email
  def role_symbols
    [role.title.to_sym]
  end

end
