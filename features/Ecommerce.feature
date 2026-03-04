# To run: npx cucumber-js --exit (--exit is to exit after testing and no need to ^C every time)
# To run specific file: npx cucumber-js [folder]/[file].feature --exit
# To run tests in a file in parallel: npx cucumber-js [folder]/[file].feature --parallel [# of tests to run in parallel] --exit
# To run with tags: npx cucumber-js --tags "@[tag]" --exit
# To run with HTML report: npx cucumber-js --exit --format html:cucumber-report.html
# To run with rerun: npx cucumber-js --retry [# of retries] --exit
Feature: Ecommerce validations
  @Regression
  Scenario: Placing the Order
    Given a login to Ecommerce application with "tobadubu@gmail.com" and "Passwordtesting1."
    When Add "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 3" is displayed in the Cart
    When Enter valid details and Place the Order
    Then Verify order in present in the Order History