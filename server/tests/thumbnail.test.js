import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const { expect } = chai;

chai.use(chaiHttp);
describe('process thumbnails', function () {
  this.timeout(5000);
  let token;
  const loginDetails = {
    username: 'somebody',
    password: 'password',
  };
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  it('should return a status of 200 if the operation is successful', (done) => {
    const body = {
      imageUrl: 'https://res.cloudinary.com/dwawmgnac/image/upload/c_scale,h_966,q_48/v1564566307/samples/landscapes/nature-mountains.jpg',
    };
    chai.request(server)
      .post('/api/v1/user/thumbnail')
      .set('Authorization', token)
      .send(body)
      .end((error, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should throw a 422 error if imageUrl does not exit', (done) => {
    const body = { };
    chai.request(server)
      .post('/api/v1/user/thumbnail')
      .set('Authorization', token)
      .send(body)
      .end((error, res) => {
        expect(res).to.have.status(422);
        expect(res).to.be.a('object');
        expect(res.body).to.have.keys('errors');
        expect(res.body.errors[0]).to.equal('imageUrl is required');
        done();
      });
  });

  it('should throw a 400 there was a problem downloading and converting file', (done) => {
    const body = {
      imageUrl: 'https://res.cloudinary.com/dwawmgnac/upload/c_scalefgsf,h_966,q_48/v1564566307/samples/landscapes/nature-mountains.jpg',
    };
    chai.request(server)
      .post('/api/v1/user/thumbnail')
      .set('Authorization', token)
      .send(body)
      .end((error, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.a('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.equal('There was an error while processing the image, please check your url');
        done();
      });
  });

  it('should throw a 401 error if token is invalid', (done) => {
    const body = {
      imageUrl: 'https://res.cloudinary.com/dwawmgnac/upload/c_scalefgsf,h_966,q_48/v1564566307/samples/landscapes/nature-mountains.jpg',
    };
    chai.request(server)
      .post('/api/v1/user/thumbnail')
      .send(body)
      .end((error, res) => {
        expect(res).to.have.status(401);
        expect(res).to.be.a('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.equal('Unauthorized access');
        done();
      });
  });

  it('should throw a 401 error if token is not present', (done) => {
    const body = {
      imageUrl: 'https://res.cloudinary.com/dwawmgnac/upload/c_scalefgsf,h_966,q_48/v1564566307/samples/landscapes/nature-mountains.jpg',
    };
    chai.request(server)
      .post('/api/v1/user/thumbnail')
      .send(body)
      .end((error, res) => {
        expect(res).to.have.status(401);
        expect(res).to.be.a('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.equal('Unauthorized access');
        done();
      });
  });
});
