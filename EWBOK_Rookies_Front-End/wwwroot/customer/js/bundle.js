/*!
 * Bootstrap v3.3.6 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 2)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.6
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.6
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.6'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.6
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.6'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault()
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.6
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.6'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.6
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.6'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.6
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.6'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.6
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.6'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.6
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.6'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.6
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.6'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.6
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.6'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.6
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.6'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.6
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.6'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

/*!
 * SmartMenus jQuery Plugin - v1.0.0 - January 27, 2016
 * http://www.smartmenus.org/
 *
 * Copyright Vasil Dinkov, Vadikom Web Ltd.
 * http://vadikom.com
 *
 * Licensed MIT
 */

(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof module === 'object' && typeof module.exports === 'object') {
		// CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Global jQuery
		factory(jQuery);
	}
} (function($) {

	var menuTrees = [],
		IE = !!window.createPopup, // detect it for the iframe shim
		mouse = false, // optimize for touch by default - we will detect for mouse input
		touchEvents = 'ontouchstart' in window, // we use this just to choose between toucn and pointer events, not for touch screen detection
		mouseDetectionEnabled = false,
		requestAnimationFrame = window.requestAnimationFrame || function(callback) { return setTimeout(callback, 1000 / 60); },
		cancelAnimationFrame = window.cancelAnimationFrame || function(id) { clearTimeout(id); };

	// Handle detection for mouse input (i.e. desktop browsers, tablets with a mouse, etc.)
	function initMouseDetection(disable) {
		var eNS = '.smartmenus_mouse';
		if (!mouseDetectionEnabled && !disable) {
			// if we get two consecutive mousemoves within 2 pixels from each other and within 300ms, we assume a real mouse/cursor is present
			// in practice, this seems like impossible to trick unintentianally with a real mouse and a pretty safe detection on touch devices (even with older browsers that do not support touch events)
			var firstTime = true,
				lastMove = null;
			$(document).bind(getEventsNS([
				['mousemove', function(e) {
					var thisMove = { x: e.pageX, y: e.pageY, timeStamp: new Date().getTime() };
					if (lastMove) {
						var deltaX = Math.abs(lastMove.x - thisMove.x),
							deltaY = Math.abs(lastMove.y - thisMove.y);
	 					if ((deltaX > 0 || deltaY > 0) && deltaX <= 2 && deltaY <= 2 && thisMove.timeStamp - lastMove.timeStamp <= 300) {
							mouse = true;
							// if this is the first check after page load, check if we are not over some item by chance and call the mouseenter handler if yes
							if (firstTime) {
								var $a = $(e.target).closest('a');
								if ($a.is('a')) {
									$.each(menuTrees, function() {
										if ($.contains(this.$root[0], $a[0])) {
											this.itemEnter({ currentTarget: $a[0] });
											return false;
										}
									});
								}
								firstTime = false;
							}
						}
					}
					lastMove = thisMove;
				}],
				[touchEvents ? 'touchstart' : 'pointerover pointermove pointerout MSPointerOver MSPointerMove MSPointerOut', function(e) {
					if (isTouchEvent(e.originalEvent)) {
						mouse = false;
					}
				}]
			], eNS));
			mouseDetectionEnabled = true;
		} else if (mouseDetectionEnabled && disable) {
			$(document).unbind(eNS);
			mouseDetectionEnabled = false;
		}
	}

	function isTouchEvent(e) {
		return !/^(4|mouse)$/.test(e.pointerType);
	}

	// returns a jQuery bind() ready object
	function getEventsNS(defArr, eNS) {
		if (!eNS) {
			eNS = '';
		}
		var obj = {};
		$.each(defArr, function(index, value) {
			obj[value[0].split(' ').join(eNS + ' ') + eNS] = value[1];
		});
		return obj;
	}

	$.SmartMenus = function(elm, options) {
		this.$root = $(elm);
		this.opts = options;
		this.rootId = ''; // internal
		this.accessIdPrefix = '';
		this.$subArrow = null;
		this.activatedItems = []; // stores last activated A's for each level
		this.visibleSubMenus = []; // stores visible sub menus UL's (might be in no particular order)
		this.showTimeout = 0;
		this.hideTimeout = 0;
		this.scrollTimeout = 0;
		this.clickActivated = false;
		this.focusActivated = false;
		this.zIndexInc = 0;
		this.idInc = 0;
		this.$firstLink = null; // we'll use these for some tests
		this.$firstSub = null; // at runtime so we'll cache them
		this.disabled = false;
		this.$disableOverlay = null;
		this.$touchScrollingSub = null;
		this.cssTransforms3d = 'perspective' in elm.style || 'webkitPerspective' in elm.style;
		this.wasCollapsible = false;
		this.init();
	};

	$.extend($.SmartMenus, {
		hideAll: function() {
			$.each(menuTrees, function() {
				this.menuHideAll();
			});
		},
		destroy: function() {
			while (menuTrees.length) {
				menuTrees[0].destroy();
			}
			initMouseDetection(true);
		},
		prototype: {
			init: function(refresh) {
				var self = this;

				if (!refresh) {
					menuTrees.push(this);

					this.rootId = (new Date().getTime() + Math.random() + '').replace(/\D/g, '');
					this.accessIdPrefix = 'sm-' + this.rootId + '-';

					if (this.$root.hasClass('sm-rtl')) {
						this.opts.rightToLeftSubMenus = true;
					}

					// init root (main menu)
					var eNS = '.smartmenus';
					this.$root
						.data('smartmenus', this)
						.attr('data-smartmenus-id', this.rootId)
						.dataSM('level', 1)
						.bind(getEventsNS([
							['mouseover focusin', $.proxy(this.rootOver, this)],
							['mouseout focusout', $.proxy(this.rootOut, this)],
							['keydown', $.proxy(this.rootKeyDown, this)]
						], eNS))
						.delegate('a', getEventsNS([
							['mouseenter', $.proxy(this.itemEnter, this)],
							['mouseleave', $.proxy(this.itemLeave, this)],
							['mousedown', $.proxy(this.itemDown, this)],
							['focus', $.proxy(this.itemFocus, this)],
							['blur', $.proxy(this.itemBlur, this)],
							['click', $.proxy(this.itemClick, this)]
						], eNS));

					// hide menus on tap or click outside the root UL
					eNS += this.rootId;
					if (this.opts.hideOnClick) {
						$(document).bind(getEventsNS([
							['touchstart', $.proxy(this.docTouchStart, this)],
							['touchmove', $.proxy(this.docTouchMove, this)],
							['touchend', $.proxy(this.docTouchEnd, this)],
							// for Opera Mobile < 11.5, webOS browser, etc. we'll check click too
							['click', $.proxy(this.docClick, this)]
						], eNS));
					}
					// hide sub menus on resize
					$(window).bind(getEventsNS([['resize orientationchange', $.proxy(this.winResize, this)]], eNS));

					if (this.opts.subIndicators) {
						this.$subArrow = $('<span/>').addClass('sub-arrow');
						if (this.opts.subIndicatorsText) {
							this.$subArrow.html(this.opts.subIndicatorsText);
						}
					}

					// make sure mouse detection is enabled
					initMouseDetection();
				}

				// init sub menus
				this.$firstSub = this.$root.find('ul').each(function() { self.menuInit($(this)); }).eq(0);

				this.$firstLink = this.$root.find('a').eq(0);

				// find current item
				if (this.opts.markCurrentItem) {
					var reDefaultDoc = /(index|default)\.[^#\?\/]*/i,
						reHash = /#.*/,
						locHref = window.location.href.replace(reDefaultDoc, ''),
						locHrefNoHash = locHref.replace(reHash, '');
					this.$root.find('a').each(function() {
						var href = this.href.replace(reDefaultDoc, ''),
							$this = $(this);
						if (href == locHref || href == locHrefNoHash) {
							$this.addClass('current');
							if (self.opts.markCurrentTree) {
								$this.parentsUntil('[data-smartmenus-id]', 'ul').each(function() {
									$(this).dataSM('parent-a').addClass('current');
								});
							}
						}
					});
				}

				// save initial state
				this.wasCollapsible = this.isCollapsible();
			},
			destroy: function(refresh) {
				if (!refresh) {
					var eNS = '.smartmenus';
					this.$root
						.removeData('smartmenus')
						.removeAttr('data-smartmenus-id')
						.removeDataSM('level')
						.unbind(eNS)
						.undelegate(eNS);
					eNS += this.rootId;
					$(document).unbind(eNS);
					$(window).unbind(eNS);
					if (this.opts.subIndicators) {
						this.$subArrow = null;
					}
				}
				this.menuHideAll();
				var self = this;
				this.$root.find('ul').each(function() {
						var $this = $(this);
						if ($this.dataSM('scroll-arrows')) {
							$this.dataSM('scroll-arrows').remove();
						}
						if ($this.dataSM('shown-before')) {
							if (self.opts.subMenusMinWidth || self.opts.subMenusMaxWidth) {
								$this.css({ width: '', minWidth: '', maxWidth: '' }).removeClass('sm-nowrap');
							}
							if ($this.dataSM('scroll-arrows')) {
								$this.dataSM('scroll-arrows').remove();
							}
							$this.css({ zIndex: '', top: '', left: '', marginLeft: '', marginTop: '', display: '' });
						}
						if (($this.attr('id') || '').indexOf(self.accessIdPrefix) == 0) {
							$this.removeAttr('id');
						}
					})
					.removeDataSM('in-mega')
					.removeDataSM('shown-before')
					.removeDataSM('ie-shim')
					.removeDataSM('scroll-arrows')
					.removeDataSM('parent-a')
					.removeDataSM('level')
					.removeDataSM('beforefirstshowfired')
					.removeAttr('role')
					.removeAttr('aria-hidden')
					.removeAttr('aria-labelledby')
					.removeAttr('aria-expanded');
				this.$root.find('a.has-submenu').each(function() {
						var $this = $(this);
						if ($this.attr('id').indexOf(self.accessIdPrefix) == 0) {
							$this.removeAttr('id');
						}
					})
					.removeClass('has-submenu')
					.removeDataSM('sub')
					.removeAttr('aria-haspopup')
					.removeAttr('aria-controls')
					.removeAttr('aria-expanded')
					.closest('li').removeDataSM('sub');
				if (this.opts.subIndicators) {
					this.$root.find('span.sub-arrow').remove();
				}
				if (this.opts.markCurrentItem) {
					this.$root.find('a.current').removeClass('current');
				}
				if (!refresh) {
					this.$root = null;
					this.$firstLink = null;
					this.$firstSub = null;
					if (this.$disableOverlay) {
						this.$disableOverlay.remove();
						this.$disableOverlay = null;
					}
					menuTrees.splice($.inArray(this, menuTrees), 1);
				}
			},
			disable: function(noOverlay) {
				if (!this.disabled) {
					this.menuHideAll();
					// display overlay over the menu to prevent interaction
					if (!noOverlay && !this.opts.isPopup && this.$root.is(':visible')) {
						var pos = this.$root.offset();
						this.$disableOverlay = $('<div class="sm-jquery-disable-overlay"/>').css({
							position: 'absolute',
							top: pos.top,
							left: pos.left,
							width: this.$root.outerWidth(),
							height: this.$root.outerHeight(),
							zIndex: this.getStartZIndex(true),
							opacity: 0
						}).appendTo(document.body);
					}
					this.disabled = true;
				}
			},
			docClick: function(e) {
				if (this.$touchScrollingSub) {
					this.$touchScrollingSub = null;
					return;
				}
				// hide on any click outside the menu or on a menu link
				if (this.visibleSubMenus.length && !$.contains(this.$root[0], e.target) || $(e.target).is('a')) {
					this.menuHideAll();
				}
			},
			docTouchEnd: function(e) {
				if (!this.lastTouch) {
					return;
				}
				if (this.visibleSubMenus.length && (this.lastTouch.x2 === undefined || this.lastTouch.x1 == this.lastTouch.x2) && (this.lastTouch.y2 === undefined || this.lastTouch.y1 == this.lastTouch.y2) && (!this.lastTouch.target || !$.contains(this.$root[0], this.lastTouch.target))) {
					if (this.hideTimeout) {
						clearTimeout(this.hideTimeout);
						this.hideTimeout = 0;
					}
					// hide with a delay to prevent triggering accidental unwanted click on some page element
					var self = this;
					this.hideTimeout = setTimeout(function() { self.menuHideAll(); }, 350);
				}
				this.lastTouch = null;
			},
			docTouchMove: function(e) {
				if (!this.lastTouch) {
					return;
				}
				var touchPoint = e.originalEvent.touches[0];
				this.lastTouch.x2 = touchPoint.pageX;
				this.lastTouch.y2 = touchPoint.pageY;
			},
			docTouchStart: function(e) {
				var touchPoint = e.originalEvent.touches[0];
				this.lastTouch = { x1: touchPoint.pageX, y1: touchPoint.pageY, target: touchPoint.target };
			},
			enable: function() {
				if (this.disabled) {
					if (this.$disableOverlay) {
						this.$disableOverlay.remove();
						this.$disableOverlay = null;
					}
					this.disabled = false;
				}
			},
			getClosestMenu: function(elm) {
				var $closestMenu = $(elm).closest('ul');
				while ($closestMenu.dataSM('in-mega')) {
					$closestMenu = $closestMenu.parent().closest('ul');
				}
				return $closestMenu[0] || null;
			},
			getHeight: function($elm) {
				return this.getOffset($elm, true);
			},
			// returns precise width/height float values
			getOffset: function($elm, height) {
				var old;
				if ($elm.css('display') == 'none') {
					old = { position: $elm[0].style.position, visibility: $elm[0].style.visibility };
					$elm.css({ position: 'absolute', visibility: 'hidden' }).show();
				}
				var box = $elm[0].getBoundingClientRect && $elm[0].getBoundingClientRect(),
					val = box && (height ? box.height || box.bottom - box.top : box.width || box.right - box.left);
				if (!val && val !== 0) {
					val = height ? $elm[0].offsetHeight : $elm[0].offsetWidth;
				}
				if (old) {
					$elm.hide().css(old);
				}
				return val;
			},
			getStartZIndex: function(root) {
				var zIndex = parseInt(this[root ? '$root' : '$firstSub'].css('z-index'));
				if (!root && isNaN(zIndex)) {
					zIndex = parseInt(this.$root.css('z-index'));
				}
				return !isNaN(zIndex) ? zIndex : 1;
			},
			getTouchPoint: function(e) {
				return e.touches && e.touches[0] || e.changedTouches && e.changedTouches[0] || e;
			},
			getViewport: function(height) {
				var name = height ? 'Height' : 'Width',
					val = document.documentElement['client' + name],
					val2 = window['inner' + name];
				if (val2) {
					val = Math.min(val, val2);
				}
				return val;
			},
			getViewportHeight: function() {
				return this.getViewport(true);
			},
			getViewportWidth: function() {
				return this.getViewport();
			},
			getWidth: function($elm) {
				return this.getOffset($elm);
			},
			handleEvents: function() {
				return !this.disabled && this.isCSSOn();
			},
			handleItemEvents: function($a) {
				return this.handleEvents() && !this.isLinkInMegaMenu($a);
			},
			isCollapsible: function() {
				return this.$firstSub.css('position') == 'static';
			},
			isCSSOn: function() {
				return this.$firstLink.css('display') == 'block';
			},
			isFixed: function() {
				var isFixed = this.$root.css('position') == 'fixed';
				if (!isFixed) {
					this.$root.parentsUntil('body').each(function() {
						if ($(this).css('position') == 'fixed') {
							isFixed = true;
							return false;
						}
					});
				}
				return isFixed;
			},
			isLinkInMegaMenu: function($a) {
				return $(this.getClosestMenu($a[0])).hasClass('mega-menu');
			},
			isTouchMode: function() {
				return !mouse || this.opts.noMouseOver || this.isCollapsible();
			},
			itemActivate: function($a, focus) {
				var $ul = $a.closest('ul'),
					level = $ul.dataSM('level');
				// if for some reason the parent item is not activated (e.g. this is an API call to activate the item), activate all parent items first
				if (level > 1 && (!this.activatedItems[level - 2] || this.activatedItems[level - 2][0] != $ul.dataSM('parent-a')[0])) {
					var self = this;
					$($ul.parentsUntil('[data-smartmenus-id]', 'ul').get().reverse()).add($ul).each(function() {
						self.itemActivate($(this).dataSM('parent-a'));
					});
				}
				// hide any visible deeper level sub menus
				if (!this.isCollapsible() || focus) {
					this.menuHideSubMenus(!this.activatedItems[level - 1] || this.activatedItems[level - 1][0] != $a[0] ? level - 1 : level);
				}
				// save new active item for this level
				this.activatedItems[level - 1] = $a;
				if (this.$root.triggerHandler('activate.smapi', $a[0]) === false) {
					return;
				}
				// show the sub menu if this item has one
				var $sub = $a.dataSM('sub');
				if ($sub && (this.isTouchMode() || (!this.opts.showOnClick || this.clickActivated))) {
					this.menuShow($sub);
				}
			},
			itemBlur: function(e) {
				var $a = $(e.currentTarget);
				if (!this.handleItemEvents($a)) {
					return;
				}
				this.$root.triggerHandler('blur.smapi', $a[0]);
			},
			itemClick: function(e) {
				var $a = $(e.currentTarget);
				if (!this.handleItemEvents($a)) {
					return;
				}
				if (this.$touchScrollingSub && this.$touchScrollingSub[0] == $a.closest('ul')[0]) {
					this.$touchScrollingSub = null;
					e.stopPropagation();
					return false;
				}
				if (this.$root.triggerHandler('click.smapi', $a[0]) === false) {
					return false;
				}
				var subArrowClicked = $(e.target).is('span.sub-arrow'),
					$sub = $a.dataSM('sub'),
					firstLevelSub = $sub ? $sub.dataSM('level') == 2 : false;
				// if the sub is not visible
				if ($sub && !$sub.is(':visible')) {
					if (this.opts.showOnClick && firstLevelSub) {
						this.clickActivated = true;
					}
					// try to activate the item and show the sub
					this.itemActivate($a);
					// if "itemActivate" showed the sub, prevent the click so that the link is not loaded
					// if it couldn't show it, then the sub menus are disabled with an !important declaration (e.g. via mobile styles) so let the link get loaded
					if ($sub.is(':visible')) {
						this.focusActivated = true;
						return false;
					}
				} else if (this.isCollapsible() && subArrowClicked) {
					this.itemActivate($a);
					this.menuHide($sub);
					return false;
				}
				if (this.opts.showOnClick && firstLevelSub || $a.hasClass('disabled') || this.$root.triggerHandler('select.smapi', $a[0]) === false) {
					return false;
				}
			},
			itemDown: function(e) {
				var $a = $(e.currentTarget);
				if (!this.handleItemEvents($a)) {
					return;
				}
				$a.dataSM('mousedown', true);
			},
			itemEnter: function(e) {
				var $a = $(e.currentTarget);
				if (!this.handleItemEvents($a)) {
					return;
				}
				if (!this.isTouchMode()) {
					if (this.showTimeout) {
						clearTimeout(this.showTimeout);
						this.showTimeout = 0;
					}
					var self = this;
					this.showTimeout = setTimeout(function() { self.itemActivate($a); }, this.opts.showOnClick && $a.closest('ul').dataSM('level') == 1 ? 1 : this.opts.showTimeout);
				}
				this.$root.triggerHandler('mouseenter.smapi', $a[0]);
			},
			itemFocus: function(e) {
				var $a = $(e.currentTarget);
				if (!this.handleItemEvents($a)) {
					return;
				}
				// fix (the mousedown check): in some browsers a tap/click produces consecutive focus + click events so we don't need to activate the item on focus
				if (this.focusActivated && (!this.isTouchMode() || !$a.dataSM('mousedown')) && (!this.activatedItems.length || this.activatedItems[this.activatedItems.length - 1][0] != $a[0])) {
					this.itemActivate($a, true);
				}
				this.$root.triggerHandler('focus.smapi', $a[0]);
			},
			itemLeave: function(e) {
				var $a = $(e.currentTarget);
				if (!this.handleItemEvents($a)) {
					return;
				}
				if (!this.isTouchMode()) {
					$a[0].blur();
					if (this.showTimeout) {
						clearTimeout(this.showTimeout);
						this.showTimeout = 0;
					}
				}
				$a.removeDataSM('mousedown');
				this.$root.triggerHandler('mouseleave.smapi', $a[0]);
			},
			menuHide: function($sub) {
				if (this.$root.triggerHandler('beforehide.smapi', $sub[0]) === false) {
					return;
				}
				$sub.stop(true, true);
				if ($sub.css('display') != 'none') {
					var complete = function() {
						// unset z-index
						$sub.css('z-index', '');
					};
					// if sub is collapsible (mobile view)
					if (this.isCollapsible()) {
						if (this.opts.collapsibleHideFunction) {
							this.opts.collapsibleHideFunction.call(this, $sub, complete);
						} else {
							$sub.hide(this.opts.collapsibleHideDuration, complete);
						}
					} else {
						if (this.opts.hideFunction) {
							this.opts.hideFunction.call(this, $sub, complete);
						} else {
							$sub.hide(this.opts.hideDuration, complete);
						}
					}
					// remove IE iframe shim
					if ($sub.dataSM('ie-shim')) {
						$sub.dataSM('ie-shim').remove().css({ '-webkit-transform': '', transform: '' });
					}
					// deactivate scrolling if it is activated for this sub
					if ($sub.dataSM('scroll')) {
						this.menuScrollStop($sub);
						$sub.css({ 'touch-action': '', '-ms-touch-action': '', '-webkit-transform': '', transform: '' })
							.unbind('.smartmenus_scroll').removeDataSM('scroll').dataSM('scroll-arrows').hide();
					}
					// unhighlight parent item + accessibility
					$sub.dataSM('parent-a').removeClass('highlighted').attr('aria-expanded', 'false');
					$sub.attr({
						'aria-expanded': 'false',
						'aria-hidden': 'true'
					});
					var level = $sub.dataSM('level');
					this.activatedItems.splice(level - 1, 1);
					this.visibleSubMenus.splice($.inArray($sub, this.visibleSubMenus), 1);
					this.$root.triggerHandler('hide.smapi', $sub[0]);
				}
			},
			menuHideAll: function() {
				if (this.showTimeout) {
					clearTimeout(this.showTimeout);
					this.showTimeout = 0;
				}
				// hide all subs
				// if it's a popup, this.visibleSubMenus[0] is the root UL
				var level = this.opts.isPopup ? 1 : 0;
				for (var i = this.visibleSubMenus.length - 1; i >= level; i--) {
					this.menuHide(this.visibleSubMenus[i]);
				}
				// hide root if it's popup
				if (this.opts.isPopup) {
					this.$root.stop(true, true);
					if (this.$root.is(':visible')) {
						if (this.opts.hideFunction) {
							this.opts.hideFunction.call(this, this.$root);
						} else {
							this.$root.hide(this.opts.hideDuration);
						}
						// remove IE iframe shim
						if (this.$root.dataSM('ie-shim')) {
							this.$root.dataSM('ie-shim').remove();
						}
					}
				}
				this.activatedItems = [];
				this.visibleSubMenus = [];
				this.clickActivated = false;
				this.focusActivated = false;
				// reset z-index increment
				this.zIndexInc = 0;
				this.$root.triggerHandler('hideAll.smapi');
			},
			menuHideSubMenus: function(level) {
				for (var i = this.activatedItems.length - 1; i >= level; i--) {
					var $sub = this.activatedItems[i].dataSM('sub');
					if ($sub) {
						this.menuHide($sub);
					}
				}
			},
			menuIframeShim: function($ul) {
				// create iframe shim for the menu
				if (IE && this.opts.overlapControlsInIE && !$ul.dataSM('ie-shim')) {
					$ul.dataSM('ie-shim', $('<iframe/>').attr({ src: 'javascript:0', tabindex: -9 })
						.css({ position: 'absolute', top: 'auto', left: '0', opacity: 0, border: '0' })
					);
				}
			},
			menuInit: function($ul) {
				if (!$ul.dataSM('in-mega')) {
					// mark UL's in mega drop downs (if any) so we can neglect them
					if ($ul.hasClass('mega-menu')) {
						$ul.find('ul').dataSM('in-mega', true);
					}
					// get level (much faster than, for example, using parentsUntil)
					var level = 2,
						par = $ul[0];
					while ((par = par.parentNode.parentNode) != this.$root[0]) {
						level++;
					}
					// cache stuff for quick access
					var $a = $ul.prevAll('a').eq(-1);
					// if the link is nested (e.g. in a heading)
					if (!$a.length) {
						$a = $ul.prevAll().find('a').eq(-1);
					}
					$a.addClass('has-submenu').dataSM('sub', $ul);
					$ul.dataSM('parent-a', $a)
						.dataSM('level', level)
						.parent().dataSM('sub', $ul);
					// accessibility
					var aId = $a.attr('id') || this.accessIdPrefix + (++this.idInc),
						ulId = $ul.attr('id') || this.accessIdPrefix + (++this.idInc);
					$a.attr({
						id: aId,
						'aria-haspopup': 'true',
						'aria-controls': ulId,
						'aria-expanded': 'false'
					});
					$ul.attr({
						id: ulId,
						'role': 'group',
						'aria-hidden': 'true',
						'aria-labelledby': aId,
						'aria-expanded': 'false'
					});
					// add sub indicator to parent item
					if (this.opts.subIndicators) {
						$a[this.opts.subIndicatorsPos](this.$subArrow.clone());
					}
				}
			},
			menuPosition: function($sub) {
				var $a = $sub.dataSM('parent-a'),
					$li = $a.closest('li'),
					$ul = $li.parent(),
					level = $sub.dataSM('level'),
					subW = this.getWidth($sub),
					subH = this.getHeight($sub),
					itemOffset = $a.offset(),
					itemX = itemOffset.left,
					itemY = itemOffset.top,
					itemW = this.getWidth($a),
					itemH = this.getHeight($a),
					$win = $(window),
					winX = $win.scrollLeft(),
					winY = $win.scrollTop(),
					winW = this.getViewportWidth(),
					winH = this.getViewportHeight(),
					horizontalParent = $ul.parent().is('[data-sm-horizontal-sub]') || level == 2 && !$ul.hasClass('sm-vertical'),
					rightToLeft = this.opts.rightToLeftSubMenus && !$li.is('[data-sm-reverse]') || !this.opts.rightToLeftSubMenus && $li.is('[data-sm-reverse]'),
					subOffsetX = level == 2 ? this.opts.mainMenuSubOffsetX : this.opts.subMenusSubOffsetX,
					subOffsetY = level == 2 ? this.opts.mainMenuSubOffsetY : this.opts.subMenusSubOffsetY,
					x, y;
				if (horizontalParent) {
					x = rightToLeft ? itemW - subW - subOffsetX : subOffsetX;
					y = this.opts.bottomToTopSubMenus ? -subH - subOffsetY : itemH + subOffsetY;
				} else {
					x = rightToLeft ? subOffsetX - subW : itemW - subOffsetX;
					y = this.opts.bottomToTopSubMenus ? itemH - subOffsetY - subH : subOffsetY;
				}
				if (this.opts.keepInViewport) {
					var absX = itemX + x,
						absY = itemY + y;
					if (rightToLeft && absX < winX) {
						x = horizontalParent ? winX - absX + x : itemW - subOffsetX;
					} else if (!rightToLeft && absX + subW > winX + winW) {
						x = horizontalParent ? winX + winW - subW - absX + x : subOffsetX - subW;
					}
					if (!horizontalParent) {
						if (subH < winH && absY + subH > winY + winH) {
							y += winY + winH - subH - absY;
						} else if (subH >= winH || absY < winY) {
							y += winY - absY;
						}
					}
					// do we need scrolling?
					// 0.49 used for better precision when dealing with float values
					if (horizontalParent && (absY + subH > winY + winH + 0.49 || absY < winY) || !horizontalParent && subH > winH + 0.49) {
						var self = this;
						if (!$sub.dataSM('scroll-arrows')) {
							$sub.dataSM('scroll-arrows', $([$('<span class="scroll-up"><span class="scroll-up-arrow"></span></span>')[0], $('<span class="scroll-down"><span class="scroll-down-arrow"></span></span>')[0]])
								.bind({
									mouseenter: function() {
										$sub.dataSM('scroll').up = $(this).hasClass('scroll-up');
										self.menuScroll($sub);
									},
									mouseleave: function(e) {
										self.menuScrollStop($sub);
										self.menuScrollOut($sub, e);
									},
									'mousewheel DOMMouseScroll': function(e) { e.preventDefault(); }
								})
								.insertAfter($sub)
							);
						}
						// bind scroll events and save scroll data for this sub
						var eNS = '.smartmenus_scroll';
						$sub.dataSM('scroll', {
								y: this.cssTransforms3d ? 0 : y - itemH,
								step: 1,
								// cache stuff for faster recalcs later
								itemH: itemH,
								subH: subH,
								arrowDownH: this.getHeight($sub.dataSM('scroll-arrows').eq(1))
							})
							.bind(getEventsNS([
								['mouseover', function(e) { self.menuScrollOver($sub, e); }],
								['mouseout', function(e) { self.menuScrollOut($sub, e); }],
								['mousewheel DOMMouseScroll', function(e) { self.menuScrollMousewheel($sub, e); }]
							], eNS))
							.dataSM('scroll-arrows').css({ top: 'auto', left: '0', marginLeft: x + (parseInt($sub.css('border-left-width')) || 0), width: subW - (parseInt($sub.css('border-left-width')) || 0) - (parseInt($sub.css('border-right-width')) || 0), zIndex: $sub.css('z-index') })
								.eq(horizontalParent && this.opts.bottomToTopSubMenus ? 0 : 1).show();
						// when a menu tree is fixed positioned we allow scrolling via touch too
						// since there is no other way to access such long sub menus if no mouse is present
						if (this.isFixed()) {
							$sub.css({ 'touch-action': 'none', '-ms-touch-action': 'none' })
								.bind(getEventsNS([
									[touchEvents ? 'touchstart touchmove touchend' : 'pointerdown pointermove pointerup MSPointerDown MSPointerMove MSPointerUp', function(e) {
										self.menuScrollTouch($sub, e);
									}]
								], eNS));
						}
					}
				}
				$sub.css({ top: 'auto', left: '0', marginLeft: x, marginTop: y - itemH });
				// IE iframe shim
				this.menuIframeShim($sub);
				if ($sub.dataSM('ie-shim')) {
					$sub.dataSM('ie-shim').css({ zIndex: $sub.css('z-index'), width: subW, height: subH, marginLeft: x, marginTop: y - itemH });
				}
			},
			menuScroll: function($sub, once, step) {
				var data = $sub.dataSM('scroll'),
					$arrows = $sub.dataSM('scroll-arrows'),
					end = data.up ? data.upEnd : data.downEnd,
					diff;
				if (!once && data.momentum) {
					data.momentum *= 0.92;
					diff = data.momentum;
					if (diff < 0.5) {
						this.menuScrollStop($sub);
						return;
					}
				} else {
					diff = step || (once || !this.opts.scrollAccelerate ? this.opts.scrollStep : Math.floor(data.step));
				}
				// hide any visible deeper level sub menus
				var level = $sub.dataSM('level');
				if (this.activatedItems[level - 1] && this.activatedItems[level - 1].dataSM('sub') && this.activatedItems[level - 1].dataSM('sub').is(':visible')) {
					this.menuHideSubMenus(level - 1);
				}
				data.y = data.up && end <= data.y || !data.up && end >= data.y ? data.y : (Math.abs(end - data.y) > diff ? data.y + (data.up ? diff : -diff) : end);
				$sub.add($sub.dataSM('ie-shim')).css(this.cssTransforms3d ? { '-webkit-transform': 'translate3d(0, ' + data.y + 'px, 0)', transform: 'translate3d(0, ' + data.y + 'px, 0)' } : { marginTop: data.y });
				// show opposite arrow if appropriate
				if (mouse && (data.up && data.y > data.downEnd || !data.up && data.y < data.upEnd)) {
					$arrows.eq(data.up ? 1 : 0).show();
				}
				// if we've reached the end
				if (data.y == end) {
					if (mouse) {
						$arrows.eq(data.up ? 0 : 1).hide();
					}
					this.menuScrollStop($sub);
				} else if (!once) {
					if (this.opts.scrollAccelerate && data.step < this.opts.scrollStep) {
						data.step += 0.2;
					}
					var self = this;
					this.scrollTimeout = requestAnimationFrame(function() { self.menuScroll($sub); });
				}
			},
			menuScrollMousewheel: function($sub, e) {
				if (this.getClosestMenu(e.target) == $sub[0]) {
					e = e.originalEvent;
					var up = (e.wheelDelta || -e.detail) > 0;
					if ($sub.dataSM('scroll-arrows').eq(up ? 0 : 1).is(':visible')) {
						$sub.dataSM('scroll').up = up;
						this.menuScroll($sub, true);
					}
				}
				e.preventDefault();
			},
			menuScrollOut: function($sub, e) {
				if (mouse) {
					if (!/^scroll-(up|down)/.test((e.relatedTarget || '').className) && ($sub[0] != e.relatedTarget && !$.contains($sub[0], e.relatedTarget) || this.getClosestMenu(e.relatedTarget) != $sub[0])) {
						$sub.dataSM('scroll-arrows').css('visibility', 'hidden');
					}
				}
			},
			menuScrollOver: function($sub, e) {
				if (mouse) {
					if (!/^scroll-(up|down)/.test(e.target.className) && this.getClosestMenu(e.target) == $sub[0]) {
						this.menuScrollRefreshData($sub);
						var data = $sub.dataSM('scroll'),
							upEnd = $(window).scrollTop() - $sub.dataSM('parent-a').offset().top - data.itemH;
						$sub.dataSM('scroll-arrows').eq(0).css('margin-top', upEnd).end()
							.eq(1).css('margin-top', upEnd + this.getViewportHeight() - data.arrowDownH).end()
							.css('visibility', 'visible');
					}
				}
			},
			menuScrollRefreshData: function($sub) {
				var data = $sub.dataSM('scroll'),
					upEnd = $(window).scrollTop() - $sub.dataSM('parent-a').offset().top - data.itemH;
				if (this.cssTransforms3d) {
					upEnd = -(parseFloat($sub.css('margin-top')) - upEnd);
				}
				$.extend(data, {
					upEnd: upEnd,
					downEnd: upEnd + this.getViewportHeight() - data.subH
				});
			},
			menuScrollStop: function($sub) {
				if (this.scrollTimeout) {
					cancelAnimationFrame(this.scrollTimeout);
					this.scrollTimeout = 0;
					$sub.dataSM('scroll').step = 1;
					return true;
				}
			},
			menuScrollTouch: function($sub, e) {
				e = e.originalEvent;
				if (isTouchEvent(e)) {
					var touchPoint = this.getTouchPoint(e);
					// neglect event if we touched a visible deeper level sub menu
					if (this.getClosestMenu(touchPoint.target) == $sub[0]) {
						var data = $sub.dataSM('scroll');
						if (/(start|down)$/i.test(e.type)) {
							if (this.menuScrollStop($sub)) {
								// if we were scrolling, just stop and don't activate any link on the first touch
								e.preventDefault();
								this.$touchScrollingSub = $sub;
							} else {
								this.$touchScrollingSub = null;
							}
							// update scroll data since the user might have zoomed, etc.
							this.menuScrollRefreshData($sub);
							// extend it with the touch properties
							$.extend(data, {
								touchStartY: touchPoint.pageY,
								touchStartTime: e.timeStamp
							});
						} else if (/move$/i.test(e.type)) {
							var prevY = data.touchY !== undefined ? data.touchY : data.touchStartY;
							if (prevY !== undefined && prevY != touchPoint.pageY) {
								this.$touchScrollingSub = $sub;
								var up = prevY < touchPoint.pageY;
								// changed direction? reset...
								if (data.up !== undefined && data.up != up) {
									$.extend(data, {
										touchStartY: touchPoint.pageY,
										touchStartTime: e.timeStamp
									});
								}
								$.extend(data, {
									up: up,
									touchY: touchPoint.pageY
								});
								this.menuScroll($sub, true, Math.abs(touchPoint.pageY - prevY));
							}
							e.preventDefault();
						} else { // touchend/pointerup
							if (data.touchY !== undefined) {
								if (data.momentum = Math.pow(Math.abs(touchPoint.pageY - data.touchStartY) / (e.timeStamp - data.touchStartTime), 2) * 15) {
									this.menuScrollStop($sub);
									this.menuScroll($sub);
									e.preventDefault();
								}
								delete data.touchY;
							}
						}
					}
				}
			},
			menuShow: function($sub) {
				if (!$sub.dataSM('beforefirstshowfired')) {
					$sub.dataSM('beforefirstshowfired', true);
					if (this.$root.triggerHandler('beforefirstshow.smapi', $sub[0]) === false) {
						return;
					}
				}
				if (this.$root.triggerHandler('beforeshow.smapi', $sub[0]) === false) {
					return;
				}
				$sub.dataSM('shown-before', true)
					.stop(true, true);
				if (!$sub.is(':visible')) {
					// highlight parent item
					var $a = $sub.dataSM('parent-a');
					if (this.opts.keepHighlighted || this.isCollapsible()) {
						$a.addClass('highlighted');
					}
					if (this.isCollapsible()) {
						$sub.removeClass('sm-nowrap').css({ zIndex: '', width: 'auto', minWidth: '', maxWidth: '', top: '', left: '', marginLeft: '', marginTop: '' });
					} else {
						// set z-index
						$sub.css('z-index', this.zIndexInc = (this.zIndexInc || this.getStartZIndex()) + 1);
						// min/max-width fix - no way to rely purely on CSS as all UL's are nested
						if (this.opts.subMenusMinWidth || this.opts.subMenusMaxWidth) {
							$sub.css({ width: 'auto', minWidth: '', maxWidth: '' }).addClass('sm-nowrap');
							if (this.opts.subMenusMinWidth) {
							 	$sub.css('min-width', this.opts.subMenusMinWidth);
							}
							if (this.opts.subMenusMaxWidth) {
							 	var noMaxWidth = this.getWidth($sub);
							 	$sub.css('max-width', this.opts.subMenusMaxWidth);
								if (noMaxWidth > this.getWidth($sub)) {
									$sub.removeClass('sm-nowrap').css('width', this.opts.subMenusMaxWidth);
								}
							}
						}
						this.menuPosition($sub);
						// insert IE iframe shim
						if ($sub.dataSM('ie-shim')) {
							$sub.dataSM('ie-shim').insertBefore($sub);
						}
					}
					var complete = function() {
						// fix: "overflow: hidden;" is not reset on animation complete in jQuery < 1.9.0 in Chrome when global "box-sizing: border-box;" is used
						$sub.css('overflow', '');
					};
					// if sub is collapsible (mobile view)
					if (this.isCollapsible()) {
						if (this.opts.collapsibleShowFunction) {
							this.opts.collapsibleShowFunction.call(this, $sub, complete);
						} else {
							$sub.show(this.opts.collapsibleShowDuration, complete);
						}
					} else {
						if (this.opts.showFunction) {
							this.opts.showFunction.call(this, $sub, complete);
						} else {
							$sub.show(this.opts.showDuration, complete);
						}
					}
					// accessibility
					$a.attr('aria-expanded', 'true');
					$sub.attr({
						'aria-expanded': 'true',
						'aria-hidden': 'false'
					});
					// store sub menu in visible array
					this.visibleSubMenus.push($sub);
					this.$root.triggerHandler('show.smapi', $sub[0]);
				}
			},
			popupHide: function(noHideTimeout) {
				if (this.hideTimeout) {
					clearTimeout(this.hideTimeout);
					this.hideTimeout = 0;
				}
				var self = this;
				this.hideTimeout = setTimeout(function() {
					self.menuHideAll();
				}, noHideTimeout ? 1 : this.opts.hideTimeout);
			},
			popupShow: function(left, top) {
				if (!this.opts.isPopup) {
					alert('SmartMenus jQuery Error:\n\nIf you want to show this menu via the "popupShow" method, set the isPopup:true option.');
					return;
				}
				if (this.hideTimeout) {
					clearTimeout(this.hideTimeout);
					this.hideTimeout = 0;
				}
				this.$root.dataSM('shown-before', true)
					.stop(true, true);
				if (!this.$root.is(':visible')) {
					this.$root.css({ left: left, top: top });
					// IE iframe shim
					this.menuIframeShim(this.$root);
					if (this.$root.dataSM('ie-shim')) {
						this.$root.dataSM('ie-shim').css({ zIndex: this.$root.css('z-index'), width: this.getWidth(this.$root), height: this.getHeight(this.$root), left: left, top: top }).insertBefore(this.$root);
					}
					// show menu
					var self = this,
						complete = function() {
							self.$root.css('overflow', '');
						};
					if (this.opts.showFunction) {
						this.opts.showFunction.call(this, this.$root, complete);
					} else {
						this.$root.show(this.opts.showDuration, complete);
					}
					this.visibleSubMenus[0] = this.$root;
				}
			},
			refresh: function() {
				this.destroy(true);
				this.init(true);
			},
			rootKeyDown: function(e) {
				if (!this.handleEvents()) {
					return;
				}
				switch (e.keyCode) {
					case 27: // reset on Esc
						var $activeTopItem = this.activatedItems[0];
						if ($activeTopItem) {
							this.menuHideAll();
							$activeTopItem[0].focus();
							var $sub = $activeTopItem.dataSM('sub');
							if ($sub) {
								this.menuHide($sub);
							}
						}
						break;
					case 32: // activate item's sub on Space
						var $target = $(e.target);
						if ($target.is('a') && this.handleItemEvents($target)) {
							var $sub = $target.dataSM('sub');
							if ($sub && !$sub.is(':visible')) {
								this.itemClick({ currentTarget: e.target });
								e.preventDefault();
							}
						}
						break;
				}
			},
			rootOut: function(e) {
				if (!this.handleEvents() || this.isTouchMode() || e.target == this.$root[0]) {
					return;
				}
				if (this.hideTimeout) {
					clearTimeout(this.hideTimeout);
					this.hideTimeout = 0;
				}
				if (!this.opts.showOnClick || !this.opts.hideOnClick) {
					var self = this;
					this.hideTimeout = setTimeout(function() { self.menuHideAll(); }, this.opts.hideTimeout);
				}
			},
			rootOver: function(e) {
				if (!this.handleEvents() || this.isTouchMode() || e.target == this.$root[0]) {
					return;
				}
				if (this.hideTimeout) {
					clearTimeout(this.hideTimeout);
					this.hideTimeout = 0;
				}
			},
			winResize: function(e) {
				if (!this.handleEvents()) {
					// we still need to resize the disable overlay if it's visible
					if (this.$disableOverlay) {
						var pos = this.$root.offset();
	 					this.$disableOverlay.css({
							top: pos.top,
							left: pos.left,
							width: this.$root.outerWidth(),
							height: this.$root.outerHeight()
						});
					}
					return;
				}
				// hide sub menus on resize - on mobile do it only on orientation change
				if (!('onorientationchange' in window) || e.type == 'orientationchange') {
					var isCollapsible = this.isCollapsible();
					// if it was collapsible before resize and still is, don't do it
					if (!(this.wasCollapsible && isCollapsible)) { 
						if (this.activatedItems.length) {
							this.activatedItems[this.activatedItems.length - 1][0].blur();
						}
						this.menuHideAll();
					}
					this.wasCollapsible = isCollapsible;
				}
			}
		}
	});

	$.fn.dataSM = function(key, val) {
		if (val) {
			return this.data(key + '_smartmenus', val);
		}
		return this.data(key + '_smartmenus');
	}

	$.fn.removeDataSM = function(key) {
		return this.removeData(key + '_smartmenus');
	}

	$.fn.smartmenus = function(options) {
		if (typeof options == 'string') {
			var args = arguments,
				method = options;
			Array.prototype.shift.call(args);
			return this.each(function() {
				var smartmenus = $(this).data('smartmenus');
				if (smartmenus && smartmenus[method]) {
					smartmenus[method].apply(smartmenus, args);
				}
			});
		}
		var opts = $.extend({}, $.fn.smartmenus.defaults, options);
		return this.each(function() {
			new $.SmartMenus(this, opts);
		});
	}

	// default settings
	$.fn.smartmenus.defaults = {
		isPopup:		false,		// is this a popup menu (can be shown via the popupShow/popupHide methods) or a permanent menu bar
		mainMenuSubOffsetX:	0,		// pixels offset from default position
		mainMenuSubOffsetY:	0,		// pixels offset from default position
		subMenusSubOffsetX:	0,		// pixels offset from default position
		subMenusSubOffsetY:	0,		// pixels offset from default position
		subMenusMinWidth:	'10em',		// min-width for the sub menus (any CSS unit) - if set, the fixed width set in CSS will be ignored
		subMenusMaxWidth:	'20em',		// max-width for the sub menus (any CSS unit) - if set, the fixed width set in CSS will be ignored
		subIndicators: 		true,		// create sub menu indicators - creates a SPAN and inserts it in the A
		subIndicatorsPos: 	'prepend',	// position of the SPAN relative to the menu item content ('prepend', 'append')
		subIndicatorsText:	'+',		// [optionally] add text in the SPAN (e.g. '+') (you may want to check the CSS for the sub indicators too)
		scrollStep: 		30,		// pixels step when scrolling long sub menus that do not fit in the viewport height
		scrollAccelerate:	true,		// accelerate scrolling or use a fixed step
		showTimeout:		250,		// timeout before showing the sub menus
		hideTimeout:		500,		// timeout before hiding the sub menus
		showDuration:		0,		// duration for show animation - set to 0 for no animation - matters only if showFunction:null
		showFunction:		null,		// custom function to use when showing a sub menu (the default is the jQuery 'show')
							// don't forget to call complete() at the end of whatever you do
							// e.g.: function($ul, complete) { $ul.fadeIn(250, complete); }
		hideDuration:		0,		// duration for hide animation - set to 0 for no animation - matters only if hideFunction:null
		hideFunction:		function($ul, complete) { $ul.fadeOut(200, complete); },	// custom function to use when hiding a sub menu (the default is the jQuery 'hide')
							// don't forget to call complete() at the end of whatever you do
							// e.g.: function($ul, complete) { $ul.fadeOut(250, complete); }
		collapsibleShowDuration:0,		// duration for show animation for collapsible sub menus - matters only if collapsibleShowFunction:null
		collapsibleShowFunction:function($ul, complete) { $ul.slideDown(200, complete); },	// custom function to use when showing a collapsible sub menu
							// (i.e. when mobile styles are used to make the sub menus collapsible)
		collapsibleHideDuration:0,		// duration for hide animation for collapsible sub menus - matters only if collapsibleHideFunction:null
		collapsibleHideFunction:function($ul, complete) { $ul.slideUp(200, complete); },	// custom function to use when hiding a collapsible sub menu
							// (i.e. when mobile styles are used to make the sub menus collapsible)
		showOnClick:		false,		// show the first-level sub menus onclick instead of onmouseover (i.e. mimic desktop app menus) (matters only for mouse input)
		hideOnClick:		true,		// hide the sub menus on click/tap anywhere on the page
		noMouseOver:		false,		// disable sub menus activation onmouseover (i.e. behave like in touch mode - use just mouse clicks) (matters only for mouse input)
		keepInViewport:		true,		// reposition the sub menus if needed to make sure they always appear inside the viewport
		keepHighlighted:	true,		// keep all ancestor items of the current sub menu highlighted (adds the 'highlighted' class to the A's)
		markCurrentItem:	false,		// automatically add the 'current' class to the A element of the item linking to the current URL
		markCurrentTree:	true,		// add the 'current' class also to the A elements of all ancestor items of the current item
		rightToLeftSubMenus:	false,		// right to left display of the sub menus (check the CSS for the sub indicators' position)
		bottomToTopSubMenus:	false,		// bottom to top display of the sub menus
		overlapControlsInIE:	true		// make sure sub menus appear on top of special OS controls in IE (i.e. SELECT, OBJECT, EMBED, etc.)
	};

	return $;
}));
/*!
 * SmartMenus jQuery Plugin Bootstrap Addon - v0.3.0 - January 27, 2016
 * http://www.smartmenus.org/
 *
 * Copyright Vasil Dinkov, Vadikom Web Ltd.
 * http://vadikom.com
 *
 * Licensed MIT
 */

