const axios = require('axios');

// Base URL for the API
const baseURL = 'http://localhost:3000';

// Helper function to add item to inventory
async function addItemToInventory(productId, quantity) {
    try {
        const response = await axios.post(`${baseURL}/addItemToInventory`, { productId, quantity });
        console.log(response.data);
    } catch (error) {
        console.error(error.response);
    }
}

// Helper function to remove item from inventory
async function removeItemFromInventory(productId, quantity) {
    try {
        const response = await axios.post(`${baseURL}/removeItemFromInventory`, { productId, quantity });
        console.log(response.data);
    } catch (error) {
        console.error(error.response);
    }
}

// Helper function to add item to cart
async function addItemToCart(customerId, productId, quantity) {
    try {
        const response = await axios.post(`${baseURL}/addItemToCart`, { customerId, productId, quantity });
        console.log(response.data);
    } catch (error) {
        console.error(error.response);
    }
}

// Helper function to apply discount coupon
async function applyDiscountCoupon(cartValue, discountId) {
    try {
        const response = await axios.post(`${baseURL}/applyDiscountCoupon`, { cartValue, discountId });
        console.log(response.data);
    } catch (error) {
        console.error(error.response);
    }
}

// Helper function to add a discount coupon
async function addDiscountCoupon(discountId, percentage, maxCap) {
    try {
        const response = await axios.post(`${baseURL}/addDiscountCoupon`, { discountId, percentage, maxCap });
        console.log(response.data);
    } catch (error) {
        console.error(error.response);
    }
}

// Driver function to demonstrate the flow
async function driver() {
    console.log('Adding items to inventory...');
    await addItemToInventory('1', 100);
    await addItemToInventory('2', 50);

    console.log('\nRemoving items from inventory...');
    await removeItemFromInventory('1', 20);

    console.log('\nAdding items to cart...');
    await addItemToCart('customer1', '1', 10);
    await addItemToCart('customer1', '2', 5);

    console.log('\nAdding discount coupon...');
    await addDiscountCoupon('DISCOUNT20', 20, 150);

    console.log('\nApplying discount coupon...');
    await applyDiscountCoupon(1000, 'DISCOUNT20');
}

// Run the driver function
driver();
