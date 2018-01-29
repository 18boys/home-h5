/*[export]*/
var FastClick = require('libs/fastclick');
require('./libs/zeptofullpage');
require('./libs/jsfullpage.js');

FastClick(document.body);


var screenWidth = document.body.clientWidth,
  screenHeight = document.body.clientHeight,
  originWidth = 375,
  originHeight = 604;

var Page = function () {
  this.$body = $('.pageWrapper');
  this.$page = $('.page');
  this.init();
};


Page.prototype = {
  init: function () {
    this._reset();
    this._run();
  },
  _reset: function () {
    // this.$body.css({
    //   '-webkit-transform': 'scaleX(' + screenWidth / originWidth + ') scaleY(' + screenHeight / originHeight + ')',
    //   transform: 'scaleX(' + screenWidth / originWidth + ') scaleY(' + screenHeight / originHeight + ')'
    // });
    // this.$page.css({
    //   width: screenWidth,
    //   height: screenHeight,
    // })
  },
  _run: function () {
  }
};

new Page();

