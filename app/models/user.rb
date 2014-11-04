class User < ActiveRecord::Base
  belongs_to :role
  
  authenticates_with_sorcery!
  attr_accessible :email, :password, :password_confirmation, :role_id

  validates_confirmation_of :password
  validates_presence_of :password, :on => :create
  validates_presence_of :email
  validates_uniqueness_of :email
  validates_uniqueness_of :role_id

  def role_symbols
    [role.title.to_sym]
  end

end
