"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var common_1 = require("@wildebeest/common");
var Combokeys = require("combokeys");
var KeyboardShortcutsService = (function () {
    function KeyboardShortcutsService(emitterService) {
        this.emitter = emitterService.createEmitter();
        this.shortcuts = {};
        this.shortcutsReverse = {};
        this.combokeys = new Combokeys(document.body);
    }
    KeyboardShortcutsService.prototype.getEmitter = function () {
        return this.emitter;
    };
    KeyboardShortcutsService.prototype.setShortcut = function (name, shortcut) {
        var _this = this;
        if (!this.shortcuts[name]) {
            this.combokeys.bind(shortcut, function (event, handler) {
                if (!_this.shortcutsReverse[handler]) {
                    return;
                }
                _this.emitter.emit(_this.shortcutsReverse[handler], {
                    event: event,
                    hotkey: handler
                });
            });
        }
        this.shortcuts[name] = shortcut;
        this.shortcutsReverse[shortcut] = name;
    };
    KeyboardShortcutsService.prototype.all = function () {
        return this.shortcuts;
    };
    KeyboardShortcutsService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_1.EmitterService)),
        __metadata("design:paramtypes", [common_1.EmitterService])
    ], KeyboardShortcutsService);
    return KeyboardShortcutsService;
}());
exports.KeyboardShortcutsService = KeyboardShortcutsService;
//# sourceMappingURL=KeyboardShortcutsService.js.map