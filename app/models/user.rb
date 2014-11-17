class User < ActiveRecord::Base
  belongs_to :role
  has_one :developer

  authenticates_with_sorcery!
  attr_accessible :username
  
  validates_confirmation_of :password
  validates_presence_of :password, :on => :create
  validates_presence_of :username
  validates_uniqueness_of :username

  def role_symbols
    [role.title.to_sym]
  end

end
