import request from 'supertest';
import app from '../server';

const testUser = {
  name: 'Teddy Verseti',
  email: 't.verseti@antarestech.com',
  password: 'Tallahassee$84',
};

describe('User API', () => {
  describe('While authenticated', () => {
    let authToken: string;
    beforeEach(async () => {
      // login and generate JWT for requests
      const loginResponse = await request(app).post('/login').send(); // Empty request, using demo login API

      authToken = `${loginResponse.body.token}`; // Store the JWT token for tests
    });

    it('should return all users', async () => {
      const response = await request(app)
        .get('/users')
        .set('Authorization', authToken);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should create a new user', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', authToken)
        .send(testUser);

      expect(response.status).toBe(201);
      expect(response.body.name).toBe('Teddy Verseti');
    });

    it('should return a specific user', async () => {
      // add user into the database and get their ID
      const insertResult = await request(app)
        .post('/users')
        .set('Authorization', authToken)
        .send(testUser);

      const userId = insertResult.body.id;

      // Fetch the specific user
      const response = await request(app)
        .get(`/users/${userId}`)
        .set('Authorization', authToken);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Teddy Verseti');
    });

    it('should update a user', async () => {
      // add user into the database and get their ID
      const insertResult = await request(app)
        .post('/users')
        .set('Authorization', authToken)
        .send(testUser);

      const userId = insertResult.body.id;

      // Update the user's name
      const response = await request(app)
        .put(`/users/${userId}`)
        .send({ name: 'T Pain' })
        .set('Authorization', authToken);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('T Pain');
    });

    it('should delete a user', async () => {
      // add user into the database and get their ID
      const insertResult = await request(app)
        .post('/users')
        .set('Authorization', authToken)
        .send(testUser);

      const userId = insertResult.body.id;

      // Delete the user
      const response = await request(app)
        .delete(`/users/${userId}`)
        .set('Authorization', authToken);

      expect(response.status).toBe(204);

      // Check if the user is actually deleted
      const userCheck = await request(app)
        .get(`/users/${userId}`)
        .set('Authorization', authToken);
      expect(userCheck.status).toBe(404);
    });

    it('should return a 400 status for invalid email', async () => {
      const response = await request(app)
        .post('/users')
        .send({
          ...testUser,
          email: 't.verseti.penderazdoun',
        })
        .set('Authorization', authToken);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        'Invalid email. Please use a valid format, e.g. evan@kojimachi.com'
      );
    });

    it('should return a 400 status for invalid password', async () => {
      // Password missing required elements (uppercase, lowercase, symbol, number)
      const response = await request(app)
        .post('/users')
        .send({
          ...testUser,
          password: 'Faheem',
        })
        .set('Authorization', authToken);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        'Password must contain at least one uppercase letter, one lowercase letter, one symbol, and one number.'
      );
    });

    it('should return a 400 status for short password', async () => {
      const response = await request(app)
        .post('/users')
        .send({
          ...testUser,
          password: 'TP$84',
        })
        .set('Authorization', authToken);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        'Password must be at least 6 characters.'
      );
    });
  });

  describe('While unauthenticated', () => {
    // test that each route returns unauthorized without JWT header
    it('should return 401 for unauthorized create user request', async () => {
      const response = await request(app).post('/users').send(testUser);

      expect(response.status).toBe(401);
    });

    it('should return 401 for unauthorized update user request', async () => {
      const response = await request(app)
        .put('/users/demo-user-id')
        .send({ name: testUser.name });

      expect(response.status).toBe(401);
    });

    it('should return 401 for unauthorized read users request', async () => {
      const response = await request(app).get('/users');

      expect(response.status).toBe(401);
    });

    it('should return 401 for unauthorized delete user request', async () => {
      const response = await request(app).delete('/users/demo-user-id');

      expect(response.status).toBe(401);
    });

    it('should return 401 for unauthorized select specific user request', async () => {
      const response = await request(app).get('/users/demo-user-id');

      expect(response.status).toBe(401);
    });
  });
});
