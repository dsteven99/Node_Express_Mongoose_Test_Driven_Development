const mongoose = require('mongoose');

before(done => {
    mongoose.connect('mongodb://localhost:27017/muber_test', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    mongoose.connection
        .once('open', () => {
            console.log(`Test Database connected successfully`);
            done();
        })
        .on('error', err => {
            console.warn('Warning', err);
        });
    
});

beforeEach(done => {
    const { drivers } = mongoose.connection.collections;
    drivers.drop()
        .then(() => drivers.createIndexes({ 'geometry.coordinates': '2dsphere'}))
        .then(() => {
            done();
        })
        .catch(() => {
            done();
        });
});