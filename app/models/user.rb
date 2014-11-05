class User < ActiveRecord::Base
  belongs_to :role
  has_one :developer, :foreign_key => :email, :primary_key => :email

  authenticates_with_sorcery!
  attr_accessible :email, :password, :password_confirmation, :role_id

  validates_confirmation_of :password
  validates_presence_of :password, :on => :create
  validates_presence_of :email
  validates_uniqueness_of :email

  def role_symbols
    [role.title.to_sym]
  end

end
