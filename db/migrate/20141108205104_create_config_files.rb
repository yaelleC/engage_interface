class CreateConfigFiles < ActiveRecord::Migration
  def change
    create_table :config_files do |t|
      t.text :config

      t.timestamps
    end
  end
end
