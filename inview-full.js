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

  var public = {};

  var timer;
  var set;
  var $el;
  var inView = false;



  $.event.special.inviewFull = {
    add: function (handleObj) {      
      $el = $(this);
      var domSet = $el.data('inviewFull') || {};
      set = handleObj.data || domSet || {};
      set.interval = set.inerval || domSet.inerval || 250;
      set.includeMargin = set.includeMargin || domSet.includeMargin || false;
      set.offsetTop = set.offsetTop || domSet.offsetTop || 0;
      set.offsetTop = set.offsetBot || domSet.offsetBot || 0;
      timer = setInterval(public.main, set.interval);
      

    },
    remove: function (handleObj) {
      clearInterval(timer);
    }
  };

  public.main = function () {
    if (public.isInView() && !inView) {
      inView = true;
      $el.trigger('inviewFull', true);      
    }
    else if (!public.isInView() && inView) {
      inView = false;
      $el.trigger('inviewFull', false);
    }
  };

  public.isInView = function () {
    var elH = $el.outerHeight(set.includeMargin);
    var vpH = window.innerHeight;
    if (elH > vpH) {
      return public.isInViewBigEl();
    } else {
      return public.isInViewSmlEl();
    }
  };

  public.isInViewBigEl = function () {
    var bound = $el[0].getBoundingClientRect();
    var elTop = Math.round(bound.top);
    var elBot = Math.round(window.innerHeight - bound.bottom);
    if (elTop <= 0 && elBot <= 0) {
      return true;
    }
    return false;
  };

  public.isInViewSmlEl = function () {
    var bound = $el[0].getBoundingClientRect();
    var elTop = Math.round(bound.top);
    var elBot = Math.round(window.innerHeight - bound.bottom);
    if (elTop >= 0 && elBot >= 0) {
      return true;
    }
    return false;

  };



}));
