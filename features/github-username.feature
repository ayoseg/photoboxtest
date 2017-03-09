Feature: Verify username

  As a github user
  In order to check that my username exist
  I want to verify my username


  Scenario: API returns correct full name 
    Given a github username photobox
    When I make a GET request to "/users/photobox" 
    Then I should get response statusCode 200
    Then the response property "name" should be "photobox"

  Scenario Outline: UI shows correct availability of a username
    Given I am on Github homepage
    When I choose "Sign up"
    And I enter "<username>"
    Then I should see username "<availability>"

    Examples:
      |username |availability |
      |photobox |no           |
      |adfeds13 |yes          |







