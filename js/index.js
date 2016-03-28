(function () {
  var _ = function (element, o) {
    var self = this;

    if (typeof element === 'string' && $$(element).length > 1) {
      var object = [];
      $$(element).forEach(function (element) {
        object.push(new _(element, o));
      });
      return object;
    }

    // Setup.
    self.element = $(element);
    self.options = {};

    // Return an empty object if the element does not exist.
    if (!self.element) {
      return {};
    }

    o = o || {};

    configure(self, {
      disableHistory: false,
      classNames: {
        main: 'perfundo',
        link: '__link',
        overlay: '__overlay',
        content: '__content',
        html: '__html',
        figcaption: '__figcaption',
        control: '__control',
        close: '__close',
        prev: '__prev',
        next: '__next',
        untarget: '__untarget',
        active: 'is-active'
      }
    }, o);

    // Add ".is-active" functionality.
    var style = $('style', self.element);
    if (style) {
      var isActiveStyle = style.cloneNode(true);
      isActiveStyle.innerHTML = isActiveStyle.innerHTML.replace(
        /:target/gi,
        '.' + self.options.classNames.active
      );
      self.element.insertBefore(isActiveStyle, style);
    }

    $.bind($$('.' + self.options.classNames.main + self.options.classNames.link, self.element), {
      'click': function (e) {
        var overlay = $(this.getAttribute('href'));
        if (self.options.disableHistory) {
          e.preventDefault();
        }
        self.closeOverlay();
        overlay.classList.add(self.options.classNames.active); // @TODO: use openOverlay prototype
      }
    });

    $.bind($$('.' + self.options.classNames.main + self.options.classNames.close, self.element), {
      'click': function (e) {
        if (self.options.disableHistory) {
          e.preventDefault();
        }
        self.closeOverlay();
      }
    });

    // $.bind($$('.' + self.options.classNames.link, self.element), {
    //   'focus': function (e) {
    //     var trigger = e.target;
    //     var subMenu = trigger.nextElementSibling;
    //     // Close open sub menus that are not part of the triggered menu tree.
    //     var openSubMenus = $$('.' + self.options.classNames.open, self.element);
    //     openSubMenus.forEach(function (openSubMenu) {
    //       if (!isDescendant(openSubMenu, trigger)) {
    //         self.closeSubMenu(openSubMenu);
    //       }
    //     });
    //     // Open the sub menu.
    //     if (self.options.focusopen == 'enabled' && subMenu && subMenu.classList.contains(self.options.classNames.sub)) {
    //       self.openSubMenu(subMenu);
    //     }
    //   },
    //   'blur': function (e) {
    //     // Close all open sub menus if the menu loses focus.
    //     setTimeout(function() {
    //       var trigger = document.activeElement;
    //       if (!isDescendant(self.element, trigger)) {
    //         var openSubMenus = $$('.' + self.options.classNames.open, self.element);
    //         openSubMenus.forEach(function (openSubMenu) {
    //           self.closeSubMenu(openSubMenu);
    //         });
    //       }
    //     }, 1);
    //   }
    // });

    // if (self.options.spaceopen == 'enabled') {
    //   $.bind($$('.' + self.options.classNames.link, self.element), {
    //     'keydown': function (e) {
    //       if (e.keyCode == 32) {
    //         var trigger = e.target;
    //         var subMenu = trigger.nextElementSibling;

    //         if (subMenu && subMenu.classList.contains(self.options.classNames.sub)) {
    //           e.preventDefault();
    //           self.toggleSubMenu(subMenu);
    //         }
    //       }
    //     }
    //   });
    // }

    // if (self.options.clickopen == 'enabled') {
    //   $$('.' + self.options.classNames.sub, self.element).forEach(function (subMenu) {
    //     subMenu.classList.add(self.options.classNames.nohover)
    //   });
    //   $.bind($$('.' + self.options.classNames.link, self.element), {
    //     'click': function (e) {
    //       var subMenu = e.target.nextElementSibling;

    //       if (subMenu && subMenu.classList.contains(self.options.classNames.sub)) {
    //         e.preventDefault();
    //         self.openSubMenu(subMenu);
    //       }
    //     }
    //   });
    // }
  };

  _.prototype = {
    closeOverlay: function () {
      var self = this;
      $$('.' + self.options.classNames.main + self.options.classNames.overlay + '.' + self.options.classNames.active, self.element).forEach(function (overlay) {
        overlay.classList.remove(self.options.classNames.active);
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

  // Make sure to export componentNav on self when in a browser.
  if (typeof self !== 'undefined') {
    self.componentNav = _;
  }

  // Expose componentNav as a CJS module.
  if (typeof module === 'object' && module.exports) {
    module.exports = _;
  }

  return _;
}());
