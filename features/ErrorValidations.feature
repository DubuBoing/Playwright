# To run: npx cucumber-js --exit (--exit is to exit after testing and no need to ^C every time)
# To run specific file: npx cucumber-js [folder]/[file].feature --exit
# To run tests in a file in parallel: npx cucumber-js [folder]/[file].feature --parallel [# of tests to run in parallel] --exit
# To run with tags: npx cucumber-js --tags "@[tag]" --exit
# To run with HTML report: npx cucumber-js --exit --format html:cucumber-report.html
# To run with rerun: npx cucumber-js --retry [# of retries] --exit

# Scenario will run with each test data in Examples
Feature: Ecommerce validations
  @Validation
  Scenario: Placing the Order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
    | username            | password          |
    | tobadubu@gmail.com  | Passwordtesting1. |
    | hello@123.com       | IamHello@12       |