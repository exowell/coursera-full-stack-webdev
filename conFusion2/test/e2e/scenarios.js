'use strict';

describe('conFusion App E2E Testing', function () {

  it('should automatically redirect to / when location hash/fragment is empty', function () {

    browser.get('index.html');
    expect(browser.getCurrentUrl()).toMatch("/");

  });

  describe('index', function () {
    beforeEach(function () {
      browser.get('index.html#/');
    });

    it('should have a title', function () {
      expect(browser.getTitle()).
      toEqual('Ristorante Con Fusion');
    });
  });

  describe('menu item 0', function () {
    beforeEach(function () {
      browser.get('#!/menu/0');
    });

    it('should have a name', function () {
      var name = element(by.binding('dish.name'));
      expect(name.getText()).
      toEqual('Uthapizza Hot $4.99');
    });

    it('should show the number of comments as', function () {
      expect(element.all(by.repeater('comment in dish.comments'))
        .count()).toEqual(7);

    });

    it('should show the first comment author as', function () {
      element(by.model('orderBy')).sendKeys('author');
      expect(element.all(by.repeater('comment in dish.comments'))
        .count()).toEqual(7);
      var author = element.all(by.repeater('comment in dish.comments'))
        .first().element(by.binding('comment.author'));

      expect(author.getText()).toContain('25 Cent');

    });
  });

  describe('contact us feedback form', function () {
    beforeEach(function () {
      browser.get('#!/contactus');
    });

    it('should have empty firstname field', function (){
      expect(element(by.id('firstname')).getText()).toEqual("");
    });

    it('should have submit disabled', function () {
      //var EC = protractor.ExpectedConditions;
      //browser.wait(EC.presenceOf(element(by.id('feedbackSubmit'))), 15000);
      var btn = element(by.id('feedbackSubmit'));
      expect(btn.getAttribute('disabled')).toBe('true');
    });
  });

});
