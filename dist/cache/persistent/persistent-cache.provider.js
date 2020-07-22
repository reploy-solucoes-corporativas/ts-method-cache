"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersistentCacheProvider = void 0;
var base_cache_provider_1 = require("../../core/provider/base-cache.provider");
var PersistentCacheProvider = /** @class */ (function (_super) {
    __extends(PersistentCacheProvider, _super);
    function PersistentCacheProvider() {
        return _super.call(this) || this;
    }
    PersistentCacheProvider.prototype.addToContainer = function (containerOptions, cacheObject) {
        _super.prototype.addToContainer.call(this, containerOptions, cacheObject);
        this.saveContainers();
    };
    PersistentCacheProvider.prototype.clearCache = function () {
        _super.prototype.clearCache.call(this);
        this.saveCache();
        this.saveContainers();
    };
    PersistentCacheProvider.prototype.clearContainer = function (container) {
        _super.prototype.clearContainer.call(this, container);
        this.saveContainers();
    };
    PersistentCacheProvider.prototype.clearContainers = function () {
        _super.prototype.clearContainers.call(this);
        this.saveContainers();
    };
    PersistentCacheProvider.prototype.clearKeyCache = function (key) {
        _super.prototype.clearKeyCache.call(this, key);
        this.saveCache();
    };
    PersistentCacheProvider.prototype.clearKeyContainer = function (containerKey) {
        _super.prototype.clearKeyContainer.call(this, containerKey);
        this.saveContainers();
    };
    PersistentCacheProvider.prototype.setCache = function (options, args, cache) {
        _super.prototype.setCache.call(this, options, args, cache);
        this.saveCache();
    };
    PersistentCacheProvider.prototype.restoreCacheObjects = function () {
        var _this = this;
        this.cache.length = 0;
        this.containers.length = 0;
        var cacheObjects = this.storage.getStorageItems();
        var containerObjects = this.storage.getContainerItems();
        cacheObjects.forEach(function (cacheObject) { return _this.initiateCacheObject(cacheObject.options); });
        containerObjects.forEach(function (containerObject) {
            var container = _this.initiateCacheContainer(containerObject.options);
            containerObject.cacheObjects.forEach(function (cacheKey) {
                var cache = _this.getCacheObject(cacheKey);
                if (cache) {
                    container.addCache(cache);
                }
            });
        });
        cacheObjects.forEach(function (cacheObject) {
            if (cacheObject.options.key) {
                var cache = _this.getCacheObject(cacheObject.options.key);
                if (cache) {
                    cache.restoreCacheObject(cacheObject.items, cacheObject.ttl);
                }
            }
        });
    };
    PersistentCacheProvider.prototype.saveCache = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = this.storage).setStorageItems;
                        return [4 /*yield*/, Promise.all(this.cache.map(function (cache) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, cache.storeCacheObject()];
                            }); }); }))];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    PersistentCacheProvider.prototype.saveContainers = function () {
        var storageContainerCache = this.containers.map(function (container) {
            return {
                options: container.options,
                cacheObjects: container.cacheObjects.map(function (cache) { return cache.key; })
            };
        });
        this.storage.setContainerItems(storageContainerCache);
    };
    return PersistentCacheProvider;
}(base_cache_provider_1.BaseCacheProvider));
exports.PersistentCacheProvider = PersistentCacheProvider;
