/**
 * author Aleksandar Veljkovic
 *   
 */

(function (factory) {
  if (typeof define == 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {
  var $el;
  $.event.special.inviewFull = {
    add: function (handleObj) {
      $el = $(this);
      $el.data('inviewFull', new inviewFull(handleObj, $el));
      $el.data('inviewFull').start();
    },
    remove: function (handleObj) {
      $el.data('inviewFull').stop();
    }
  };

  var inviewFull = function (handleObj, $el) {
    
    var _this = this;

    this.timer;
    
    this.set = {};

    this.inView = false;

    this.start = function () {
      handleObj.data = handleObj.data || {};
      this.set.interval = handleObj.data.inerval || 250;
      this.set.includeMargin = handleObj.data.includeMargin || false;
      this.set.offsetTop = handleObj.data.offsetTop || 0;
      this.set.offsetBot = handleObj.data.offsetBot || 0;
      this.timer = setInterval(this.main, this.set.interval);
    };

    this.stop = function () {
      clearInterval(this.timer);
    };



    this.main = function () {
      if (_this.isInView() && !_this.inView) {
        _this.inView = true;
        $el.trigger('inviewFull', true);
      } else if (!_this.isInView() && _this.inView) {
        _this.inView = false;
        $el.trigger('inviewFull', false);
      }
    };

    this.isInView = function () {
      var elH = $el.outerHeight(this.set.includeMargin);
      var vpH = window.innerHeight;
      if (elH > vpH) {
        return this.isInViewBigEl();
      } else {
        return this.isInViewSmlEl();
      }
    };

    this.isInViewBigEl = function () {
      var bound = $el[0].getBoundingClientRect();
      var elTop = Math.round(bound.top);
      var elBot = Math.round(window.innerHeight - bound.bottom);
      if ((elTop - this.set.offsetTop) <= 0 && (elBot - this.set.offsetBot) <= 0) {
        return true;
      }
      return false;
    };

    this.isInViewSmlEl = function () {
      var bound = $el[0].getBoundingClientRect();
      var elTop = Math.round(bound.top);
      var elBot = Math.round(window.innerHeight - bound.bottom);
      if ((elTop + this.set.offsetTop) >= 0 && (elBot + this.set.offsetBot) >= 0) {
        return true;
      }
      return false;

    };

  };

}));
