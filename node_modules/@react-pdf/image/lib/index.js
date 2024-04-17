import _regeneratorRuntime from '@babel/runtime/helpers/regeneratorRuntime';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import fs from 'fs';
import url from 'url';
import path from 'path';
import fetch from 'cross-fetch';
import PNG from '@react-pdf/png-js';
import _JPEG from 'jay-peg';

PNG.isValid = function isValid(data) {
  try {
    return !!new PNG(data);
  } catch (e) {
    return false;
  }
};

var JPEG = function JPEG(data) {
  this.data = null;
  this.width = null;
  this.height = null;
  this.data = data;
  if (data.readUInt16BE(0) !== 0xffd8) {
    throw new Error('SOI not found in JPEG');
  }
  var markers = _JPEG.decode(this.data);
  for (var i = 0; i < markers.length; i += 1) {
    var marker = markers[i];
    if (marker.name === 'EXIF' && marker.entries.orientation) {
      this.orientation = marker.entries.orientation;
    }
    if (marker.name === 'SOF') {
      this.width || (this.width = marker.width);
      this.height || (this.height = marker.height);
    }
  }
  if (this.orientation > 4) {
    var _ref = [this.height, this.width];
    this.width = _ref[0];
    this.height = _ref[1];
  }
};
JPEG.isValid = function (data) {
  return data && Buffer.isBuffer(data) && data.readUInt16BE(0) === 0xffd8;
};

var createCache = function createCache(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
    _ref$limit = _ref.limit,
    limit = _ref$limit === void 0 ? 100 : _ref$limit;
  var cache = {};
  var keys = [];
  return {
    get: function get(key) {
      return cache[key];
    },
    set: function set(key, value) {
      keys.push(key);
      if (keys.length > limit) {
        delete cache[keys.shift()];
      }
      cache[key] = value;
    },
    reset: function reset() {
      cache = {};
      keys = [];
    },
    length: function length() {
      return keys.length;
    }
  };
};

