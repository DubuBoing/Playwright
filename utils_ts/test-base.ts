import {test as baseTest} from '@playwright/test';
interface TestDataForOrder {
    email: string;
    password: string;
    desiredProduct: string;
}

export const custom_test = baseTest.extend<{testDataForOrder: TestDataForOrder}>({
    testDataForOrder:{
        email: "tobadubu@gmail.com",
        password: "Passwordtesting1.",
        desiredProduct: "ZARA COAT 3"
    }
})

// No need for "" for email password etc because it is a JS object not a JSON