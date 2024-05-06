"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  loadYoga: true
};
exports.loadYoga = loadYoga;
var _wrapAssembly = _interopRequireDefault(require("../wrapAssembly"));
var _YGEnums = require("../generated/YGEnums");
Object.keys(_YGEnums).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _YGEnums[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _YGEnums[key];
    }
  });
});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

const loadAssembly = require('../../binaries/wasm-async-node');
async function loadYoga() {
  return (0, _wrapAssembly.default)(await loadAssembly());
}
//# sourceMappingURL=wasm-async-node.js.map