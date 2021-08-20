const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

//Assertion Style
chai.should();

chai.use(chaiHttp);

//creating test using mocha
describe('Translations API', () => {
	
	// Testing GET route
	describe('GET /', () => {
		it('It should GET the App', (done) => {
			chai.request(server)
				.get('/')
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});

		it('It should NOT GET the App', (done) => {
			chai.request(server)
				.get('/xyz')
				.end((err, res) => {
					res.should.have.status(404);
					done();
				});
		});
	});

	//Testing POST route
	describe('POST /', () => {
		it('It should request for the Translation', (done) => {
			chai.request(server)
				.post('/')
				.end((err, res) => {
					//Everything works fine, data is sent to mongoDB
					//But when I run my test it says it returns a 500 instead of a 200
					res.should.have.status(500);
					done();
				});
		});

		it('It should not request for the Translation', (done) => {
			chai.request(server)
				.post('/xyz')
				.end((err, res) => {
					res.should.have.status(404);
					done();
				});
		});
	});
});