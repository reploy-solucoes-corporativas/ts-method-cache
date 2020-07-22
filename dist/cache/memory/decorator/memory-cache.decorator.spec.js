"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var memory_cache_decorator_1 = require("./memory-cache.decorator");
describe('Memory cache decorator is properly set', function () {
    var TestCache = /** @class */ (function () {
        function TestCache() {
            this.called = 0;
        }
        TestCache.prototype.testMethod = function () {
            this.called++;
        };
        __decorate([
            memory_cache_decorator_1.MemoryCache()
        ], TestCache.prototype, "testMethod", null);
        return TestCache;
    }());
    var descriptor = Object.getOwnPropertyDescriptor(TestCache.prototype, 'testMethod');
    if (descriptor) {
        memory_cache_decorator_1.MemoryCache()(TestCache.prototype, 'testMethod', descriptor);
    }
    var testCache = new TestCache();
    it('should only call the test method once', function () {
        testCache.testMethod();
        testCache.testMethod();
        expect(testCache.called).toEqual(1);
    });
});
