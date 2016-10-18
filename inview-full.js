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
  var set = {};
  var $el;
  var inView = false;



  $.event.special.inviewFull = {
    add: function (handleObj) {
      $el = $(this);
      var domData = $el.data('inviewFull') || {};
      domData.set = domData.set || {};
      handleObj.data = handleObj.data || {};      
      set.interval = handleObj.data.inerval || domData.set.inerval || 250;
      set.includeMargin = handleObj.data.includeMargin || domData.set.includeMargin || false;
      set.offsetTop = handleObj.data.offsetTop || domData.set.offsetTop || 0;
      set.offsetBot = handleObj.data.offsetBot || domData.set.offsetBot || 0;
      timer = setInterval(public.main, set.interval);
      
      console.log(set);

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
    //console.log(set.offsetTop);
    if ((elTop - set.offsetTop) <= 0 && (elBot - set.offsetBot) <= 0) {
      return true;
    }
    return false;
  };

  public.isInViewSmlEl = function () {
    var bound = $el[0].getBoundingClientRect();
    var elTop = Math.round(bound.top);
    var elBot = Math.round(window.innerHeight - bound.bottom);
    if ((elTop + set.offsetTop) >= 0 && (elBot + set.offsetBot) >= 0) {
      return true;
    }
    return false;

  };



}));
