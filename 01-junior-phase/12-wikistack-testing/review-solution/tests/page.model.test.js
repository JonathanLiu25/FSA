const Page = require('../models').Page;
const User = require('../models').User;
const db = require('../models').db;
const expect = require('chai').expect;
const chai = require('chai');
const chaiSubset = require('chai-subset');
chai.use(chaiSubset);

describe('Page model', function () {

  before(function () {
    return db.sync({force: true});
  });

  afterEach(function () {
    return Promise.all([
      Page.destroy({where: {}}),
      User.destroy({where: {}})
    ]);
  });

  describe('Virtuals', function () {
    
    describe('route', function () {
      
      it('returns the url_name prepended by "/wiki/"', function () {
        const page = Page.build({
          urlTitle: 'Anolis_carolinensis'
        });
        expect(page.route).to.equal('/wiki/Anolis_carolinensis');
      });

    });
    
    describe('renderedContent', function () {
      
      it('converts the markdown-formatted content into HTML', function () {
        const page = Page.build({
          content: '## header **bolded thing** *italic thing*'
        });
        expect(page.renderedContent).to.equal('<h2 id="header-bolded-thing-italic-thing-">header <strong>bolded thing</strong> <em>italic thing</em></h2>\n');
      });

    });

  });

  describe('Class methods', function () {
    describe('findByTag', function () {
      it('gets pages with the search tag');
      it('does not get pages without the search tag');
    });
  });

  describe('Instance methods', function () {
    describe('findSimilar', function () {
      it('never gets itself');
      it('gets other pages with any common tags');
      it('does not get other pages without any common tags');
    });
  });

  describe('Validations', function () {

    it('errors without title', function () {
      return Page.create({})
      .then(
        function successHandler () {
          throw Error('promise succeeded when it should have failed');
        },
        function errorHandler (err) {
          expect(err).to.exist;
          expect(err.errors).to.containSubset([{
            message: 'title cannot be null'
          }]);
        }
      );
    });

    it('errors with empty title', function () {
      return Page.create({
        title: ''
      })
      .then(
        function successHandler () {
          throw Error('promise succeeded when it should have failed');
        },
        function errorHandler (err) {
          expect(err).to.exist;
          expect(err.errors).to.containSubset([{
            path: 'title',
            message: 'Validation notEmpty failed'
          }]);
        }
      );
    });
    
    it('errors without content');
    
    it('errors given an invalid status');
  
  });

  describe('Hooks', function () {
    it('it sets urlTitle based on title before validating');
  });

});