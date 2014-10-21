class CreateSeriousGames < ActiveRecord::Migration
  def change
    create_table :serious_games do |t|
      t.string :name
      t.text :desc
      t.string :ageRange
      t.string :lang
      t.string :country
      t.string :version

      t.timestamps
    end
  end
end
