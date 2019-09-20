import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const { expect } = chai;

chai.use(chaiHttp);

describe('User should be able to login', () => {
  const loginDetails = {
    username: 'somebody',
    password: 'password',
  };

  it('should login a user with the correct username and password', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((error, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        expect(res.body).to.have.all.keys('username', 'token');
        expect(res.body.username).to.equal('somebody');
        expect(res.body.token).to.be.a('string');
        done();
      });
  });

  it('should return a status code of 422 if the username is missing', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({ password: 'password' })
      .end((error, res) => {
        expect(res).to.have.status(422);
        expect(res).to.be.a('object');
        expect(res.body).to.have.keys('errors');
        expect(res.body.errors[0]).to.equal('username is required');
        done();
      });
  });

  it('should return a status code of 422 if the password is missing', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({ username: 'username' })
      .end((error, res) => {
        expect(res).to.have.status(422);
        expect(res).to.be.a('object');
        expect(res.body).to.have.keys('errors');
        expect(res.body.errors[0]).to.equal('password is required');
        done();
      });
  });

  it('should return a status code of 422 if the username is not a string', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        username: 1234,
        password: 'password',
      })
      .end((error, res) => {
        expect(res).to.have.status(422);
        expect(res).to.be.a('object');
        expect(res.body).to.have.keys('errors');
        expect(res.body.errors[0]).to.equal('username must be a string');
        done();
      });
  });
});
