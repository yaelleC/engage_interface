class AddGameIdToConfigFile < ActiveRecord::Migration
  def change
    add_column :config_files, :idSG, :integer
    add_column :config_files, :idDeveloper, :integer
  end
end
