import base from '@playwright/test';

exports.custom_test = base.test.extend({
    testDataForOrder:{
        email: "tobadubu@gmail.com",
        password: "Passwordtesting1.",
        desiredProduct: "ZARA COAT 3"
    }
})

// No need for "" for email password etc because it is a JS object not a JSON