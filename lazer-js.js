"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.lazer = void 0;
// ANSI Color Codes
var Color;
(function (Color) {
    Color["reset"] = "\u001B[0m";
    Color["red"] = "\u001B[31m";
    Color["green"] = "\u001B[32m";
    Color["yellow"] = "\u001B[33m";
    Color["blue"] = "\u001B[34m";
    Color["magenta"] = "\u001B[35m";
    Color["cyan"] = "\u001B[36m";
})(Color || (Color = {}));
var Printer = /** @class */ (function () {
    function Printer() {
        var _this = this;
        /// @ts-ignore Work out Deno vs Node.js environment
        this.echo = function (input) { try {
            return Deno.stdout.writeSync(new TextEncoder().encode(input));
        }
        catch (e) {
            return process.stdout.write(input);
        } };
        // Used to track state of calls to if/elseif/else()
        this.printNext = true;
        this.blockEntered = false;
        this["if"] = function (cond) {
            _this.blockEntered = cond;
            _this.printNext = cond;
            return _this;
        };
        this.elseif = function (cond) {
            // previous if/elseif block was entered, skip this block
            if (_this.blockEntered) {
                _this.printNext = false;
                return _this;
            }
            return _this["if"](cond);
        };
        this["else"] = function () {
            return _this.elseif(true);
        };
        // Reset state
        this.end = function () {
            _this.printNext = true;
            _this.blockEntered = false;
            return _this;
        };
        this.print = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!_this.printNext) {
                return _this;
            }
            var argString = args.reduce(function (a, c, i) {
                var isObject = typeof c === "object";
                var cString = isObject ? JSON.stringify(c, null, 4) : c;
                return i > 0 ? a + " " + cString : "" + a + cString;
            }, "");
            _this.echo(argString);
            return _this;
        };
        this.print_color = function (color) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (!_this.printNext) {
                return _this;
            }
            _this.echo(color);
            _this.print.apply(_this, args);
            _this.echo(Color.reset);
            return _this;
        };
        this.print_ln = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this.print.apply(_this, __spreadArrays(args, ["\n"]));
        };
        this.print_color_ln = function (color) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (!_this.printNext) {
                return _this;
            }
            _this.print_color.apply(_this, __spreadArrays([color], args));
            return _this.print_ln();
        };
        this.print_red = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this.print_color.apply(_this, __spreadArrays([Color.red], args));
        };
        this.print_red_ln = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this.print_color_ln.apply(_this, __spreadArrays([Color.red], args));
        };
        this.print_green = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this.print_color.apply(_this, __spreadArrays([Color.green], args));
        };
        this.print_green_ln = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this.print_color_ln.apply(_this, __spreadArrays([Color.green], args));
        };
        this.print_yellow = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this.print_color.apply(_this, __spreadArrays([Color.yellow], args));
        };
        this.print_yellow_ln = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this.print_color_ln.apply(_this, __spreadArrays([Color.yellow], args));
        };
        this.print_blue = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this.print_color.apply(_this, __spreadArrays([Color.blue], args));
        };
        this.print_blue_ln = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this.print_color_ln.apply(_this, __spreadArrays([Color.blue], args));
        };
        this.print_magenta = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this.print_color.apply(_this, __spreadArrays([Color.magenta], args));
        };
        this.print_magenta_ln = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this.print_color_ln.apply(_this, __spreadArrays([Color.magenta], args));
        };
        this.print_cyan = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this.print_color.apply(_this, __spreadArrays([Color.cyan], args));
        };
        this.print_cyan_ln = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this.print_color_ln.apply(_this, __spreadArrays([Color.cyan], args));
        };
        this.print_space = function (len) {
            if (len === void 0) { len = 1; }
            return _this.print(new Array(len + 1).join(" "));
        };
        this.print_utc_time = function () { return _this.print(new Date().toUTCString()); };
        this.print_pad_right = function (str, len, delim) {
            if (delim === void 0) { delim = " "; }
            var padLen = len - String(str).length;
            if (padLen > 0) {
                return _this.print(str + new Array(padLen + 1).join(delim));
            }
            else if (padLen < 0) {
                return _this.print(String(str).slice(0, len - String(padLen).length) + ("+" + -padLen));
            }
            return _this.print(str);
        };
        this.print_pad_left = function (str, len, delim) {
            if (delim === void 0) { delim = " "; }
            var padLen = len - String(str).length;
            if (padLen > 0) {
                return _this.print(new Array(padLen + 1).join(delim) + str);
            }
            return _this.print(str);
        };
        this.set_color = function (color) {
            if (!_this.printNext) {
                return _this;
            }
            _this.echo(color);
            return _this;
        };
        this.reset = function () { return _this.set_color(Color.reset); };
        this.set_color_red = function () { return _this.set_color(Color.red); };
        this.set_color_green = function () { return _this.set_color(Color.green); };
        this.set_color_yellow = function () { return _this.set_color(Color.yellow); };
        this.set_color_blue = function () { return _this.set_color(Color.blue); };
        this.set_color_magenta = function () { return _this.set_color(Color.magenta); };
        this.set_color_cyan = function () { return _this.set_color(Color.cyan); };
        if (!this.echo) {
            throw new Error("Deno or Node.js needs to be installed to use Printer.");
        }
    }
    return Printer;
}());
// Enforce calling reset before starting new print chain
var lazer = function () {
    var _a;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return (_a = new Printer().reset()).print.apply(_a, args);
};
exports.lazer = lazer;
