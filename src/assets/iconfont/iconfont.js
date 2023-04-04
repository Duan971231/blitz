(window._iconfont_svg_string_3763127 =
  '<svg><symbol id="icon-phone-fill" viewBox="0 0 1024 1024"><path d="M885.6 230.2L779.1 123.8c-15.3-15.3-35.8-23.8-57.3-23.8-21.7 0-42.1 8.5-57.4 23.8L549.8 238.4c-15.3 15.3-23.8 35.8-23.8 57.3 0 21.7 8.5 42.1 23.8 57.4l83.8 83.8c-19.7 43.4-46.8 82.4-80.5 116.1-33.6 33.8-72.7 60.9-116.1 80.8L353.2 550c-15.3-15.3-35.8-23.8-57.3-23.8-21.7 0-42.1 8.5-57.4 23.8L123.8 664.5c-15.3 15.3-23.8 35.8-23.8 57.4 0 21.7 8.5 42.1 23.8 57.4l106.3 106.3c24.4 24.5 58.1 38.4 92.7 38.4 7.3 0 14.3-0.6 21.2-1.8 134.8-22.2 268.5-93.9 376.4-201.7C828.2 612.8 899.8 479.2 922.3 344c6.8-41.3-6.9-83.8-36.7-113.8z"  ></path></symbol><symbol id="icon-QQ" viewBox="0 0 1024 1024"><path d="M824.8 613.2c-16-51.4-34.4-94.6-62.7-165.3C766.5 262.2 689.3 112 511.5 112 331.7 112 256.2 265.2 261 447.9c-28.4 70.8-46.7 113.7-62.7 165.3-34 109.5-23 154.8-14.6 155.8 18 2.2 70.1-82.4 70.1-82.4 0 49 25.2 112.9 79.8 159-26.4 8.1-85.7 29.9-71.6 53.8 11.4 19.3 196.2 12.3 249.5 6.3 53.3 6 238.1 13 249.5-6.3 14.1-23.8-45.3-45.7-71.6-53.8 54.6-46.2 79.8-110.1 79.8-159 0 0 52.1 84.6 70.1 82.4 8.5-1.1 19.5-46.4-14.5-155.8z"  ></path></symbol><symbol id="icon-youxiang-" viewBox="0 0 1024 1024"><path d="M1021.407 146.857L512.645 574.783 3.909 146.857zM0.007 183.402L339.886 471.24 0.007 876.743z"  ></path><path d="M39.354 877.144L363.529 494.4 512.54 616.772l149.274-126.179 324.157 386.551zM1023.993 876.743L684.122 471.24l339.871-287.838z"  ></path></symbol></svg>'),
  (function (n) {
    var t = (t = document.getElementsByTagName('script'))[t.length - 1],
      e = t.getAttribute('data-injectcss'),
      t = t.getAttribute('data-disable-injectsvg');
    if (!t) {
      var o,
        i,
        c,
        d,
        a,
        s = function (t, e) {
          e.parentNode.insertBefore(t, e);
        };
      if (e && !n.__iconfont__svg__cssinject__) {
        n.__iconfont__svg__cssinject__ = !0;
        try {
          document.write(
            '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>',
          );
        } catch (t) {
          console && console.log(t);
        }
      }
      (o = function () {
        var t,
          e = document.createElement('div');
        (e.innerHTML = n._iconfont_svg_string_3763127),
          (e = e.getElementsByTagName('svg')[0]) &&
            (e.setAttribute('aria-hidden', 'true'),
            (e.style.position = 'absolute'),
            (e.style.width = 0),
            (e.style.height = 0),
            (e.style.overflow = 'hidden'),
            (e = e),
            (t = document.body).firstChild ? s(e, t.firstChild) : t.appendChild(e));
      }),
        document.addEventListener
          ? ~['complete', 'loaded', 'interactive'].indexOf(document.readyState)
            ? setTimeout(o, 0)
            : ((i = function () {
                document.removeEventListener('DOMContentLoaded', i, !1), o();
              }),
              document.addEventListener('DOMContentLoaded', i, !1))
          : document.attachEvent &&
            ((c = o),
            (d = n.document),
            (a = !1),
            r(),
            (d.onreadystatechange = function () {
              'complete' == d.readyState && ((d.onreadystatechange = null), l());
            }));
    }
    function l() {
      a || ((a = !0), c());
    }
    function r() {
      try {
        d.documentElement.doScroll('left');
      } catch (t) {
        return void setTimeout(r, 50);
      }
      l();
    }
  })(window);
