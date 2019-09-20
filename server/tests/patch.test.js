import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const { expect } = chai;

chai.use(chaiHttp);
describe('Perform json patch operations', () => {
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

  it('should patch an object with a add operation', (done) => {
    const body = {
      docs: {},
      patch: [{ op: 'add', path: '/foo', value: 'bar' }],
    };
    chai.request(server)
      .patch('/api/v1/user/json-patch')
      .set('Authorization', token)
      .send(body)
      .end((error, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.keys('foo');
        expect(res.body.foo).to.equal('bar');
        done();
      });
  });

  it('should patch an object with a remove operation', (done) => {
    const body = {
      docs: { foo: 'bar' },
      patch: [{ op: 'remove', path: '/foo' }],
    };
    chai.request(server)
      .patch('/api/v1/user/json-patch')
      .set('Authorization', token)
      .send(body)
      .end((error, res) => {
        expect(res).to.have.status(200);
        expect(Object.keys(res.body)).to.have.lengthOf(0);
        done();
      });
  });

  it('should patch an object with a replace operation', (done) => {
    const body = {
      docs: { foo: 'bar' },
      patch: [{ op: 'replace', path: '/foo', value: 1 }],
    };
    chai.request(server)
      .patch('/api/v1/user/json-patch')
      .set('Authorization', token)
      .send(body)
      .end((error, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.keys('foo');
        expect(res.body.foo).to.equal(1);
        done();
      });
  });

  it('should patch an object with a move operation', (done) => {
    const body = {
      docs: { foo: 'something' },
      patch: [{ op: 'move', from: '/foo', path: '/bar' }],
    };
    chai.request(server)
      .patch('/api/v1/user/json-patch')
      .set('Authorization', token)
      .send(body)
      .end((error, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.keys('bar');
        expect(res.body.bar).to.equal('something');
        done();
      });
  });

  it('should patch an object with a copy operation', (done) => {
    const body = {
      docs: { foo: [1, 2, 3] },
      patch: [{ op: 'copy', from: '/foo/1', path: '/bar' }],
    };
    chai.request(server)
      .patch('/api/v1/user/json-patch')
      .set('Authorization', token)
      .send(body)
      .end((error, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.keys('bar', 'foo');
        expect(res.body.bar).to.equal(2);
        done();
      });
  });

  it('should patch an object with a test operation', (done) => {
    const body = {
      docs: { foo: 'bar' },
      patch: [{ op: 'test', path: '/foo', value: 'bar' }],
    };
    chai.request(server)
      .patch('/api/v1/user/json-patch')
      .set('Authorization', token)
      .send(body)
      .end((error, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        expect(res.body).to.have.keys('foo');
        expect(res.body.foo).to.equal('bar');
        done();
      });
  });

  it('should throw a 404 error if url path is incorrect', (done) => {
    const body = {
      docs: { foo: 'bar' },
      patch: [{ op: 'add', path: '/foo', value: 'bar' }],
    };
    chai.request(server)
      .patch('/api/v1/user/json-atch')
      .set('Authorization', token)
      .send(body)
      .end((error, res) => {
        expect(res).to.have.status(404);
        expect(res).to.be.a('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.equal('Page does not exit');
        done();
      });
  });

  it('should throw a 401 error if token is invalid', (done) => {
    const body = {
      docs: { foo: 'bar' },
      patch: [{ op: 'add', path: '/foo', value: 'bar' }],
    };
    chai.request(server)
      .patch('/api/v1/user/json-patch')
      .set('Authorization', 'digaallkai')
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
      docs: { foo: 'bar' },
      patch: [{ op: 'add', path: '/foo', value: 'bar' }],
    };
    chai.request(server)
      .patch('/api/v1/user/json-patch')
      .send(body)
      .end((error, res) => {
        expect(res).to.have.status(401);
        expect(res).to.be.a('object');
        expect(res.body).to.have.keys('error');
        expect(res.body.error).to.equal('Unauthorized access');
        done();
      });
  });

  it('should throw a 400 error for invalid patch', (done) => {
    const body = {
      docs: { foo: 'bar' },
      patch: "[{ op: 'add', path: '/foo', value: 'bar' }]",
    };
    chai.request(server)
      .patch('/api/v1/user/json-patch')
      .set('Authorization', token)
      .send(body)
      .end((error, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.a('object');
        expect(res.body).to.have.keys('error', 'type');
        expect(res.body.type).to.equal('InvalidPatch');
        expect(res.body.error).to.equal('patch must be an object or array');
        done();
      });
  });

  it('should throw a 400 error for invalid patch', (done) => {
    const body = {
      docs: { foo: 'bar' },
      patch: [{ op: 'add', ath: '/foo', alue: 'bar' }],
    };
    chai.request(server)
      .patch('/api/v1/user/json-patch')
      .set('Authorization', token)
      .send(body)
      .end((error, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.a('object');
        expect(res.body).to.have.keys('error', 'type');
        expect(res.body.type).to.equal('InvalidPatch');
        expect(res.body.error).to.equal('Invalid patch');
        done();
      });
  });

  it('should throw a 400 error for patch conflict error', (done) => {
    const body = {
      docs: { foo: 'bar' },
      patch: [{ op: 'remove', path: '/boo', value: 'bar' }],
    };
    chai.request(server)
      .patch('/api/v1/user/json-patch')
      .set('Authorization', token)
      .send(body)
      .end((error, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.a('object');
        expect(res.body).to.have.keys('error', 'type');
        expect(res.body.type).to.equal('PatchConflictError');
        expect(res.body.error).to.equal('Value at boo does not exist');
        done();
      });
  });
});
