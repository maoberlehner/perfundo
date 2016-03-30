(function () {
  var _ = function (element, o) {
    var me = this;

    if (typeof element === 'string' && $$(element).length > 1) {
      var object = [];
      $$(element).forEach(function (element) {
        object.push(new _(element, o));
      });
      return object;
    }

    // Setup.
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

    // Add ".is-active" functionality.
    var style = $('style', me.element);
    if (style) {
      var isActiveStyle = style.cloneNode(true);
      isActiveStyle.innerHTML = isActiveStyle.innerHTML.replace(
        /:target/gi,
        '.' + me.options.classNames.active
      );
      me.element.insertBefore(isActiveStyle, style);
    }

    $.bind($$('.' + me.options.classNames.link, me.element), {
      click: function (e) {
        if (me.options.disableHistory) {
          e.preventDefault();
        }
        me.openOverlay(this.getAttribute('href'));
      }
    });

    $.bind($$('.' + me.options.classNames.close, me.element), {
      click: function (e) {
        if (me.options.disableHistory) {
          e.preventDefault();
        }
        me.closeOverlay();
      }
    });

    // $.bind($$('.' + me.options.classNames.link, me.element), {
    //   'focus': function (e) {
    //     var trigger = e.target;
    //     var subMenu = trigger.nextElementSibling;
    //     // Close open sub menus that are not part of the triggered menu tree.
    //     var openSubMenus = $$('.' + me.options.classNames.open, me.element);
    //     openSubMenus.forEach(function (openSubMenu) {
    //       if (!isDescendant(openSubMenu, trigger)) {
    //         me.closeSubMenu(openSubMenu);
    //       }
    //     });
    //     // Open the sub menu.
    //     if (me.options.focusopen == 'enabled' && subMenu && subMenu.classList.contains(me.options.classNames.sub)) {
    //       me.openSubMenu(subMenu);
    //     }
    //   },
    //   'blur': function (e) {
    //     // Close all open sub menus if the menu loses focus.
    //     setTimeout(function() {
    //       var trigger = document.activeElement;
    //       if (!isDescendant(me.element, trigger)) {
    //         var openSubMenus = $$('.' + me.options.classNames.open, me.element);
    //         openSubMenus.forEach(function (openSubMenu) {
    //           me.closeSubMenu(openSubMenu);
    //         });
    //       }
    //     }, 1);
    //   }
    // });

    // if (me.options.spaceopen == 'enabled') {
    //   $.bind($$('.' + me.options.classNames.link, me.element), {
    //     'keydown': function (e) {
    //       if (e.keyCode == 32) {
    //         var trigger = e.target;
    //         var subMenu = trigger.nextElementSibling;

    //         if (subMenu && subMenu.classList.contains(me.options.classNames.sub)) {
    //           e.preventDefault();
    //           me.toggleSubMenu(subMenu);
    //         }
    //       }
    //     }
    //   });
    // }

    // if (me.options.clickopen == 'enabled') {
    //   $$('.' + me.options.classNames.sub, me.element).forEach(function (subMenu) {
    //     subMenu.classList.add(me.options.classNames.nohover)
    //   });
    //   $.bind($$('.' + me.options.classNames.link, me.element), {
    //     'click': function (e) {
    //       var subMenu = e.target.nextElementSibling;

    //       if (subMenu && subMenu.classList.contains(me.options.classNames.sub)) {
    //         e.preventDefault();
    //         me.openSubMenu(subMenu);
    //       }
    //     }
    //   });
    // }
  };

  _.prototype = {
    openOverlay: function (overlay) {
      var me = this;
      var overlay = $(overlay);
      me.closeOverlay();
      overlay.classList.add(me.options.classNames.active); // @TODO: use openOverlay prototype
    },
    closeOverlay: function () {
      var me = this;
      $$('.' + me.options.classNames.overlay + '.' + me.options.classNames.active, me.element).forEach(function (overlay) {
        overlay.classList.remove(me.options.classNames.active);
      });
    }
    // openSubMenu: function (subMenu) {
    //   subMenu = $(subMenu, this.element);
    //   // Add open class and aria rule to the sub menu.
    //   subMenu.previousElementSibling.setAttribute('aria-expanded', true);
    //   subMenu.classList.add(this.options.classNames.open);
    // },
    // closeSubMenu: function (subMenu) {
    //   subMenu = $(subMenu, this.element);
    //   // Remove open class and aria rule from not targeted sub menus.
    //   subMenu.previousElementSibling.setAttribute('aria-expanded', false);
    //   subMenu.classList.remove(this.options.classNames.open);
    // },
    // toggleSubMenu: function (subMenu) {
    //   subMenu = $(subMenu, this.element);
    //   if (subMenu.classList.contains(this.options.classNames.open)) {
    //     this.closeSubMenu(subMenu);
    //   }
    //   else {
    //     this.openSubMenu(subMenu);
    //   }
    // }
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

  // function isDescendant(parent, child) {
  //   var node = child.parentNode;
  //   while (node != null) {
  //     if (node == parent) {
  //       return true;
  //     }
  //     node = node.parentNode;
  //   }
  //   return false;
  // }

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
