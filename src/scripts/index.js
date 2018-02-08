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
    this._initEvent();
    this._run();
  },
  _reset: function () {
    this.$body.css({
      '-webkit-transform': 'scaleX(' + screenWidth / originWidth + ') scaleY(' + screenHeight / originHeight + ')',
      transform: 'scaleX(' + screenWidth / originWidth + ') scaleY(' + screenHeight / originHeight + ')'
    });
  },
  _initEvent: function () {
    var _this = this;
    $(document).on('click', '.home .play-icon', function (e) {
      // 隐藏掉 home
      _this.$home.addClass('hide');
      // 显示出来全屏播放页面
      _this.$full_page.addClass('on').removeClass('hide');
      var full_video = document.getElementById("full-vidio");
      // 开始播放
      full_video.play();
      $(full_video).on('ended', function (e) {
        _this._initSharePage();
        _this.$full_page.addClass('hide');
      })
    })
  },
  _initSharePage() {
    this.$share_page.addClass('on').removeClass('hide');
  },
  _initHomePage() {
    var bgAudio = document.getElementById('pre-vidio');
    enableInlineVideo(bgAudio);
    document.addEventListener("WeixinJSBridgeReady", function () {
      bgAudio.play();
    }, false);
  },
  _run: function () {
  }
};

new Page();

