class User < ActiveRecord::Base
  belongs_to :role
  has_one :developer
  has_one :teacher
  has_one :student

  authenticates_with_sorcery!
  attr_accessible :username, :email, :password, :password_confirmation, :role_id
  # accepts_nested_attributes_for :developer
  
  validates_confirmation_of :password
  validates_presence_of :password, :on => :create
  validates_presence_of :username
  validates_uniqueness_of :username

  def role_symbols
    [role.title.to_sym]
  end

end
