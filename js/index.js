(function () {
  var _ = function (element, o) {
    var me = this;

    // Make it possible to initialize perfundo on multiple elements at once.
    if (typeof element === 'string' && $$(element).length > 1) {
      var object = [];
      $$(element).forEach(function (element) {
        object.push(new _(element, o));
      });
      return object;
    }

    me.element = $(element);
    me.options = {};

    // Return an empty object if the element does not exist.
    if (!me.element) {
      return {};
    }

    o = o || {};

    // @TODO: remove unused class names?!
    configure(me, {
      disableHistory: false,
      classNames: {
        main: 'perfundo',
        link: 'perfundo__link',
        overlay: 'perfundo__overlay',
        content: 'perfundo__content',
        html: 'perfundo__html',
        figcaption: 'perfundo__figcaption',
        control: 'perfundo__control',
        close: 'perfundo__close',
        prev: 'perfundo__prev',
        next: 'perfundo__next',
        untarget: 'perfundo__untarget',
        active: 'is-active'
      }
    }, o);

    $.bind($$('.' + me.options.classNames.link, me.element), {
      click: function (e) {
        if (me.options.disableHistory) {
          e.preventDefault();
        }
        me.openOverlay(this.getAttribute('href'));
      }
    });

    $.bind(me.element, {
      click: function (e) {
        if (e.target.classList.contains(me.options.classNames.close) || e.target.classList.contains(me.options.classNames.overlay)) {
          if (me.options.disableHistory) {
            e.preventDefault();
          }
          me.closeOverlay();
        }
      }
    });
  };

  _.prototype = {
    openOverlay: function (overlay) {
      var me = this;
      var overlay = $(overlay);
      me.closeOverlay();
      overlay.classList.add(me.options.classNames.active);
    },
    closeOverlay: function () {
      var me = this;
      $$('.' + me.options.classNames.overlay + '.' + me.options.classNames.active, me.element).forEach(function (overlay) {
        overlay.classList.remove(me.options.classNames.active);
      });
    }
  };

  // Private functions.
  function configure(instance, properties, o) {
    for (var i in properties) {
      var initial = properties[i];
      var attrValue = instance.element.getAttribute('data-' + i.toLowerCase());

      if (typeof initial === 'number') {
        instance.options[i] = parseInt(attrValue);
      }
      else if (initial === false) {
        instance.options[i] = attrValue !== null;
      }
      else if (initial instanceof Function) {
        instance.options[i] = null;
      }
      else {
        instance.options[i] = attrValue;
      }

      if (!instance.options[i] && instance.options[i] !== 0) {
        instance.options[i] = (i in o) ? o[i] : initial;
      }
    }
  }

  // Helpers.
  var slice = Array.prototype.slice;

  function $(expr, con) {
    return typeof expr === 'string' ? (con || document).querySelector(expr) : expr || null;
  }

  function $$(expr, con) {
    return slice.call((con || document).querySelectorAll(expr));
  }

  $.bind = function(elements, o) {
    if (elements) {
      elements = elements.length ? elements : [elements];
      elements.forEach(function (element) {
        for (var event in o) {
          var callback = o[event];
          event.split(/\s+/).forEach(function (event) {
            element.addEventListener(event, callback);
          });
        }
      });
    }
  };

  _.$ = $;
  _.$$ = $$;

  // Make sure to export perfundo on self when in a browser.
  if (typeof self !== 'undefined') {
    self.perfundo = _;
  }

  // Expose componentNav as a CJS module.
  if (typeof module === 'object' && module.exports) {
    module.exports = _;
  }

  return _;
}());
