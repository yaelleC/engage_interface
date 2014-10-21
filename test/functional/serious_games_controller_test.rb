require 'test_helper'

class SeriousGamesControllerTest < ActionController::TestCase
  setup do
    @serious_game = serious_games(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:serious_games)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create serious_game" do
    assert_difference('SeriousGame.count') do
      post :create, serious_game: { ageRange: @serious_game.ageRange, country: @serious_game.country, desc: @serious_game.desc, lang: @serious_game.lang, name: @serious_game.name, version: @serious_game.version }
    end

    assert_redirected_to serious_game_path(assigns(:serious_game))
  end

  test "should show serious_game" do
    get :show, id: @serious_game
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @serious_game
    assert_response :success
  end

  test "should update serious_game" do
    put :update, id: @serious_game, serious_game: { ageRange: @serious_game.ageRange, country: @serious_game.country, desc: @serious_game.desc, lang: @serious_game.lang, name: @serious_game.name, version: @serious_game.version }
    assert_redirected_to serious_game_path(assigns(:serious_game))
  end

  test "should destroy serious_game" do
    assert_difference('SeriousGame.count', -1) do
      delete :destroy, id: @serious_game
    end

    assert_redirected_to serious_games_path
  end
end
