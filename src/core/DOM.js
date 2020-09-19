class DOM {
  constructor(selector) {
    this.$el = typeof selector === 'string' ?
        document.querySelector(selector) : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  get dataset() {
    return this.$el.dataset;
  }

  getCoordinates() {
    return this.$el.getBoundingClientRect();
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  remove(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  append(node) {
    if (node instanceof DOM) {
      node = node.$el;
    }

    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }

    return this;
  }

  css(styles = {}) {
    Object.entries(styles).forEach(([key, value]) => {
      this.$el.style[key] = value;
    });
  }
}

// create instance of DOM for already exists node with selector
export function $(selector) {
  return new DOM(selector);
}

// create instance of DOM for new node with tagName and classes
$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