(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery', 'jquery.smartmenus'], factory);
	} else if (typeof module === 'object' && typeof module.exports === 'object') {
		// CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Global jQuery
		factory(jQuery);
	}
} (function($) {

	$.extend($.SmartMenus.Bootstrap = {}, {
		keydownFix: false,
		init: function() {
			// init all navbars that don't have the "data-sm-skip" attribute set
			var $navbars = $('ul.navbar-nav:not([data-sm-skip])');
			$navbars.each(function() {
				var $this = $(this),
					obj = $this.data('smartmenus');
				// if this navbar is not initialized
				if (!obj) {
					$this.smartmenus({

							// these are some good default options that should work for all
							// you can, of course, tweak these as you like
							subMenusSubOffsetX: 2,
							subMenusSubOffsetY: -6,
							subIndicators: false,
							collapsibleShowFunction: null,
							collapsibleHideFunction: null,
							rightToLeftSubMenus: $this.hasClass('navbar-right'),
							bottomToTopSubMenus: $this.closest('.navbar').hasClass('navbar-fixed-bottom')
						})
						.bind({
							// set/unset proper Bootstrap classes for some menu elements
							'show.smapi': function(e, menu) {
								var $menu = $(menu),
									$scrollArrows = $menu.dataSM('scroll-arrows');
								if ($scrollArrows) {
									// they inherit border-color from body, so we can use its background-color too
									$scrollArrows.css('background-color', $(document.body).css('background-color'));
								}
								$menu.parent().addClass('open');
							},
							'hide.smapi': function(e, menu) {
								$(menu).parent().removeClass('open');
							}
						});

					function onInit() {
						// set Bootstrap's "active" class to SmartMenus "current" items (should someone decide to enable markCurrentItem: true)
						$this.find('a.current').parent().addClass('active');
						// remove any Bootstrap required attributes that might cause conflicting issues with the SmartMenus script
						$this.find('a.has-submenu').each(function() {
							var $this = $(this);
							if ($this.is('[data-toggle="dropdown"]')) {
								$this.dataSM('bs-data-toggle-dropdown', true).removeAttr('data-toggle');
							}
							if ($this.is('[role="button"]')) {
								$this.dataSM('bs-role-button', true).removeAttr('role');
							}
						});
					}

					onInit();

					function onBeforeDestroy() {
						$this.find('a.current').parent().removeClass('active');
						$this.find('a.has-submenu').each(function() {
							var $this = $(this);
							if ($this.dataSM('bs-data-toggle-dropdown')) {
								$this.attr('data-toggle', 'dropdown').removeDataSM('bs-data-toggle-dropdown');
							}
							if ($this.dataSM('bs-role-button')) {
								$this.attr('role', 'button').removeDataSM('bs-role-button');
							}
						});
					}

					obj = $this.data('smartmenus');

					// custom "isCollapsible" method for Bootstrap
					obj.isCollapsible = function() {
						return !/^(left|right)$/.test(this.$firstLink.parent().css('float'));
					};

					// custom "refresh" method for Bootstrap
					obj.refresh = function() {
						$.SmartMenus.prototype.refresh.call(this);
						onInit();
						// update collapsible detection
						detectCollapsible(true);
					}

					// custom "destroy" method for Bootstrap
					obj.destroy = function(refresh) {
						onBeforeDestroy();
						$.SmartMenus.prototype.destroy.call(this, refresh);
					}

					// keep Bootstrap's default behavior for parent items when the "data-sm-skip-collapsible-behavior" attribute is set to the ul.navbar-nav
					// i.e. use the whole item area just as a sub menu toggle and don't customize the carets
					if ($this.is('[data-sm-skip-collapsible-behavior]')) {
						$this.bind({
							// click the parent item to toggle the sub menus (and reset deeper levels and other branches on click)
							'click.smapi': function(e, item) {
								if (obj.isCollapsible()) {
									var $item = $(item),
										$sub = $item.parent().dataSM('sub');
									if ($sub && $sub.dataSM('shown-before') && $sub.is(':visible')) {
										obj.itemActivate($item);
										obj.menuHide($sub);
										return false;
									}
								}
							}
						});
					}

					// onresize detect when the navbar becomes collapsible and add it the "sm-collapsible" class
					var winW;
					function detectCollapsible(force) {
						var newW = obj.getViewportWidth();
						if (newW != winW || force) {
							var $carets = $this.find('.caret');
							if (obj.isCollapsible()) {
								$this.addClass('sm-collapsible');
								// set "navbar-toggle" class to carets (so they look like a button) if the "data-sm-skip-collapsible-behavior" attribute is not set to the ul.navbar-nav
								if (!$this.is('[data-sm-skip-collapsible-behavior]')) {
									$carets.addClass('navbar-toggle sub-arrow');
								}
							} else {
								$this.removeClass('sm-collapsible');
								if (!$this.is('[data-sm-skip-collapsible-behavior]')) {
									$carets.removeClass('navbar-toggle sub-arrow');
								}
							}
							winW = newW;
						}
					};
					detectCollapsible();
					$(window).bind('resize.smartmenus' + obj.rootId, detectCollapsible);
				}
			});
			// keydown fix for Bootstrap 3.3.5+ conflict
			if ($navbars.length && !$.SmartMenus.Bootstrap.keydownFix) {
				// unhook BS keydown handler for all dropdowns
				$(document).off('keydown.bs.dropdown.data-api', '.dropdown-menu');
				// restore BS keydown handler for dropdowns that are not inside SmartMenus navbars
				if ($.fn.dropdown && $.fn.dropdown.Constructor) {
					$(document).on('keydown.bs.dropdown.data-api', '.dropdown-menu:not([id^="sm-"])', $.fn.dropdown.Constructor.prototype.keydown);
				}
				$.SmartMenus.Bootstrap.keydownFix = true;
			}
		}
	});

	// init ondomready
	$($.SmartMenus.Bootstrap.init);

	return $;
}));
/*
 * Sequence.js
 *
 * The responsive CSS animation framework for creating unique sliders,
 * presentations, banners, and other step-based applications.
 *
 * @link https://github.com/IanLunn/Sequence
 * @author IanLunn
 * @version 2.0.0
 * @license http://sequencejs.com/licenses/
 * @copyright Ian Lunn Design Limited 2015
 */

