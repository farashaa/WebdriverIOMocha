import signinPage from "../pageobjects/signup-createaccount/signin.page"
import faker from "faker"
import createaccountPage from "../pageobjects/signup-createaccount/createaccount.page"
import personalinformationPage from "../pageobjects/signup-createaccount/personalinformation.page"
import myaccountPage from "../pageobjects/myaccount/myaccount.page"
import womenPage from "../pageobjects/myaccount/women.page"
import shoppingcartPage from "../pageobjects/cart/shoppingcart.page"
import shippingPage from "../pageobjects/cart/shipping.page"
import paymentPage from "../pageobjects/cart/payment.page"
import orderPage from "../pageobjects/cart/order.page"
import addressPage from '../pageobjects/cart/address.page'
import automationPracticeData from "../testdata/automationPractice.json"
describe("To palce order from Automation Practice Website", () => {
    it("I signup and place,confirm a order", async () => {
        await signinPage.openUrl()
        await signinPage.clickLogin()
        await expect(signinPage.AuthHeader).toHaveText("AUTHENTICATION")
        await createaccountPage.setEmail(faker.internet.email())
        await createaccountPage.clickCreateAccount()
        await expect(createaccountPage.pageHeader).toHaveText("CREATE AN ACCOUNT")
        await personalinformationPage.clickTitle()
        await personalinformationPage.setName(automationPracticeData.name)
        await personalinformationPage.setPswd(faker.internet.password())
        await personalinformationPage.selectDateOfBirth(automationPracticeData.DateOfBirth)
        await personalinformationPage.clickCheckSpecialOffers()
        await personalinformationPage.setCompany(automationPracticeData.company)
        await personalinformationPage.setAddress(automationPracticeData.address)
        await personalinformationPage.setMobNumber(automationPracticeData.mobNumber)
        await personalinformationPage.setAliasAdd(automationPracticeData.aliasAdd)
        await personalinformationPage.clickRegister()
        await expect(personalinformationPage.headerElement).toHaveText("MY ACCOUNT")
        await expect(browser).toHaveUrlContaining("my-account")
        await myaccountPage.WomenItem.click()
        await womenPage.clickAddToCart()
        await expect(womenPage.productAdded).toHaveText("Product successfully added to your shopping cart")
        await womenPage.checkOut.waitForClickable()
        await womenPage.checkOut.click()
        await expect(shoppingcartPage.shoppingCart).toHaveTextContaining("SHOPPING-CART SUMMARY")
        await shoppingcartPage.checkOut.click()
        await expect(addressPage.addressHeader).toHaveText("ADDRESSES")
        await addressPage.checkOut.click()
        await expect(shippingPage.shippingPage).toHaveText("SHIPPING")
        await shippingPage.termsAndConditions.click()
        await shippingPage.checkOut.click()
        await expect(paymentPage.paymentHeader).toHaveText("PLEASE CHOOSE YOUR PAYMENT METHOD")
        await paymentPage.Payment.click()
        await orderPage.ConfirmOrder.click()
        await expect(orderPage.orderConfirmed).toHaveText("ORDER CONFIRMATION")
    })
})