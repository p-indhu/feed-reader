/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('has each url defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
           });
         });

        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('has each name defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
           });
         });

    });


    /* a new test suite named "The menu" to check the functioning of menu icon*/
    describe('The menu', function() {
        /* a test that ensures the menu element is
         * hidden by default.
         */
         it('is hidden', function() {
              expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         /* a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('changes visibility', function() {
              const menu = $('.menu-icon-link');
              menu.trigger('click');
              expect($('body').hasClass('menu-hidden')).toBe(false);
              menu.trigger('click');
              expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });

    /* a new test suite named "Initial Entries" to check the loading of feeds*/
    describe('Initial Entries', function() {
        /* a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
         beforeEach(function(done) {
              loadFeed(0, function() {
                  done();
              });
         });
         it('is not empty', function(done) {
              expect($('.entry').length).not.toBe(0);
              done();
         });
    });

    /* a new test suite named "New Feed Selection" to test that new content is loaded*/
    describe('New Feed Selection', function() {
        /* a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         let feed1, feed2;
         beforeEach(function(done) {
         //loading allFeeds[1]
              loadFeed(1, function(){
                   feed1 = $('.entry').text();
                   //loading allFeeds[0]
                   loadFeed(0, function(){
                        feed2 = $('.entry').text();
                        done();
                   });
              });
        });
        it('changes', function(done) {
             //expect content to change
              expect(feed1).not.toBe(feed2);
              done();
        });

    });
}());
