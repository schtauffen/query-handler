//! QueryHandler.js v1.0.0 | (c) 2015 Zach Dahl | MIT License
(function(window, factory) {
  if (typeof define === "function" && define.amd) {
    define(factory);
  } else if (typeof exports === "object") {
    module.exports = factory();
  } else {
    window["QueryHandler"] = factory();
  }
})(this, function() {
  class Query {
    constructor(string) {
      this.initialString = string;
      this.generateQueryObject(string);
    }

    generateQueryObject(str) {
      this.query = {};
      let arr = str.substr(1).split('&');
      for (var i = 0, il = arr.length; i < il; ++i) {
        let current = arr[i].split('=');
        let key = decodeURIComponent(current[0]);
        let value = this.smartParse(current[1]);

        if (typeof this.query[key] === "undefined") this.query[key] = value;
        else if (this.query[key] instanceof Array) this.query[key].push(value);
        else this.query[key] = [this.query[key], value];
      }
    }

    smartParse(val) {
      if (typeof val === "undefined") return null;
      if (/^(true|false|null)$/i.test(val)) return JSON.parse(val);
      if (!isNaN(+val)) return +val;
      return decodeURIComponent(val);
    }

    getQueryString() {
      let self = this;
      let result = $.map(this.query, function(val, key) {
        if (val instanceof Array) {
          return $.map(val, function(v, i) {
            return self.pairToString(key, v);
          }).join("&");
        }
        return self.pairToString(key, val);
      });
      return "?" + result.join('&');
    }

    pairToString(key, val) {
      key = encodeURIComponent(key);
      if (val === null) return key;
      return key + "=" + encodeURIComponent(val);
    }
  }

  return Query;
});