function defineSequence(imagesLoaded, Hammer) {

  'use strict';

  var instances = [],
      instance = 0;

  /**
   * Sequence function
   *
   * @param {Object} element - the element Sequence is bound to
   * @param {Object} options - this instance's options
   * @returns {Object} self - Properties and methods available to this instance
   */
  var Sequence = (function (element, options) {

    var instanceId = element.getAttribute("data-seq-enabled");

    // Prevent multiple instances on the same element. Return the object instead
    if (instanceId !== null) {
      return instances[instanceId];
    }

    // The element now has Sequence attached to it
    element.setAttribute("data-seq-enabled", instance);
    instance++;

    /* --- PRIVATE VARIABLES/FUNCTIONS --- */

    // Default Sequence settings
    var defaults = {

      /* --- General --- */

      // The first step to show
      startingStepId: 1,

      // Should the starting step animate in to begin with?
      startingStepAnimatesIn: false,

      // When the last step is reached, should Sequence cycle back to the start?
      cycle: true,

      // How long to wait between the current phase animating out, and the next
      // animating in.
      phaseThreshold: true,

      // Should animations be reversed when navigating backwards?
      reverseWhenNavigatingBackwards: false,

      // Should the active step be given a higher z-index?
      moveActiveStepToTop: true,


      /* --- Canvas Animation --- */

      // Should the canvas automatically animate between steps?
      animateCanvas: true,

      // Time it should take to animate between steps
      animateCanvasDuration: 250,


      /* --- autoPlay --- */

      // Cause Sequence to automatically navigate between steps
      // Specify a number in milliseconds or true (for a default of 5000ms) to
      // define the period Sequence should wait between each step before
      // navigating to the next step
      autoPlay: true,

      // How long to wait between each step before navigation occurs again
      autoPlayInterval: 2000,

      // Amount of time to wait until autoPlay starts again after being stopped
      autoPlayDelay: null,

      // Direction of navigation when autoPlay is enabled
      autoPlayDirection: 1,

      // Use an autoPlay button? You can also specify a CSS selector to
      // change what element acts as the button. If true, the element uses the
      // class of "seq-autoplay"
      autoPlayButton: true,

      // Pause autoPlay when the Sequence element is hovered over
      autoPlayPauseOnHover: true,


      /* --- Navigation Skipping --- */

      // Allow the user to navigate between steps even if they haven't
      // finished animating
      navigationSkip: true,

      // How long to wait before the user is allowed to skip to another step
      navigationSkipThreshold: 250,

      // Fade a step when it has been skipped
      fadeStepWhenSkipped: true,

      // How long the fade should take
      fadeStepTime: 500,

      // When a step is skipped, the next step will immediately animate-in
      // regardless of the phaseThreshold option
      ignorePhaseThresholdWhenSkipped: false,

      // Don't allow the user to go to a previous step when the current one is
      // still active
      preventReverseSkipping: false,


      /* --- Next/Prev Button --- */

      // Use next and previous buttons? You can also specify a CSS selector to
      // change what element acts as the button. If true, the element uses
      // classes of "seq-next" and "seq-prev"
      nextButton: true,
      prevButton: true,


      /* --- Pagination --- */

      // Use pagination? You can also specify a CSS selector to
      // change what element acts as pagination. If true, the element uses the
      // class of "seq-pagination"
      pagination: true,


      /* --- Preloader --- */

      // You can also specify a CSS selector to
      // change what element acts as the preloader. If true, the element uses
      // the class of "seq-preloader"
      preloader: false,

      // Preload all images from specific steps
      preloadTheseSteps: [1],

      // Preload specified images
      preloadTheseImages: [
        /**
         * Example usage
         * "images/catEatingSalad.jpg",
         * "images/grandmaDressedAsBatman.png"
         */
      ],

      // Hide Sequence's steps until it has preloaded
      hideStepsUntilPreloaded: false,

      // (Debugging only) Prevent the preloader from hiding so you can
      // test it's styles
      pausePreloader: false,


      /* --- Keyboard --- */

      // Can the user navigate between steps by pressing keyboard buttons?
      keyNavigation: false,

      // When numeric keys 1 - 9 are pressed, Sequence will navigate to the
      // corresponding step
      numericKeysGoToSteps: false,

      // Events to run when the user presses the left/right keys
      keyEvents: {
        left: function(sequence) {sequence.prev();},
        right: function(sequence) {sequence.next();}
      },


      /* --- Touch Swipe --- */

      // Can the user navigate between steps by swiping on a touch enabled device?
      swipeNavigation: true,

      // Events to run when the user swipes in a particular direction
      swipeEvents: {
        left: function(sequence) {sequence.next();},
        right: function(sequence) {sequence.prev();},
        up: undefined,
        down: undefined
      },

      // Options to supply the third-party Hammer library See: http://hammerjs.github.io/recognizer-swipe/
      swipeHammerOptions: {},


      /* --- hashTags --- */

      // Should the URL update to include a hashTag that relates to the current
      // step being shown?
      hashTags: false,

      // Get the hashTag from an ID or data-seq-hashtag attribute?
      hashDataAttribute: false,

      // Should the hash change on the first step?
      hashChangesOnFirstStep: false,


      /* --- Fallback Theme --- */

      // Settings to use when the browser doesn't support CSS transitions
      fallback: {

        // The speed to transition between steps
        speed: 500
      }
    };

    // Default value for autoPlay in milliseconds
    var autoPlayDefault = 5000;

    // See sequence.animation.domDelay() for an explanation of this
    var domThreshold = 50;

    // Throttle the window resize event
    // see self.manageEvents.add.resizeThrottle()
    var resizeThreshold = 100;

    // Convert browser fixes to CSS strings
    var prefixTranslations = {

      animation: {
        "WebkitAnimation": "-webkit-",
        "animation": ""
      }
    };

    /**
     *
     * This version of Modernizr is for use with Sequence.js and is included
     * internally to prevent conflicts with other Modernizr builds.
     *
     * Modernizr 2.8.3 (Custom Build) | MIT & BSD
     * Build: http://modernizr.com/download/#-cssanimations-csstransforms-csstransitions-svg-touch-prefixed-teststyles-testprop-testallprops-prefixes-domprefixes
     */

    /* jshint ignore:start */
    var Modernizr=function(a,b,c){function z(a){i.cssText=a}function A(a,b){return z(l.join(a+";")+(b||""))}function B(a,b){return typeof a===b}function C(a,b){return!!~(""+a).indexOf(b)}function D(a,b){for(var d in a){var e=a[d];if(!C(e,"-")&&i[e]!==c)return b=="pfx"?e:!0}return!1}function E(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:B(f,"function")?f.bind(d||b):f}return!1}function F(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+n.join(d+" ")+d).split(" ");return B(b,"string")||B(b,"undefined")?D(e,b):(e=(a+" "+o.join(d+" ")+d).split(" "),E(e,b,c))}var d="2.8.3",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k={}.toString,l=" -webkit- -moz- -o- -ms- ".split(" "),m="Webkit Moz O ms",n=m.split(" "),o=m.toLowerCase().split(" "),p={svg:"http://www.w3.org/2000/svg"},q={},r={},s={},t=[],u=t.slice,v,w=function(a,c,d,e){var h,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:g+(d+1),l.appendChild(j);return h=["&#173;",'<style id="s',g,'">',a,"</style>"].join(""),l.id=g,(m?l:n).innerHTML+=h,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=f.style.overflow,f.style.overflow="hidden",f.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),f.style.overflow=k),!!i},x={}.hasOwnProperty,y;!B(x,"undefined")&&!B(x.call,"undefined")?y=function(a,b){return x.call(a,b)}:y=function(a,b){return b in a&&B(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=u.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(u.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(u.call(arguments)))};return e}),q.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:w(["@media (",l.join("touch-enabled),("),g,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},q.cssanimations=function(){return F("animationName")},q.csstransforms=function(){return!!F("transform")},q.csstransitions=function(){return F("transition")},q.svg=function(){return!!b.createElementNS&&!!b.createElementNS(p.svg,"svg").createSVGRect};for(var G in q)y(q,G)&&(v=G.toLowerCase(),e[v]=q[G](),t.push((e[v]?"":"no-")+v));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)y(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},z(""),h=j=null,e._version=d,e._prefixes=l,e._domPrefixes=o,e._cssomPrefixes=n,e.testProp=function(a){return D([a])},e.testAllProps=F,e.testStyles=w,e.prefixed=function(a,b,c){return b?F(a,b,c):F(a,"pfx")},e}(window,window.document);
    /* jshint ignore:end */

    // Add indexOf() support to arrays for Internet Explorer 8
    if (!Array.prototype.indexOf) {
      Array.prototype.indexOf = function (searchElement, fromIndex) {
        if ( this === undefined || this === null ) {
          throw new TypeError( '"this" is null or not defined' );
        }

        // Hack to convert object.length to a UInt32
        var length = this.length >>> 0;

        fromIndex = +fromIndex || 0;

        if (Math.abs(fromIndex) === Infinity) {
          fromIndex = 0;
        }

        if (fromIndex < 0) {
          fromIndex += length;
          if (fromIndex < 0) {
            fromIndex = 0;
          }
        }

        for (;fromIndex < length; fromIndex++) {
          if (this[fromIndex] === searchElement) {
            return fromIndex;
          }
        }

        return -1;
      };
    }

    /**
     * Determine the prefix to use for the pageVisibility API
     */
    var hidden,
        visibilityChange;

    if (typeof document.hidden !== "undefined") {

      // Opera 12.10 and Firefox 18 and later support
      hidden = "hidden";
      visibilityChange = "visibilitychange";
    } else if (typeof document.mozHidden !== "undefined") {

      hidden = "mozHidden";
      visibilityChange = "mozvisibilitychange";
    } else if (typeof document.msHidden !== "undefined") {

      hidden = "msHidden";
      visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {

      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
    }

    /**
     * Is an object an array?
     *
     * @param {Object} object - The object we want to test
     * @api private
     */
    function isArray(object) {

      if (Object.prototype.toString.call(object) === '[object Array]') {
        return true;
      }else {
        return false;
      }
    }

    /**
     * Extend object a with the properties of object b.
     * If there's a conflict, object b takes precedence.
     *
     * @param {Object} a - The first object to merge
     * @param {Object} b - The second object to merge (takes precedence)
     * @api private
     */
    function extend(a, b) {

      for (var i in b) {
        a[i] = b[i];
      }

      return a;
    }

    /**
     * Get the values of an element's CSS property
     *
     * @param {HTMLObject} element - The element to get the value from
     * @param {String} property - The CSS property to get the value of
     * @returns {String} value - The value from the element's CSS property
     */
    function getStyle(element, property) {

      var value;

      // IE
      if (element.currentStyle) {
        value = element.currentStyle[property];
      }

      else if (document.defaultView && document.defaultView.getComputedStyle) {
        value = document.defaultView.getComputedStyle(element, "")[property];
      }

      return value;
    }

    /**
     * Cross Browser helper for addEventListener
     *
     * @param {HTMLObject} element - The element to attach the event to
     * @param {String} eventName - The name of the event; "click" for example
     * @param {Function} handler - The function to execute when the event occurs
     * @returns {Function} handler - Returns the handler so it can be removed
     */
    function addEvent(element, eventName, handler) {

      if (element.addEventListener) {
        element.addEventListener(eventName, handler, false);

        return handler;
      }

      else if (element.attachEvent) {

        // Allows IE to return this keyword
        var handlerr = function() {
          handler.call(element);
        };

        element.attachEvent("on" + eventName, handlerr);

        return handlerr;
      }

    }

    /**
     * Cross Browser helper for removeEventListener
     *
     * @param {HTMLObject} element - The element to attach the event to
     * @param {String} eventName - The name of the event; "click" for example
     * @param {Function} handler - The function to execute when the event occurs
     */
    function removeEvent(element, eventName, handler) {

      if (element.addEventListener) {
        element.removeEventListener(eventName, handler, false);
      }

      else if (element.detachEvent) {
        element.detachEvent("on" + eventName, handler);
      }
    }

    /**
     * Converts a time value taken from a CSS property, such as "0.5s"
     * and converts it to a number in milliseconds, such as 500
     *
     * @param {String} time - the time in a string
     * @returns {Number} convertedTime - the time as a number
     * @api private
     */
    function convertTimeToMs(time) {

      var convertedTime,
          fraction;

      // Deal with milliseconds and seconds
      if (time.indexOf("ms") > -1) {
        fraction = 1;
      }else {
        fraction = 1000;
      }

      if (time == "0s") {
        convertedTime = 0;
      }else {
        convertedTime = parseFloat(time.replace("s", "")) * fraction;
      }

      return convertedTime;
    }

    /**
     * Does an element have a particular class?
     *
     * @param {HTMLElement} element - The element to check
     * @param {String} name - The name of the class to check for
     * @returns {Boolean}
     * @api private
     */
    function hasClass(element, name) {

      if (element === undefined) {
        return;
      }

      return new RegExp('(\\s|^)' + name + '(\\s|$)').test(element.className);
    }

    /**
     * Add a class to an element
     *
     * @param {Object} elements - The element(s) to add a class to
     * @param {String} name - The class to add
     * @api private
     */
    function addClass(elements, name) {

      var element,
          elementsLength,
          i;

      // If only one element is defined, turn it into a nodelist so it'll pass
      // through the for loop
      if (isArray(elements) === false) {
        elementsLength = 1;
        elements = [elements];
      }

      elementsLength = elements.length;

      for (i = 0; i < elementsLength; i++) {

        element = elements[i];

        if (hasClass(element, name) === false) {
          element.className += (element.className ? ' ': '') + name;
        }
      }
    }

    /**
     * Remove a class from an element
     *
     * @param {Object} elements - The element to remove a class from
     * @param {String} name - The class to remove
     * @api private
     */
    function removeClass(elements, name) {

      var element,
          elementsLength,
          i;

      // If only one element is defined, turn it into a nodelist so it'll pass
      // through the for loop
      if (isArray(elements) === false) {
        elementsLength = 1;
        elements = [elements];
      }

      else {
        elementsLength = elements.length;
      }

      for (i = 0; i < elementsLength; i++) {

        element = elements[i];

        if (hasClass(element, name) === true) {
          element.className = element.className.replace(new RegExp('(\\s|^)' + name + '(\\s|$)'),' ').replace(/^\s+|\s+$/g, '');
        }
      }
    }

    /**
     * Determine if the cursor is inside the boundaries of an
     * element.
     *
     * @param {Object} element - The element to test
     * @param {Object} cursor - The event holding cursor properties
     */
    function insideElement(element, cursor) {

      // Get the elements boundaries
      var rect = element.getBoundingClientRect(),
          inside = false;

      // Return true if inside the boundaries of the Sequence element
      if (cursor.clientX >= rect.left && cursor.clientX <= rect.right && cursor.clientY >= rect.top && cursor.clientY <= rect.bottom) {
        inside = true;
      }

      return inside;
    }

    /**
     * Determine if an element has a specified parent, and if so, return the
     * index number for the element.
     *
     * The index is taken from the top level elements witint a pagination
     * element. This function will iterate through each parent until it
     * reaches the top level, then get all top level elements and determine
     * the index of the chosen top level.
     *
     * @param {Object} parents - The parent element(s) that the child should be
     * within
     * @param {Object} target - The child element to test if it has the parent
     * @param {Object} previousTarget - The element that was previously checked
     * to determine if it was top level
     * @api private
     */
    function hasParent(parent, target, previousTarget) {

      if (target.nodeName === "BODY") {
        return false;
      }

      // We're at the pagination parent
      if (parent === target) {

        if (previousTarget !== undefined) {

          // Get the top level element clicked and all top level elements
          var topLevel = previousTarget;
          var allTopLevel = parent.getElementsByTagName(topLevel.nodeName);

          // Count the number of top level elements
          var i = allTopLevel.length;

          // Which top level element was clicked?
          while (i--) {
            if (topLevel === allTopLevel[i]) {

              // One-base the index and return it
              return i + 1;
            }
          }
        }
      }

      // Not yet at the pagination parent element, iterate again
      else {
        previousTarget = target;
        return hasParent(parent, target.parentNode, previousTarget);
      }
    }

    /**
     * Determine the Hammer direction required based on the swipe directions
     * being used
     * hammerjs.github.io/api/#directions
     *
     * @param {Object} swipeEvents - An object holding each swipe direction and
     * the handler to execute
     * @api private
     */
    function getHammerDirection(swipeEvents) {

      var swipeDirections = 0,
          hammerDirection = Hammer.DIRECTION_NONE;

      if (swipeEvents.left !== undefined || swipeEvents.right !== undefined) {
        swipeDirections += 1;
      }

      if (swipeEvents.up !== undefined || swipeEvents.down !== undefined) {
        swipeDirections += 2;
      }

      if (swipeDirections === 1) {
        hammerDirection = Hammer.DIRECTION_HORIZONTAL;
      } else if (swipeDirections === 2) {
        hammerDirection = Hammer.DIRECTION_VERTICAL;
      } else if (swipeDirections === 3) {
        hammerDirection = Hammer.DIRECTION_ALL;
      }

      return hammerDirection;
    }

    /**
     * Add classes to the Sequence container that allow for styling based on
     * feature support.
     *
     * @param {HTMLObject} $el - The element to add the classes to
     * @param {Object} Modernizr - Sequence's instance of Modernizr
     * @api private
     */
    function addFeatureSupportClasses($el, Modernizr) {

      // TODO: Add support for all features used by Sequence and only manipulate
      // the DOM once. Currently this function just adds a class for the touch
      // feature. Probably best just to copy how Modernizr does it to implement
      // full list of features

      var prefix = "seq-",
          support = "no-touch";

      if (Modernizr.touch === true) {
        support = "touch";
      }

      addClass($el, prefix + support);
    }

    /* --- PUBLIC PROPERTIES/METHODS --- */

    // Expose some of Sequence's private properties
    var self = {
      modernizr: Modernizr
    };

    /**
     * Manage UI elements such as nextButton, prevButton, and pagination
     */
    self.ui = {

      // Default UI elements
      defaultElements: {
        "nextButton": "seq-next",
        "prevButton": "seq-prev",
        "autoPlayButton": "seq-autoplay",
        "pagination": "seq-pagination",
        "preloader": "seq-preloader"
      },

      /**
       * Get an UI element
       *
       * @param {String} type - The type of UI element (nextButton for example)
       * @returns {Boolean | HTMLElement} option - True if using the default
       * element, else an HTMLElement
       */
      getElements: function(type, option) {

        var element,
            elements,
            elementsLength,
            relatedElements = [],
            rel,
            i;

        // Get the element being used
        if (option === true) {

          // Default elements
          elements = document.querySelectorAll("." + this.defaultElements[type]);
        } else {

          // Custom elements
          elements = document.querySelectorAll(option);
        }

        elementsLength = elements.length;

        // Does the element control this instance of Sequence? We're looking
        // for either a global element or one with a rel attribute the same
        // as this instances ID
        for (i = 0; i < elementsLength; i++) {

          element = elements[i];
          rel = element.getAttribute("rel");

          if (rel === null || rel === self.$container.getAttribute("id")) {
            relatedElements.push(element);
          }
        }

        return relatedElements;
      },

      /**
       * Fade an element in using transitions if they're supported, else use JS
       *
       * @param {HTMLElement} element - The element to show
       * @param {Number} duration - The duration to show the element over
       */
      show: function(element, duration) {

        if (self.propertySupport.transitions === true) {

          element.style[Modernizr.prefixed("transitionDuration")] = duration + "ms";
          element.style[Modernizr.prefixed("transitionProperty")] = "opacity, " + Modernizr.prefixed("transform");
          element.style.opacity = 1;
        }

        else {

          self.animationFallback.animate(element, "opacity", "", 0, 1, duration);
        }
      },

      /**
       * Fade an element out using transitions if they're supported, else use JS
       *
       * @param {HTMLElement} element - The element to hide
       * @param {Number} duration - The duration to hide the element over
       * @param {Function} callback - Function to execute when the element is
       * hidden
       */
      hide: function(element, duration, callback) {

        if (self.propertySupport.transitions === true) {

          element.style[Modernizr.prefixed("transitionDuration")] = duration + "ms";
          element.style[Modernizr.prefixed("transitionProperty")] = "opacity, " + Modernizr.prefixed("transform");
          element.style.opacity = 0;
        }

        else {

          self.animationFallback.animate(element, "opacity", "", 1, 0, duration);
        }

        if (callback !== undefined) {
          self.hideTimer = setTimeout(function() {
            callback();
          }, duration);
        }
      }
    };

    /**
     * Methods relating to autoPlay
     */
    self.autoPlay = {

      /**
       * Initiate autoPlay
       */
      init: function() {

        self.isAutoPlayPaused = false;
        self.isAutoPlaying = false;
      },

      /**
       * Determine the delay that should be applied before starting autoPlay. A
       * custom delay should take precedence. If delay is true then the delay
       * should use options.autoPlayDelay where specified. If not
       * specified, use the same time as defined in options.autoPlayInterval
       *
       * @param {Boolean/Number} delay - Whether a delay should be applied before
       * starting autoPlay (true = same amount as options.autoPlayInterval,
       * false = no interval, number = custom interval period). Applied to
       * autoPlay.start()
       * @param {Number} startDelay - The delay applied via options.autoPlayDelay
       * @param {Number} autoPlayInterval - The delay applied via options.autoPlayInterval
       */
      getDelay: function(delay, startDelay, autoPlayInterval) {

        switch (delay) {

          case true:

            delay = (startDelay === null) ? autoPlayInterval: startDelay;
            break;

          case false:
          case undefined:
            delay = 0;
            break;
        }

        return delay;
      },

      /**
       * Start autoPlay
       *
       * @param {Boolean/Number} delay - Whether a delay should be applied before
       * starting autoPlay (true = same amount as options.autoPlayInterval,
       * false = no delay, number = custom delay period)
       * @param {Boolean} continuing - If autoPlay is continuing from a
       * previous cycle, the started() callback won't be triggered
       * @returns false - When autoPlay is already active and can't be started
       * again
       */
      start: function(delay, continuing) {

        // Only start once
        if (self.isAutoPlaying === true || self.isReady === false) {
          return false;
        }

        var options = self.options;

        // Which delay should we use?
        delay = this.getDelay(delay, options.autoPlayDelay, options.autoPlayInterval);

        // Callback (only to be triggered when autoPlay is continuing from a
        // previous cycle)
        if (continuing === undefined) {
          self.started(self);
        }

        addClass(self.$container, "seq-autoplaying");
        addClass(self.$autoPlay, "seq-autoplaying");

        // autoPlay is now enabled and active
        options.autoPlay = true;
        self.isAutoPlaying = true;

        // Only start a new autoPlay timer if Sequence isn't already animating.
        // If it is, a new one will be started at the end of the animation.
        if (self.isAnimating === false) {

          // Choose the direction and start autoPlay
          self.autoPlayTimer = setTimeout(function() {

            if (options.autoPlayDirection === 1) {
              self.next();
            }else {
              self.prev();
            }
          }, delay);
        }

        return true;
      },

      /**
       * Stop autoPlay
       */
      stop: function() {

        if (self.options.autoPlay === true && self.isAutoPlaying === true) {
          self.options.autoPlay = false;
          self.isAutoPlaying = false;
          clearTimeout(self.autoPlayTimer);

          removeClass(self.$container, "seq-autoplaying");
          removeClass(self.$autoPlay, "seq-autoplaying");

          // Callback
          self.stopped(self);
        } else {
          return false;
        }

        return true;
      },

      /**
       * Unpause autoPlay
       *
       * autoPlay.pause() and autoPlay.unpause() are used internally to
       * temporarily stop autoPlay when hovered over.
       */
      unpause: function() {

        if (self.isAutoPlayPaused === true) {

          self.isAutoPlayPaused = false;
          this.start(true);
        } else {
          return false;
        }

        return true;
      },

      /**
       * Pause autoPlay
       *
       * autoPlay.pause() and autoPlay.unpause() are used internally to
       * temporarily stop autoPlay when hovered over.
       */
      pause: function() {

        if (self.options.autoPlay === true) {

          self.isAutoPlayPaused = true;
          this.stop();

        } else {
          return false;
        }

        return true;
      }
    };

    /**
     * Controls Sequence's canvas
     */
    self.canvas = {

      /**
       * Setup the canvas, screen, and steps ready to be animated
       */
      init: function(id) {

        if (self.$screen !== undefined) {
          self.$screen.style.height = "100%";
          self.$screen.style.width = "100%";
        }

        // Determine the position of each step and the transform properties
        // required for the canvas so it can move to each step
        self.canvas.getTransformProperties();
      },

      /**
       * Get Sequence's steps
       *
       * @param {HTMLElement} canvas - The canvas element
       * @returns {Array} steps - The elements that make up Sequence's steps
       * @api private
       */
      getSteps: function(canvas) {

        var steps = [],
            stepId,
            step,
            stepElements = canvas.children,
            stepsLength = stepElements.length,
            i;

        // Where we'll save info about the animation
        self.stepProperties = {};

        // Get the steps that have a parent with a class of "seq-canvas"
        for (i = 0; i < stepsLength; i++) {

          step = stepElements[i];
          stepId = i + 1;

          steps.push(step);

          // Add each step to the animation map, where we'll save its transform
          // properties
          self.stepProperties[stepId] = {};
          self.stepProperties[stepId].isActive = false;
        }

        return steps;
      },

      /**
       * Determine the position of each step and the transform properties
       * required for the canvas so it can move to each step
       *
       */
      getTransformProperties: function() {

        var i,
            step,
            stepId,
            canvasTransform;

        for (i = 0; i < self.noOfSteps; i++) {

          step = self.$steps[i];
          stepId = i + 1;

          canvasTransform = {
            "seqX": 0,
            "seqY": 0,
            "seqZ": 0
          };

          // Invert the steps offsetLeft and offsetTop to the canvas will always
          // move to show the step
          canvasTransform.seqX += step.offsetLeft * -1;
          canvasTransform.seqY += step.offsetTop * -1;

          self.stepProperties[stepId].canvasTransform = canvasTransform;
        }
      },

      /**
       * Move the canvas to show a specific step
       *
       * @param {Number} id - The ID of the step to move to
       * @param {Boolean} animate - Should the canvas animate or snap?
       */
      move: function(id, animate) {

        if (self.options.animateCanvas === true) {

          // Get the canvas element and step element to animate to
          var duration = 0,
              transforms;

          // Should the canvas animate?
          if (animate === true && self.firstRun === false) {
            duration = self.options.animateCanvasDuration;
          }

          // Animate the canvas using CSS transitions
          if (self.isFallbackMode === false) {

            transforms = self.stepProperties[id].canvasTransform;

            // Apply the transform CSS to the canvas
            self.$canvas.style[Modernizr.prefixed("transitionDuration")] = duration + "ms";
            self.$canvas.style[Modernizr.prefixed("transform")] = "translateX(" + transforms.seqX + "px) " + "translateY(" + transforms.seqY + "px) " + "translateZ(" + transforms.seqZ + "px) ";
          }

          return true;
        }

        return false;
      },

      /**
       * Remove the no-JS "seq-in" class from a step
       *
       * @param {Object} self - Properties and methods available to this instance
       * @api private
       */
      removeNoJsClass: function() {

        if (self.isFallbackMode === true) {
          return;
        }

        // Look for the step with the "seq-in" class and remove the class
        for (var i = 0; i < self.$steps.length; i++) {
          var element = self.$steps[i];

          if (hasClass(element, "seq-in") === true) {
            var step = i + 1;

            self.animation.resetInheritedSpeed(step);
            removeClass(element, "seq-in");
          }
        }
      }
    };

    /**
     * Controls Sequence's step animations
     */
    self.animation = {

      /**
       * Get the properties of a phase
       *
       * @param {Number} stepId - The ID of the step
       * @returns {Object} ID and element of the step the phase belongs to,
       * array of all child elements that belong to step, array of animated
       * elements, timings object containing maxDuration, maxDelay, and
       * maxLength
       */
      getPhaseProperties: function(stepId) {

        var stepElement = self.$steps[stepId - 1],
            stepAnimatedChildren = stepElement.querySelectorAll("*[data-seq]"),
            stepChildren = stepElement.querySelectorAll("*"),
            stepChildrenLength = stepChildren.length,
            el,
            i,
            watchedDurations = [],
            watchedDelays = [],
            watchedLengths = [],
            durations = [],
            delays = [],
            lengths = [],
            duration,
            delay;

        // Get the animation length of each element (duration + delay) and save
        // for comparisson
        for (i = 0; i < stepChildrenLength; i++) {
          el = stepChildren[i];

          duration = convertTimeToMs(getStyle(el, Modernizr.prefixed("transitionDuration")));
          delay = convertTimeToMs(getStyle(el, Modernizr.prefixed("transitionDelay")));

          // Save this elements animation length for all elements
          durations.push(duration);
          delays.push(delay);
          lengths.push(duration + delay);

          // Also save animation lengths but only for watched elements
          if (el.getAttribute("data-seq") !== null) {
            watchedDurations.push(duration);
            watchedDelays.push(delay);
            watchedLengths.push(duration + delay);
          }
        }

        // Which were the longest durations and delays?
        var maxDuration = Math.max.apply(Math, durations),
            maxDelay = Math.max.apply(Math, delays),
            maxTotal = Math.max.apply(Math, lengths);

        // Which were the longest watched durations and delays?
        var watchedMaxDuration = Math.max.apply(Math, watchedDurations),
            watchedMaxDelay = Math.max.apply(Math, watchedDelays),
            watchedMaxTotal = Math.max.apply(Math, watchedLengths);

        return {
          stepId: stepId,
          stepElement: stepElement,
          children: stepChildren,
          animatedChildren: stepAnimatedChildren,
          watchedTimings: {
            maxDuration: watchedMaxDuration,
            maxDelay: watchedMaxDelay,
            maxTotal: watchedMaxTotal
          },
          timings: {
            maxDuration: maxDuration,
            maxDelay: maxDelay,
            maxTotal: maxTotal
          }
        };
      },

      /**
       * How long before the next phase should start?
       * Ignore the phaseThreshold (on first run for example)
       */
      getPhaseThreshold: function(ignorePhaseThreshold, phaseThresholdOption, isAnimating, currentPhaseDuration) {

        var phaseThresholdTime = 0;

        // Ignore the phaseThreshold if the developer wishes for this to happen
        // if Sequence.js is animating
        if (isAnimating === true && self.options.ignorePhaseThresholdWhenSkipped === true) {
          ignorePhaseThreshold = true;
        }

        if (ignorePhaseThreshold === undefined) {

          if (phaseThresholdOption === true) {
            // The phaseThreshold should be the length of the current phase
            // so the next starts immediately after
            phaseThresholdTime = currentPhaseDuration;
          } else if (phaseThresholdOption !== false) {
            // Use the developer defined phaseThreshold
            phaseThresholdTime = phaseThresholdOption;
          }
        }

        return phaseThresholdTime;
      },

      /**
       * Do we need to add a delay to account for one phase finishing
       * before another?
       *
       * @param {Number} currentPhaseTotal - Amount of time in milliseconds the
       * current phase will animate for
       * @param {Number} nextPhaseTotal - Amount of time in milliseconds the
       * next phase will animate for
       * @param {Boolean} ignorePhaseThresholdWhenSkippedOption - if true,
       * don't use a reversePhaseDelay
       * @param {Boolean} isAnimating - Whether Sequence is animating
       * @returns {Object} - Contains times that should delay the next or
       * current phase accordingly
       */
       getReversePhaseDelay: function(currentPhaseTotal, nextPhaseTotal, phaseThresholdOption, ignorePhaseThresholdWhenSkippedOption, isAnimating) {

        var phaseDifference = 0,
            current = 0,
            next = 0;

        // Only use a reversePhaseDelay if the phaseThreshold option is true or
        // a custom time, and Sequence is not animating with the
        // ignorePhaseThreshold option on
        if (phaseThresholdOption !== true && (ignorePhaseThresholdWhenSkippedOption === false || isAnimating === false)) {
            phaseDifference = currentPhaseTotal - nextPhaseTotal;

          if (phaseDifference > 0) {
            next = phaseDifference;
          } else if (phaseDifference < 0) {
            current = Math.abs(phaseDifference);
          }
        }

        return {
          next: next,
          current: current
        };
      },

      /**
       * If the moveActiveStepToTop option is being used, move the next step
       * to the top and the current step to the bottom via z-index
       *
       * @param {HTMLElement} currentElement - The current step to be moved off
       * the top
       * @param {HTMLElement} nextElement - The next step to be moved to the top
       */
      moveActiveStepToTop: function(currentElement, nextElement) {

        if (self.options.moveActiveStepToTop === true) {

          var prevStepElement = self.$steps[self.prevStepId - 1],
              lastStepId = self.noOfSteps - 1;

          prevStepElement.style.zIndex = 1;
          currentElement.style.zIndex = lastStepId;
          nextElement.style.zIndex = self.noOfSteps;
        }

        return null;
      },

      /**
       * If the navigationSkipThreshold option is being used, prevent the use
       * of goTo() during the threshold period
       *
       * @param {Number} id - The ID of the step Sequence is trying to go to
       * @param {HTMLObject} nextStepElement - The element for the next step
       */
      manageNavigationSkip: function(id, nextStepElement) {

        if (self.isFallbackMode === true) {
          return;
        }

        var i,
            stepProperties,
            stepElement,
            stepId,
            phaseSkipped;

        // Show the next step again
        self.ui.show(nextStepElement, 0);

        if (self.options.navigationSkip === true) {

          // Start the navigation skip threshold
          self.navigationSkipThresholdActive = true;

          // Are there steps currently animating that need to be faded out?
          if (self.phasesAnimating !== 0) {

            // If a step is waiting to animate in based on the phaseThreshold,
            // cancel it
            clearTimeout(self.phaseThresholdTimer);
            clearTimeout(self.nextPhaseStartedTimer);

            // Fade a step if the user navigates to another prior to its
            // animation finishing
            if (self.options.fadeStepWhenSkipped === true) {

              // Fade all elements that are animating
              // (not including the current one)
              for (i = 1; i <= self.noOfSteps; i++) {

                stepProperties = self.stepProperties[i];

                // Deal with the steps that were skipped whilst still animating
                if (stepProperties.isActive === true && i !== id) {
                  stepElement = self.$steps[i - 1];
                  stepId = i;

                  phaseSkipped = {};
                  phaseSkipped.id = stepId;
                  phaseSkipped.element = stepElement;

                  // Save the ID of the skipped step so we can deal with it when it has faded out
                  self.phasesSkipped.push(phaseSkipped);

                  // Deal with the skipped step
                  self.animation.stepSkipped(stepElement);
                }
              }
            }
          }

          // Start the navigationSkipThreshold timer to prevent being able to
          // navigate too quickly
          self.navigationSkipThresholdTimer = setTimeout(function() {
            self.navigationSkipThresholdActive = false;
          }, self.options.navigationSkipThreshold);
        }
      },

      /**
       * Deal with a step when it has been skipped
       *
       * @param {HTMLElement} stepElement - The step element that was skipped
       */
      stepSkipped: function(stepElement) {

        // TODO: Add resetWhenStepSkipped option -
        // https://github.com/IanLunn/Sequence/issues/257
        // Reset the skipped steps current and next phase ended timers and trigger
        // them as soon as the steps have faded out

        // Fade the step out
        self.ui.hide(stepElement, self.options.fadeStepTime, function() {

        });

      },

      /**
       * Change a step's class. Example: go from step1 to step2
       *
       * @param {Number} id - The ID of the step to change
       */
      changeStep: function(id) {

        // Get the step to add
        var stepToAdd = "seq-step" + id;

        // Add the new step and remove the previous
        if (self.currentStepId !== undefined) {

          var stepToRemove = "seq-step" + self.currentStepId;

          addClass(self.$container, stepToAdd);
          removeClass(self.$container, stepToRemove);
        }else {
          addClass(self.$container, stepToAdd);
        }
      },

      /**
       * Apply the reversed properties to all animatable elements within a phase
       *
       * @param {Object} phaseProperties - Properties relating to the active phases
       * (seq-in and seq-out)
       * @param {Number} phaseDelay - A delay that is added when one phase
       * animates longer than the other
       * @param {Number} phaseThresholdTime - The amount of time in milliseconds
       * before the next step should start animating in
       * @param {Boolean} ignorePhaseThreshold - if true, ignore the threshold
       * between phases (breaks reversal of animations but may be used when
       * skipping navigation etc)
       * @returns {Number} maxWatchedTotal - The new total length
       * (duration + delay) for watched elements when reversed
       */
      reverseProperties: function(phaseProperties, phaseDelay, phaseThresholdTime, ignorePhaseThreshold) {

        var animation = this,
            phaseElements = phaseProperties.children,
            noOfPhaseElements = phaseElements.length,
            stepDurations = phaseProperties.timings,
            el,
            i,
            timingFunction,
            timingFunctionReversed,
            duration,
            delay,
            total,
            maxTotal,
            maxWatchedTotal,
            totals = [],
            watchedTotals = [];

        for (i = 0; i < noOfPhaseElements; i++) {
          el = phaseElements[i];

          // Get each element's duration and delay
          duration = convertTimeToMs(getStyle(el, Modernizr.prefixed("transitionDuration")));
          delay = convertTimeToMs(getStyle(el, Modernizr.prefixed("transitionDelay")));

          // Save the total
          total = duration + delay;

          // Delay elements in relation to the length of other elements in the
          // phase eg. If one element A transitions for 1s and element B 2s
          // element A should be delayed by 1s (element B length - element A length).
          delay = stepDurations.maxTotal - total;

          // Delay this phase's elements so they animate in relation to the
          // other phase
          if (ignorePhaseThreshold !== true) {
            delay += phaseDelay;
          }

          // Update the total with the new delay
          total = duration + delay;

          // Save the total of the reversed animation
          totals.push(total);

          // Save the total of the reversed animation for watched elements only
          if (el.getAttribute("data-seq") !== null) {
            watchedTotals.push(total);
          }

          // Get the timing-function and reverse it
          timingFunction = getStyle(el, Modernizr.prefixed("transitionTimingFunction"));
          timingFunctionReversed = animation.reverseTimingFunction(timingFunction);

          // Apply the reversed transition properties to each element
          el.style[Modernizr.prefixed("transition")] = duration + "ms " + delay + "ms " + timingFunctionReversed;
        }

        // Get the longest total and delay of the reversed animations
        maxTotal = Math.max.apply(Math, totals);

        // Get the longest total and delay of the reversed animations (for
        // watched elements only)
        maxWatchedTotal = Math.max.apply(Math, watchedTotals);

        // Remove the reversed transition properties from each element once it
        // has finished animating; allowing for the inherited styles to take
        // effect again.
        setTimeout(function() {
          animation.domDelay(function() {
            for (i = 0; i < noOfPhaseElements; i++) {
              el = phaseElements[i];

              el.style[Modernizr.prefixed("transition")] = "";
            }
          });
        }, maxTotal + phaseThresholdTime);

        return maxWatchedTotal;
      },

      /**
       * Go forward to the next step
       *
       * @param {Number} id - The ID of the next step
       * @param {HTMLObject} currentStepElement - The element for the current step
       * @param {HTMLObject} nextStepElement - The element for the next step
       * @param {Boolean} ignorePhaseThreshold - if true, ignore the
       * transitionThreshold setting and immediately go to the specified step
       * @param {Boolean} hashTagNav - If navigation is triggered by the hashTag
       */
      forward: function(id, currentStepElement, nextStepElement, ignorePhaseThreshold, hashTagNav) {

        var animation = this,
            currentPhaseProperties,
            currentPhaseTotal,
            phaseThresholdTime;

        if (self.firstRun === false) {

          // Callback
          animation.currentPhaseStarted(self.currentStepId);
        }

        // Snap the step to the "animate-start" phase
        removeClass(nextStepElement, "seq-out");

        animation.domDelay(function() {

          // Make the current step transition to "seq-out"
          currentPhaseProperties = animation.startAnimateOut(self.currentStepId, currentStepElement, 1);

          // Total duration of the current phase (duration + delay)
          currentPhaseTotal = currentPhaseProperties.watchedTimings.maxTotal;

          // How long before the next phase should start?
          phaseThresholdTime = animation.getPhaseThreshold(ignorePhaseThreshold, self.options.phaseThreshold, self.isAnimating, currentPhaseTotal);

          // Sequence is now animating
          self.isAnimating = true;

          // Make the next step transition to "seq-in"
          animation.startAnimateIn(id, currentPhaseTotal, nextStepElement, phaseThresholdTime, hashTagNav);
        });
      },

      /**
       * Navigate in reverse to the next step
       *
       * @param {Number} id - The ID of the next step
       * @param {HTMLObject} currentStepElement - The element for the current step
       * @param {HTMLObject} nextStepElement - The element for the next step
       * @param {Boolean} ignorePhaseThreshold - if true, ignore the
       * transitionThreshold setting and immediately go to the specified step
       * @param {Boolean} hashTagNav - If navigation is triggered by the hashTag
       */
      reverse: function(id, currentStepElement, nextStepElement, ignorePhaseThreshold, hashTagNav) {

        var animation = this,
            currentId,
            reversePhaseDelay,
            phaseThresholdTime = 0,
            currentPhaseProperties,
            nextPhaseProperties,
            currentPhaseTotal,
            nextPhaseTotal;

        // Snap the next phase to "animate-out"
        addClass(nextStepElement, "seq-out");

        animation.domDelay(function() {

          // Get the step number, element, its animated elements (child nodes),
          // and max timings
          currentPhaseProperties = animation.getPhaseProperties(self.currentStepId, "current");
          nextPhaseProperties = animation.getPhaseProperties(id, "next");

          // Determine the gap between phases based on the phaseThreshold option
          phaseThresholdTime = animation.getPhaseThreshold(ignorePhaseThreshold, self.options.phaseThreshold, self.isAnimating, currentPhaseProperties.timings.maxTotal);

          // Determine if there should be a delay to account for one phase
          // finishing before the other.
          // Example: Navigating forward, the next element transitions in over
          // 1s (A) and the current element over 2s (B). When reversed, the next
          // element (previouly the current element) should wait 1s (B - A)
          // before animating back in
          reversePhaseDelay = animation.getReversePhaseDelay(currentPhaseProperties.timings.maxTotal, nextPhaseProperties.timings.maxTotal, self.options.phaseThreshold, self.options.ignorePhaseThresholdWhenSkipped, self.isAnimating);

          // Reverse properties for all elements in the current and next step
          // and add the reversePhaseDelay as a transition-delay where necessary
          currentPhaseTotal = animation.reverseProperties(currentPhaseProperties, reversePhaseDelay.current, 0, ignorePhaseThreshold);
          nextPhaseTotal = animation.reverseProperties(nextPhaseProperties, reversePhaseDelay.next, phaseThresholdTime, ignorePhaseThreshold);

          // Make the current step transition to "animate-start"
          animation.startAnimateOut(self.currentStepId, currentStepElement, -1, currentPhaseTotal);

          // Sequence is now animating
          self.isAnimating = true;

          if (self.firstRun === false) {

            // Callbacks
            animation.currentPhaseStarted(self.currentStepId);
          }

          // Make the next step transition to "seq-in"
          animation.startAnimateIn(id, currentPhaseTotal, nextStepElement, phaseThresholdTime, hashTagNav, nextPhaseTotal);
        });
      },

      /**
       * Start the next step's "seq-in" phase
       *
       * @param {Number} id - The ID of the next step
       * @param {Number} currentPhaseTotal - Amount of time in milliseconds the
       * current phase will animate for
       * @param {HTMLObject} nextStepElement - The element for the next step
       * @param {Number} phaseThresholdTime - The amount of time in milliseconds
       * before the next step should start animating in
       * @param {Boolean} hashTagNav - If navigation is triggered by the hashTag
       * @param {Number} nextPhaseTotal - Amount of time in milliseconds the
       * next phase will animate for
       */
      startAnimateIn: function(id, currentPhaseTotal, nextStepElement, phaseThresholdTime, hashTagNav, nextPhaseTotal) {

        var animation = this,
            nextPhaseProperties,
            stepDuration;

        // The next ID is now the current ID
        self.prevStepId = self.currentStepId;
        self.currentStepId = id;

        if (self.firstRun === true) {
          // Update pagination
          self.pagination.update();
        }

        // When should the "seq-in" phase start and how long until the step
        // completely finishes animating?
        if (self.firstRun === false || self.options.startingStepAnimatesIn === true) {

          self.stepProperties[id].isActive = true;

          // Callback
          self.nextPhaseStartedTimer = setTimeout(function() {
            animation.nextPhaseStarted(id, hashTagNav);
          }, phaseThresholdTime);

          // Start the "seq-in" phase
          self.phaseThresholdTimer = setTimeout(function() {

            // TODO: Change multiple classes via one function
            addClass(nextStepElement, "seq-in");
            removeClass(nextStepElement, "seq-out");

            // When animate-in is reversed, this will have already been passed
            // in as an argument so it's only needed for forward animation
            if (nextPhaseTotal === undefined) {
              nextPhaseProperties = self.animation.getPhaseProperties(id, "next");
              nextPhaseTotal = nextPhaseProperties.watchedTimings.maxTotal;
            }

            // Wait for the next phase to end
            animation.phaseEnded(id, "next", nextPhaseTotal, animation.nextPhaseEnded);

            // How long will it take for the step to end?
            stepDuration = animation.getStepDuration(currentPhaseTotal, nextPhaseTotal, self.options.phaseThreshold);

            self.stepEndedTimer = setTimeout(function() {

              self.animation.stepEnded(id);
            }, stepDuration);

          }, phaseThresholdTime);
        }

        // This is the first run. Snap the first step into place without animation
        else {

          // Set the first step's speed to 0 to have it immediately snap into place
          animation.resetInheritedSpeed(id);

          self.phasesAnimating = 0;
          self.isAnimating = false;

          if (self.options.autoPlay === true) {
            self.autoPlay.start(true);
          }

          addClass(nextStepElement, "seq-in");
          removeClass(nextStepElement, "seq-out");
        }

        self.firstRun = false;
      },

      /**
       * Start the next step's "seq-out" phase
       *
       * @param {Number} id - The ID of the next step
       * @param {HTMLObject} currentStepElement - The element for the current step
       * @param {Number} direction - The direction of navigation
       * @param {Number} currentPhaseTotal - Amount of time in milliseconds the
       * current phase will animate for
       */
      startAnimateOut: function(id, currentStepElement, direction, currentPhaseTotal) {

        var animation = this,
        currentPhaseProperties;

        if (direction === 1) {

          // TODO: Change multiple classes via one function
          // Make the current step transition to "animate-out"
          removeClass(currentStepElement, "seq-in");
          addClass(currentStepElement, "seq-out");

          // Get the step number, element, its animated elements (child nodes), and
          // max timings
          currentPhaseProperties = animation.getPhaseProperties(id, "current");

          currentPhaseTotal = currentPhaseProperties.watchedTimings.maxTotal;

        } else {

          // Make the current step transition to "animate-start"
          removeClass(currentStepElement, "seq-in");
        }

        if (self.firstRun === false) {

          // Add the steps to the list of active steps
          self.stepProperties[id].isActive = true;

          // Wait for the current phase to end
          animation.phaseEnded(id, "current", currentPhaseTotal, animation.currentPhaseEnded);
        }

        return currentPhaseProperties;
      },

      /**
       * Determine how long a step will animate for
       *
       * @param {Number} currentPhaseTotal - Amount of time in milliseconds the
       * current phase will animate for
       * @param {Number} nextPhaseTotal - Amount of time in milliseconds the
       * next phase will animate for
       * @param {Number|Boolean} phaseThresholdOption - Amount of time between
       * phases as defined via the phaseThreshold option
       * @returns {Number} stepDuration - Which ever is longest, current or next
       * phase duration
       */
      getStepDuration: function(currentPhaseTotal, nextPhaseTotal, phaseThresholdOption) {

        var stepDuration;

        switch (phaseThresholdOption) {
          case true:
            stepDuration = nextPhaseTotal;
          break;

          case false:
            // The stepDuration is whichever phase is longest
            stepDuration = (currentPhaseTotal >= nextPhaseTotal) ? currentPhaseTotal : nextPhaseTotal;
          break;

          default:
            stepDuration = (currentPhaseTotal >= nextPhaseTotal + phaseThresholdOption) ? (currentPhaseTotal) - phaseThresholdOption : nextPhaseTotal;
        }

        return stepDuration;
      },

      /**
       * When the current phase starts animating
       */
      currentPhaseStarted: function(id) {

        self.phasesAnimating++;

        // Callback
        self.currentPhaseStarted(id, self);
      },

      /**
       * When the current phase finishes animating
       */
      currentPhaseEnded: function(id) {

        // Callback
        self.currentPhaseEnded(id, self);
      },

      /**
       * When the next phase starts animating
       *
       * @param {Boolean} hashTagNav - If navigation is triggered by the hashTag
       */
      nextPhaseStarted: function(id, hashTagNav) {

        self.phasesAnimating++;

        // Update the hashTag if being used
        if (hashTagNav === undefined) {
          self.hashTags.update();
        }

        // Update pagination
        self.pagination.update();

        // Callback
        self.nextPhaseStarted(id, self);
      },

      /**
       * When the next phase finishes animating
       */
      nextPhaseEnded: function(id) {

        // Callback
        self.nextPhaseEnded(id, self);

      },

      /**
       * Wait for a phases (seq-in or seq-out) animations to finish
       *
       * @param {Number} id - The id of the step the phase belongs to
       * @param {Number} phaseDuration - The amount of time before the phase
       * ends (in milliseconds)
       * @param {Function} callback - A function to execute when the phase ends
       */
      phaseEnded: function(id, phase, phaseDuration, callback) {

        var animation = this,
            phaseEnded;

        phaseEnded = function(id) {
          self.stepProperties[id].isActive = false;
          self.phasesAnimating--;

          // Phase callback
          callback(id);
        };

        if (phase === "current") {

          self.currentPhaseEndedTimer = setTimeout(function() {

            phaseEnded(id);
          }, phaseDuration);
        } else {

          self.nextPhaseEndedTimer = setTimeout(function() {

            phaseEnded(id);
          }, phaseDuration);
        }
      },

      /**
       * When a step's animations have completely finished
       *
       * @param {Number} id - The ID of the step that ended
       * @param {Number} stepDuration - The amount of time before the step
       * finishes animating
       */
      stepEnded: function(id) {

          self.isAnimating = false;
          self.isAutoPlaying = false;

          // Continue with autoPlay if enabled
          if (self.options.autoPlay === true) {
            self.autoPlay.start(true, true);
          }

          // Callback
          self.animationEnded(id, self);
      },

      /**
       * Change "seq-out" to "seq-in" and vice-versa.
       *
       * @param {String} phase - The phase to reverse
       * @returns {String} - The reversed phase
       */
      reversePhase: function(phase) {

        var reversePhase = {
            "seq-out": "seq-in",
            "seq-in": "seq-out"
        };

        return reversePhase[phase];
      },

      /**
       * Apply a short delay to a function that manipulates the DOM. Allows for
       * sequential DOM manipulations.
       *
       * Why is this needed?
       *
       * When sequentially manipulating a DOM element (ie, removing a class then
       * immediately applying another on the same element), the first manipulation
       * appears not to apply. This function puts a small gap between sequential
       * manipulations to give the browser a chance visually apply each manipulation.
       *
       * Some browsers can apply a succession of classes quicker than
       * this but 50ms is enough to capture even the slowest of browsers.
       *
       * @param {Function} callback - a function to run after the delay
       */
      domDelay: function(callback) {

        setTimeout(function() {
          callback();
        }, domThreshold);
      },

      /**
       * Reverse a CSS timing function
       *
       * @param {String} timingFunction - The timing function to reverse
       * @returns {String} timingFunction - The reverse timing function
       */
      reverseTimingFunction: function(timingFunction) {

        if (timingFunction === '' || timingFunction === undefined) {
          return timingFunction;
        }

        // Convert timingFunction keywords to a cubic-bezier function
        // This is needed because some browsers return a keyword, others a function
        var timingFunctionToCubicBezier = {
          "linear"     : "cubic-bezier(0.0,0.0,1.0,1.0)",
          "ease"       : "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
          "ease-in"    : "cubic-bezier(0.42, 0.0, 1.0, 1.0)",
          "ease-in-out": "cubic-bezier(0.42, 0.0, 0.58, 1.0)",
          "ease-out"   : "cubic-bezier(0.0, 0.0, 0.58, 1.0)"
        };

        var cubicBezier,
            cubicBezierLength,
            reversedCubicBezier,
            i;

        // Convert the timing function to a cubic-bezier if it is a keyword
        if (timingFunction.indexOf("cubic-bezier") < 0) {

          // TODO: Support multiple timing-functions
          // If the timing-function is made up of multiple functions, reduce it
          // to one only
          timingFunction = timingFunction.split(",")[0];

          // Convert
          timingFunction = timingFunctionToCubicBezier[timingFunction];
        }

        // Remove the CSS function and just get the array of points
        cubicBezier = timingFunction.replace("cubic-bezier(", "").replace(")", "").split(",");
        cubicBezierLength = cubicBezier.length;

        // Convert each point into a number (rather than a string)
        for (i = 0; i < cubicBezierLength; i++) {
          cubicBezier[i] = parseFloat(cubicBezier[i]);
        }

        // Reverse the cubic bezier
        reversedCubicBezier = [
          1 - cubicBezier[2],
          1 - cubicBezier[3],
          1 - cubicBezier[0],
          1 - cubicBezier[1]
        ];

        // Add the reversed cubic bezier back into a CSS function
        timingFunction = "cubic-bezier(" + reversedCubicBezier + ")";

        return timingFunction;
      },

      /**
       * Apply a transition-duration and transition-delay to each element
       * then remove these temporary values once the phase is reset.
       *
       * Can be used to apply 0 to both duration and delay so animates reset
       * back into their original places for example.
       *
       * @param {String} step - The step that the elements we'll reset belong to
       */
      resetInheritedSpeed: function(step) {

        if (self.isFallbackMode === true) {
          return;
        }

        var animation = this,
            el,
            i;

        // Get the step's elements and count them
        var stepElements = self.$steps[step - 1].querySelectorAll("*"),
            numberOfStepElements = stepElements.length;

        // Temporarily apply a transition-duration and transition-delay to each
        // element we need to track.
        for (i = 0; i < numberOfStepElements; i++) {
          el = stepElements[i];

          el.style[Modernizr.prefixed("transition")] = "0ms 0ms";
        }

        /**
         * Note: Synchronously, an element's phase class is added/removed here.
         * To save the need for a callback though (and extra code), we instead rely
         * on the necessity for the .domDelay() function which doesn't remove the
         * inheritedStyles until after a brief delay. What would be the callback
         * is instead just placed after the call to .resetInheritedSpeed() and
         * from a synchronous point of view, occurs at this point, before the
         * following .domDelay();
         */

        // Remove the temporary transition-duration and transition-delay from each
        // element now it has been manipulated; allowing for the inherited styles
        // to take effect again.
        self.animation.domDelay(function() {

          for (i = 0; i < numberOfStepElements; i++) {

            el = stepElements[i];
            el.style[Modernizr.prefixed("transition")] = "";
          }
        });
      },

      /**
       * Get the direction to navigate in based on whether the .goTo() function
       * has a defined direction, and if not, what options are being used.
       *
       * @param {Number} id - The id of the step to go to
       * @param {Number} definedDirection - The defined direction 1 or -1
       * @returns {Number} direction - The direction 1 or -1
       */
      getDirection: function(id, definedDirection, currentStepId, noOfSteps, isFallbackMode, reverseWhenNavigatingBackwardsOption, cycleOption) {

        var animation = this,
            direction = 1;

        if (definedDirection !== undefined) {
          direction = definedDirection;
        } else if (reverseWhenNavigatingBackwardsOption === true || isFallbackMode === true) {

          if (cycleOption === true && (id === 1 && currentStepId === noOfSteps)) {
            // If the cycle option is enabled, and the user is navigating from
            // the last step to the first, navigate forwards
            direction = 1;
          } else {
            direction = (id < currentStepId) ? -1: 1;
          }
        } else {
          direction = 1;
        }

        return direction;
      },

      /**
       * Does Sequence need to go into fallback mode because the browser doesn't
       * support transitions?
       *
       * @param {Object} propertySupport - List of properties and whether the
       * browser supports them
       */
      requiresFallbackMode: function(propertySupport) {

        var transitions = propertySupport.transitions,
            isFallbackMode = false;

        if (transitions === false) {
          isFallbackMode = true;
        }

        return isFallbackMode;
      },

      /**
       * Determine what properties the browser supports. Currently tests:
       *
       * - transitions
       * - animations
       *
       * @param {Object} properties - The properties to be used (on the canvas)
       * @returns {Object} The list of properties we've tested and their support
       */
      getPropertySupport: function(properties) {

        var transitions = false,
            animations = false;

        // Are transitions supported?
        if (Modernizr.csstransitions === true) {
          transitions = true;
        }

        // Are animations supported?
        if (Modernizr.cssanimations === true) {
          animations = true;
        }

        return {
          transitions: transitions,
          animations: animations
        };
      }
    };

    /**
     * Controls Sequence's animations when in a browser that doesn't support
     * CSS transitions
     */
    self.animationFallback = {

      /**
       * Animate an element using JavaScript
       *
       * @param {HTMLElement} element - The element to animate
       * @param {String} style - The style to be animated
       * @param {String} unit - The value unit such as "px", "%" etc
       * @param {Number} from - The start value of the animation
       * @param {Number} to - The end value of the animation
       * @param {Number} time - how long to animate for
       * @param {Function} callback - A function to execute once the animation
       * has finished
       */
      animate: function(element, style, unit, from, to, time, callback) {

        if (element === false) {
          return;
        }

        var start = new Date().getTime();

        var timer = setInterval(function() {

          var step = Math.min(1, (new Date().getTime()-start) / time);

          element.style[style] = (from + step * (to - from)) + unit;

          if (step === 1) {

            if (callback !== undefined) {
              callback();
            }

            clearInterval(timer);
          }
        }, 25);

        element.style[style] = from + unit;
      },

      /**
       * Setup the canvas ready for the fallback animation
       *
       * @param {Number} id - The first Id that Sequence will go to
       */
      setupCanvas: function(id) {

        var i,
            step,
            stepId;

        if (self.isFallbackMode === true) {

          // Add the "seq-fallback" class to the Sequence element
          addClass(self.$container, "seq-fallback");

          if (self.$screen !== undefined) {
            // Prevent steps from appearing outside of the Sequence screen
            self.$screen.style.overflow = "hidden";
            self.$screen.style.width = "100%";
            self.$screen.style.height = "100%";
          }

          // Make the canvas and screen 100% width/height
          self.$canvas.style.width = "100%";
          self.$canvas.style.height = "100%";


          // Get the width of the canvas
          this.canvasWidth = self.$canvas.offsetWidth;

          // Make each step 100% width/height
          for (i = 0; i < self.noOfSteps; i++) {

            // Get the step and its ID (one-based)
            step = self.$steps[i];
            stepId = i + 1;

            /**
             * Move each step to its "seq-in" position
             *
             * Note: in fallback mode, steps will always remain in their
             * "seq-in" position
             */
            addClass(step, "seq-in");

            // Make the step 100% width/height
            step.style.width = "100%";
            step.style.height = "100%";
            step.style.position = "absolute";
            step.style.whiteSpace = "normal";

            // Move all steps to "seq-out"
            step.style.left = "100%";
          }
        }
      },

      /**
       * Move the canvas using basic animation
       *
       * @param {HTMLElement} nextStepElement - The element that is the next step
       * @param {HTMLElement} currentStepElement - The element that is the current step
       * @param {Number} direction - The direction to animate in
       * @param {Boolean} animate - Show the canvas animate or snap?
       */
      moveCanvas: function(nextStepElement, currentStepElement, direction, animate) {

        // Animate steps
        if (animate === true) {

          var currentFrom = 0,
              currentTo = -100,
              nextFrom = 100,
              nextTo = 0;

          if (direction === -1) {
            currentTo = 100;
            nextFrom = -100;
          }

          this.animate(currentStepElement, "left", "%", currentFrom, currentTo, self.options.fallback.speed);
          this.animate(nextStepElement, "left", "%", nextFrom, nextTo, self.options.fallback.speed);
        }

        // Snap steps into place
        else {

          currentStepElement.style.left = "-100%";
          nextStepElement.style.left = "0";
        }
      },

      /**
       * Go to a step using basic animation
       *
       * @param {Number} id - The ID of the step to go to
       * @param {String} currentStep - The name of the current step
       * @param {HTMLElement} currentStepElement - The element that is the current step
       * @param {String} nextStep - The name of the next step
       * @param {HTMLElement} nextStepElement - The element that is the next step
       * @param {Number} direction - The direction of navigation
       * @param {Boolean} hashTagNav - If navigation is triggered by the hashTag
       */
      goTo: function(id, currentStep, currentStepElement, nextStep, nextStepElement, direction, hashTagNav) {

        var from;

        // The next ID is now the current ID
        self.prevStepId = self.currentStepId;
        self.currentStepId = id;

        // Update the hashTag if being used
        if (hashTagNav === undefined) {
          self.hashTags.update();
        }

        self.pagination.update();

        // When should the "seq-in" phase start and how long until the step
        // completely finishes animating?
        if (self.firstRun === false) {

          this.moveCanvas(nextStepElement, currentStepElement, direction, true);

          // Sequence is now animating
          self.isAnimating = true;

          // Callback
          self.animationStarted(self.currentStepId, self);

          // Wait for the step (both phases) to finish animating
          self.stepEndedTimer = setTimeout(function() {

            self.animation.stepEnded(self.currentStepId);
          }, self.options.fallback.speed);
        }

        // This is the first step we're going to
        else {

          this.moveCanvas(nextStepElement, currentStepElement, direction, false);
          self.firstRun = false;

          if (self.options.autoPlay === true) {
            self.autoPlay.start(true);
          }
        }
      }
    };

    /**
     * Manage pagination
     */
    self.pagination = {

      /**
       * Get the links from each pagination element (any top level elements)
       *
       * @param {HTMLElement} element - The pagination element
       * @param {String} rel - Which Sequence element the pagination relates
       * to (if any)
       * @param {Number} i - The number of the pagination element
       * @returns {Array} paginationLinks - Each link in an array
       */
      getLinks: function(element, rel) {

        var childElement,
            childElements = element.childNodes,
            childElementsLength = childElements.length,
            paginationLinks = [],
            i;

        // Get each top level pagination link and add it to the array
        for (i = 0; i < childElementsLength; i++) {

          childElement = childElements[i];

          if (childElement.nodeType === 1) {
            paginationLinks.push(childElement);
          }
        }

        return paginationLinks;
      },

      /**
       * Update the pagination to activate the relevant link
       *
       * @returns {Array} - the pagination element(s) that are currently active
       */
      update: function() {

        if(self.$pagination.elements !== undefined) {

          var i,
              j,
              id = self.currentStepId - 1,
              currentPaginationLink,
              currentPaginationLinksLength,
              paginationLength = self.$pagination.elements.length;

          // Remove the "seq-current" class from a previous pagination link
          // if there is one
          if (self.$pagination.currentLinks !== undefined) {

            currentPaginationLinksLength = self.$pagination.currentLinks.length;

            for (i = 0; i < currentPaginationLinksLength; i++) {

              currentPaginationLink = self.$pagination.currentLinks[i];
              removeClass(currentPaginationLink, "seq-current");
            }
          }

          // Where we'll save the current pagination links
          self.$pagination.currentLinks = [];

          // Get the current pagination link from each pagination element,
          // add the "seq-current" class to them, then save them for later
          // for when they need to have the "seq-current" class removed
          for (j = 0; j < paginationLength; j++) {

            currentPaginationLink = self.$pagination.links[j][id];
            self.$pagination.currentLinks.push(currentPaginationLink);

            addClass(currentPaginationLink, "seq-current");
          }
        }

        return self.$pagination.currentLinks;
      }
    };

    /**
     * Manage Sequence hashTag support
     */
    self.hashTags = {

      /**
       * Set up hashTags
       *
       * @param {Number} id - The id of the first step
       * @returns {Number} id - The id of the first step (hashTags.init() will
       * override this if an entering URL contains a hashTag that corresponds
       * to a step)
       */
      init: function(id) {

        if (self.options.hashTags === true) {

          var correspondingStepId,
              newHashTag;

          // Does the browser support pushstate?
          self.hasPushstate = !!(window.history && history.pushState);

          // Get the current hashTag
          newHashTag = location.hash.replace("#!", "");

          // Get each step's hashTag
          self.stepHashTags = this.getStepHashTags();

          // If there is a hashTag but no value, don't go any further
          if (newHashTag !== "") {

            // Get the current hashTag's step ID's
            self.currentHashTag = newHashTag;
            correspondingStepId = this.hasCorrespondingStep(self.currentHashTag);

            // If the entering URL contains a hashTag, and the hashTag relates to
            // a corresponding step, the step's ID will override the startStepId
            // defined in options
            if (correspondingStepId > -1) {
              id = correspondingStepId + 1;
            }
          }
        }

        // Return either the startingStepId as defined in settings or if the
        // entering URL contained a hashTag that corresponds to a step, return
        // its ID instead
        return id;
      },

      /**
       * Does a hashTag have a corresponding step?
       *
       * @returns {Number} correspondingStep - The step ID relating to the hashTag or -1 meaning there is no correspondingStep
       */
      hasCorrespondingStep: function(hashTag) {

        var correspondingStep = -1,
            correspondingStepId = self.stepHashTags.indexOf(hashTag);

        if (correspondingStepId > -1) {
          correspondingStep = correspondingStepId;
        }

        return correspondingStep;
      },

      /**
       * Get each steps hashTag to return an array of hashTags
       *
       * @returns {Array} stepHashTags - An array of hashTags
       */
      getStepHashTags: function() {

        var i,
            elementHashTag,
            stepHashTags = [];

        // Get each steps hashtag
        for (i = 0; i < self.noOfSteps; i++) {

          elementHashTag = (self.options.hashDataAttribute === false) ? self.$steps[i].id: self.$steps[i].getAttribute("data-seq-hashtag");

          // Add the hashtag to an array
          stepHashTags.push(elementHashTag);
        }

        return stepHashTags;
      },

      /**
       * Update the hashTag if:
       *
       * - hashTags are being used and this isn't the first run
       * - hashTags are being used, this is the first run, and the first hash
       *   change is allowed in the options
       * - the current step has a hashTag
       */
      update: function() {

        if (self.options.hashTags === true && self.firstRun === false || (self.options.hashTags === true && self.firstRun === true && self.options.hashChangesOnFirstStep === true)) {

          // Zero-base the currentStepId
          var hashTagId = self.currentStepId - 1;

          // Get the current hashTag
          self.currentHashTag = self.stepHashTags[hashTagId];

          if (self.currentHashtag !== "") {

            // Add the hashTag to the URL
            if (self.hasPushstate === true) {
              history.pushState(null, null, "#!" + self.currentHashTag);
            }
            else {
              location.hash = "#!" + self.currentHashTag;
            }
          }
        }
      },

      /**
       * Cross Browser helper for an hashchange event
       * Source: http://stackoverflow.com/questions/9339865/get-the-hashchange-event-to-work-in-all-browsers-including-ie7/
       */
      setupEvent: function() {

        if ('onhashchange' in window) {

          if (window.addEventListener) {

            window.addHashChange = function(func, before) {
              window.addEventListener('hashchange', func, before);
            };

            window.removeHashChange = function(func) {
              window.removeEventListener('hashchange', func);
            };

            return;

          } else if (window.attachEvent) {

            window.addHashChange = function(func) {
              window.attachEvent('onhashchange', func);
            };

            window.removeHashChange = function(func) {
              window.detachEvent('onhashchange', func);
            };

            return;
          }
        }

        var hashChangeFuncs = [];
        var oldHref = location.href;

        window.addHashChange = function(func, before) {
          if (typeof func === 'function') {
            hashChangeFuncs[before?'unshift':'push'](func);
          }
        };

        window.removeHashChange = function(func) {
          for (var i=hashChangeFuncs.length-1; i>=0; i--) {
            if (hashChangeFuncs[i] === func) {
              hashChangeFuncs.splice(i, 1);
            }
          }
        };

        setInterval(function() {
          var newHref = location.href;
          if (oldHref !== newHref) {
            var _oldHref = oldHref;
            oldHref = newHref;
            for (var i=0; i<hashChangeFuncs.length; i++) {
              hashChangeFuncs[i].call(window, {
                'type': 'hashchange',
                'newURL': newHref,
                'oldURL': _oldHref
              });
            }
          }
        }, 100);
      }
    };

    /**
     * Manage Sequence preloading
     */
    self.preload = {

      // Sequence's default HTML for the preloader
      defaultHtml: '<svg width="39" height="16" viewBox="0 0 39 16" xmlns="http://www.w3.org/2000/svg" class="seq-preload-indicator"><title>Sequence.js Preloading Indicator</title><desc>Three orange dots increasing in size from left to right</desc><g fill="#F96D38"><path class="seq-preload-circle seq-preload-circle-1" d="M3.999 12.012c2.209 0 3.999-1.791 3.999-3.999s-1.79-3.999-3.999-3.999-3.999 1.791-3.999 3.999 1.79 3.999 3.999 3.999z"/><path class="seq-preload-circle seq-preload-circle-2" d="M15.996 13.468c3.018 0 5.465-2.447 5.465-5.466 0-3.018-2.447-5.465-5.465-5.465-3.019 0-5.466 2.447-5.466 5.465 0 3.019 2.447 5.466 5.466 5.466z"/><path class="seq-preload-circle seq-preload-circle-3" d="M31.322 15.334c4.049 0 7.332-3.282 7.332-7.332 0-4.049-3.282-7.332-7.332-7.332s-7.332 3.283-7.332 7.332c0 4.05 3.283 7.332 7.332 7.332z"/></g></svg>',

      fallbackHtml: '<div class="seq-preload-indicator seq-preload-indicator-fallback"><div class="seq-preload-circle seq-preload-circle-1"></div><div class="seq-preload-circle seq-preload-circle-2"></div><div class="seq-preload-circle seq-preload-circle-3"></div></div>',

      // Sequence's default preloader styles and animation for the preloader
       defaultStyles: '@'+prefixTranslations.animation[Modernizr.prefixed("animation")]+'keyframes seq-preloader {50% {opacity: 1;}100% {opacity: 0;}}.seq-preloader {background: white;visibility: visible;opacity: 1;position: absolute;z-index: 9999;height: 100%;width: 100%;top: 0;left: 0;right: 0;bottom: 0;} .seq-preloader.seq-preloaded {opacity: 0;visibility: hidden;'+Modernizr.prefixed("transition")+': visibility 0s .5s, opacity .5s;}.seq-preload-indicator {overflow: visible;position: relative;top: 50%;left: 50%;-webkit-transform: translate(-50%, -50%);transform: translate(-50%, -50%);}.seq-preload-circle {display: inline-block;height: 12px;width: 12px;fill: #F96D38;opacity: 0;'+prefixTranslations.animation[Modernizr.prefixed("animation")]+'animation: seq-preloader 1.25s infinite;}.seq-preload-circle-2 {'+prefixTranslations.animation[Modernizr.prefixed("animation")]+'animation-delay: .15s;}.seq-preload-circle-3 {'+prefixTranslations.animation[Modernizr.prefixed("animation")]+'animation-delay: .3s;}.seq-preload-indicator-fallback{width: 42px;margin-left: -21px;overflow: visible;}.seq-preload-indicator-fallback .seq-preload-circle {width: 8px; height:8px;background-color: #F96D38;border-radius: 100%; opacity: 1;display: inline-block; vertical-align: middle;}.seq-preload-indicator-fallback .seq-preload-circle-2{margin-left: 3px; margin-right: 3px; width: 12px; height: 12px;}.seq-preload-indicator-fallback .seq-preload-circle-3{width: 16px; height: 16px;}',

      /**
       * Setup Sequence preloading
       *
       * @param {Function} callback - Function to execute when preloading has finished
       * @returns {Boolean} Whether preload was initiated
       */
      init: function(callback) {

        if (self.options.preloader !== false) {

          var preload = this,
              stepImagesToPreload,
              individualImagesToPreload,
              imagesToPreload,
              imgLoad,
              progress,
              result;

          // Add a class of "seq-preloading" to the Sequence element
          addClass(self.$container, "seq-preloading");

          // Get the preloader
          self.$preloader = self.ui.getElements("preloader", self.options.preloader);

          // Add the preloader element if necessary
          preload.append();

          // Add the preloader's default styles
          preload.addStyles();

          // Hide steps if necessary
          preload.toggleStepsVisibility("hide");

          // Get images from particular Sequence steps to be preloaded
          // Get images with specific source values to be preloaded
          stepImagesToPreload = preload.getImagesToPreload(self.options.preloadTheseSteps);
          individualImagesToPreload = preload.getImagesToPreload(self.options.preloadTheseImages, true);

          // Combine step images and individual images
          imagesToPreload = stepImagesToPreload.concat(individualImagesToPreload);

          // Initiate the imagesLoaded plugin
          imgLoad = imagesLoaded(imagesToPreload);

          // When imagesLoaded() has finished (regardless of whether images
          // completed or failed to load)
          imgLoad.on("always", function(instance) {
            preload.complete(callback);
          });

          // Track the number of images that have loaded so far
          progress = 1;

          imgLoad.on("progress", function(instance, image) {

            // Has the image loaded or is it broken?
            result = image.isLoaded ? 'loaded': 'broken';

            // Callback
            self.preloadProgress(result, image.img.src, progress++, imagesToPreload.length, self);
          });

          return true;
        }

        return false;
      },

      /**
       * When preloading has finished, show the steps again and hide the preloader
       *
       * @param {Function} callback - Function to execute when preloading has finished
       */
      complete: function(callback) {

        // Callback
        self.preloaded(self);

        // (Debugging only) prevent the preloader from hiding so it's styles
        // can be tested
        if (self.options.pausePreloader === true) {
          return;
        }

        // Show steps if necessary
        this.toggleStepsVisibility("show");

        // Remove the "preloading" class and add the "preloaded" class
        removeClass(self.$container, "seq-preloading");
        addClass(self.$container, "seq-preloaded");
        addClass(self.$preloader[0], "seq-preloaded");

        if (this.preloadIndicatorTimer !== undefined) {
          clearInterval(this.preloadIndicatorTimer);
        }

        // Remove the fallback preloader
        if (Modernizr.prefixed("animation") === false || Modernizr.svg === false) {
          self.$preloader[0].style.display = "none";
        }

        if (callback !== undefined) {
          callback();
        }
      },

      /**
       * Add the preloader's styles to the <head></head>
       */
      addStyles: function() {

        if (self.options.preloader === true) {

          // Get the <head> and create the <style> element
          var head = document.head || document.getElementsByTagName('head')[0];
          this.styleElement = document.createElement('style');

          // Add the default styles to the <style> element
          this.styleElement.type = 'text/css';
          if (this.styleElement.styleSheet) {
            this.styleElement.styleSheet.cssText = this.defaultStyles;
          } else {
            this.styleElement.appendChild(document.createTextNode(this.defaultStyles));
          }

          // Add the <style> element to the <head>
          head.appendChild(this.styleElement);

          // Animate the preloader using JavaScript if the browser doesn't support SVG
          if (Modernizr.prefixed("animation") === false || Modernizr.svg === false) {

            // Get the preload indicator
            var preloadIndicator = self.$preloader[0].firstChild;

            var indicatorFlash = function() {
              preloadIndicator.style.visibility = "hidden";
              preloadFlashTime = 1000;
              setTimeout(function() {
                preloadIndicator.style.visibility = "visible";
              }, 500);
            };

            indicatorFlash();

            // Make the preload indicator flash
            this.preloadIndicatorTimer = setInterval(function() {
              indicatorFlash();
            }, 1000);
          }

          return true;
        }

        return false;
      },

      /**
       * Remove the preloader's styles from the <head></head>
       */
      removeStyles: function() {

        this.styleElement.parentNode.removeChild(this.styleElement);
      },

      /**
       * Get <img> elements and return them to be preloaded. Elements can be got
       * either via the <img> element itself or a src attribute.
       *
       * @param {Array} elements - An integer array of steps to get images from or a string array of image sources
       * @param {Boolean} srcOnly - Is the element to be retrieved via the src?
       * @returns {Array} imagesToPreload - The images to preload in an array
       */
      getImagesToPreload: function(elements, srcOnly) {

        // Where we'll save the images
        var imagesToPreload = [];

        if (isArray(elements) === true) {

          var i,
              j,
              elementLength = elements.length,
              step,
              imagesInStep,
              imagesInStepLength,
              image,
              img,
              src;

          // Get each step's <img> elements and add them to imagesToPreload
          if (srcOnly !== true) {

            // Get each step
            for (i = 0; i < elementLength; i++) {

              // Get the step and any images belonging to it
              step = self.$steps[i];
              imagesInStep = step.getElementsByTagName("img");
              imagesInStepLength = imagesInStep.length;

              // Get each image within the step
              for (j = 0; j < imagesInStepLength; j++) {

                image = imagesInStep[j];
                imagesToPreload.push(image);
              }
            }
          }

          // Get each step's <img> elements via the src and add them to imagesToPreload
          else {

            img = [];

            for (i = 0; i < elementLength; i++) {
              src = elements[i];

              img[i] = new Image();
              img[i].src = src;

              imagesToPreload.push(img[i]);
            }
          }
        }

        return imagesToPreload;
      },

      /**
       * Append the default preloader
       *
       * @returns {Boolean} whether the default preloader was appended or not
       */
      append: function() {

        if (self.options.preloader === true) {

          // Set up the preloader container
          self.$preloader = document.createElement("div");
          self.$preloader.className = "seq-preloader";

          // Convert the preloader to an array
          self.$preloader = [self.$preloader];

          // Use the fallback preloader if CSS keyframes or SVG aren't supported
          if (Modernizr.prefixed("animation") !== false && Modernizr.svg === true) {
            self.$preloader[0].innerHTML = self.preload.defaultHtml;
          } else {
            self.$preloader[0].innerHTML = self.preload.fallbackHtml;
          }

          // Add the preloader
          self.$container.insertBefore(self.$preloader[0], null);

          return true;
        }

        return false;
      },

      /**
       * If enabled, hide/show Sequence steps until preloading has finished
       *
       * @param {String} type - "show" or "hide"
       */
      toggleStepsVisibility: function(type) {

        if (self.options.hideStepsUntilPreloaded === true) {

          var i,
              step;

          // Hide or show each step
          for (i = 0; i < self.noOfSteps; i++) {
            step = self.$steps[i];

            if (type === "hide") {
              self.ui.hide(step, 0);
            }else {
              self.ui.show(step, 0);
            }

          }

          return true;
        }

        return false;
      }
    };

    /**
     * Add and remove Sequence events
     */
    self.manageEvents = {

      // Keep track of the added events here
      list: {
        "load": [],
        "click": [],
        "touchstart": [],
        "mousemove": [],
        "mouseleave": [],
        "hammer": [],
        "keyup": [],
        "hashchange": [],
        "resize": []
      },

      /**
       * Set up events on init
       */
      init: function() {

        // Add visibilityChange to the list of events
        self.manageEvents.list[visibilityChange] = [];

        if (self.options.hashTags === true) {
          this.add.hashChange();
        }

        if (self.options.swipeNavigation === true) {
          this.add.swipeNavigation();
        } else {
          self.hammerTime = false;
        }

        if (self.options.keyNavigation === true) {
          this.add.keyNavigation();
        }

        // Throttles the resize event to once every 100ms
        this.add.resizeThrottle();

        // Used to start/stop Sequence when page visibility changes
        this.add.pageVisibility();

        // If being used, get the next button(s) and set up the events
        if (self.options.nextButton !== false) {
          self.$next = self.ui.getElements("nextButton", self.options.nextButton);
          this.add.button(self.$next, "nav", self.next);
        }

        // If being used, get the next button(s) and set up the events
        if (self.options.prevButton !== false) {
          self.$prev = self.ui.getElements("prevButton", self.options.prevButton);
          this.add.button(self.$prev, "nav", self.prev);
        }

        // If being used, get the autoPlay button(s) and set up the events
        if (self.options.autoPlayButton !== false) {
          self.$autoPlay = self.ui.getElements("autoPlayButton", self.options.autoPlayButton);
          this.add.button(self.$autoPlay, "nav", self.toggleAutoPlay);
        }

        // If being used, set up the stopOnHover event
        this.add.stopOnHover();

        // If being used, get the pagination element(s) and set up the events
        if (self.options.pagination !== false) {

          self.$pagination = {};

          // The Sequence element and the links that will control it
          self.$pagination.relatedElementId = instance;
          self.$pagination.links = [];

          self.$pagination.elements = self.ui.getElements("pagination", self.options.pagination);

          this.add.button(self.$pagination.elements, "pagination");
        }

        return null;
      },

      /**
       * Remove all events at once
       */
      removeAll: function(eventList) {

        var eventType,
            theEvents;

        // Remove each event
        for (eventType in eventList) {
          if (eventList.hasOwnProperty(eventType) === true) {

            theEvents = eventList[eventType];

            this.remove(eventType);
          }
        }

        return null;
      },

      /**
       * Remove an event from all of the elements it is attached to
       *
       * @param {String} type - The type of event to remove eg. "click"
       */
      remove: function(type) {

        // Get the elements using the event and count them
        var eventElements = self.manageEvents.list[type];
        var eventElementsLength = eventElements.length;

        switch(type) {

          case "hashchange":
            if (self.options.hashTags === true) {
              removeHashChange(eventElements[0].handler);
            }
          break;

          case "hammer":

            if (self.manageEvents.list.hammer.length > 0 && document.querySelectorAll !== undefined) {

              var handler = self.manageEvents.list.hammer[0].handler;
              self.hammerTime.off("swipe", [handler]);
            }
          break;

          default:

            // Remove the event from each element
            for (var i = 0; i < eventElementsLength; i++) {
              var eventProperties = eventElements[i];

              removeEvent(eventProperties.element, type, eventProperties.handler);
            }
        }
      },

      add: {

        /**
         * Add the hashchange event
         *
         * @returns {Array} Containing an object with the element and handler
         */
        hashChange: function() {

          // Setup the cross-browser hashchange event
          self.hashTags.setupEvent();

          var handler = function(e) {

            var newHashTag,
                id;

            // Get the hashTag from the URL
            newHashTag = e.newURL || location.href;
            newHashTag = newHashTag.split("#!")[1];

            // Go to the new step if we're not already on it
            if (self.currentHashTag !== newHashTag) {

              // Get the ID of the new hash tag and one-base it
              id = self.stepHashTags.indexOf(newHashTag) + 1;

              self.currentHashTag = newHashTag;

              /**
               * Go to the new step
               *
               * Note: When the user is navigating through history via their
               * browser's back/forward buttons for example, we can't prevent
               * going to a step to meet the navigationSkipThreshold option. To
               * prevent the hashTag and the current step from becoming
               * unsynchronized we must ignore the navigationSkipThreshold
               * setting.
               */
              self.goTo(id, undefined, undefined, true);
            }
          };

          addHashChange(handler);

          self.manageEvents.list.hashchange.push({"element": window, "handler": handler});

          return self.manageEvents.list.hashchange;
        },

        /**
         * Add  buttons
         *
         * @param {Array} elements - The element or elements acting as the next button
         * @param {String} type - The type of button being added - "nav" or "pagination"
         * @param {Function} callback - Function to execute when the button is clicked
         * @returns {Array} Containing an object with the element and handler
         */
        button: function(elements, type, callback) {

          // Count the number of elements being added
          var elementsLength = elements.length,
              handler,
              element,
              targetElement,
              buttonEvent,
              parent,
              rel,
              id,
              i;

          switch (type) {

            // Set up a click event for navigation elements
            case "nav":

              buttonEvent = function(element) {

                handler = addEvent(element, "click", function(event) {

                  if (!event) {
                    event = window.event;
                  }

                  // Prevent the default action - this is so <a href="#step1">
                  // can act as a navigation element but the anchor link will
                  // only activate when JS is disabled
                  if (event.preventDefault) {
                    event.preventDefault();
                  } else {
                    event.returnValue = false;
                  }

                  callback();
                });
              };
              break;

            // Set up a click event for pagination
            case "pagination":

              buttonEvent = function(element, rel) {

                handler = addEvent(element, "click", function(event, element) {

                  if (!event) {
                    event = window.event;
                  }

                  // Prevent the default action - this is so <a href="#step1">
                  // can act as a pagination element but the anchor link will
                  // only activate when JS is disabled
                  if (event.preventDefault) {
                    event.preventDefault();
                  } else {
                    event.returnValue = false;
                  }

                  var targetElement = event.target || event.srcElement;

                  parent = this;

                  // Get the ID of the clicked pagination link
                  id = hasParent(parent, targetElement);

                  // Go to the clicked pagination ID
                  self.goTo(id);
                });

                // Save the pagination links
                self.$pagination.links.push(self.pagination.getLinks(element, rel));
              };
              break;
          }

          // Add a click event for each element
          for (i = 0; i < elementsLength; i++) {
            element = elements[i];

            // Does the button control a specific Sequence instance?
            rel = element.getAttribute("rel");

            // The button controls one Sequence instance
            // (defined via the rel attribute)
            if (rel === self.$container.id && element.getAttribute("data-seq-button") === null) {

              element.setAttribute("data-seq-button", true);
              buttonEvent(element, rel);
            }

            // The button controls all Sequence instances
            else if (rel === null && element.getAttribute("data-seq-button") === null) {

              buttonEvent(element, rel);
            }

            // Save the element and its handler for later, should it need to
            // be removed
            self.manageEvents.list.click.push({"element": element, "handler": handler});
          }

          return self.manageEvents.list.click;
        },

        /**
         * Stop and start autoPlay when the user's cursor enters and leaves
         * the Sequence element accordingly.
         *
         * Note: autoPlay will be stopped only when the cursor is inside the
         * boundaries of the Sequence element, either on the element itself or
         * its children. Child elements overflowing the Sequence element will
         * not cause Sequence to be stopped.
         */
        stopOnHover: function() {

          var previouslyInside = false,
              touchHandler,
              handler;

          self.isMouseOver = false;

          /**
           * Determine when the user touches the container. This is so we can
           * disable the use of stopOnHover for touches, but not for mousemove
           */
          touchHandler = addEvent(self.$container, "touchstart", function(e) {

            self.isTouched = true;
          });

          // Save the event
          self.manageEvents.list.touchstart.push({"element": self.$container, "handler": touchHandler});

          /**
           * Stop autoPlay only when the cursor is inside the boundaries of the
           * Sequence element
           */
          handler = addEvent(self.$container, "mousemove", function(e) {

            e = e || window.event;

            // If the user touched the container, don't stop - stopOnHover
            // should only occur when a mouse cursor is used
            if (self.isTouched === true) {
              self.isTouched = false;
              return;
            }

            // Is the cursor inside the Sequence element?
            if (insideElement(self.$container, e) === true) {

              // Pause if the cursor was previously outside the Sequence element
              if (self.options.autoPlayPauseOnHover === true && self.isMouseOver === false) {
                self.autoPlay.pause();
              }

              // We're now inside the Sequence element
              self.isMouseOver = true;
            }

            // The cursor is outside of the main container, but over child
            // elements belonging to the container
            else {

              // Unpause if the cursor was previously inside the Sequence element
              if (self.options.autoPlayPauseOnHover === true && self.isMouseOver === true) {
                self.autoPlay.unpause();
              }

              // We're now outside the Sequence element
              self.isMouseOver = false;
            }
          });

          // Save the event
          self.manageEvents.list.mousemove.push({"element": self.$container, "handler": handler});

          /**
           * Start autoPlay when the cursor leaves the Sequence element
           */
          handler = addEvent(self.$container, "mouseleave", function(e) {

            if (self.options.autoPlayPauseOnHover === true) {
              self.autoPlay.unpause();
            }

            // We're now outside the Sequence element
            self.isMouseOver = false;
          });

          // Save the event
          self.manageEvents.list.mouseleave.push({"element": self.$container, "handler": handler});

          return null;
        },

        /**
         * Navigate to a step when Sequence is swiped
         */
        swipeNavigation: function() {

          // Don't use swipe navigation if the browser doesn't support
          // addEventListener (Hammer.js needs it)
          if (window.addEventListener === undefined) {
            self.hammerTime = false;
            return;
          }

          var hammerDirection,
              handler;

          if (typeof Hammer === "function") {

            handler = function(e) {

              switch(e.direction) {

                // Left
                case 2:
                  self.options.swipeEvents.left(self);
                break;

                // Right
                case 4:
                  self.options.swipeEvents.right(self);
                break;

                // Up
                case 8:
                  self.options.swipeEvents.up(self);
                break;

                // Down
                case 16:
                  self.options.swipeEvents.down(self);
                break;
              }
            };

            // Set up the swipe event
            self.hammerTime = new Hammer(self.$container).on("swipe", handler);

            // Set Hammer's Swipe options
            self.hammerTime.get("swipe").set(self.options.swipeHammerOptions);

            // determine the Hammer direction that needs to be set based on the
            // swipe directions being used (hammerjs.github.io/api/#directions)
            hammerDirection = getHammerDirection(self.options.swipeEvents);
            self.hammerTime.get("swipe").set({direction: hammerDirection});

            self.manageEvents.list.hammer.push({"element": self.$container, "handler": handler});
          }
        },

        /**
         * Navigate to a step when corresponding keys are pressed
         */
        keyNavigation: function() {

          var handler = addEvent(document, "keyup", function(event) {

            if (!event) {
              event = window.event;
            }

            // Get the key pressed
            var keyCodeChar = parseInt(String.fromCharCode(event.keyCode));

            // Go to the numeric key pressed
            if ((keyCodeChar > 0 && keyCodeChar <= self.noOfSteps) && (self.options.numericKeysGoToSteps)) {
              self.goTo(keyCodeChar);
            }

            // When left/right arrow keys are pressed, go to prev/next steps
            switch(event.keyCode) {
              case 37:
                self.options.keyEvents.left(self);
              break;

              case 39:
                self.options.keyEvents.right(self);
              break;
            }
          });

          self.manageEvents.list.keyup.push({"element": document, "handler": handler});
        },

        /**
         * Throttle the window resize event so it only occurs every x amount of
         * milliseconds, as defined by the resizeThreshold global variable.
         */
        resizeThrottle: function() {

          // Events to be executed when the throttled window resize occurs
          function throttledEvents() {

            // Use a delay to give the browser a chance to repaint before
            // getting transform properties
            setTimeout(function() {
              self.canvas.getTransformProperties();

              /**
               * Snap to the currently active step
               *
               * Assume the canvas is laid out in a 2 x 2 grid, the Sequence
               * element has a height of 100%, and the user is viewing the second
               * row of steps -- when the user resizes the window, the second row
               * of steps will no longer be positioned perfectly in the window.
               * This event will immediately snap the canvas back into place.
               */
              if (self.propertySupport.transitions === true) {
                self.canvas.move(self.currentStepId, false);
              }
            }, 500);

            // Callback
            self.throttledResize(self);
          }

          /**
           * Throttle the resize event to only execute throttledEvents() every
           * 100ms. This is so not too many events occur during a resize. The
           * threshold can be changed using the resizeThreshold global variable.
           */
          var throttleTimer,
              handler;

          handler = addEvent(window, "resize", function(e) {

            clearTimeout(throttleTimer);
            throttleTimer = setTimeout(throttledEvents, resizeThreshold);
          });

          self.manageEvents.list.resize.push({"element": window, "handler": handler});
        },

        /**
         * When the page loses visibility, pause autoPlay, then unpause when
         * the page gains visibility again
         */
        pageVisibility: function() {

          var handler = addEvent(document, visibilityChange, function() {

            if (document[hidden]) {

              self.autoPlay.pause();
            } else {

              self.autoPlay.unpause();
            }
          }, false);

          self.manageEvents.list[visibilityChange].push({"element": document, "handler": handler});
        }
      }
    };

    /**
     * Set up an instance of Sequence
     *
     * @param {Object} element - The element Sequence is attached to
     */
    self.init = function(element) {

      var id,
          prevStep,
          prevStepId,
          transformProperties,
          goToFirstStep;

      // Merge developer options with defaults
      self.options = extend(defaults, options);

      self.isAnimating = false;
      self.isReady = false;

      // Get the element Sequence is attached to, the screen,
      // the canvas and it's steps
      self.$container = element;
      self.$screen = self.$container.querySelectorAll(".seq-screen")[0];
      self.$canvas = self.$container.querySelectorAll(".seq-canvas")[0];
      self.$steps = self.canvas.getSteps(self.$canvas);

      // Count number of steps
      self.noOfSteps = self.$steps.length;

      self.phasesAnimating = 0;
      self.phasesSkipped = [];

      // Add classes to the Sequence container that represent features supported
      addFeatureSupportClasses(self.$container, Modernizr);

      // Get the first step's ID
      id = self.options.startingStepId;

      addClass(self.$container, "seq-active");

      // Find out what properties the browser supports
      // and whether Sequence should go into fallback mode
      self.propertySupport = self.animation.getPropertySupport();
      self.isFallbackMode = self.animation.requiresFallbackMode(self.propertySupport);

      // Set up the canvas and screen with the necessary CSS properties
      self.canvas.init(id);

      // Remove the no-JS "seq-in" class from a step
      self.canvas.removeNoJsClass(self);

      // Set up events
      self.manageEvents.init();

      // Set up autoPlay
      self.autoPlay.init();

      // On the first run, we need to treat the animation a little differently
      self.firstRun = true;

      // Set up hashTag support if being used and override the first ID if there
      // is a hashTag in the entering URL that has a corresponding step
      id = self.hashTags.init(id);

      // Get the previous step ID
      if (self.options.autoPlayDirection === 1) {
        prevStepId = id - 1;
        self.prevStepId = (prevStepId < 1) ? self.noOfSteps: prevStepId;
      } else {
        prevStepId = id + 1;
        self.prevStepId = (prevStepId > self.noOfSteps) ? 1: prevStepId;
      }

      // Get the previous step and next step
      self.currentStepId = self.prevStepId;
      prevStep = self.prevStepId;

      // If the browser doesn't support CSS transitions, setup the fallback
      self.animationFallback.setupCanvas(id);

      goToFirstStep = function() {

        self.animation.domDelay(function() {

          // Snap the previous step into position
          self.animation.domDelay(function() {
            self.animation.resetInheritedSpeed(prevStep);
          });

          self.isReady = true;

          // Callback
          self.ready(self);

          // Go to the first step
          self.goTo(id, self.options.autoPlayDirection, true);
        });
      };

      // Set up preloading if required, then go to the first step
      if (self.options.preloader !== false && document.querySelectorAll !== undefined && typeof imagesLoaded === "function") {

        self.preload.init(function() {
          goToFirstStep();
        });
      } else {
        goToFirstStep();
      }
    };

    /**
     * Destroy an instance of Sequence
     *
     * @returns {Boolean}
     */
    self.destroy = function() {

      var i,
          step,
          lastStep;

      // Stop autoPlay
      self.autoPlay.stop();

      // Stop timers
      clearTimeout(self.autoPlayTimer);
      clearTimeout(self.phaseThresholdTimer);
      clearTimeout(self.stepEndedTimer);
      clearTimeout(self.currentPhaseEndedTimer);
      clearTimeout(self.nextPhaseStartedTimer);
      clearTimeout(self.nextPhaseEndedTimer);
      clearTimeout(self.fadeStepTimer);
      clearTimeout(self.hideTimer);
      clearTimeout(self.navigationSkipThresholdTimer);

      // Remove all events
      self.manageEvents.removeAll(self.manageEvents.list);

      // Remove classes
      removeClass(self.$pagination.currentLinks, "seq-current");
      removeClass(self.$container, "seq-step" + self.currentStepId);
      removeClass(self.$container, "seq-active");

      // Remove styles
      self.$container.removeAttribute("style");
      if (self.$screen !== undefined) {
        self.$screen.removeAttribute("style");
      }
      self.$canvas.removeAttribute("style");

      // Remove styles from steps and snap them to their "seq-out" position
      for (i = 0; i < self.noOfSteps; i++) {
        step = self.$steps[i];

        step.removeAttribute("style");
        self.animation.resetInheritedSpeed(i + 1);
        removeClass(step, "seq-in");
        removeClass(step, "seq-out");
      }

      // Snap the starting step back into its "seq-in" position
      lastStep = self.$steps[self.options.startingStepId - 1];
      self.animation.resetInheritedSpeed(self.options.startingStepId);
      addClass(lastStep, "seq-in");

      // Allow the same element to have Sequence initated on it in the future
      element.removeAttribute("data-seq-enabled");

      // Callback
      self.destroyed(self);

      // Finally, clear the instance's properties and methods
      self = null;

      return self;
    };

    /**
     * Go to the next step
     *
     * @returns {Number | false} The ID of the next step Sequence will
     * navigate to or false if next() is prevented because the current step is
     * the last and the cycle option is disabled
     */
    self.next = function() {

      var nextStepId = self.currentStepId + 1;

      // Cycle to the first step if on the current step and cycle is enabled
      if (nextStepId > self.noOfSteps && self.options.cycle === false) {
        return false;
      } else if (nextStepId > self.noOfSteps) {
        nextStepId = 1;
      }

      self.goTo(nextStepId);

      return nextStepId;
    };

    /**
     * Go to the previous step
     *
     * @returns {Number | false} The ID of the previous step Sequence will
     * navigate to or false if prev() is prevented because the current step is
     * the first and the cycle option is disabled
     */
    self.prev = function() {

      var prevStepId = self.currentStepId - 1,
          direction;

      if (prevStepId < 1 && self.options.cycle === false) {
        return false;
      } else if (prevStepId < 1) {
        prevStepId = self.noOfSteps;
      }

      if (self.options.reverseWhenNavigatingBackwards === true) {
        direction = -1;
      }

      self.goTo(prevStepId, direction);

      return prevStepId;
    };

    /**
     * Stop and start Sequence's autoPlay feature
     *
     * @param {Boolean/Number} delay - Whether a delay should be applied before
     * starting autoPlay (true = same amount as options.autoPlayInterval,
     * false = no delay, number = custom delay period). Applied to
     * autoPlay.start()
     * @returns {Boolean} isAutoPlaying - true if autoPlay was started, false if stopped
     */
    self.toggleAutoPlay = function(delay) {

      if (self.isAutoPlaying === false) {
        self.start(delay);
      } else {
        self.stop();
      }

      return self.isAutoPlaying;
    };

    self.stop = function() {

      self.autoPlay.stop();
    };

    self.start = function(delay) {

      self.autoPlay.start(delay);
    };

    /**
     * Go to a specific step
     *
     * @param {Number} id - The ID of the step to go to
     * @param {Number} direction - Direction to get to the step
     * (1 = forward, -1 = reverse)
     * @param {Boolean} ignorePhaseThreshold - if true, ignore the
     * transitionThreshold setting and immediately go to the specified step
     * @param {Boolean} hashTagNav - If navigation is triggered by the hashTag
     * @returns {Boolean} false when goTo was disallowed true when allowed
     */
    self.goTo = function(id, direction, ignorePhaseThreshold, hashTagNav) {

      // Get the direction to navigate if one wasn't specified
      direction = self.animation.getDirection(id, direction, self.currentStepId, self.noOfSteps, self.isFallbackMode, self.options.reverseWhenNavigatingBackwards, self.options.cycle);

      /**
       * Don't go to a step if:
       *
       * - ID isn't defined
       * - It doesn't exist
       * - It is already animating
       * - navigationSkip isn't allowed and an animation is active
       * - navigationSkip is allowed but the threshold is yet to expire (unless
       *   navigating via forward/back button with hashTags enabled - see
       *   manageEvents.add.hashChange() for an explanation of this)
       * - transitions aren't supported and Sequence is active (navigation
       *   skipping isn't allowed in fallback mode, unless navigating via
       *   forward/back buttons)
       * - preventReverseSkipping is enabled and the user is trying to navigate
       *   in a different direction to the one already active
       */
      if (id === undefined || id < 1 || id > self.noOfSteps || id === self.currentStepId || (self.options.navigationSkip === false && self.isAnimating === true) || (self.options.navigationSkip === true && self.navigationSkipThresholdActive === true && hashTagNav === undefined) || (self.isFallbackMode === true && self.isAnimating === true && hashTagNav === undefined) || (self.options.preventReverseSkipping === true && self.direction !== direction && self.isAnimating === true)) {
        return false;
      }

      var currentStepElement,
          nextStepElement;

      // Clear the previous autoPlayTimer
      clearTimeout(self.autoPlayTimer);

      // Save the latest direction
      self.direction = direction;

      // Add the "seq-reversed" class if navigating in reverse
      if (direction === 1) {
        // Add a "seq-reversed" class
        removeClass(self.$container, "seq-reversed");
      } else {
        // Add a "seq-reversed" class
        addClass(self.$container, "seq-reversed");
      }

      // Get the current and next step elements
      currentStepElement = self.$steps[self.currentStepId - 1];
      nextStepElement = self.$steps[id - 1];

      // Move the active step to the top (via a higher z-index)
      self.animation.moveActiveStepToTop(currentStepElement, nextStepElement);

      // Change the step number on the Sequence element
      self.animation.changeStep(id);

      if (self.isFallbackMode === false) {

        // Reset the next step's elements durations to 0ms so it can be snapped
        // into place
        self.animation.resetInheritedSpeed(id);

        if (self.firstRun === false || (self.firstRun === true && self.options.startingStepAnimatesIn === true)) {

          // Callback
          self.animationStarted(id, self);
        }

        // Animate the canvas
        self.canvas.move(id, true);

        // Determine how often goTo() can be used based on
        // navigationSkipThreshold and manage step fading accordingly
        self.animation.manageNavigationSkip(id, nextStepElement);

        // Are we moving the active phases forward or in reverse?
        if (direction === 1) {

          self.animation.forward(id, currentStepElement, nextStepElement, ignorePhaseThreshold, hashTagNav);
        } else {
          self.animation.reverse(id, currentStepElement, nextStepElement, ignorePhaseThreshold, hashTagNav);
        }
      }

      // Use fallback animation
      else {

        self.animationFallback.goTo(id, self.currentStepId, currentStepElement, id, nextStepElement, direction, hashTagNav);
      }

      return true;
    };

    /* --- CALLBACKS --- */

    /**
     * Callback executed when autoPlay is started
     */
    self.started = function(self) {

      // console.log("auto play started");
    };

    /**
     * Callback executed when autoPlay is stopped
     */
    self.stopped = function(self) {

      // console.log("auto play stopped");
    };

    /**
     * Callback executed when a step animation starts
     *
     * @param {Number} id - The ID of the step that was started
     * @param {Object} self - Properties and methods available to this instance
     */
    self.animationStarted = function(id, self) {

      // console.log("Animation started", id);
    };

    /**
     * Callback executed when a step animation finishes
     *
     * @param {Number} id - The ID of the step that finished
     * @param {Object} self - Properties and methods available to this instance
     */
    self.animationEnded = function(id, self) {

      // console.log("Animation ended", id);
    };

    /**
     * Callback executed when the current phase starts animating
     *
     * @param {Object} self - Properties and methods available to this instance
     */
    self.currentPhaseStarted = function(id, self) {

      // console.log("Current phase started", id);
    };

    /**
     * Callback executed when the current phase finishes animating
     *
     * @param {Object} self - Properties and methods available to this instance
     */
    self.currentPhaseEnded = function(id, self) {

      // console.log("Current phase ended", id);
    };

    /**
     * Callback executed when the next phase starts animating
     *
     * @param {Object} self - Properties and methods available to this instance
     */
    self.nextPhaseStarted = function(id, self) {

      // console.log("Next phase started", id);
    };

    /**
     * Callback executed when the next phase finishes animating
     *
     * @param {Object} self - Properties and methods available to this instance
     */
    self.nextPhaseEnded = function(id, self) {

      // console.log("Next phase ended", id);
    };

    /**
     * When the throttled window resize event occurs
     *
     * @param {Object} self - Properties and methods available to this instance
     */
    self.throttledResize = function(self) {


    };

    /**
     * Callback executed when preloading has finished
     *
     * @param {Object} self - Properties and methods available to this instance
     */
    self.preloaded = function(self) {

      // console.log("preloaded");
    };

    /**
     * Callback executed every time an image to be preloaded returns a status
     *
     * @param {String} result - Whether the image is "loaded" or "broken"
     * @param {String} src - The source of the image
     * @param {Number} progress - The number of images that have returned a result
     * @param {Number} length - The total number of images that are being preloaded
     * @param {Object} self - Properties and methods available to this instance
     */
    self.preloadProgress = function(result, src, progress, length, self) {

      // console.log(progress, length);
    };

    /**
     * Callback executed when Sequence is ready to be interacted with
     * = preloading + domDelay
     *
     * @param {Object} self - Properties and methods available to this instance
     */
    self.ready = function(self) {

      // console.log("Ready");
    };

    /**
     * Callback executed when Sequence has finished being destroyed via .destroy()
     *
     * @param {Object} self - Properties and methods available to this instance
     */
    self.destroyed = function(self) {

      // console.log("Destroyed");
    };

    /**
    * Make some of Sequence's helper functions public
    *
    * addClass() / removeClass() etc can be useful for custom theme code
    */
    self.utils = {
      addClass: addClass,
      removeClass: removeClass,
      addEvent: addEvent,
      removeEvent: removeEvent
    };


    /* --- INIT --- */
    self.init(element);

    // Save the instance globally so we can return it if an init is tried again
    instances.push(self);

    return self;
  });

  return Sequence;
}

