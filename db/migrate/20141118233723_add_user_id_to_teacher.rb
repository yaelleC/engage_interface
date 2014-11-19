class AddUserIdToTeacher < ActiveRecord::Migration
  def change
    add_column :teacher, :user_id, :integer
  end
end
