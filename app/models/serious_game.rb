class SeriousGame < ActiveRecord::Base
  attr_accessible :ageRange, :country, :desc, :lang, :name, :version
end
