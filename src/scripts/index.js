/*[export]*/
var FastClick = require('libs/fastclick');
// require('./libs/zeptofullpage');
// require('./libs/jsfullpage.js');
var enableInlineVideo = require('libs/iphone-inline-video');
FastClick(document.body);

console.log('enableInlineVideo', enableInlineVideo);
var screenWidth = document.body.clientWidth,
  screenHeight = document.body.clientHeight,
  originWidth = 375,
  originHeight = 667;

var Page = function () {
  this.$body = $('.pageWrapper');
  this.$home = $('.home');
  this.$full_page = $('.full-page');
  this.$share_page = $('.share-page');
  this.init();
};


Page.prototype = {
  init: function () {
    this._reset();
    this._initHomePage();
  },
  _reset: function () {
    this.$body.css({
      '-webkit-transform': 'scaleX(' + screenWidth / originWidth + ') scaleY(' + screenHeight / originHeight + ')',
      transform: 'scaleX(' + screenWidth / originWidth + ') scaleY(' + screenHeight / originHeight + ')'
    });
  },
  _initHomePage() {
    var _this = this;
    var bgAudio = document.getElementById('pre-vidio');
    enableInlineVideo(bgAudio);
    document.addEventListener("WeixinJSBridgeReady", function () {
      bgAudio.play();
    }, false);
    $(document).on('click', '.home .play-icon', function (e) {
      // 隐藏掉 home
      _this.$home.addClass('hide').removeClass('on');
      // 显示出来全屏播放页面
      _this._initFullPage();
    })
  },
  _initFullPage() {
    var _this = this;
    this.$full_page.addClass('on').removeClass('hide');
    var full_video = document.getElementById("full-vidio");
    // 开始播放
    full_video.play();
    $(full_video).on('ended', function (e) {
      _this.$full_page.addClass('hide').removeClass('on');
      _this._initSharePage();
    })
  },
  _initSharePage() {
    var _this = this;
    this.$share_page.addClass('on').removeClass('hide');
    $(document).on('click', '.share-page .repeat-button', function (e) {
      _this.$share_page.addClass('hide').removeClass('on');
      _this._initFullPage();
    })
  },
};

new Page();

