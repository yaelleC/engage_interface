class SeriousGame < ActiveRecord::Base
	# belongs_to :developer, :foreign_key => :idDeveloper
	attr_accessible :ageMin, :ageMax, :country, :description, :language, :name, :version

	self.table_name = "seriousgame"
	self.primary_key = :id
end
