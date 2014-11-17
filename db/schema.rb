# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20141117223157) do

  create_table "config_files", :force => true do |t|
    t.text     "config"
    t.datetime "created_at",                    :null => false
    t.datetime "updated_at",                    :null => false
    t.boolean  "submited",   :default => false
  end

  create_table "developer", :force => true do |t|
    t.string "name",     :limit => 100, :null => false
    t.string "surname",  :limit => 100, :null => false
    t.string "email",    :limit => 200, :null => false
    t.string "password", :limit => 200, :null => false
  end

  add_index "developer", ["email"], :name => "email", :unique => true

  create_table "feedback", :force => true do |t|
    t.string  "name",    :limit => 100,                    :null => false
    t.text    "message"
    t.string  "type",    :limit => 8
    t.boolean "final",                  :default => false, :null => false
    t.integer "idSG",                                      :null => false
    t.integer "version",                :default => 0,     :null => false
  end

  add_index "feedback", ["idSG"], :name => "idSG_idx"

  create_table "feedback_trigger", :id => false, :force => true do |t|
    t.integer "idSG",                                         :null => false
    t.integer "version",                   :default => 0,     :null => false
    t.integer "idFeedback",                                   :null => false
    t.integer "idOutcome"
    t.string  "actionName", :limit => 200
    t.boolean "inactivity",                :default => false, :null => false
    t.integer "limitValue",                                   :null => false
    t.boolean "inferior",                  :default => true,  :null => false
    t.boolean "repeatBool",                :default => true,  :null => false
  end

  add_index "feedback_trigger", ["idFeedback"], :name => "idFeedback"
  add_index "feedback_trigger", ["idOutcome"], :name => "idOutcome"
  add_index "feedback_trigger", ["idSG"], :name => "idSG"

  create_table "game_outcome", :id => false, :force => true do |t|
    t.integer "idGP",      :null => false
    t.integer "idOutcome", :null => false
    t.float   "value",     :null => false
  end

  add_index "game_outcome", ["idGP"], :name => "idGP"
  add_index "game_outcome", ["idOutcome"], :name => "idOutcome"

  create_table "gameplay", :force => true do |t|
    t.integer   "idSG",       :null => false
    t.integer   "version",    :null => false
    t.timestamp "created",    :null => false
    t.timestamp "lastAction"
    t.timestamp "ended"
    t.integer   "idPlayer",   :null => false
  end

  add_index "gameplay", ["idPlayer"], :name => "idPlayer"

  create_table "learningoutcome", :force => true do |t|
    t.string  "name",          :limit => 100,                  :null => false
    t.text    "description"
    t.string  "type",          :limit => 10
    t.float   "startingValue",                :default => 0.0, :null => false
    t.integer "idSG",                                          :null => false
    t.integer "version",                      :default => 0,   :null => false
  end

  add_index "learningoutcome", ["idSG"], :name => "idSG"

  create_table "log_gameplay_action", :id => false, :force => true do |t|
    t.integer   "idGP",                     :null => false
    t.string    "action",    :limit => 200, :null => false
    t.integer   "idOutcome"
    t.float     "mark"
    t.timestamp "time",                     :null => false
  end

  add_index "log_gameplay_action", ["idGP"], :name => "idGP"

  create_table "log_gameplay_feedback", :id => false, :force => true do |t|
    t.integer   "idGP",                      :null => false
    t.integer   "idFeedback"
    t.string    "feedback",   :limit => 500, :null => false
    t.timestamp "time",                      :null => false
  end

  add_index "log_gameplay_feedback", ["idFeedback"], :name => "idFeedback"
  add_index "log_gameplay_feedback", ["idGP"], :name => "idGP"

  create_table "player_10_0", :force => true do |t|
    t.integer "idStudent"
    t.string  "gender",    :limit => 1
    t.integer "age"
    t.string  "country",   :limit => 200
  end

  add_index "player_10_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "player_11_0", :force => true do |t|
    t.integer "idStudent"
    t.string  "gender",    :limit => 1
    t.integer "age"
    t.string  "country",   :limit => 200
  end

  add_index "player_11_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "player_12_0", :force => true do |t|
    t.integer "idStudent"
    t.string  "gender",    :limit => 1
    t.integer "age"
    t.string  "country",   :limit => 200
  end

  add_index "player_12_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "player_13_0", :force => true do |t|
    t.integer "idStudent"
    t.string  "gender",    :limit => 1
    t.integer "age"
    t.string  "country",   :limit => 200
  end

  add_index "player_13_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "player_16_0", :force => true do |t|
    t.integer "idStudent"
    t.string  "gender",    :limit => 1
    t.integer "age"
    t.string  "country",   :limit => 200
  end

  add_index "player_16_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "player_18_0", :force => true do |t|
    t.integer "idStudent"
    t.string  "gender",    :limit => 1
    t.integer "age"
    t.string  "country",   :limit => 200
  end

  add_index "player_18_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "player_19_0", :force => true do |t|
    t.integer "idStudent"
    t.string  "gender",    :limit => 1
    t.integer "age"
    t.string  "country",   :limit => 200
  end

  add_index "player_19_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "player_1_0", :force => true do |t|
    t.integer "idStudent"
    t.string  "gender",    :limit => 1
    t.integer "age"
    t.string  "country",   :limit => 200
  end

  create_table "player_23_0", :force => true do |t|
    t.integer "idStudent"
    t.string  "name",      :limit => 200
    t.integer "age"
    t.string  "gender",    :limit => 1
    t.string  "device",    :limit => 200
  end

  add_index "player_23_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "player_24_0", :force => true do |t|
    t.integer "idStudent"
    t.string  "name",          :limit => 200
    t.integer "age"
    t.string  "gender",        :limit => 1
    t.integer "questionCount"
    t.integer "questionTotal"
  end

  add_index "player_24_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "player_25_0", :force => true do |t|
    t.integer "idStudent"
    t.string  "name",      :limit => 200
    t.integer "age"
    t.string  "gender",    :limit => 1
  end

  add_index "player_25_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "player_26_0", :force => true do |t|
    t.integer "idStudent"
    t.string  "name",      :limit => 200
    t.integer "age"
    t.string  "gender",    :limit => 200
    t.string  "device",    :limit => 200
  end

  add_index "player_26_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "player_27_0", :force => true do |t|
    t.integer "idStudent"
    t.string  "gender",    :limit => 1
    t.integer "age"
    t.string  "country",   :limit => 200
  end

  add_index "player_27_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "player_28_0", :force => true do |t|
    t.integer "idStudent"
    t.string  "gender",    :limit => 1
    t.integer "age"
    t.string  "country",   :limit => 200
  end

  add_index "player_28_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "player_29_0", :force => true do |t|
    t.integer "idStudent"
    t.string  "gender",    :limit => 1
    t.integer "age"
    t.string  "country",   :limit => 200
  end

  add_index "player_29_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "player_2_0", :force => true do |t|
    t.integer "idStudent"
    t.string  "gender",    :limit => 1
    t.integer "age"
    t.string  "country",   :limit => 200
  end

  add_index "player_2_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "player_30_0", :force => true do |t|
    t.integer "idStudent"
    t.string  "gender",    :limit => 1
    t.integer "age"
    t.string  "country",   :limit => 200
  end

  add_index "player_30_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "player_31_0", :force => true do |t|
    t.integer "idStudent"
    t.string  "gender",    :limit => 1
    t.integer "age"
    t.string  "country",   :limit => 200
  end

  add_index "player_31_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "player_32_0", :force => true do |t|
    t.integer "idStudent"
    t.string  "gender",    :limit => 1
    t.integer "age"
    t.string  "country",   :limit => 200
  end

  add_index "player_32_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "player_33_0", :force => true do |t|
    t.integer "idStudent"
    t.integer "age"
    t.string  "gender",    :limit => 200
    t.string  "device",    :limit => 200
  end

  add_index "player_33_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "player_34_0", :force => true do |t|
    t.integer "idStudent"
    t.integer "age"
    t.string  "gender",    :limit => 200
    t.string  "device",    :limit => 200
  end

  add_index "player_34_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "player_35_0", :force => true do |t|
    t.integer "idStudent"
    t.integer "age"
    t.string  "gender",    :limit => 200
    t.string  "device",    :limit => 200
  end

  add_index "player_35_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "player_36_0", :force => true do |t|
    t.integer "idStudent"
    t.integer "age"
    t.string  "gender",    :limit => 200
    t.string  "device",    :limit => 200
  end

  add_index "player_36_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "player_37_0", :force => true do |t|
    t.integer "idStudent"
    t.integer "age"
    t.string  "gender",    :limit => 200
    t.string  "device",    :limit => 200
  end

  add_index "player_37_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "player_38_0", :force => true do |t|
    t.integer "idStudent"
    t.integer "age"
    t.string  "gender",    :limit => 200
    t.string  "device",    :limit => 200
  end

  add_index "player_38_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "player_39_0", :force => true do |t|
    t.integer "idStudent"
    t.string  "gender",    :limit => 1
    t.integer "age"
    t.string  "country",   :limit => 200
  end

  add_index "player_39_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "player_3_0", :force => true do |t|
    t.integer "idStudent"
    t.string  "gender",    :limit => 1
    t.integer "age"
    t.string  "country",   :limit => 200
  end

  add_index "player_3_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "player_40_0", :force => true do |t|
    t.integer "idStudent"
    t.string  "gender",    :limit => 1
    t.integer "age"
    t.string  "country",   :limit => 200
  end

  add_index "player_40_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "player_4_0", :force => true do |t|
    t.integer "idStudent"
    t.string  "gender",    :limit => 1
    t.integer "age"
    t.string  "country",   :limit => 200
  end

  add_index "player_4_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "player_5_0", :force => true do |t|
    t.integer "idStudent"
    t.string  "gender",    :limit => 1
    t.integer "age"
    t.string  "country",   :limit => 200
  end

  add_index "player_5_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "player_6_0", :force => true do |t|
    t.integer "idStudent"
    t.string  "gender",    :limit => 1
    t.integer "age"
    t.string  "country",   :limit => 200
  end

  add_index "player_6_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "player_7_0", :force => true do |t|
    t.integer "idStudent"
    t.string  "gender",    :limit => 1
    t.integer "age"
    t.string  "country",   :limit => 200
  end

  add_index "player_7_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "player_8_0", :force => true do |t|
    t.integer "idStudent"
    t.string  "gender",    :limit => 1
    t.integer "age"
    t.string  "country",   :limit => 200
  end

  add_index "player_8_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "player_9_0", :force => true do |t|
    t.integer "idStudent"
    t.string  "gender",    :limit => 1
    t.integer "age"
    t.string  "country",   :limit => 200
  end

  add_index "player_9_0", ["idStudent"], :name => "idStudent", :unique => true

  create_table "roles", :force => true do |t|
    t.string   "title"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "school", :force => true do |t|
    t.string "name",    :limit => 100, :null => false
    t.string "country", :limit => 100
    t.string "city",    :limit => 100
  end

  add_index "school", ["id"], :name => "id", :unique => true

  create_table "seriousgame", :id => false, :force => true do |t|
    t.integer   "id",                                                      :null => false
    t.integer   "version",                              :default => 0,     :null => false
    t.integer   "idDeveloper",                                             :null => false
    t.integer   "idTeacher"
    t.text      "comments"
    t.string    "name",             :limit => 150,                         :null => false
    t.timestamp "created",                                                 :null => false
    t.text      "description"
    t.integer   "ageMin"
    t.integer   "ageMax"
    t.string    "language",         :limit => 2
    t.string    "country",          :limit => 50
    t.boolean   "public",                               :default => false, :null => false
    t.text      "configFile_short"
    t.text      "configFile_long",  :limit => 16777215
  end

  add_index "seriousgame", ["idDeveloper"], :name => "idDev_idx"

  create_table "sg_school", :id => false, :force => true do |t|
    t.integer "idSG",     :null => false
    t.integer "idSchool", :null => false
  end

  add_index "sg_school", ["idSG"], :name => "idSG"
  add_index "sg_school", ["idSchool"], :name => "idSchool"

  create_table "sg_student", :id => false, :force => true do |t|
    t.integer "idSG",          :null => false
    t.integer "idStd",         :null => false
    t.integer "versionPlayed", :null => false
  end

  add_index "sg_student", ["idSG"], :name => "idSG"
  add_index "sg_student", ["idStd"], :name => "idStd"

  create_table "std_teacher", :id => false, :force => true do |t|
    t.integer "idStd",                    :null => false
    t.integer "idTeacher",                :null => false
    t.string  "groupName", :limit => 200
  end

  add_index "std_teacher", ["idStd"], :name => "idStd"
  add_index "std_teacher", ["idTeacher"], :name => "idTeacher"

  create_table "student", :force => true do |t|
    t.string  "username",  :limit => 100, :null => false
    t.string  "password",  :limit => 200, :null => false
    t.date    "dateBirth"
    t.string  "gender",    :limit => 1
    t.integer "idSchool",                 :null => false
  end

  add_index "student", ["idSchool"], :name => "idSchool"

  create_table "teacher", :force => true do |t|
    t.string  "name",     :limit => 100, :null => false
    t.string  "surname",  :limit => 100, :null => false
    t.string  "email",    :limit => 200, :null => false
    t.string  "password", :limit => 200, :null => false
    t.integer "idSchool",                :null => false
  end

  add_index "teacher", ["idSchool"], :name => "idSchool"

  create_table "users", :force => true do |t|
    t.string   "email",                        :null => false
    t.string   "crypted_password",             :null => false
    t.string   "salt",                         :null => false
    t.datetime "created_at",                   :null => false
    t.datetime "updated_at",                   :null => false
    t.string   "remember_me_token"
    t.datetime "remember_me_token_expires_at"
    t.integer  "role_id"
    t.string   "username"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["remember_me_token"], :name => "index_users_on_remember_me_token"

end