var IMAGE_CACHE = createCache({
  limit: 30
});
var getAbsoluteLocalPath = function getAbsoluteLocalPath(src) {
  var _url$parse = url.parse(src),
    protocol = _url$parse.protocol,
    auth = _url$parse.auth,
    host = _url$parse.host,
    port = _url$parse.port,
    hostname = _url$parse.hostname,
    pathname = _url$parse.path;
  var absolutePath = path.resolve(pathname);
  if (protocol && protocol !== 'file:' || auth || host || port || hostname) {
    return undefined;
  }
  return absolutePath;
};
var fetchLocalFile = function fetchLocalFile(src) {
  return new Promise(function (resolve, reject) {
    try {
      if (false) ;
      var absolutePath = getAbsoluteLocalPath(src);
      if (!absolutePath) {
        reject(new Error("Cannot fetch non-local path: " + src));
        return;
      }
      fs.readFile(absolutePath, function (err, data) {
        return err ? reject(err) : resolve(data);
      });
    } catch (err) {
      reject(err);
    }
  });
};
var fetchRemoteFile = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(uri, options) {
    var response, buffer;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return fetch(uri, options);
        case 2:
          response = _context.sent;
          _context.next = 5;
          return response.buffer ? response.buffer() : response.arrayBuffer();
        case 5:
          buffer = _context.sent;
          return _context.abrupt("return", buffer.constructor.name === 'Buffer' ? buffer : Buffer.from(buffer));
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function fetchRemoteFile(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var isValidFormat = function isValidFormat(format) {
  var lower = format.toLowerCase();
  return lower === 'jpg' || lower === 'jpeg' || lower === 'png';
};
var guessFormat = function guessFormat(buffer) {
  var format;
  if (JPEG.isValid(buffer)) {
    format = 'jpg';
  } else if (PNG.isValid(buffer)) {
    format = 'png';
  }
  return format;
};
var isCompatibleBase64 = function isCompatibleBase64(_ref2) {
  var uri = _ref2.uri;
  return /^data:image\/[a-zA-Z]*;base64,[^"]*/g.test(uri);
};
function getImage(body, extension) {
  switch (extension.toLowerCase()) {
    case 'jpg':
    case 'jpeg':
      return new JPEG(body);
    case 'png':
      return new PNG(body);
    default:
      return null;
  }
}
var resolveBase64Image = function resolveBase64Image(_ref3) {
  var uri = _ref3.uri;
  var match = /^data:image\/([a-zA-Z]*);base64,([^"]*)/g.exec(uri);
  var format = match[1];
  var data = match[2];
  if (!isValidFormat(format)) {
    throw new Error("Base64 image invalid format: " + format);
  }
  return new Promise(function (resolve) {
    return resolve(getImage(Buffer.from(data, 'base64'), format));
  });
};
var resolveImageFromData = function resolveImageFromData(src) {
  if (src.data && src.format) {
    return new Promise(function (resolve) {
      return resolve(getImage(src.data, src.format));
    });
  }
  throw new Error("Invalid data given for local file: " + JSON.stringify(src));
};
var resolveBufferImage = function resolveBufferImage(buffer) {
  var format = guessFormat(buffer);
  if (format) {
    return new Promise(function (resolve) {
      return resolve(getImage(buffer, format));
    });
  }
  return Promise.resolve();
};
var resolveBlobImage = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(blob) {
    var type, arrayBuffer, _buffer, format, buffer;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          type = blob.type;
          if (!(!type || type === 'application/octet-stream')) {
            _context2.next = 7;
            break;
          }
          _context2.next = 4;
          return blob.arrayBuffer();
        case 4:
          arrayBuffer = _context2.sent;
          _buffer = Buffer.from(arrayBuffer);
          return _context2.abrupt("return", resolveBufferImage(_buffer));
        case 7:
          if (type.startsWith('image/')) {
            _context2.next = 9;
            break;
          }
          throw new Error("Invalid blob type: " + type);
        case 9:
          format = type.replace('image/', '');
          if (isValidFormat(format)) {
            _context2.next = 12;
            break;
          }
          throw new Error("Invalid blob type: " + type);
        case 12:
          _context2.next = 14;
          return blob.arrayBuffer();
        case 14:
          buffer = _context2.sent;
          return _context2.abrupt("return", getImage(Buffer.from(buffer), format));
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function resolveBlobImage(_x3) {
    return _ref4.apply(this, arguments);
  };
}();
var getImageFormat = function getImageFormat(body) {
  var isPng = body[0] === 137 && body[1] === 80 && body[2] === 78 && body[3] === 71 && body[4] === 13 && body[5] === 10 && body[6] === 26 && body[7] === 10;
  var isJpg = body[0] === 255 && body[1] === 216 && body[2] === 255;
  var extension = '';
  if (isPng) {
    extension = 'png';
  } else if (isJpg) {
    extension = 'jpg';
  } else {
    throw new Error('Not valid image extension');
  }
  return extension;
};
var resolveImageFromUrl = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(src) {
    var uri, body, headers, _src$method, method, credentials, data, extension;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          uri = src.uri, body = src.body, headers = src.headers, _src$method = src.method, method = _src$method === void 0 ? 'GET' : _src$method, credentials = src.credentials;
          if (!(getAbsoluteLocalPath(uri))) {
            _context3.next = 7;
            break;
          }
          _context3.next = 4;
          return fetchLocalFile(uri);
        case 4:
          _context3.t0 = _context3.sent;
          _context3.next = 10;
          break;
        case 7:
          _context3.next = 9;
          return fetchRemoteFile(uri, {
            body: body,
            headers: headers,
            method: method,
            credentials: credentials
          });
        case 9:
          _context3.t0 = _context3.sent;
        case 10:
          data = _context3.t0;
          extension = getImageFormat(data);
          return _context3.abrupt("return", getImage(data, extension));
        case 13:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function resolveImageFromUrl(_x4) {
    return _ref5.apply(this, arguments);
  };
}();
var resolveImage = function resolveImage(src, _temp) {
  var _ref6 = _temp === void 0 ? {} : _temp,
    _ref6$cache = _ref6.cache,
    cache = _ref6$cache === void 0 ? true : _ref6$cache;
  var image;
  var cacheKey = src.data ? src.data.toString() : src.uri;
  if (typeof Blob !== 'undefined' && src instanceof Blob) {
    image = resolveBlobImage(src);
  } else if (Buffer.isBuffer(src)) {
    image = resolveBufferImage(src);
  } else if (cache && IMAGE_CACHE.get(cacheKey)) {
    return IMAGE_CACHE.get(cacheKey);
  } else if (isCompatibleBase64(src)) {
    image = resolveBase64Image(src);
  } else if (typeof src === 'object' && src.data) {
    image = resolveImageFromData(src);
  } else {
    image = resolveImageFromUrl(src);
  }
  if (!image) {
    throw new Error('Cannot resolve image');
  }
  if (cache) {
    IMAGE_CACHE.set(cacheKey, image);
  }
  return image;
};

export { resolveImage as default };
