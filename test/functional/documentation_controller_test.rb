require 'test_helper'

class DocumentationControllerTest < ActionController::TestCase
  test "should get api" do
    get :api
    assert_response :success
  end

end
