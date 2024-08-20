const request = require('supertest');
const app = require('../app'); // Adjust the import path to your app

describe('Product Management Integration Tests', () => {
    let productId;

    // Test Adding a New Product
    it('should add a new product', async () => {
        const response = await request(app)
            .post('/api/products')
            .send({
                name: 'Test Product',
                price: 100,
                description: 'Test Description',
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        productId = response.body.id;
    });

    // Test Removing an Existing Product
    it('should remove an existing product', async () => {
        const response = await request(app)
            .delete(`/api/products/${productId}`);

        expect(response.status).toBe(200);
    });

    // Test Editing Product Details
    it('should edit product details', async () => {
        const response = await request(app)
            .put(`/api/products/${productId}`)
            .send({
                name: 'Updated Product',
                price: 150,
                description: 'Updated Description',
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', 'Updated Product');
    });

    // Test Validating Input Fields
    it('should validate input fields', async () => {
        const response = await request(app)
            .post('/api/products')
            .send({
                name: '', // Invalid input
                price: -10, // Invalid input
            });

        expect(response.status).toBe(400); // Assuming your API returns 400 for bad input
        expect(response.body).toHaveProperty('errors');
    });
});
