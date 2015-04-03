
var _ = require('lodash');

angular.module('ngvCommons', [])
    .factory('KeyUtils', function () {
        return {
            isNumericKey: function (keyCode) {
                return (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105);
            },
            isBackSpace: function (keyCode) {
                return keyCode == 8;
            },
            isArrowKey: function (keyCode) {
                return keyCode >= 37 && keyCode <= 40;
            },
            isArrowUp: function (keyCode) {
                return keyCode == 38;
            },
            isArrowDown: function (keyCode) {
                return keyCode == 40;
            },
            isArrowLeft: function (keyCode) {
                return keyCode == 37;
            },
            isArrowRight: function (keyCode) {
                return keyCode == 39;
            },
            isEnter: function (keyCode) {
                return keyCode == 13;
            },
            isTab: function (keyCode) {
                return keyCode == 9;
            },
            isEsc: function (keyCode) {
                return keyCode == 27;
            },
            isShift: function (keyCode) {
                return keyCode == 16;
            },
            isAlt: function (keyCode) {
                return keyCode == 18;
            },
            isCtrl: function (keyCode) {
                return keyCode == 17;
            },
            isMeta: function (keyCode) {
                return this.isAlt(keyCode) || this.isCtrl(keyCode) || keyCode == 91;
            }
        };
    });