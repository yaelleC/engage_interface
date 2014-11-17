class AddUsernameToUsers < ActiveRecord::Migration
  def up
    add_column :users, :username, :string
	User.all.each do |u|
        u.update_attribute :username, u.email.split('@').first
    end
  end
  def down
  	remove_column :users, :username
  end
end
