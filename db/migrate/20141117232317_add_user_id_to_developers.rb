class AddUserIdToDevelopers < ActiveRecord::Migration
  def up
    add_column :developer, :user_id, :integer

    Developer.all.each do |d|
      u = User.find_by_email(d.email)
      if not u.nil?
        d.update_attribute :user_id, u.id
      end
    end
  end

  def down
  	remove_column :developer, :user_id
  end
end
