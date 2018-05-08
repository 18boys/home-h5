!function () {
  var e = document.getElementById.bind(document), n = e("video"), i = e("loading"), t = e("content"), o = e("play"),
    d = e("replay"), s = "./img/v0.mp4", a = !1;

  function l(e) {
    e === n && (console.log(window.orientation), setTimeout(function () {
      180 === window.orientation || 0 === window.orientation || window.innerWidth < window.innerHeight ? (n.style.width = Math.max(window.innerWidth, window.innerHeight) + "px", n.style.height = Math.min(window.innerWidth, window.innerHeight) + "px", n.style.top = (Math.max(window.innerWidth, window.innerHeight) - Math.min(window.innerWidth, window.innerHeight)) / 2 + "px", n.style.left = -(Math.max(window.innerWidth, window.innerHeight) - Math.min(window.innerWidth, window.innerHeight)) / 2 + "px") : (n.style.width = Math.max(window.innerWidth, window.innerHeight) + "px", n.style.height = Math.min(window.innerWidth, window.innerHeight) + "px", n.style.top = "50%", n.style.left = "50%")
    }, 500), Zepto(".jump").show(), n.style.zIndex = "1"), e.style.display = "block"
  }

  function r(e) {
    e === n && (n.style.zIndex = "-1", Zepto(".jump").hide()), e.style.display = "none"
  }

  function w() {
    n.src = s;
    var e = +new Date, t = 8e3, d = null;
    n.play(), n.addEventListener("playing", function e() {
      n.pause();
      n.removeEventListener("playing", e)
    });
    var w = -1;
    setTimeout(function s() {
      var u, c, p = (c = (u = n).buffered.length > 0 ? u.buffered.end(0) : 0, c = parseInt(1e3 * c + 1) / 1e3),
        h = n.duration;
      if (+new Date - e > t || p >= h || w === p) return a ? (r(i), l(o)) : setTimeout(function () {
        r(i), l(o)
      }, 2e3), void(d && (clearTimeout(d), d = null));
      w = p, d = setTimeout(function () {
        s()
      }, 500)
    }, 500)
  }

  if (-1 !== navigator.userAgent.indexOf("MiuiBrowser")) w(), n.className = "miui"; else {
    var u = new XMLHttpRequest;
    u.open("GET", s, !0), u.responseType = "blob", u.timeout = 12e4, u.ontimeout = function (e) {
      console.log("timeout"), w()
    }, u.onload = function () {
      if (200 === this.status && "video/mp4" === this.response.type) {
        var e = this.response, t = (window.URL || window.webkitURL || window || {}).createObjectURL(e);
        a ? (r(i), l(o)) : setTimeout(function () {
          r(i), l(o)
        }, 3e3), n.src = t
      } else w()
    }, u.onerror = function (e) {
      console.log(e), w()
    }, u.send()
  }
  o.addEventListener("click", function () {
    r(document.getElementsByClassName("all")[0]), n.play()
  }), d.addEventListener("click", function () {
    t.style.display = "none", l(n), n.currentTime = 0, n.play()
  }), n.addEventListener("timeupdate", function () {
    !n.isPlayed && this.currentTime > .1 && (l(n), n.isPlayed = !0)
  }), n.addEventListener("ended", function () {
    r(n), t.style.display = "block", t.style.opacity = "1"
  }), Zepto(".jump").on("click", function () {
    n.pause(), r(n), t.style.display = "block", t.style.opacity = "1"
  }), Zepto(".landscape").hide(), Zepto("#loading").show(), a = !0, window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
    console.log(!n.isPlayed, n.currentTime), "none" != n.style.display && n.currentTime > .1 && l(n)
  }, !1)
}();