class AddUserIdToStudents < ActiveRecord::Migration
  def change
    add_column :student, :user_id, :integer
  end
end
