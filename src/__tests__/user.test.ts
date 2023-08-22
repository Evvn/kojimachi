import request from 'supertest';
import app from '../server';

describe('User API', () => {
  it('should return all users', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'Teddy Verseti',
      email: 't.verseti@antarestech.com',
      password: 'Tallahassee$84',
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Teddy Verseti');
  });

  it('should return a specific user', async () => {
    // add user into the database and get their ID
    const insertResult = await request(app).post('/users').send({
      name: 'Teddy Verseti',
      email: 't.verseti@antarestech.com',
      password: 'Tallahassee$84',
    });

    const userId = insertResult.body.id;

    // Fetch the specific user
    const response = await request(app).get(`/users/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Teddy Verseti');
  });

  it('should update a user', async () => {
    // add user into the database and get their ID
    const insertResult = await request(app).post('/users').send({
      name: 'Teddy Verseti',
      email: 't.verseti@antarestech.com',
      password: 'Tallahassee$84',
    });

    const userId = insertResult.body.id;

    // Update the user's name
    const response = await request(app)
      .put(`/users/${userId}`)
      .send({ name: 'T Pain' });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('T Pain');
  });

  it('should delete a user', async () => {
    // add user into the database and get their ID
    const insertResult = await request(app).post('/users').send({
      name: 'Teddy Verseti',
      email: 't.verseti@antarestech.com',
      password: 'Tallahassee$84',
    });

    const userId = insertResult.body.id;

    // Delete the user
    const response = await request(app).delete(`/users/${userId}`);

    expect(response.status).toBe(204);

    // Check if the user is actually deleted
    const userCheck = await request(app).get(`/users/${userId}`);
    expect(userCheck.status).toBe(404);
  });

  it('should return a 400 status for invalid email', async () => {
    const response = await request(app).post('/users').send({
      name: 'Teddy Verseti',
      email: 't.verseti.penderazdoun',
      password: 'Tallahassee$84',
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      'Invalid email. Please use a valid format, e.g. evan@kojimachi.com'
    );
  });

  it('should return a 400 status for invalid password', async () => {
    // Password missing required elements (uppercase, lowercase, symbol, number)
    const response = await request(app).post('/users').send({
      name: 'Teddy Verseti',
      email: 't.verseti@antarestech.com',
      password: 'Faheem',
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      'Password must contain at least one uppercase letter, one lowercase letter, one symbol, and one number.'
    );
  });

  it('should return a 400 status for short password', async () => {
    const response = await request(app).post('/users').send({
      name: 'Teddy Verseti',
      email: 't.verseti@antarestech.com',
      password: 'TP$84',
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Password must be at least 6 characters.');
  });
});