if (typeof define === "function" && define.amd) {

  define(["imagesLoaded", "Hammer"], defineSequence);
} else {

  /* Make dependencies optional */
  Hammer = (typeof Hammer !== "function") ? null: Hammer;
  imagesLoaded = (typeof imagesLoaded !== "function") ? null: imagesLoaded;

  var sequence = defineSequence(imagesLoaded, Hammer);
}

/**
 * Theme Name: Modern Slide In
 * Version: 2.0.0
 * Theme URL: http://sequencejs.com/themes/modern-slide-in/
 *
 * A minimalist theme for showcasing products
 *
 * This theme is powered by Sequence.js - The
 * responsive CSS animation framework for creating unique sliders,
 * presentations, banners, and other step-based applications.
 *
 * Author: Ian Lunn
 * Author URL: http://ianlunn.co.uk/
 *
 * Theme License: http://sequencejs.com/licenses/#free-theme
 * Sequence.js Licenses: http://sequencejs.com/licenses/
 *
 * Copyright © 2015 Ian Lunn Design Limited unless otherwise stated.
 */

// Get the Sequence element
var sequenceElement = document.getElementById("sequence");

// Place your Sequence options here to override defaults
// See: http://sequencejs.com/documentation/#options
var options = {
  animateCanvas: false,
  phaseThreshold: false,
  preloader: true,
  reverseWhenNavigatingBackwards: true
}

