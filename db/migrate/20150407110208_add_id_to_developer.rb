class AddIdToDeveloper < ActiveRecord::Migration
  def change
    add_column :developer, :id, :integer
  end
end
