/*[export]*/
var FastClick = require('libs/fastclick');
var enableInlineVideo = require('libs/iphone-inline-video');
FastClick(document.body);

var screenWidth = document.body.clientWidth,
  screenHeight = document.body.clientHeight,
  originWidth = 375,
  originHeight = 667;

var Page = function () {
  this.$body = $('.pageWrapper');
  this.$home = $('.home');
  this.$full_page = $('.full-page');
  this.$comment_page = $('.comment-page');
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
  _initHomePage: function () {
    var _this = this;
    var bgAudio = document.getElementById('pre-vidio');
    enableInlineVideo(bgAudio);
    bgAudio.play();
    document.addEventListener("WeixinJSBridgeReady", function () {
      bgAudio.play();
    }, false);
    document.addEventListener('click', function () {
      bgAudio.play()
    })
    document.addEventListener('touchstart', function () {
      bgAudio.play()
    })
    $(document).on('click', '.home .play-icon', function (e) {
      bgAudio = null;
      // 显示出来全屏播放页面
      _this._initFullPage();
      // _this._initCommentPage();
      // 隐藏掉 home
      _this.$home.addClass('hide').removeClass('on');
    })
  },
  _initFullPage: function () {
    var _this = this;
    this.$full_page.addClass('on').removeClass('hide');
    var full_video = document.getElementById("full-vidio");
    enableInlineVideo(full_video);
    // 开始播放
    full_video.play();
    $(full_video).on('ended', function (e) {
      _this._initCommentPage();
      _this.$full_page.addClass('hide').removeClass('on');
    })
  },
  _initCommentPage: function () {
    var _this = this;
    this.$comment_page.addClass('on').removeClass('hide');
    $(document).on('click', '.comment-page .repeat-button', function (e) {
      _this.$comment_page.addClass('hide').removeClass('on');
      _this._initFullPage();
    })
    $(document).on('click', '.comment-page .share-button', function (e) {
      _this._initSharePage();
    })
  },
  _initSharePage: function () {
    this.$share_page.addClass('on').removeClass('hide');
  },
};

new Page();