// Launch Sequence on the element, and with the options we specified above
var mySequence = sequence(sequenceElement, options);

(function ($) {
    "use strict";

    var ver = 'simpleGallery-1.0.1';

    function debug(message) {
        if (window.console) {
            console.log(message);
        }
    }

    $.fn.simpleGallery = function (options) {
        var opts = $.extend({}, $.fn.simpleGallery.defaults, options);

        if (this.length <= 0) {
            debug('There are no thumbnails in the gallery');
            return false;
        }

        this.each(function () {
            var img = $('<img>');
            img.src = $(this).attr('rel');
        });

        var init = function () {
            var parent_anchor =  $(this).parents(opts.thumbnail_anchor),
                src = parent_anchor.attr(opts.big_image_attr),
                lens_image = parent_anchor.attr(opts.lens_image_attr);
            var image_container = $(this).parents(opts.gallery_container).find(opts.big_image_container);

            var loading_image = $('<img>', {'src': opts.loading_image});
            image_container.html(loading_image);

            var a = $('<a>').attr('data-lens-image', lens_image).addClass(opts.parent_anchor_class);
            var img = $('<img>').load(function(){
                img.appendTo(a);
                image_container.html(a);
            }).attr('src', src).addClass(opts.big_image_class);

        };

        $(this).on(opts.show_event, init);

        return this;
    };

    $.fn.simpleGallery.ver = function () { return ver; };

    $.fn.simpleGallery.defaults = {
        thumbnail_anchor: '.simpleLens-thumbnail-wrapper',
        big_image_class: 'simpleLens-big-image',
        lens_image_attr: 'data-lens-image',
        big_image_attr: 'data-big-image',
        parent_anchor_class: 'simpleLens-lens-image',
        gallery_container: '.simpleLens-gallery-container',
        big_image_container: '.simpleLens-big-image-container',
        loading_image: '../img/view-slider/loading.gif',
        show_event: 'mouseenter'
    };

})( jQuery );
/*!
 * jQuery Lens Simple Plugin
 * Copyright (c) 2014 Pietro Simone Di Chiara
 * Version: 1.0.1 (05-APR-2013)
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Requires: jQuery v1.7.0 or later
 */
