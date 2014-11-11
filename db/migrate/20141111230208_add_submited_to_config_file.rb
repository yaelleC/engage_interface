class AddSubmitedToConfigFile < ActiveRecord::Migration
  def change
    add_column :config_files, :submited, :boolean, :default => false
  end
end
