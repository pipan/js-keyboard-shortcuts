"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@wildebeest/common");
var KeyboardShortcutsService_1 = require("./KeyboardShortcutsService");
var KeyboardShortcutsModule = (function () {
    function KeyboardShortcutsModule() {
    }
    KeyboardShortcutsModule.prototype.getDependencies = function () {
        return [common_1.CommonModule];
    };
    KeyboardShortcutsModule.prototype.register = function (container) {
        container.bind(KeyboardShortcutsService_1.KeyboardShortcutsService).toSelf().inSingletonScope();
    };
    KeyboardShortcutsModule.prototype.boot = function (container) { };
    return KeyboardShortcutsModule;
}());
exports.KeyboardShortcutsModule = KeyboardShortcutsModule;
//# sourceMappingURL=KeyboardShortcutsModule.js.map