(function ($) {
    "use strict";

    var ver = 'simpleLens-1.0.1';

    function debug(message) {
        if (window.console) {
            console.log(message);
        }
    }

    $.fn.simpleLens = function (options) {
        var opts = $.extend({}, $.fn.simpleLens.defaults, options);

        var big_image = {
            init: function (image) {
                this.height = image.height();
                this.width = image.width();
                this.offset = image.offset();
                this.position = image.position();

                this.calc_image_limits();
            },
            calc_image_limits: function(){
                this.limits = {
                    x_left : (this.position.left),
                    x_right : (this.position.left + this.width),
                    y_top : (this.position.top),
                    y_bottom : (this.position.top + this.height)
                }
            },
            calc_view_position: function (e) {
                return {
                    org_x: (e.pageX - this.offset.left),
                    org_y: (e.pageY - this.offset.top)
                }
            }
        };

        var cursor = {
            init: function(parent_anchor, lens_container, ratio, position){
                this.parent_anchor = parent_anchor;
                this.lens_container = lens_container;
                this.ratio = ratio;

                this.cursor_position = {
                    'top': 0,
                    'left': 0
                };

                this.calc_cursor_size();
                this.insert_cursor(position.org_x, position.org_y);
            },
            destroy: function(){
                $('.' + opts.cursor_class).remove();
            },
            calc_cursor_size: function () {
                this.cursor_height = this.lens_container.height() / this.ratio.x;
                this.cursor_width = this.lens_container.width() / this.ratio.y;
                this.height_center = (this.cursor_height / 2);
                this.width_center = (this.cursor_width / 2);
            },
            update_cursor_position: function (x, y) {
                var new_y = (y - this.height_center);
                var new_bottom_y = (y + this.height_center);
                var new_x = (x - this.width_center);
                var new_right_x = (x + this.width_center);

                var limits = big_image.limits;
                if (parseFloat(limits.y_top) > parseFloat(new_y)) {
                    new_y = limits.y_top;
                } else if (parseFloat(new_bottom_y) > parseFloat(limits.y_bottom)) {
                    new_y = limits.y_bottom - this.cursor_height;
                }

                if (parseFloat(limits.x_left) > parseFloat(new_x)) {
                    new_x = limits.x_left;
                } else if (parseFloat(new_right_x) > parseFloat(limits.x_right)) {
                    new_x = limits.x_right - this.cursor_width;
                }

                this.cursor_position = {
                    'top': new_y,
                    'left': new_x,
                    'center_top': new_y + this.height_center,
                    'center_left': new_x + this.width_center
                };

                if (this.cursor !== undefined) {
                    this.cursor.css(this.cursor_position);
                }
            },
            insert_cursor: function (x, y) {
                this.cursor = $('<div>', {'class': opts.cursor_class});
                this.cursor.css({
                    'height': this.cursor_height + 'px',
                    'width': this.cursor_width + 'px'
                });

                this.cursor.appendTo(this.parent_anchor);
                return this.update_cursor_position(x, y);
            }
        };

        var lens = {
            init: function(parent_anchor){
                this.parent_anchor = parent_anchor;
                this.parent_div = parent_anchor.parent(opts.parent_class);
                this.lens_image_url = parent_anchor.attr(opts.lens_image_attr);
                this.lens_container = $('<div>', {'class': opts.lens_class});
                this.lens_image = $('<img>');
                big_image.init(parent_anchor.find(opts.big_image_class));

                if (this.lens_image_url === undefined) {
                    debug('Cannot find lens image. URL: ' + this.lens_image_url);
                    debug(that);
                    debug(parent_anchor);
                    debug(lens_image_url);
                }
            },
            update_lens_position: function (position) {
                this.lens_image.css({
                    'top': position.top,
                    'left': position.left
                });
            },
            calc_lens_position: function(cursor_position){
                return {
                    left: (cursor_position.center_left * this.ratio.x - this.container.width) * -1,
                    top: (cursor_position.center_top * this.ratio.y - this.container.height) * -1
                }
            },
            lens_event_bind: function () {
                var that = this;
                var mouse_callback = function (mouse) {
                    var position = big_image.calc_view_position(mouse);
                    cursor.update_cursor_position(position.org_x, position.org_y);
                    that.update_lens_position(that.calc_lens_position(cursor.cursor_position, that.ratio, that.container));
                };

                this.parent_anchor.mousemove(mouse_callback);
            },
            lens_event_unbind: function(){
                if(this.parent_anchor !== undefined){
                    this.parent_anchor.unbind('mousemove');
                }
            },
            destroy: function(){
                cursor.destroy();

                if(this.lens_container !== undefined && this.lens_container.length > 0){
                    $('.' + opts.lens_class).remove();
                    this.lens_event_unbind();
                }
            },
            load: function(e){
                var that = this;

                this.lens_container.appendTo(this.parent_div);

                var margin_top = (this.lens_container.height() / 2) - 25,
                    loading_image = $('<img>', {'src': opts.loading_image})
                        .css("margin-top", margin_top);
                this.lens_container.html(loading_image);

                this.lens_image.load(function () {
                    that.lens_container.html(that.lens_image);

                    that.container = {
                        width: that.lens_container.width() / 2,
                        height: that.lens_container.height() / 2
                    };

                    that.img_size = {
                        width: that.lens_image.width(),
                        height: that.lens_image.height()
                    };

                    that.ratio = {
                        y: that.lens_image.height() / big_image.height,
                        x: that.lens_image.width() / big_image.width
                    };

                    var position = big_image.calc_view_position(e);
                    cursor.init(that.parent_anchor, that.lens_container, that.ratio, position);
                    that.update_lens_position(that.calc_lens_position(cursor.cursor_position));

                    that.lens_event_bind();
                }).attr('src', this.lens_image_url);
            }
        };

        var init = function (e) {
            var parent_anchor =  $(this);

            lens.init(parent_anchor);
            lens.load(e);
        };

        var destroy = function () {
            lens.destroy();
        };

        $(this).parents(opts.parent_class).on(opts.open_lens_event, opts.anchor_parent_class, init);
        $(this).parents(opts.parent_class).on('mouseleave', opts.anchor_parent_class, destroy);

    };

    $.fn.simpleLens.ver = function () { return ver; };

    $.fn.simpleLens.defaults = {
        anchor_parent_class: '.simpleLens-lens-image',
        lens_image_attr: 'data-lens-image',
        big_image_class: '.simpleLens-big-image',
        parent_class: '.simpleLens-big-image-container',
        lens_class: 'simpleLens-lens-element',
        cursor_class: 'simpleLens-mouse-cursor',
        loading_image: '../img/view-slider/loading.gif',
        open_lens_event: 'mouseenter'
    };

})( jQuery );
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.5.9
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */
(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

}(function($) {
    'use strict';
    var Slick = window.Slick || {};

    Slick = (function() {

        var instanceUid = 0;

        function Slick(element, settings) {

            var _ = this, dataSettings;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function(slider, i) {
                    return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (i + 1) + '</button>';
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: false,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };

            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.hidden = 'hidden';
            _.paused = false;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = $(element).data('slick') || {};

            _.options = $.extend({}, _.defaults, dataSettings, settings);

            _.currentSlide = _.options.initialSlide;

            _.originalSettings = _.options;

            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


            _.registerBreakpoints();
            _.init(true);
            _.checkResponsive(true);

        }

        return Slick;

    }());

    Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || (index >= _.slideCount)) {
            return false;
        }

        _.unload();

        if (typeof(index) === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index));
            } else {
                $(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.$slideTrack);
            } else {
                $(markup).appendTo(_.$slideTrack);
            }
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slides.each(function(index, element) {
            $(element).attr('data-slick-index', index);
        });

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.animateHeight = function() {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed);
        }
    };

    Slick.prototype.animateSlide = function(targetLeft, callback) {

        var animProps = {},
            _ = this;

        _.animateHeight();

        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback);
            }

        } else {

            if (_.cssTransitions === false) {
                if (_.options.rtl === true) {
                    _.currentLeft = -(_.currentLeft);
                }
                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function(now) {
                        now = Math.ceil(now);
                        if (_.options.vertical === false) {
                            animProps[_.animType] = 'translate(' +
                                now + 'px, 0px)';
                            _.$slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = 'translate(0px,' +
                                now + 'px)';
                            _.$slideTrack.css(animProps);
                        }
                    },
                    complete: function() {
                        if (callback) {
                            callback.call();
                        }
                    }
                });

            } else {

                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);

                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);

                if (callback) {
                    setTimeout(function() {

                        _.disableTransition();

                        callback.call();
                    }, _.options.speed);
                }

            }

        }

    };

    Slick.prototype.asNavFor = function(index) {

        var _ = this,
            asNavFor = _.options.asNavFor;

        if ( asNavFor && asNavFor !== null ) {
            asNavFor = $(asNavFor).not(_.$slider);
        }

        if ( asNavFor !== null && typeof asNavFor === 'object' ) {
            asNavFor.each(function() {
                var target = $(this).slick('getSlick');
                if(!target.unslicked) {
                    target.slideHandler(index, true);
                }
            });
        }

    };

    Slick.prototype.applyTransition = function(slide) {

        var _ = this,
            transition = {};

        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.autoPlay = function() {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

        if (_.slideCount > _.options.slidesToShow && _.paused !== true) {
            _.autoPlayTimer = setInterval(_.autoPlayIterator,
                _.options.autoplaySpeed);
        }

    };

    Slick.prototype.autoPlayClear = function() {

        var _ = this;
        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

    };

    Slick.prototype.autoPlayIterator = function() {

        var _ = this;

        if (_.options.infinite === false) {

            if (_.direction === 1) {

                if ((_.currentSlide + 1) === _.slideCount -
                    1) {
                    _.direction = 0;
                }

                _.slideHandler(_.currentSlide + _.options.slidesToScroll);

            } else {

                if ((_.currentSlide - 1 === 0)) {

                    _.direction = 1;

                }

                _.slideHandler(_.currentSlide - _.options.slidesToScroll);

            }

        } else {

            _.slideHandler(_.currentSlide + _.options.slidesToScroll);

        }

    };

    Slick.prototype.buildArrows = function() {

        var _ = this;

        if (_.options.arrows === true ) {

            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

            if( _.slideCount > _.options.slidesToShow ) {

                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.prependTo(_.options.appendArrows);
                }

                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.appendTo(_.options.appendArrows);
                }

                if (_.options.infinite !== true) {
                    _.$prevArrow
                        .addClass('slick-disabled')
                        .attr('aria-disabled', 'true');
                }

            } else {

                _.$prevArrow.add( _.$nextArrow )

                    .addClass('slick-hidden')
                    .attr({
                        'aria-disabled': 'true',
                        'tabindex': '-1'
                    });

            }

        }

    };

    Slick.prototype.buildDots = function() {

        var _ = this,
            i, dotString;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            dotString = '<ul class="' + _.options.dotsClass + '">';

            for (i = 0; i <= _.getDotCount(); i += 1) {
                dotString += '<li>' + _.options.customPaging.call(this, _, i) + '</li>';
            }

            dotString += '</ul>';

            _.$dots = $(dotString).appendTo(
                _.options.appendDots);

            _.$dots.find('li').first().addClass('slick-active').attr('aria-hidden', 'false');

        }

    };

    Slick.prototype.buildOut = function() {

        var _ = this;

        _.$slides =
            _.$slider
                .children( _.options.slide + ':not(.slick-cloned)')
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        _.$slides.each(function(index, element) {
            $(element)
                .attr('data-slick-index', index)
                .data('originalStyling', $(element).attr('style') || '');
        });

        _.$slider.addClass('slick-slider');

        _.$slideTrack = (_.slideCount === 0) ?
            $('<div class="slick-track"/>').appendTo(_.$slider) :
            _.$slides.wrapAll('<div class="slick-track"/>').parent();

        _.$list = _.$slideTrack.wrap(
            '<div aria-live="polite" class="slick-list"/>').parent();
        _.$slideTrack.css('opacity', 0);

        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1;
        }

        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.updateDots();


        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        if (_.options.draggable === true) {
            _.$list.addClass('draggable');
        }

    };

    Slick.prototype.buildRows = function() {

        var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;

        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();

        if(_.options.rows > 1) {

            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(
                originalSlides.length / slidesPerSection
            );

            for(a = 0; a < numOfSlides; a++){
                var slide = document.createElement('div');
                for(b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for(c = 0; c < _.options.slidesPerRow; c++) {
                        var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
                        if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target));
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }

            _.$slider.html(newSlides);
            _.$slider.children().children().children()
                .css({
                    'width':(100 / _.options.slidesPerRow) + '%',
                    'display': 'inline-block'
                });

        }

    };

    Slick.prototype.checkResponsive = function(initial, forceUpdate) {

        var _ = this,
            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || $(window).width();

        if (_.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (_.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }

        if ( _.options.responsive &&
            _.options.responsive.length &&
            _.options.responsive !== null) {

            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint =
                            targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                            _.unslick(targetBreakpoint);
                        } else {
                            _.options = $.extend({}, _.originalSettings,
                                _.breakpointSettings[
                                    targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                        _.unslick(targetBreakpoint);
                    } else {
                        _.options = $.extend({}, _.originalSettings,
                            _.breakpointSettings[
                                targetBreakpoint]);
                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide;
                        }
                        _.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialSlide;
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }

            // only trigger breakpoints during an actual break. not on initialize.
            if( !initial && triggerBreakpoint !== false ) {
                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }

    };

    Slick.prototype.changeSlide = function(event, dontAnimate) {

        var _ = this,
            $target = $(event.target),
            indexOffset, slideOffset, unevenOffset;

        // If target is a link, prevent default action.
        if($target.is('a')) {
            event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if(!$target.is('li')) {
            $target = $target.closest('li');
        }

        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {

            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                }
                break;

            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                }
                break;

            case 'index':
                var index = event.data.index === 0 ? 0 :
                    event.data.index || $target.index() * _.options.slidesToScroll;

                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger('focus');
                break;

            default:
                return;
        }

    };

    Slick.prototype.checkNavigable = function(index) {

        var _ = this,
            navigables, prevNavigable;

        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }

        return index;
    };

    Slick.prototype.cleanUpEvents = function() {

        var _ = this;

        if (_.options.dots && _.$dots !== null) {

            $('li', _.$dots).off('click.slick', _.changeSlide);

            if (_.options.pauseOnDotsHover === true && _.options.autoplay === true) {

                $('li', _.$dots)
                    .off('mouseenter.slick', $.proxy(_.setPaused, _, true))
                    .off('mouseleave.slick', $.proxy(_.setPaused, _, false));

            }

        }

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);
        }

        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

        _.$list.off('click.slick', _.clickHandler);

        $(document).off(_.visibilityChange, _.visibility);

        _.$list.off('mouseenter.slick', $.proxy(_.setPaused, _, true));
        _.$list.off('mouseleave.slick', $.proxy(_.setPaused, _, false));

        if (_.options.accessibility === true) {
            _.$list.off('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off('click.slick', _.selectHandler);
        }

        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(document).off('ready.slick.slick-' + _.instanceUid, _.setPosition);
    };

    Slick.prototype.cleanUpRows = function() {

        var _ = this, originalSlides;

        if(_.options.rows > 1) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr('style');
            _.$slider.html(originalSlides);
        }

    };

    Slick.prototype.clickHandler = function(event) {

        var _ = this;

        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }

    };

    Slick.prototype.destroy = function(refresh) {

        var _ = this;

        _.autoPlayClear();

        _.touchObject = {};

        _.cleanUpEvents();

        $('.slick-cloned', _.$slider).detach();

        if (_.$dots) {
            _.$dots.remove();
        }


        if ( _.$prevArrow && _.$prevArrow.length ) {

            _.$prevArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css("display","");

            if ( _.htmlExpr.test( _.options.prevArrow )) {
                _.$prevArrow.remove();
            }
        }

        if ( _.$nextArrow && _.$nextArrow.length ) {

            _.$nextArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css("display","");

            if ( _.htmlExpr.test( _.options.nextArrow )) {
                _.$nextArrow.remove();
            }

        }


        if (_.$slides) {

            _.$slides
                .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
                .removeAttr('aria-hidden')
                .removeAttr('data-slick-index')
                .each(function(){
                    $(this).attr('style', $(this).data('originalStyling'));
                });

            _.$slideTrack.children(this.options.slide).detach();

            _.$slideTrack.detach();

            _.$list.detach();

            _.$slider.append(_.$slides);
        }

        _.cleanUpRows();

        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');

        _.unslicked = true;

        if(!refresh) {
            _.$slider.trigger('destroy', [_]);
        }

    };

    Slick.prototype.disableTransition = function(slide) {

        var _ = this,
            transition = {};

        transition[_.transitionType] = '';

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.fadeSlide = function(slideIndex, callback) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).css({
                zIndex: _.options.zIndex
            });

            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: _.options.zIndex
            });

            if (callback) {
                setTimeout(function() {

                    _.disableTransition(slideIndex);

                    callback.call();
                }, _.options.speed);
            }

        }

    };

    Slick.prototype.fadeSlideOut = function(slideIndex) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            });

        }

    };

    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

        var _ = this;

        if (filter !== null) {

            _.$slidesCache = _.$slides;

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

        var _ = this;
        return _.currentSlide;

    };

    Slick.prototype.getDotCount = function() {

        var _ = this;

        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;

        if (_.options.infinite === true) {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount;
        } else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        }

        return pagerQty - 1;

    };

    Slick.prototype.getLeft = function(slideIndex) {

        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide;

        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);

        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
                verticalOffset = (verticalHeight * _.options.slidesToShow) * -1;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
                    } else {
                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
            }
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0;
        }

        if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }

        if (_.options.vertical === false) {
            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
        } else {
            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
        }

        if (_.options.variableWidth === true) {

            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
            }

            if (_.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft =  0;
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }

            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                } else {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                }

                if (_.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft =  0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }

                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }

        return targetLeft;

    };

    Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

        var _ = this;

        return _.options[option];

    };

    Slick.prototype.getNavigableIndexes = function() {

        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;

        if (_.options.infinite === false) {
            max = _.slideCount;
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2;
        }

        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }

        return indexes;

    };

    Slick.prototype.getSlick = function() {

        return this;

    };

    Slick.prototype.getSlideCount = function() {

        var _ = this,
            slidesTraversed, swipedSlide, centerOffset;

        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

        if (_.options.swipeToSlide === true) {
            _.$slideTrack.find('.slick-slide').each(function(index, slide) {
                if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
                    swipedSlide = slide;
                    return false;
                }
            });

            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

            return slidesTraversed;

        } else {
            return _.options.slidesToScroll;
        }

    };

    Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'index',
                index: parseInt(slide)
            }
        }, dontAnimate);

    };

    Slick.prototype.init = function(creation) {

        var _ = this;

        if (!$(_.$slider).hasClass('slick-initialized')) {

            $(_.$slider).addClass('slick-initialized');

            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();

        }

        if (creation) {
            _.$slider.trigger('init', [_]);
        }

        if (_.options.accessibility === true) {
            _.initADA();
        }

    };

    Slick.prototype.initArrowEvents = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow.on('click.slick', {
                message: 'previous'
            }, _.changeSlide);
            _.$nextArrow.on('click.slick', {
                message: 'next'
            }, _.changeSlide);
        }

    };

    Slick.prototype.initDotEvents = function() {

        var _ = this;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $('li', _.$dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide);
        }

        if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.options.autoplay === true) {
            $('li', _.$dots)
                .on('mouseenter.slick', $.proxy(_.setPaused, _, true))
                .on('mouseleave.slick', $.proxy(_.setPaused, _, false));
        }

    };

    Slick.prototype.initializeEvents = function() {

        var _ = this;

        _.initArrowEvents();

        _.initDotEvents();

        _.$list.on('touchstart.slick mousedown.slick', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.slick mousemove.slick', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.slick mouseup.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.slick mouseleave.slick', {
            action: 'end'
        }, _.swipeHandler);

        _.$list.on('click.slick', _.clickHandler);

        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

        _.$list.on('mouseenter.slick', $.proxy(_.setPaused, _, true));
        _.$list.on('mouseleave.slick', $.proxy(_.setPaused, _, false));

        if (_.options.accessibility === true) {
            _.$list.on('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(document).on('ready.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.initUI = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.show();
            _.$nextArrow.show();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.show();

        }

        if (_.options.autoplay === true) {

            _.autoPlay();

        }

    };

    Slick.prototype.keyHandler = function(event) {

        var _ = this;
         //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: 'previous'
                    }
                });
            } else if (event.keyCode === 39 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: 'next'
                    }
                });
            }
        }

    };

    Slick.prototype.lazyLoad = function() {

        var _ = this,
            loadRange, cloneRange, rangeStart, rangeEnd;

        function loadImages(imagesScope) {
            $('img[data-lazy]', imagesScope).each(function() {

                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageToLoad = document.createElement('img');

                imageToLoad.onload = function() {
                    image
                        .animate({ opacity: 0 }, 100, function() {
                            image
                                .attr('src', imageSource)
                                .animate({ opacity: 1 }, 200, function() {
                                    image
                                        .removeAttr('data-lazy')
                                        .removeClass('slick-loading');
                                });
                        });
                };

                imageToLoad.src = imageSource;

            });
        }

        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = rangeStart + _.options.slidesToShow;
            if (_.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++;
            }
        }

        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);
        loadImages(loadRange);

        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-slide');
            loadImages(cloneRange);
        } else
        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange);
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }

    };

    Slick.prototype.loadSlider = function() {

        var _ = this;

        _.setPosition();

        _.$slideTrack.css({
            opacity: 1
        });

        _.$slider.removeClass('slick-loading');

        _.initUI();

        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }

    };

    Slick.prototype.next = Slick.prototype.slickNext = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'next'
            }
        });

    };

    Slick.prototype.orientationChange = function() {

        var _ = this;

        _.checkResponsive();
        _.setPosition();

    };

    Slick.prototype.pause = Slick.prototype.slickPause = function() {

        var _ = this;

        _.autoPlayClear();
        _.paused = true;

    };

    Slick.prototype.play = Slick.prototype.slickPlay = function() {

        var _ = this;

        _.paused = false;
        _.autoPlay();

    };

    Slick.prototype.postSlide = function(index) {

        var _ = this;

        _.$slider.trigger('afterChange', [_, index]);

        _.animating = false;

        _.setPosition();

        _.swipeLeft = null;

        if (_.options.autoplay === true && _.paused === false) {
            _.autoPlay();
        }
        if (_.options.accessibility === true) {
            _.initADA();
        }

    };

    Slick.prototype.prev = Slick.prototype.slickPrev = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'previous'
            }
        });

    };

    Slick.prototype.preventDefault = function(event) {
        event.preventDefault();
    };

    Slick.prototype.progressiveLazyLoad = function() {

        var _ = this,
            imgCount, targetImage;

        imgCount = $('img[data-lazy]', _.$slider).length;

        if (imgCount > 0) {
            targetImage = $('img[data-lazy]', _.$slider).first();
            targetImage.attr('src', null);
            targetImage.attr('src', targetImage.attr('data-lazy')).removeClass('slick-loading').load(function() {
                    targetImage.removeAttr('data-lazy');
                    _.progressiveLazyLoad();

                    if (_.options.adaptiveHeight === true) {
                        _.setPosition();
                    }
                })
                .error(function() {
                    targetImage.removeAttr('data-lazy');
                    _.progressiveLazyLoad();
                });
        }

    };

    Slick.prototype.refresh = function( initializing ) {

        var _ = this, currentSlide, firstVisible;

        firstVisible = _.slideCount - _.options.slidesToShow;

        // check that the new breakpoint can actually accept the
        // "current slide" as the current slide, otherwise we need
        // to set it to the closest possible value.
        if ( !_.options.infinite ) {
            if ( _.slideCount <= _.options.slidesToShow ) {
                _.currentSlide = 0;
            } else if ( _.currentSlide > firstVisible ) {
                _.currentSlide = firstVisible;
            }
        }

         currentSlide = _.currentSlide;

        _.destroy(true);

        $.extend(_, _.initials, { currentSlide: currentSlide });

        _.init();

        if( !initializing ) {

            _.changeSlide({
                data: {
                    message: 'index',
                    index: currentSlide
                }
            }, false);

        }

    };

    Slick.prototype.registerBreakpoints = function() {

        var _ = this, breakpoint, currentBreakpoint, l,
            responsiveSettings = _.options.responsive || null;

        if ( $.type(responsiveSettings) === "array" && responsiveSettings.length ) {

            _.respondTo = _.options.respondTo || 'window';

            for ( breakpoint in responsiveSettings ) {

                l = _.breakpoints.length-1;
                currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                if (responsiveSettings.hasOwnProperty(breakpoint)) {

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while( l >= 0 ) {
                        if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
                            _.breakpoints.splice(l,1);
                        }
                        l--;
                    }

                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

                }

            }

            _.breakpoints.sort(function(a, b) {
                return ( _.options.mobileFirst ) ? a-b : b-a;
            });

        }

    };

    Slick.prototype.reinit = function() {

        var _ = this;

        _.$slides =
            _.$slideTrack
                .children(_.options.slide)
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        _.registerBreakpoints();

        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();

        _.checkResponsive(false, true);

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        _.setSlideClasses(0);

        _.setPosition();

        _.$slider.trigger('reInit', [_]);

        if (_.options.autoplay === true) {
            _.focusHandler();
        }

    };

    Slick.prototype.resize = function() {

        var _ = this;

        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function() {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if( !_.unslicked ) { _.setPosition(); }
            }, 50);
        }
    };

    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }

        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }

        _.unload();

        if (removeAll === true) {
            _.$slideTrack.children().remove();
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove();
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.setCSS = function(position) {

        var _ = this,
            positionProps = {},
            x, y;

        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

        positionProps[_.positionProp] = position;

        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }

    };

    Slick.prototype.setDimensions = function() {

        var _ = this;

        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: ('0px ' + _.options.centerPadding)
                });
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: (_.options.centerPadding + ' 0px')
                });
            }
        }

        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();


        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

        } else if (_.options.variableWidth === true) {
            _.$slideTrack.width(5000 * _.slideCount);
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
        }

        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

    };

    Slick.prototype.setFade = function() {

        var _ = this,
            targetLeft;

        _.$slides.each(function(index, element) {
            targetLeft = (_.slideWidth * index) * -1;
            if (_.options.rtl === true) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            }
        });

        _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });

    };

    Slick.prototype.setHeight = function() {

        var _ = this;

        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css('height', targetHeight);
        }

    };

    Slick.prototype.setOption = Slick.prototype.slickSetOption = function(option, value, refresh) {

        var _ = this, l, item;

        if( option === "responsive" && $.type(value) === "array" ) {
            for ( item in value ) {
                if( $.type( _.options.responsive ) !== "array" ) {
                    _.options.responsive = [ value[item] ];
                } else {
                    l = _.options.responsive.length-1;
                    // loop through the responsive object and splice out duplicates.
                    while( l >= 0 ) {
                        if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {
                            _.options.responsive.splice(l,1);
                        }
                        l--;
                    }
                    _.options.responsive.push( value[item] );
                }
            }
        } else {
            _.options[option] = value;
        }

        if (refresh === true) {
            _.unload();
            _.reinit();
        }

    };

    Slick.prototype.setPosition = function() {

        var _ = this;

        _.setDimensions();

        _.setHeight();

        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }

        _.$slider.trigger('setPosition', [_]);

    };

    Slick.prototype.setProps = function() {

        var _ = this,
            bodyStyle = document.body.style;

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical');
        } else {
            _.$slider.removeClass('slick-vertical');
        }

        if (bodyStyle.WebkitTransition !== undefined ||
            bodyStyle.MozTransition !== undefined ||
            bodyStyle.msTransition !== undefined) {
            if (_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }

        if ( _.options.fade ) {
            if ( typeof _.options.zIndex === 'number' ) {
                if( _.options.zIndex < 3 ) {
                    _.options.zIndex = 3;
                }
            } else {
                _.options.zIndex = _.defaults.zIndex;
            }
        }

        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = '-o-transform';
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = '-moz-transform';
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = '-webkit-transform';
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = '-ms-transform';
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = 'transform';
            _.transitionType = 'transition';
        }
        _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
    };


    Slick.prototype.setSlideClasses = function(index) {

        var _ = this,
            centerOffset, allSlides, indexOffset, remainder;

        allSlides = _.$slider
            .find('.slick-slide')
            .removeClass('slick-active slick-center slick-current')
            .attr('aria-hidden', 'true');

        _.$slides
            .eq(index)
            .addClass('slick-current');

        if (_.options.centerMode === true) {

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if (_.options.infinite === true) {

                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {

                    _.$slides
                        .slice(index - centerOffset, index + centerOffset + 1)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    indexOffset = _.options.slidesToShow + index;
                    allSlides
                        .slice(indexOffset - centerOffset + 1, indexOffset + centerOffset + 2)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

                if (index === 0) {

                    allSlides
                        .eq(allSlides.length - 1 - _.options.slidesToShow)
                        .addClass('slick-center');

                } else if (index === _.slideCount - 1) {

                    allSlides
                        .eq(_.options.slidesToShow)
                        .addClass('slick-center');

                }

            }

            _.$slides
                .eq(index)
                .addClass('slick-center');

        } else {

            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {

                _.$slides
                    .slice(index, index + _.options.slidesToShow)
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else if (allSlides.length <= _.options.slidesToShow) {

                allSlides
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else {

                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

                if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {

                    allSlides
                        .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    allSlides
                        .slice(indexOffset, indexOffset + _.options.slidesToShow)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

            }

        }

        if (_.options.lazyLoad === 'ondemand') {
            _.lazyLoad();
        }

    };

    Slick.prototype.setupInfinite = function() {

        var _ = this,
            i, slideIndex, infiniteCount;

        if (_.options.fade === true) {
            _.options.centerMode = false;
        }

        if (_.options.infinite === true && _.options.fade === false) {

            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {

                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }

                for (i = _.slideCount; i > (_.slideCount -
                        infiniteCount); i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex - _.slideCount)
                        .prependTo(_.$slideTrack).addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex + _.slideCount)
                        .appendTo(_.$slideTrack).addClass('slick-cloned');
                }
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
                    $(this).attr('id', '');
                });

            }

        }

    };

    Slick.prototype.setPaused = function(paused) {

        var _ = this;

        if (_.options.autoplay === true && _.options.pauseOnHover === true) {
            _.paused = paused;
            if (!paused) {
                _.autoPlay();
            } else {
                _.autoPlayClear();
            }
        }
    };

    Slick.prototype.selectHandler = function(event) {

        var _ = this;

        var targetElement =
            $(event.target).is('.slick-slide') ?
                $(event.target) :
                $(event.target).parents('.slick-slide');

        var index = parseInt(targetElement.attr('data-slick-index'));

        if (!index) index = 0;

        if (_.slideCount <= _.options.slidesToShow) {

            _.setSlideClasses(index);
            _.asNavFor(index);
            return;

        }

        _.slideHandler(index);

    };

    Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
            _ = this;

        sync = sync || false;

        if (_.animating === true && _.options.waitForAnimate === true) {
            return;
        }

        if (_.options.fade === true && _.currentSlide === index) {
            return;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            return;
        }

        if (sync === false) {
            _.asNavFor(index);
        }

        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);

        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        }

        if (_.options.autoplay === true) {
            clearInterval(_.autoPlayTimer);
        }

        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
            } else {
                animSlide = _.slideCount + targetSlide;
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - _.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }

        _.animating = true;

        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;

        _.setSlideClasses(_.currentSlide);

        _.updateDots();
        _.updateArrows();

        if (_.options.fade === true) {
            if (dontAnimate !== true) {

                _.fadeSlideOut(oldSlide);

                _.fadeSlide(animSlide, function() {
                    _.postSlide(animSlide);
                });

            } else {
                _.postSlide(animSlide);
            }
            _.animateHeight();
            return;
        }

        if (dontAnimate !== true) {
            _.animateSlide(targetLeft, function() {
                _.postSlide(animSlide);
            });
        } else {
            _.postSlide(animSlide);
        }

    };

    Slick.prototype.startLoad = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.hide();
            _.$nextArrow.hide();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.hide();

        }

        _.$slider.addClass('slick-loading');

    };

    Slick.prototype.swipeDirection = function() {

        var xDist, yDist, r, swipeAngle, _ = this;

        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
            return (_.options.rtl === false ? 'right' : 'left');
        }
        if (_.options.verticalSwiping === true) {
            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
                return 'left';
            } else {
                return 'right';
            }
        }

        return 'vertical';

    };

    Slick.prototype.swipeEnd = function(event) {

        var _ = this,
            slideCount;

        _.dragging = false;

        _.shouldClick = (_.touchObject.swipeLength > 10) ? false : true;

        if (_.touchObject.curX === undefined) {
            return false;
        }

        if (_.touchObject.edgeHit === true) {
            _.$slider.trigger('edge', [_, _.swipeDirection()]);
        }

        if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {

            switch (_.swipeDirection()) {
                case 'left':
                    slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide + _.getSlideCount()) : _.currentSlide + _.getSlideCount();
                    _.slideHandler(slideCount);
                    _.currentDirection = 0;
                    _.touchObject = {};
                    _.$slider.trigger('swipe', [_, 'left']);
                    break;

                case 'right':
                    slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide - _.getSlideCount()) : _.currentSlide - _.getSlideCount();
                    _.slideHandler(slideCount);
                    _.currentDirection = 1;
                    _.touchObject = {};
                    _.$slider.trigger('swipe', [_, 'right']);
                    break;
            }
        } else {
            if (_.touchObject.startX !== _.touchObject.curX) {
                _.slideHandler(_.currentSlide);
                _.touchObject = {};
            }
        }

    };

    Slick.prototype.swipeHandler = function(event) {

        var _ = this;

        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
            return;
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
            return;
        }

        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
            event.originalEvent.touches.length : 1;

        _.touchObject.minSwipe = _.listWidth / _.options
            .touchThreshold;

        if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options
                .touchThreshold;
        }

        switch (event.data.action) {

            case 'start':
                _.swipeStart(event);
                break;

            case 'move':
                _.swipeMove(event);
                break;

            case 'end':
                _.swipeEnd(event);
                break;

        }

    };

    Slick.prototype.swipeMove = function(event) {

        var _ = this,
            edgeWasHit = false,
            curLeft, swipeDirection, swipeLength, positionOffset, touches;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        if (!_.dragging || touches && touches.length !== 1) {
            return false;
        }

        curLeft = _.getLeft(_.currentSlide);

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = Math.round(Math.sqrt(
                Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));
        }

        swipeDirection = _.swipeDirection();

        if (swipeDirection === 'vertical') {
            return;
        }

        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            event.preventDefault();
        }

        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
        }


        swipeLength = _.touchObject.swipeLength;

        _.touchObject.edgeHit = false;

        if (_.options.infinite === false) {
            if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true;
            }
        }

        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
        }
        if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        }

        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }

        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }

        _.setCSS(_.swipeLeft);

    };

    Slick.prototype.swipeStart = function(event) {

        var _ = this,
            touches;

        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        _.dragging = true;

    };

    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

        var _ = this;

        if (_.$slidesCache !== null) {

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.unload = function() {

        var _ = this;

        $('.slick-cloned', _.$slider).remove();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove();
        }

        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove();
        }

        _.$slides
            .removeClass('slick-slide slick-active slick-visible slick-current')
            .attr('aria-hidden', 'true')
            .css('width', '');

    };

    Slick.prototype.unslick = function(fromBreakpoint) {

        var _ = this;
        _.$slider.trigger('unslick', [_, fromBreakpoint]);
        _.destroy();

    };

    Slick.prototype.updateArrows = function() {

        var _ = this,
            centerOffset;

        centerOffset = Math.floor(_.options.slidesToShow / 2);

        if ( _.options.arrows === true &&
            _.slideCount > _.options.slidesToShow &&
            !_.options.infinite ) {

            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            if (_.currentSlide === 0) {

                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            }

        }

    };

    Slick.prototype.updateDots = function() {

        var _ = this;

        if (_.$dots !== null) {

            _.$dots
                .find('li')
                .removeClass('slick-active')
                .attr('aria-hidden', 'true');

            _.$dots
                .find('li')
                .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
                .addClass('slick-active')
                .attr('aria-hidden', 'false');

        }

    };

    Slick.prototype.visibility = function() {

        var _ = this;

        if (document[_.hidden]) {
            _.paused = true;
            _.autoPlayClear();
        } else {
            if (_.options.autoplay === true) {
                _.paused = false;
                _.autoPlay();
            }
        }

    };
    Slick.prototype.initADA = function() {
        var _ = this;
        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
            'aria-hidden': 'true',
            'tabindex': '-1'
        }).find('a, input, button, select').attr({
            'tabindex': '-1'
        });

        _.$slideTrack.attr('role', 'listbox');

        _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
            $(this).attr({
                'role': 'option',
                'aria-describedby': 'slick-slide' + _.instanceUid + i + ''
            });
        });

        if (_.$dots !== null) {
            _.$dots.attr('role', 'tablist').find('li').each(function(i) {
                $(this).attr({
                    'role': 'presentation',
                    'aria-selected': 'false',
                    'aria-controls': 'navigation' + _.instanceUid + i + '',
                    'id': 'slick-slide' + _.instanceUid + i + ''
                });
            })
                .first().attr('aria-selected', 'true').end()
                .find('button').attr('role', 'button').end()
                .closest('div').attr('role', 'toolbar');
        }
        _.activateADA();

    };

    Slick.prototype.activateADA = function() {
        var _ = this;

        _.$slideTrack.find('.slick-active').attr({
            'aria-hidden': 'false'
        }).find('a, input, button, select').attr({
            'tabindex': '0'
        });

    };

    Slick.prototype.focusHandler = function() {
        var _ = this;
        _.$slider.on('focus.slick blur.slick', '*', function(event) {
            event.stopImmediatePropagation();
            var sf = $(this);
            setTimeout(function() {
                if (_.isPlay) {
                    if (sf.is(':focus')) {
                        _.autoPlayClear();
                        _.paused = true;
                    } else {
                        _.paused = false;
                        _.autoPlay();
                    }
                }
            }, 0);
        });
    };

    $.fn.slick = function() {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].slick = new Slick(_[i], opt);
            else
                ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };

}));

