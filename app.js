const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const inventory = {};
const carts = {};
const discountCoupons = {};

// Add item to inventory
app.post('/addItemToInventory', (req, res) => {
    const { productId, quantity } = req.body;
    if (!inventory[productId]) {
        inventory[productId] = 0;
    }
    inventory[productId] += quantity;
    res.status(200).send(`Added ${quantity} of product ${productId} to inventory.`);
});

// Remove item from inventory
app.post('/removeItemFromInventory', (req, res) => {
    const { productId, quantity } = req.body;
    if (!inventory[productId] || inventory[productId] < quantity) {
        return res.status(400).send(`Insufficient inventory for product ${productId}.`);
    }
    inventory[productId] -= quantity;
    res.status(200).send(`Removed ${quantity} of product ${productId} from inventory.`);
});

// Add item to cart
app.post('/addItemToCart', (req, res) => {
    const { customerId, productId, quantity } = req.body;
    if (!inventory[productId] || inventory[productId] < quantity) {
        return res.status(400).send(`Insufficient inventory for product ${productId}.`);
    }
    if (!carts[customerId]) {
        carts[customerId] = {};
    }
    if (!carts[customerId][productId]) {
        carts[customerId][productId] = 0;
    }
    carts[customerId][productId] += quantity;
    inventory[productId] -= quantity;
    res.status(200).send(`Added ${quantity} of product ${productId} to cart for customer ${customerId}.`);
});

// Apply discount coupon
app.post('/applyDiscountCoupon', (req, res) => {
    const { cartValue, discountId } = req.body;
    const discount = discountCoupons[discountId];
    if (!discount) {
        return res.status(400).send('Invalid discount ID.');
    }
    let discountAmount = (cartValue * discount.percentage) / 100;
    if (discountAmount > discount.maxCap) {
        discountAmount = discount.maxCap;
    }
    const finalPrice = cartValue - discountAmount;
    res.status(200).send(`Original price: ${cartValue}, Discounted price: ${finalPrice}`);
});

// Add a discount coupon
app.post('/addDiscountCoupon', (req, res) => {
    const { discountId, percentage, maxCap } = req.body;
    discountCoupons[discountId] = { percentage, maxCap };
    res.status(200).send(`Added discount coupon ${discountId} with ${percentage}% off and max cap of ${maxCap}.`);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
