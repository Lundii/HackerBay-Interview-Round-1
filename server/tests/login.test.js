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
  it('login a user with the correct username and password', (done) => {
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
});