/*! nouislider - 8.3.0 - 2016-02-14 17:37:19 */

(function (factory) {

    if ( typeof define === 'function' && define.amd ) {

        // AMD. Register as an anonymous module.
        define([], factory);

    } else if ( typeof exports === 'object' ) {

        // Node/CommonJS
        module.exports = factory();

    } else {

        // Browser globals
        window.noUiSlider = factory();
    }

}(function( ){

	'use strict';


	// Removes duplicates from an array.
	function unique(array) {
		return array.filter(function(a){
			return !this[a] ? this[a] = true : false;
		}, {});
	}

	// Round a value to the closest 'to'.
	function closest ( value, to ) {
		return Math.round(value / to) * to;
	}

	// Current position of an element relative to the document.
	function offset ( elem ) {

	var rect = elem.getBoundingClientRect(),
		doc = elem.ownerDocument,
		docElem = doc.documentElement,
		pageOffset = getPageOffset();

		// getBoundingClientRect contains left scroll in Chrome on Android.
		// I haven't found a feature detection that proves this. Worst case
		// scenario on mis-match: the 'tap' feature on horizontal sliders breaks.
		if ( /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) ) {
			pageOffset.x = 0;
		}

		return {
			top: rect.top + pageOffset.y - docElem.clientTop,
			left: rect.left + pageOffset.x - docElem.clientLeft
		};
	}

	// Checks whether a value is numerical.
	function isNumeric ( a ) {
		return typeof a === 'number' && !isNaN( a ) && isFinite( a );
	}

	// Rounds a number to 7 supported decimals.
	function accurateNumber( number ) {
		var p = Math.pow(10, 7);
		return Number((Math.round(number*p)/p).toFixed(7));
	}

	// Sets a class and removes it after [duration] ms.
	function addClassFor ( element, className, duration ) {
		addClass(element, className);
		setTimeout(function(){
			removeClass(element, className);
		}, duration);
	}

	// Limits a value to 0 - 100
	function limit ( a ) {
		return Math.max(Math.min(a, 100), 0);
	}

	// Wraps a variable as an array, if it isn't one yet.
	function asArray ( a ) {
		return Array.isArray(a) ? a : [a];
	}

	// Counts decimals
	function countDecimals ( numStr ) {
		var pieces = numStr.split(".");
		return pieces.length > 1 ? pieces[1].length : 0;
	}

	// http://youmightnotneedjquery.com/#add_class
	function addClass ( el, className ) {
		if ( el.classList ) {
			el.classList.add(className);
		} else {
			el.className += ' ' + className;
		}
	}

	// http://youmightnotneedjquery.com/#remove_class
	function removeClass ( el, className ) {
		if ( el.classList ) {
			el.classList.remove(className);
		} else {
			el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	}

	// https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/
	function hasClass ( el, className ) {
		return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
	}

	// https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY#Notes
	function getPageOffset ( ) {

		var supportPageOffset = window.pageXOffset !== undefined,
			isCSS1Compat = ((document.compatMode || "") === "CSS1Compat"),
			x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
			y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;

		return {
			x: x,
			y: y
		};
	}

	// Shorthand for stopPropagation so we don't have to create a dynamic method
	function stopPropagation ( e ) {
		e.stopPropagation();
	}

	// todo
	function addCssPrefix(cssPrefix) {
		return function(className) {
			return cssPrefix + className;
		};
	}


	var
	// Determine the events to bind. IE11 implements pointerEvents without
	// a prefix, which breaks compatibility with the IE10 implementation.
	/** @const */
	actions = window.navigator.pointerEnabled ? {
		start: 'pointerdown',
		move: 'pointermove',
		end: 'pointerup'
	} : window.navigator.msPointerEnabled ? {
		start: 'MSPointerDown',
		move: 'MSPointerMove',
		end: 'MSPointerUp'
	} : {
		start: 'mousedown touchstart',
		move: 'mousemove touchmove',
		end: 'mouseup touchend'
	},
	defaultCssPrefix = 'noUi-';


// Value calculation

	// Determine the size of a sub-range in relation to a full range.
	function subRangeRatio ( pa, pb ) {
		return (100 / (pb - pa));
	}

	// (percentage) How many percent is this value of this range?
	function fromPercentage ( range, value ) {
		return (value * 100) / ( range[1] - range[0] );
	}

	// (percentage) Where is this value on this range?
	function toPercentage ( range, value ) {
		return fromPercentage( range, range[0] < 0 ?
			value + Math.abs(range[0]) :
				value - range[0] );
	}

	// (value) How much is this percentage on this range?
	function isPercentage ( range, value ) {
		return ((value * ( range[1] - range[0] )) / 100) + range[0];
	}


// Range conversion

	function getJ ( value, arr ) {

		var j = 1;

		while ( value >= arr[j] ){
			j += 1;
		}

		return j;
	}

	// (percentage) Input a value, find where, on a scale of 0-100, it applies.
	function toStepping ( xVal, xPct, value ) {

		if ( value >= xVal.slice(-1)[0] ){
			return 100;
		}

		var j = getJ( value, xVal ), va, vb, pa, pb;

		va = xVal[j-1];
		vb = xVal[j];
		pa = xPct[j-1];
		pb = xPct[j];

		return pa + (toPercentage([va, vb], value) / subRangeRatio (pa, pb));
	}

	// (value) Input a percentage, find where it is on the specified range.
	function fromStepping ( xVal, xPct, value ) {

		// There is no range group that fits 100
		if ( value >= 100 ){
			return xVal.slice(-1)[0];
		}

		var j = getJ( value, xPct ), va, vb, pa, pb;

		va = xVal[j-1];
		vb = xVal[j];
		pa = xPct[j-1];
		pb = xPct[j];

		return isPercentage([va, vb], (value - pa) * subRangeRatio (pa, pb));
	}

	// (percentage) Get the step that applies at a certain value.
	function getStep ( xPct, xSteps, snap, value ) {

		if ( value === 100 ) {
			return value;
		}

		var j = getJ( value, xPct ), a, b;

		// If 'snap' is set, steps are used as fixed points on the slider.
		if ( snap ) {

			a = xPct[j-1];
			b = xPct[j];

			// Find the closest position, a or b.
			if ((value - a) > ((b-a)/2)){
				return b;
			}

			return a;
		}

		if ( !xSteps[j-1] ){
			return value;
		}

		return xPct[j-1] + closest(
			value - xPct[j-1],
			xSteps[j-1]
		);
	}


// Entry parsing

	function handleEntryPoint ( index, value, that ) {

		var percentage;

		// Wrap numerical input in an array.
		if ( typeof value === "number" ) {
			value = [value];
		}

		// Reject any invalid input, by testing whether value is an array.
		if ( Object.prototype.toString.call( value ) !== '[object Array]' ){
			throw new Error("noUiSlider: 'range' contains invalid value.");
		}

		// Covert min/max syntax to 0 and 100.
		if ( index === 'min' ) {
			percentage = 0;
		} else if ( index === 'max' ) {
			percentage = 100;
		} else {
			percentage = parseFloat( index );
		}

		// Check for correct input.
		if ( !isNumeric( percentage ) || !isNumeric( value[0] ) ) {
			throw new Error("noUiSlider: 'range' value isn't numeric.");
		}

		// Store values.
		that.xPct.push( percentage );
		that.xVal.push( value[0] );

		// NaN will evaluate to false too, but to keep
		// logging clear, set step explicitly. Make sure
		// not to override the 'step' setting with false.
		if ( !percentage ) {
			if ( !isNaN( value[1] ) ) {
				that.xSteps[0] = value[1];
			}
		} else {
			that.xSteps.push( isNaN(value[1]) ? false : value[1] );
		}
	}

	function handleStepPoint ( i, n, that ) {

		// Ignore 'false' stepping.
		if ( !n ) {
			return true;
		}

		// Factor to range ratio
		that.xSteps[i] = fromPercentage([
			 that.xVal[i]
			,that.xVal[i+1]
		], n) / subRangeRatio (
			that.xPct[i],
			that.xPct[i+1] );
	}


// Interface

	// The interface to Spectrum handles all direction-based
	// conversions, so the above values are unaware.

	function Spectrum ( entry, snap, direction, singleStep ) {

		this.xPct = [];
		this.xVal = [];
		this.xSteps = [ singleStep || false ];
		this.xNumSteps = [ false ];

		this.snap = snap;
		this.direction = direction;

		var index, ordered = [ /* [0, 'min'], [1, '50%'], [2, 'max'] */ ];

		// Map the object keys to an array.
		for ( index in entry ) {
			if ( entry.hasOwnProperty(index) ) {
				ordered.push([entry[index], index]);
			}
		}

		// Sort all entries by value (numeric sort).
		if ( ordered.length && typeof ordered[0][0] === "object" ) {
			ordered.sort(function(a, b) { return a[0][0] - b[0][0]; });
		} else {
			ordered.sort(function(a, b) { return a[0] - b[0]; });
		}


		// Convert all entries to subranges.
		for ( index = 0; index < ordered.length; index++ ) {
			handleEntryPoint(ordered[index][1], ordered[index][0], this);
		}

		// Store the actual step values.
		// xSteps is sorted in the same order as xPct and xVal.
		this.xNumSteps = this.xSteps.slice(0);

		// Convert all numeric steps to the percentage of the subrange they represent.
		for ( index = 0; index < this.xNumSteps.length; index++ ) {
			handleStepPoint(index, this.xNumSteps[index], this);
		}
	}

	Spectrum.prototype.getMargin = function ( value ) {
		return this.xPct.length === 2 ? fromPercentage(this.xVal, value) : false;
	};

	Spectrum.prototype.toStepping = function ( value ) {

		value = toStepping( this.xVal, this.xPct, value );

		// Invert the value if this is a right-to-left slider.
		if ( this.direction ) {
			value = 100 - value;
		}

		return value;
	};

	Spectrum.prototype.fromStepping = function ( value ) {

		// Invert the value if this is a right-to-left slider.
		if ( this.direction ) {
			value = 100 - value;
		}

		return accurateNumber(fromStepping( this.xVal, this.xPct, value ));
	};

	Spectrum.prototype.getStep = function ( value ) {

		// Find the proper step for rtl sliders by search in inverse direction.
		// Fixes issue #262.
		if ( this.direction ) {
			value = 100 - value;
		}

		value = getStep(this.xPct, this.xSteps, this.snap, value );

		if ( this.direction ) {
			value = 100 - value;
		}

		return value;
	};

	Spectrum.prototype.getApplicableStep = function ( value ) {

		// If the value is 100%, return the negative step twice.
		var j = getJ(value, this.xPct), offset = value === 100 ? 2 : 1;
		return [this.xNumSteps[j-2], this.xVal[j-offset], this.xNumSteps[j-offset]];
	};

	// Outside testing
	Spectrum.prototype.convert = function ( value ) {
		return this.getStep(this.toStepping(value));
	};

/*	Every input option is tested and parsed. This'll prevent
	endless validation in internal methods. These tests are
	structured with an item for every option available. An
	option can be marked as required by setting the 'r' flag.
	The testing function is provided with three arguments:
		- The provided value for the option;
		- A reference to the options object;
		- The name for the option;

	The testing function returns false when an error is detected,
	or true when everything is OK. It can also modify the option
	object, to make sure all values can be correctly looped elsewhere. */

	var defaultFormatter = { 'to': function( value ){
		return value !== undefined && value.toFixed(2);
	}, 'from': Number };

	function testStep ( parsed, entry ) {

		if ( !isNumeric( entry ) ) {
			throw new Error("noUiSlider: 'step' is not numeric.");
		}

		// The step option can still be used to set stepping
		// for linear sliders. Overwritten if set in 'range'.
		parsed.singleStep = entry;
	}

	function testRange ( parsed, entry ) {

		// Filter incorrect input.
		if ( typeof entry !== 'object' || Array.isArray(entry) ) {
			throw new Error("noUiSlider: 'range' is not an object.");
		}

		// Catch missing start or end.
		if ( entry.min === undefined || entry.max === undefined ) {
			throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
		}

		// Catch equal start or end.
		if ( entry.min === entry.max ) {
			throw new Error("noUiSlider: 'range' 'min' and 'max' cannot be equal.");
		}

		parsed.spectrum = new Spectrum(entry, parsed.snap, parsed.dir, parsed.singleStep);
	}

	function testStart ( parsed, entry ) {

		entry = asArray(entry);

		// Validate input. Values aren't tested, as the public .val method
		// will always provide a valid location.
		if ( !Array.isArray( entry ) || !entry.length || entry.length > 2 ) {
			throw new Error("noUiSlider: 'start' option is incorrect.");
		}

		// Store the number of handles.
		parsed.handles = entry.length;

		// When the slider is initialized, the .val method will
		// be called with the start options.
		parsed.start = entry;
	}

	function testSnap ( parsed, entry ) {

		// Enforce 100% stepping within subranges.
		parsed.snap = entry;

		if ( typeof entry !== 'boolean' ){
			throw new Error("noUiSlider: 'snap' option must be a boolean.");
		}
	}

	function testAnimate ( parsed, entry ) {

		// Enforce 100% stepping within subranges.
		parsed.animate = entry;

		if ( typeof entry !== 'boolean' ){
			throw new Error("noUiSlider: 'animate' option must be a boolean.");
		}
	}

	function testConnect ( parsed, entry ) {

		if ( entry === 'lower' && parsed.handles === 1 ) {
			parsed.connect = 1;
		} else if ( entry === 'upper' && parsed.handles === 1 ) {
			parsed.connect = 2;
		} else if ( entry === true && parsed.handles === 2 ) {
			parsed.connect = 3;
		} else if ( entry === false ) {
			parsed.connect = 0;
		} else {
			throw new Error("noUiSlider: 'connect' option doesn't match handle count.");
		}
	}

	function testOrientation ( parsed, entry ) {

		// Set orientation to an a numerical value for easy
		// array selection.
		switch ( entry ){
		  case 'horizontal':
			parsed.ort = 0;
			break;
		  case 'vertical':
			parsed.ort = 1;
			break;
		  default:
			throw new Error("noUiSlider: 'orientation' option is invalid.");
		}
	}

	function testMargin ( parsed, entry ) {

		if ( !isNumeric(entry) ){
			throw new Error("noUiSlider: 'margin' option must be numeric.");
		}

		// Issue #582
		if ( entry === 0 ) {
			return;
		}

		parsed.margin = parsed.spectrum.getMargin(entry);

		if ( !parsed.margin ) {
			throw new Error("noUiSlider: 'margin' option is only supported on linear sliders.");
		}
	}

	function testLimit ( parsed, entry ) {

		if ( !isNumeric(entry) ){
			throw new Error("noUiSlider: 'limit' option must be numeric.");
		}

		parsed.limit = parsed.spectrum.getMargin(entry);

		if ( !parsed.limit ) {
			throw new Error("noUiSlider: 'limit' option is only supported on linear sliders.");
		}
	}

	function testDirection ( parsed, entry ) {

		// Set direction as a numerical value for easy parsing.
		// Invert connection for RTL sliders, so that the proper
		// handles get the connect/background classes.
		switch ( entry ) {
		  case 'ltr':
			parsed.dir = 0;
			break;
		  case 'rtl':
			parsed.dir = 1;
			parsed.connect = [0,2,1,3][parsed.connect];
			break;
		  default:
			throw new Error("noUiSlider: 'direction' option was not recognized.");
		}
	}

	function testBehaviour ( parsed, entry ) {

		// Make sure the input is a string.
		if ( typeof entry !== 'string' ) {
			throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
		}

		// Check if the string contains any keywords.
		// None are required.
		var tap = entry.indexOf('tap') >= 0,
			drag = entry.indexOf('drag') >= 0,
			fixed = entry.indexOf('fixed') >= 0,
			snap = entry.indexOf('snap') >= 0,
			hover = entry.indexOf('hover') >= 0;

		// Fix #472
		if ( drag && !parsed.connect ) {
			throw new Error("noUiSlider: 'drag' behaviour must be used with 'connect': true.");
		}

		parsed.events = {
			tap: tap || snap,
			drag: drag,
			fixed: fixed,
			snap: snap,
			hover: hover
		};
	}

	function testTooltips ( parsed, entry ) {

		var i;

		if ( entry === false ) {
			return;
		} else if ( entry === true ) {

			parsed.tooltips = [];

			for ( i = 0; i < parsed.handles; i++ ) {
				parsed.tooltips.push(true);
			}

		} else {

			parsed.tooltips = asArray(entry);

			if ( parsed.tooltips.length !== parsed.handles ) {
				throw new Error("noUiSlider: must pass a formatter for all handles.");
			}

			parsed.tooltips.forEach(function(formatter){
				if ( typeof formatter !== 'boolean' && (typeof formatter !== 'object' || typeof formatter.to !== 'function') ) {
					throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.");
				}
			});
		}
	}

	function testFormat ( parsed, entry ) {

		parsed.format = entry;

		// Any object with a to and from method is supported.
		if ( typeof entry.to === 'function' && typeof entry.from === 'function' ) {
			return true;
		}

		throw new Error( "noUiSlider: 'format' requires 'to' and 'from' methods.");
	}

	function testCssPrefix ( parsed, entry ) {

		if ( entry !== undefined && typeof entry !== 'string' ) {
			throw new Error( "noUiSlider: 'cssPrefix' must be a string.");
		}

		parsed.cssPrefix = entry;
	}

	// Test all developer settings and parse to assumption-safe values.
	function testOptions ( options ) {

		// To prove a fix for #537, freeze options here.
		// If the object is modified, an error will be thrown.
		// Object.freeze(options);

		var parsed = {
			margin: 0,
			limit: 0,
			animate: true,
			format: defaultFormatter
		}, tests;

		// Tests are executed in the order they are presented here.
		tests = {
			'step': { r: false, t: testStep },
			'start': { r: true, t: testStart },
			'connect': { r: true, t: testConnect },
			'direction': { r: true, t: testDirection },
			'snap': { r: false, t: testSnap },
			'animate': { r: false, t: testAnimate },
			'range': { r: true, t: testRange },
			'orientation': { r: false, t: testOrientation },
			'margin': { r: false, t: testMargin },
			'limit': { r: false, t: testLimit },
			'behaviour': { r: true, t: testBehaviour },
			'format': { r: false, t: testFormat },
			'tooltips': { r: false, t: testTooltips },
			'cssPrefix': { r: false, t: testCssPrefix }
		};

		var defaults = {
			'connect': false,
			'direction': 'ltr',
			'behaviour': 'tap',
			'orientation': 'horizontal'
		};

		// Run all options through a testing mechanism to ensure correct
		// input. It should be noted that options might get modified to
		// be handled properly. E.g. wrapping integers in arrays.
		Object.keys(tests).forEach(function( name ){

			// If the option isn't set, but it is required, throw an error.
			if ( options[name] === undefined && defaults[name] === undefined ) {

				if ( tests[name].r ) {
					throw new Error("noUiSlider: '" + name + "' is required.");
				}

				return true;
			}

			tests[name].t( parsed, options[name] === undefined ? defaults[name] : options[name] );
		});

		// Forward pips options
		parsed.pips = options.pips;

		// Pre-define the styles.
		parsed.style = parsed.ort ? 'top' : 'left';

		return parsed;
	}


function closure ( target, options ){

	// All variables local to 'closure' are prefixed with 'scope_'
	var scope_Target = target,
		scope_Locations = [-1, -1],
		scope_Base,
		scope_Handles,
		scope_Spectrum = options.spectrum,
		scope_Values = [],
		scope_Events = {},
		scope_Self;

  var cssClasses = [
    /*  0 */  'target'
    /*  1 */ ,'base'
    /*  2 */ ,'origin'
    /*  3 */ ,'handle'
    /*  4 */ ,'horizontal'
    /*  5 */ ,'vertical'
    /*  6 */ ,'background'
    /*  7 */ ,'connect'
    /*  8 */ ,'ltr'
    /*  9 */ ,'rtl'
    /* 10 */ ,'draggable'
    /* 11 */ ,''
    /* 12 */ ,'state-drag'
    /* 13 */ ,''
    /* 14 */ ,'state-tap'
    /* 15 */ ,'active'
    /* 16 */ ,''
    /* 17 */ ,'stacking'
    /* 18 */ ,'tooltip'
    /* 19 */ ,''
    /* 20 */ ,'pips'
    /* 21 */ ,'marker'
    /* 22 */ ,'value'
  ].map(addCssPrefix(options.cssPrefix || defaultCssPrefix));


	// Delimit proposed values for handle positions.
	function getPositions ( a, b, delimit ) {

		// Add movement to current position.
		var c = a + b[0], d = a + b[1];

		// Only alter the other position on drag,
		// not on standard sliding.
		if ( delimit ) {
			if ( c < 0 ) {
				d += Math.abs(c);
			}
			if ( d > 100 ) {
				c -= ( d - 100 );
			}

			// Limit values to 0 and 100.
			return [limit(c), limit(d)];
		}

		return [c,d];
	}

	// Provide a clean event with standardized offset values.
	function fixEvent ( e, pageOffset ) {

		// Prevent scrolling and panning on touch events, while
		// attempting to slide. The tap event also depends on this.
		e.preventDefault();

		// Filter the event to register the type, which can be
		// touch, mouse or pointer. Offset changes need to be
		// made on an event specific basis.
		var touch = e.type.indexOf('touch') === 0,
			mouse = e.type.indexOf('mouse') === 0,
			pointer = e.type.indexOf('pointer') === 0,
			x,y, event = e;

		// IE10 implemented pointer events with a prefix;
		if ( e.type.indexOf('MSPointer') === 0 ) {
			pointer = true;
		}

		if ( touch ) {
			// noUiSlider supports one movement at a time,
			// so we can select the first 'changedTouch'.
			x = e.changedTouches[0].pageX;
			y = e.changedTouches[0].pageY;
		}

		pageOffset = pageOffset || getPageOffset();

		if ( mouse || pointer ) {
			x = e.clientX + pageOffset.x;
			y = e.clientY + pageOffset.y;
		}

		event.pageOffset = pageOffset;
		event.points = [x, y];
		event.cursor = mouse || pointer; // Fix #435

		return event;
	}

	// Append a handle to the base.
	function addHandle ( direction, index ) {

		var origin = document.createElement('div'),
			handle = document.createElement('div'),
			additions = [ '-lower', '-upper' ];

		if ( direction ) {
			additions.reverse();
		}

		addClass(handle, cssClasses[3]);
		addClass(handle, cssClasses[3] + additions[index]);

		addClass(origin, cssClasses[2]);
		origin.appendChild(handle);

		return origin;
	}

	// Add the proper connection classes.
	function addConnection ( connect, target, handles ) {

		// Apply the required connection classes to the elements
		// that need them. Some classes are made up for several
		// segments listed in the class list, to allow easy
		// renaming and provide a minor compression benefit.
		switch ( connect ) {
			case 1:	addClass(target, cssClasses[7]);
					addClass(handles[0], cssClasses[6]);
					break;
			case 3: addClass(handles[1], cssClasses[6]);
					/* falls through */
			case 2: addClass(handles[0], cssClasses[7]);
					/* falls through */
			case 0: addClass(target, cssClasses[6]);
					break;
		}
	}

	// Add handles to the slider base.
	function addHandles ( nrHandles, direction, base ) {

		var index, handles = [];

		// Append handles.
		for ( index = 0; index < nrHandles; index += 1 ) {

			// Keep a list of all added handles.
			handles.push( base.appendChild(addHandle( direction, index )) );
		}

		return handles;
	}

	// Initialize a single slider.
	function addSlider ( direction, orientation, target ) {

		// Apply classes and data to the target.
		addClass(target, cssClasses[0]);
		addClass(target, cssClasses[8 + direction]);
		addClass(target, cssClasses[4 + orientation]);

		var div = document.createElement('div');
		addClass(div, cssClasses[1]);
		target.appendChild(div);
		return div;
	}


	function addTooltip ( handle, index ) {

		if ( !options.tooltips[index] ) {
			return false;
		}

		var element = document.createElement('div');
		element.className = cssClasses[18];
		return handle.firstChild.appendChild(element);
	}

	// The tooltips option is a shorthand for using the 'update' event.
	function tooltips ( ) {

		if ( options.dir ) {
			options.tooltips.reverse();
		}

		// Tooltips are added with options.tooltips in original order.
		var tips = scope_Handles.map(addTooltip);

		if ( options.dir ) {
			tips.reverse();
			options.tooltips.reverse();
		}

		bindEvent('update', function(f, o, r) {
			if ( tips[o] ) {
				tips[o].innerHTML = options.tooltips[o] === true ? f[o] : options.tooltips[o].to(r[o]);
			}
		});
	}


	function getGroup ( mode, values, stepped ) {

		// Use the range.
		if ( mode === 'range' || mode === 'steps' ) {
			return scope_Spectrum.xVal;
		}

		if ( mode === 'count' ) {

			// Divide 0 - 100 in 'count' parts.
			var spread = ( 100 / (values-1) ), v, i = 0;
			values = [];

			// List these parts and have them handled as 'positions'.
			while ((v=i++*spread) <= 100 ) {
				values.push(v);
			}

			mode = 'positions';
		}

		if ( mode === 'positions' ) {

			// Map all percentages to on-range values.
			return values.map(function( value ){
				return scope_Spectrum.fromStepping( stepped ? scope_Spectrum.getStep( value ) : value );
			});
		}

		if ( mode === 'values' ) {

			// If the value must be stepped, it needs to be converted to a percentage first.
			if ( stepped ) {

				return values.map(function( value ){

					// Convert to percentage, apply step, return to value.
					return scope_Spectrum.fromStepping( scope_Spectrum.getStep( scope_Spectrum.toStepping( value ) ) );
				});

			}

			// Otherwise, we can simply use the values.
			return values;
		}
	}

	function generateSpread ( density, mode, group ) {

		function safeIncrement(value, increment) {
			// Avoid floating point variance by dropping the smallest decimal places.
			return (value + increment).toFixed(7) / 1;
		}

		var originalSpectrumDirection = scope_Spectrum.direction,
			indexes = {},
			firstInRange = scope_Spectrum.xVal[0],
			lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length-1],
			ignoreFirst = false,
			ignoreLast = false,
			prevPct = 0;

		// This function loops the spectrum in an ltr linear fashion,
		// while the toStepping method is direction aware. Trick it into
		// believing it is ltr.
		scope_Spectrum.direction = 0;

		// Create a copy of the group, sort it and filter away all duplicates.
		group = unique(group.slice().sort(function(a, b){ return a - b; }));

		// Make sure the range starts with the first element.
		if ( group[0] !== firstInRange ) {
			group.unshift(firstInRange);
			ignoreFirst = true;
		}

		// Likewise for the last one.
		if ( group[group.length - 1] !== lastInRange ) {
			group.push(lastInRange);
			ignoreLast = true;
		}

		group.forEach(function ( current, index ) {

			// Get the current step and the lower + upper positions.
			var step, i, q,
				low = current,
				high = group[index+1],
				newPct, pctDifference, pctPos, type,
				steps, realSteps, stepsize;

			// When using 'steps' mode, use the provided steps.
			// Otherwise, we'll step on to the next subrange.
			if ( mode === 'steps' ) {
				step = scope_Spectrum.xNumSteps[ index ];
			}

			// Default to a 'full' step.
			if ( !step ) {
				step = high-low;
			}

			// Low can be 0, so test for false. If high is undefined,
			// we are at the last subrange. Index 0 is already handled.
			if ( low === false || high === undefined ) {
				return;
			}

			// Find all steps in the subrange.
			for ( i = low; i <= high; i = safeIncrement(i, step) ) {

				// Get the percentage value for the current step,
				// calculate the size for the subrange.
				newPct = scope_Spectrum.toStepping( i );
				pctDifference = newPct - prevPct;

				steps = pctDifference / density;
				realSteps = Math.round(steps);

				// This ratio represents the ammount of percentage-space a point indicates.
				// For a density 1 the points/percentage = 1. For density 2, that percentage needs to be re-devided.
				// Round the percentage offset to an even number, then divide by two
				// to spread the offset on both sides of the range.
				stepsize = pctDifference/realSteps;

				// Divide all points evenly, adding the correct number to this subrange.
				// Run up to <= so that 100% gets a point, event if ignoreLast is set.
				for ( q = 1; q <= realSteps; q += 1 ) {

					// The ratio between the rounded value and the actual size might be ~1% off.
					// Correct the percentage offset by the number of points
					// per subrange. density = 1 will result in 100 points on the
					// full range, 2 for 50, 4 for 25, etc.
					pctPos = prevPct + ( q * stepsize );
					indexes[pctPos.toFixed(5)] = ['x', 0];
				}

				// Determine the point type.
				type = (group.indexOf(i) > -1) ? 1 : ( mode === 'steps' ? 2 : 0 );

				// Enforce the 'ignoreFirst' option by overwriting the type for 0.
				if ( !index && ignoreFirst ) {
					type = 0;
				}

				if ( !(i === high && ignoreLast)) {
					// Mark the 'type' of this point. 0 = plain, 1 = real value, 2 = step value.
					indexes[newPct.toFixed(5)] = [i, type];
				}

				// Update the percentage count.
				prevPct = newPct;
			}
		});

		// Reset the spectrum.
		scope_Spectrum.direction = originalSpectrumDirection;

		return indexes;
	}

	function addMarking ( spread, filterFunc, formatter ) {

		var style = ['horizontal', 'vertical'][options.ort],
			element = document.createElement('div'),
			out = '';

		addClass(element, cssClasses[20]);
		addClass(element, cssClasses[20] + '-' + style);

		function getSize( type ){
			return [ '-normal', '-large', '-sub' ][type];
		}

		function getTags( offset, source, values ) {
			return 'class="' + source + ' ' +
				source + '-' + style + ' ' +
				source + getSize(values[1]) +
				'" style="' + options.style + ': ' + offset + '%"';
		}

		function addSpread ( offset, values ){

			if ( scope_Spectrum.direction ) {
				offset = 100 - offset;
			}

			// Apply the filter function, if it is set.
			values[1] = (values[1] && filterFunc) ? filterFunc(values[0], values[1]) : values[1];

			// Add a marker for every point
			out += '<div ' + getTags(offset, cssClasses[21], values) + '></div>';

			// Values are only appended for points marked '1' or '2'.
			if ( values[1] ) {
				out += '<div '+getTags(offset, cssClasses[22], values)+'>' + formatter.to(values[0]) + '</div>';
			}
		}

		// Append all points.
		Object.keys(spread).forEach(function(a){
			addSpread(a, spread[a]);
		});
		element.innerHTML = out;

		return element;
	}

	function pips ( grid ) {

	var mode = grid.mode,
		density = grid.density || 1,
		filter = grid.filter || false,
		values = grid.values || false,
		stepped = grid.stepped || false,
		group = getGroup( mode, values, stepped ),
		spread = generateSpread( density, mode, group ),
		format = grid.format || {
			to: Math.round
		};

		return scope_Target.appendChild(addMarking(
			spread,
			filter,
			format
		));
	}


	// Shorthand for base dimensions.
	function baseSize ( ) {
		var rect = scope_Base.getBoundingClientRect(), alt = 'offset' + ['Width', 'Height'][options.ort];
		return options.ort === 0 ? (rect.width||scope_Base[alt]) : (rect.height||scope_Base[alt]);
	}

	// External event handling
	function fireEvent ( event, handleNumber, tap ) {

		if ( handleNumber !== undefined && options.handles !== 1 ) {
			handleNumber = Math.abs(handleNumber - options.dir);
		}

		Object.keys(scope_Events).forEach(function( targetEvent ) {

			var eventType = targetEvent.split('.')[0];

			if ( event === eventType ) {
				scope_Events[targetEvent].forEach(function( callback ) {

					callback.call(
						// Use the slider public API as the scope ('this')
						scope_Self,
						// Return values as array, so arg_1[arg_2] is always valid.
						asArray(valueGet()),
						// Handle index, 0 or 1
						handleNumber,
						// Unformatted slider values
						asArray(inSliderOrder(Array.prototype.slice.call(scope_Values))),
						// Event is fired by tap, true or false
						tap || false,
						// Left offset of the handle, in relation to the slider
						scope_Locations
					);
				});
			}
		});
	}

	// Returns the input array, respecting the slider direction configuration.
	function inSliderOrder ( values ) {

		// If only one handle is used, return a single value.
		if ( values.length === 1 ){
			return values[0];
		}

		if ( options.dir ) {
			return values.reverse();
		}

		return values;
	}


	// Handler for attaching events trough a proxy.
	function attach ( events, element, callback, data ) {

		// This function can be used to 'filter' events to the slider.
		// element is a node, not a nodeList

		var method = function ( e ){

			if ( scope_Target.hasAttribute('disabled') ) {
				return false;
			}

			// Stop if an active 'tap' transition is taking place.
			if ( hasClass(scope_Target, cssClasses[14]) ) {
				return false;
			}

			e = fixEvent(e, data.pageOffset);

			// Ignore right or middle clicks on start #454
			if ( events === actions.start && e.buttons !== undefined && e.buttons > 1 ) {
				return false;
			}

			// Ignore right or middle clicks on start #454
			if ( data.hover && e.buttons ) {
				return false;
			}

			e.calcPoint = e.points[ options.ort ];

			// Call the event handler with the event [ and additional data ].
			callback ( e, data );

		}, methods = [];

		// Bind a closure on the target for every event type.
		events.split(' ').forEach(function( eventName ){
			element.addEventListener(eventName, method, false);
			methods.push([eventName, method]);
		});

		return methods;
	}

	// Handle movement on document for handle and range drag.
	function move ( event, data ) {

		// Fix #498
		// Check value of .buttons in 'start' to work around a bug in IE10 mobile (data.buttonsProperty).
		// https://connect.microsoft.com/IE/feedback/details/927005/mobile-ie10-windows-phone-buttons-property-of-pointermove-event-always-zero
		// IE9 has .buttons and .which zero on mousemove.
		// Firefox breaks the spec MDN defines.
		if ( navigator.appVersion.indexOf("MSIE 9") === -1 && event.buttons === 0 && data.buttonsProperty !== 0 ) {
			return end(event, data);
		}

		var handles = data.handles || scope_Handles, positions, state = false,
			proposal = ((event.calcPoint - data.start) * 100) / data.baseSize,
			handleNumber = handles[0] === scope_Handles[0] ? 0 : 1, i;

		// Calculate relative positions for the handles.
		positions = getPositions( proposal, data.positions, handles.length > 1);

		state = setHandle ( handles[0], positions[handleNumber], handles.length === 1 );

		if ( handles.length > 1 ) {

			state = setHandle ( handles[1], positions[handleNumber?0:1], false ) || state;

			if ( state ) {
				// fire for both handles
				for ( i = 0; i < data.handles.length; i++ ) {
					fireEvent('slide', i);
				}
			}
		} else if ( state ) {
			// Fire for a single handle
			fireEvent('slide', handleNumber);
		}
	}

	// Unbind move events on document, call callbacks.
	function end ( event, data ) {

		// The handle is no longer active, so remove the class.
		var active = scope_Base.querySelector( '.' + cssClasses[15] ),
			handleNumber = data.handles[0] === scope_Handles[0] ? 0 : 1;

		if ( active !== null ) {
			removeClass(active, cssClasses[15]);
		}

		// Remove cursor styles and text-selection events bound to the body.
		if ( event.cursor ) {
			document.body.style.cursor = '';
			document.body.removeEventListener('selectstart', document.body.noUiListener);
		}

		var d = document.documentElement;

		// Unbind the move and end events, which are added on 'start'.
		d.noUiListeners.forEach(function( c ) {
			d.removeEventListener(c[0], c[1]);
		});

		// Remove dragging class.
		removeClass(scope_Target, cssClasses[12]);

		// Fire the change and set events.
		fireEvent('set', handleNumber);
		fireEvent('change', handleNumber);

		// If this is a standard handle movement, fire the end event.
		if ( data.handleNumber !== undefined ) {
			fireEvent('end', data.handleNumber);
		}
	}

	// Fire 'end' when a mouse or pen leaves the document.
	function documentLeave ( event, data ) {
		if ( event.type === "mouseout" && event.target.nodeName === "HTML" && event.relatedTarget === null ){
			end ( event, data );
		}
	}

	// Bind move events on document.
	function start ( event, data ) {

		var d = document.documentElement;

		// Mark the handle as 'active' so it can be styled.
		if ( data.handles.length === 1 ) {
			addClass(data.handles[0].children[0], cssClasses[15]);

			// Support 'disabled' handles
			if ( data.handles[0].hasAttribute('disabled') ) {
				return false;
			}
		}

		// Fix #551, where a handle gets selected instead of dragged.
		event.preventDefault();

		// A drag should never propagate up to the 'tap' event.
		event.stopPropagation();

		// Attach the move and end events.
		var moveEvent = attach(actions.move, d, move, {
			start: event.calcPoint,
			baseSize: baseSize(),
			pageOffset: event.pageOffset,
			handles: data.handles,
			handleNumber: data.handleNumber,
			buttonsProperty: event.buttons,
			positions: [
				scope_Locations[0],
				scope_Locations[scope_Handles.length - 1]
			]
		}), endEvent = attach(actions.end, d, end, {
			handles: data.handles,
			handleNumber: data.handleNumber
		});

		var outEvent = attach("mouseout", d, documentLeave, {
			handles: data.handles,
			handleNumber: data.handleNumber
		});

		d.noUiListeners = moveEvent.concat(endEvent, outEvent);

		// Text selection isn't an issue on touch devices,
		// so adding cursor styles can be skipped.
		if ( event.cursor ) {

			// Prevent the 'I' cursor and extend the range-drag cursor.
			document.body.style.cursor = getComputedStyle(event.target).cursor;

			// Mark the target with a dragging state.
			if ( scope_Handles.length > 1 ) {
				addClass(scope_Target, cssClasses[12]);
			}

			var f = function(){
				return false;
			};

			document.body.noUiListener = f;

			// Prevent text selection when dragging the handles.
			document.body.addEventListener('selectstart', f, false);
		}

		if ( data.handleNumber !== undefined ) {
			fireEvent('start', data.handleNumber);
		}
	}

	// Move closest handle to tapped location.
	function tap ( event ) {

		var location = event.calcPoint, total = 0, handleNumber, to;

		// The tap event shouldn't propagate up and cause 'edge' to run.
		event.stopPropagation();

		// Add up the handle offsets.
		scope_Handles.forEach(function(a){
			total += offset(a)[ options.style ];
		});

		// Find the handle closest to the tapped position.
		handleNumber = ( location < total/2 || scope_Handles.length === 1 ) ? 0 : 1;
		
		// Check if handler is not disablet if yes set number to the next handler
		if (scope_Handles[handleNumber].hasAttribute('disabled')) {
			handleNumber = handleNumber ? 0 : 1;
		}

		location -= offset(scope_Base)[ options.style ];

		// Calculate the new position.
		to = ( location * 100 ) / baseSize();

		if ( !options.events.snap ) {
			// Flag the slider as it is now in a transitional state.
			// Transition takes 300 ms, so re-enable the slider afterwards.
			addClassFor( scope_Target, cssClasses[14], 300 );
		}

		// Support 'disabled' handles
		if ( scope_Handles[handleNumber].hasAttribute('disabled') ) {
			return false;
		}

		// Find the closest handle and calculate the tapped point.
		// The set handle to the new position.
		setHandle( scope_Handles[handleNumber], to );

		fireEvent('slide', handleNumber, true);
		fireEvent('set', handleNumber, true);
		fireEvent('change', handleNumber, true);

		if ( options.events.snap ) {
			start(event, { handles: [scope_Handles[handleNumber]] });
		}
	}

	// Fires a 'hover' event for a hovered mouse/pen position.
	function hover ( event ) {

		var location = event.calcPoint - offset(scope_Base)[ options.style ],
			to = scope_Spectrum.getStep(( location * 100 ) / baseSize()),
			value = scope_Spectrum.fromStepping( to );

		Object.keys(scope_Events).forEach(function( targetEvent ) {
			if ( 'hover' === targetEvent.split('.')[0] ) {
				scope_Events[targetEvent].forEach(function( callback ) {
					callback.call( scope_Self, value );
				});
			}
		});
	}

	// Attach events to several slider parts.
	function events ( behaviour ) {

		var i, drag;

		// Attach the standard drag event to the handles.
		if ( !behaviour.fixed ) {

			for ( i = 0; i < scope_Handles.length; i += 1 ) {

				// These events are only bound to the visual handle
				// element, not the 'real' origin element.
				attach ( actions.start, scope_Handles[i].children[0], start, {
					handles: [ scope_Handles[i] ],
					handleNumber: i
				});
			}
		}

		// Attach the tap event to the slider base.
		if ( behaviour.tap ) {

			attach ( actions.start, scope_Base, tap, {
				handles: scope_Handles
			});
		}

		// Fire hover events
		if ( behaviour.hover ) {
			attach ( actions.move, scope_Base, hover, { hover: true } );
			for ( i = 0; i < scope_Handles.length; i += 1 ) {
				['mousemove MSPointerMove pointermove'].forEach(function( eventName ){
					scope_Handles[i].children[0].addEventListener(eventName, stopPropagation, false);
				});
			}
		}

		// Make the range draggable.
		if ( behaviour.drag ){

			drag = [scope_Base.querySelector( '.' + cssClasses[7] )];
			addClass(drag[0], cssClasses[10]);

			// When the range is fixed, the entire range can
			// be dragged by the handles. The handle in the first
			// origin will propagate the start event upward,
			// but it needs to be bound manually on the other.
			if ( behaviour.fixed ) {
				drag.push(scope_Handles[(drag[0] === scope_Handles[0] ? 1 : 0)].children[0]);
			}

			drag.forEach(function( element ) {
				attach ( actions.start, element, start, {
					handles: scope_Handles
				});
			});
		}
	}


	// Test suggested values and apply margin, step.
	function setHandle ( handle, to, noLimitOption ) {

		var trigger = handle !== scope_Handles[0] ? 1 : 0,
			lowerMargin = scope_Locations[0] + options.margin,
			upperMargin = scope_Locations[1] - options.margin,
			lowerLimit = scope_Locations[0] + options.limit,
			upperLimit = scope_Locations[1] - options.limit;

		// For sliders with multiple handles,
		// limit movement to the other handle.
		// Apply the margin option by adding it to the handle positions.
		if ( scope_Handles.length > 1 ) {
			to = trigger ? Math.max( to, lowerMargin ) : Math.min( to, upperMargin );
		}

		// The limit option has the opposite effect, limiting handles to a
		// maximum distance from another. Limit must be > 0, as otherwise
		// handles would be unmoveable. 'noLimitOption' is set to 'false'
		// for the .val() method, except for pass 4/4.
		if ( noLimitOption !== false && options.limit && scope_Handles.length > 1 ) {
			to = trigger ? Math.min ( to, lowerLimit ) : Math.max( to, upperLimit );
		}

		// Handle the step option.
		to = scope_Spectrum.getStep( to );

		// Limit to 0/100 for .val input, trim anything beyond 7 digits, as
		// JavaScript has some issues in its floating point implementation.
		to = limit(parseFloat(to.toFixed(7)));

		// Return false if handle can't move
		if ( to === scope_Locations[trigger] ) {
			return false;
		}

		// Set the handle to the new position.
		// Use requestAnimationFrame for efficient painting.
		// No significant effect in Chrome, Edge sees dramatic
		// performace improvements.
		if ( window.requestAnimationFrame ) {
			window.requestAnimationFrame(function(){
				handle.style[options.style] = to + '%';
			});
		} else {
			handle.style[options.style] = to + '%';
		}

		// Force proper handle stacking
		if ( !handle.previousSibling ) {
			removeClass(handle, cssClasses[17]);
			if ( to > 50 ) {
				addClass(handle, cssClasses[17]);
			}
		}

		// Update locations.
		scope_Locations[trigger] = to;

		// Convert the value to the slider stepping/range.
		scope_Values[trigger] = scope_Spectrum.fromStepping( to );

		fireEvent('update', trigger);

		return true;
	}

	// Loop values from value method and apply them.
	function setValues ( count, values ) {

		var i, trigger, to;

		// With the limit option, we'll need another limiting pass.
		if ( options.limit ) {
			count += 1;
		}

		// If there are multiple handles to be set run the setting
		// mechanism twice for the first handle, to make sure it
		// can be bounced of the second one properly.
		for ( i = 0; i < count; i += 1 ) {

			trigger = i%2;

			// Get the current argument from the array.
			to = values[trigger];

			// Setting with null indicates an 'ignore'.
			// Inputting 'false' is invalid.
			if ( to !== null && to !== false ) {

				// If a formatted number was passed, attemt to decode it.
				if ( typeof to === 'number' ) {
					to = String(to);
				}

				to = options.format.from( to );

				// Request an update for all links if the value was invalid.
				// Do so too if setting the handle fails.
				if ( to === false || isNaN(to) || setHandle( scope_Handles[trigger], scope_Spectrum.toStepping( to ), i === (3 - options.dir) ) === false ) {
					fireEvent('update', trigger);
				}
			}
		}
	}

	// Set the slider value.
	function valueSet ( input ) {

		var count, values = asArray( input ), i;

		// The RTL settings is implemented by reversing the front-end,
		// internal mechanisms are the same.
		if ( options.dir && options.handles > 1 ) {
			values.reverse();
		}

		// Animation is optional.
		// Make sure the initial values where set before using animated placement.
		if ( options.animate && scope_Locations[0] !== -1 ) {
			addClassFor( scope_Target, cssClasses[14], 300 );
		}

		// Determine how often to set the handles.
		count = scope_Handles.length > 1 ? 3 : 1;

		if ( values.length === 1 ) {
			count = 1;
		}

		setValues ( count, values );

		// Fire the 'set' event for both handles.
		for ( i = 0; i < scope_Handles.length; i++ ) {

			// Fire the event only for handles that received a new value, as per #579
			if ( values[i] !== null ) {
				fireEvent('set', i);
			}
		}
	}

	// Get the slider value.
	function valueGet ( ) {

		var i, retour = [];

		// Get the value from all handles.
		for ( i = 0; i < options.handles; i += 1 ){
			retour[i] = options.format.to( scope_Values[i] );
		}

		return inSliderOrder( retour );
	}

	// Removes classes from the root and empties it.
	function destroy ( ) {

		cssClasses.forEach(function(cls){
			if ( !cls ) { return; } // Ignore empty classes
			removeClass(scope_Target, cls);
		});

		while (scope_Target.firstChild) {
			scope_Target.removeChild(scope_Target.firstChild);
		}

		delete scope_Target.noUiSlider;
	}

	// Get the current step size for the slider.
	function getCurrentStep ( ) {

		// Check all locations, map them to their stepping point.
		// Get the step point, then find it in the input list.
		var retour = scope_Locations.map(function( location, index ){

			var step = scope_Spectrum.getApplicableStep( location ),

				// As per #391, the comparison for the decrement step can have some rounding issues.
				// Round the value to the precision used in the step.
				stepDecimals = countDecimals(String(step[2])),

				// Get the current numeric value
				value = scope_Values[index],

				// To move the slider 'one step up', the current step value needs to be added.
				// Use null if we are at the maximum slider value.
				increment = location === 100 ? null : step[2],

				// Going 'one step down' might put the slider in a different sub-range, so we
				// need to switch between the current or the previous step.
				prev = Number((value - step[2]).toFixed(stepDecimals)),

				// If the value fits the step, return the current step value. Otherwise, use the
				// previous step. Return null if the slider is at its minimum value.
				decrement = location === 0 ? null : (prev >= step[1]) ? step[2] : (step[0] || false);

			return [decrement, increment];
		});

		// Return values in the proper order.
		return inSliderOrder( retour );
	}

	// Attach an event to this slider, possibly including a namespace
	function bindEvent ( namespacedEvent, callback ) {
		scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
		scope_Events[namespacedEvent].push(callback);

		// If the event bound is 'update,' fire it immediately for all handles.
		if ( namespacedEvent.split('.')[0] === 'update' ) {
			scope_Handles.forEach(function(a, index){
				fireEvent('update', index);
			});
		}
	}

	// Undo attachment of event
	function removeEvent ( namespacedEvent ) {

		var event = namespacedEvent.split('.')[0],
			namespace = namespacedEvent.substring(event.length);

		Object.keys(scope_Events).forEach(function( bind ){

			var tEvent = bind.split('.')[0],
				tNamespace = bind.substring(tEvent.length);

			if ( (!event || event === tEvent) && (!namespace || namespace === tNamespace) ) {
				delete scope_Events[bind];
			}
		});
	}

	// Updateable: margin, limit, step, range, animate, snap
	function updateOptions ( optionsToUpdate ) {

		var v = valueGet(), i, newOptions = testOptions({
			start: [0, 0],
			margin: optionsToUpdate.margin,
			limit: optionsToUpdate.limit,
			step: optionsToUpdate.step,
			range: optionsToUpdate.range,
			animate: optionsToUpdate.animate,
			snap: optionsToUpdate.snap === undefined ? options.snap : optionsToUpdate.snap
		});

		['margin', 'limit', 'step', 'range', 'animate'].forEach(function(name){
			if ( optionsToUpdate[name] !== undefined ) {
				options[name] = optionsToUpdate[name];
			}
		});

		// Save current spectrum direction as testOptions in testRange call
		// doesn't rely on current direction
		newOptions.spectrum.direction = scope_Spectrum.direction;
		scope_Spectrum = newOptions.spectrum;

		// Invalidate the current positioning so valueSet forces an update.
		scope_Locations = [-1, -1];
		valueSet(v);

		for ( i = 0; i < scope_Handles.length; i++ ) {
			fireEvent('update', i);
		}
	}


	// Throw an error if the slider was already initialized.
	if ( scope_Target.noUiSlider ) {
		throw new Error('Slider was already initialized.');
	}

	// Create the base element, initialise HTML and set classes.
	// Add handles and links.
	scope_Base = addSlider( options.dir, options.ort, scope_Target );
	scope_Handles = addHandles( options.handles, options.dir, scope_Base );

	// Set the connect classes.
	addConnection ( options.connect, scope_Target, scope_Handles );

	if ( options.pips ) {
		pips(options.pips);
	}

	if ( options.tooltips ) {
		tooltips();
	}

	scope_Self = {
		destroy: destroy,
		steps: getCurrentStep,
		on: bindEvent,
		off: removeEvent,
		get: valueGet,
		set: valueSet,
		updateOptions: updateOptions,
		options: options, // Issue #600
		target: scope_Target, // Issue #597
		pips: pips // Issue #594
	};

	// Attach user events.
	events( options.events );

	return scope_Self;

}


	// Run the standard initializer
	function initialize ( target, originalOptions ) {

		if ( !target.nodeName ) {
			throw new Error('noUiSlider.create requires a single element.');
		}

		// Test the options and create the slider environment;
		var options = testOptions( originalOptions, target ),
			slider = closure( target, options );

		// Use the public value method to set the start values.
		slider.set(options.start);

		target.noUiSlider = slider;
		return slider;
	}

	// Use an object instead of a function for future expansibility;
	return {
		create: initialize
	};

}));
/** 
  * Template Name: Daily Shop
  * Version: 1.0  
  * Template Scripts
  * Author: MarkUps
  * Author URI: http://www.markups.io/

  Custom JS
  

  1. CARTBOX
  2. TOOLTIP
  3. PRODUCT VIEW SLIDER 
  4. POPULAR PRODUCT SLIDER (SLICK SLIDER) 
  5. FEATURED PRODUCT SLIDER (SLICK SLIDER)
  6. LATEST PRODUCT SLIDER (SLICK SLIDER) 
  7. TESTIMONIAL SLIDER (SLICK SLIDER)
  8. CLIENT BRAND SLIDER (SLICK SLIDER)
  9. PRICE SLIDER  (noUiSlider SLIDER)
  10. SCROLL TOP BUTTON
  11. PRELOADER
  12. GRID AND LIST LAYOUT CHANGER 
  13. RELATED ITEM SLIDER (SLICK SLIDER)

  
**/

jQuery(function($){


  /* ----------------------------------------------------------- */
  /*  1. CARTBOX 
  /* ----------------------------------------------------------- */
    
     jQuery(".aa-cartbox").hover(function(){
      jQuery(this).find(".aa-cartbox-summary").fadeIn(500);
    }
      ,function(){
          jQuery(this).find(".aa-cartbox-summary").fadeOut(500);
      }
     );   
  
  /* ----------------------------------------------------------- */
  /*  2. TOOLTIP
  /* ----------------------------------------------------------- */    
    jQuery('[data-toggle="tooltip"]').tooltip();
    jQuery('[data-toggle2="tooltip"]').tooltip();

  /* ----------------------------------------------------------- */
  /*  3. PRODUCT VIEW SLIDER 
  /* ----------------------------------------------------------- */    

    jQuery('#demo-1 .simpleLens-thumbnails-container img').simpleGallery({
        loading_image: 'demo/images/loading.gif'
    });

    jQuery('#demo-1 .simpleLens-big-image').simpleLens({
        loading_image: 'demo/images/loading.gif'
    });

  /* ----------------------------------------------------------- */
  /*  4. POPULAR PRODUCT SLIDER (SLICK SLIDER)
  /* ----------------------------------------------------------- */      

    jQuery('.aa-popular-slider').slick({
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    }); 

  
  /* ----------------------------------------------------------- */
  /*  5. FEATURED PRODUCT SLIDER (SLICK SLIDER)
  /* ----------------------------------------------------------- */      

    jQuery('.aa-featured-slider').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
    });
    
  /* ----------------------------------------------------------- */
  /*  6. LATEST PRODUCT SLIDER (SLICK SLIDER)
  /* ----------------------------------------------------------- */      
    jQuery('.aa-latest-slider').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
    });

  /* ----------------------------------------------------------- */
  /*  7. TESTIMONIAL SLIDER (SLICK SLIDER)
  /* ----------------------------------------------------------- */     
    
    jQuery('.aa-testimonial-slider').slick({
      dots: true,
      infinite: true,
      arrows: false,
      speed: 300,
      slidesToShow: 1,
      adaptiveHeight: true
    });

  /* ----------------------------------------------------------- */
  /*  8. CLIENT BRAND SLIDER (SLICK SLIDER)
  /* ----------------------------------------------------------- */  

    jQuery('.aa-client-brand-slider').slick({
        dots: false,
        infinite: false,
        speed: 300,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
    });

  /* ----------------------------------------------------------- */
  /*  9. PRICE SLIDER  (noUiSlider SLIDER)
  /* ----------------------------------------------------------- */        

    jQuery(function(){
      if($('body').is('.productPage')){
       var skipSlider = document.getElementById('skipstep');
        noUiSlider.create(skipSlider, {
            range: {
                'min': 0,
                '10%': 10,
                '20%': 20,
                '30%': 30,
                '40%': 40,
                '50%': 50,
                '60%': 60,
                '70%': 70,
                '80%': 80,
                '90%': 90,
                'max': 100
            },
            snap: true,
            connect: true,
            start: [20, 70]
        });
        // for value print
        var skipValues = [
          document.getElementById('skip-value-lower'),
          document.getElementById('skip-value-upper')
        ];

        skipSlider.noUiSlider.on('update', function( values, handle ) {
          skipValues[handle].innerHTML = values[handle];
        });
      }
    });


    
  /* ----------------------------------------------------------- */
  /*  10. SCROLL TOP BUTTON
  /* ----------------------------------------------------------- */

  //Check to see if the window is top if not then display button

    jQuery(window).scroll(function(){
      if ($(this).scrollTop() > 300) {
        $('.scrollToTop').fadeIn();
      } else {
        $('.scrollToTop').fadeOut();
      }
    });
     
    //Click event to scroll to top

    jQuery('.scrollToTop').click(function(){
      $('html, body').animate({scrollTop : 0},800);
      return false;
    });
  
  /* ----------------------------------------------------------- */
  /*  11. PRELOADER
  /* ----------------------------------------------------------- */

    jQuery(window).load(function() { // makes sure the whole site is loaded      
      jQuery('#wpf-loader-two').delay(200).fadeOut('slow'); // will fade out      
    })

  /* ----------------------------------------------------------- */
  /*  12. GRID AND LIST LAYOUT CHANGER 
  /* ----------------------------------------------------------- */

  jQuery("#list-catg").click(function(e){
    e.preventDefault(e);
    jQuery(".aa-product-catg").addClass("list");
  });
  jQuery("#grid-catg").click(function(e){
    e.preventDefault(e);
    jQuery(".aa-product-catg").removeClass("list");
  });


  /* ----------------------------------------------------------- */
  /*  13. RELATED ITEM SLIDER (SLICK SLIDER)
  /* ----------------------------------------------------------- */      

    jQuery('.aa-related-item-slider').slick({
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    }); 
    
});

