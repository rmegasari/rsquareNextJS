"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/products/route";
exports.ids = ["app/api/products/route"];
exports.modules = {

/***/ "better-sqlite3":
/*!*********************************!*\
  !*** external "better-sqlite3" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("better-sqlite3");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("punycode");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fproducts%2Froute&page=%2Fapi%2Fproducts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproducts%2Froute.js&appDir=%2Fhome%2Ftuneeca%2Fweb_app%2FRSQUARE-NextJS%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Ftuneeca%2Fweb_app%2FRSQUARE-NextJS&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fproducts%2Froute&page=%2Fapi%2Fproducts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproducts%2Froute.js&appDir=%2Fhome%2Ftuneeca%2Fweb_app%2FRSQUARE-NextJS%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Ftuneeca%2Fweb_app%2FRSQUARE-NextJS&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_tuneeca_web_app_RSQUARE_NextJS_app_api_products_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/products/route.js */ \"(rsc)/./app/api/products/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/products/route\",\n        pathname: \"/api/products\",\n        filename: \"route\",\n        bundlePath: \"app/api/products/route\"\n    },\n    resolvedPagePath: \"/home/tuneeca/web_app/RSQUARE-NextJS/app/api/products/route.js\",\n    nextConfigOutput,\n    userland: _home_tuneeca_web_app_RSQUARE_NextJS_app_api_products_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/products/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZwcm9kdWN0cyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGcHJvZHVjdHMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZwcm9kdWN0cyUyRnJvdXRlLmpzJmFwcERpcj0lMkZob21lJTJGdHVuZWVjYSUyRndlYl9hcHAlMkZSU1FVQVJFLU5leHRKUyUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGaG9tZSUyRnR1bmVlY2ElMkZ3ZWJfYXBwJTJGUlNRVUFSRS1OZXh0SlMmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ2M7QUFDM0Y7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yc3F1YXJlLz9iYjZmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9ob21lL3R1bmVlY2Evd2ViX2FwcC9SU1FVQVJFLU5leHRKUy9hcHAvYXBpL3Byb2R1Y3RzL3JvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9wcm9kdWN0cy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3Byb2R1Y3RzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9wcm9kdWN0cy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9ob21lL3R1bmVlY2Evd2ViX2FwcC9SU1FVQVJFLU5leHRKUy9hcHAvYXBpL3Byb2R1Y3RzL3JvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9wcm9kdWN0cy9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fproducts%2Froute&page=%2Fapi%2Fproducts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproducts%2Froute.js&appDir=%2Fhome%2Ftuneeca%2Fweb_app%2FRSQUARE-NextJS%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Ftuneeca%2Fweb_app%2FRSQUARE-NextJS&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/products/route.js":
/*!***********************************!*\
  !*** ./app/api/products/route.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _lib_db_wrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/db-wrapper */ \"(rsc)/./lib/db-wrapper.js\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n\nasync function GET() {\n    try {\n        const products = await (0,_lib_db_wrapper__WEBPACK_IMPORTED_MODULE_0__.getAllProducts)();\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json(products);\n    } catch (error) {\n        console.error(\"Error fetching products:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: \"Failed to fetch products\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function POST(request) {\n    try {\n        const productData = await request.json();\n        // Validasi data\n        if (!productData.id || !productData.judul) {\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: \"ID dan Judul wajib diisi\"\n            }, {\n                status: 400\n            });\n        }\n        // Simpan ke database (auto-switch: Supabase > Postgres > SQLite)\n        await (0,_lib_db_wrapper__WEBPACK_IMPORTED_MODULE_0__.saveProduct)(productData);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            success: true,\n            message: \"Template berhasil disimpan\",\n            productId: productData.id\n        });\n    } catch (error) {\n        console.error(\"Error saving product:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: \"Gagal menyimpan template\",\n            details: error.message\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3Byb2R1Y3RzL3JvdXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBK0Q7QUFDcEI7QUFFcEMsZUFBZUc7SUFDcEIsSUFBSTtRQUNGLE1BQU1DLFdBQVcsTUFBTUosK0RBQWNBO1FBQ3JDLE9BQU9FLHFEQUFZQSxDQUFDRyxJQUFJLENBQUNEO0lBQzNCLEVBQUUsT0FBT0UsT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMsNEJBQTRCQTtRQUMxQyxPQUFPSixxREFBWUEsQ0FBQ0csSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBMkIsR0FBRztZQUFFRSxRQUFRO1FBQUk7SUFDaEY7QUFDRjtBQUVPLGVBQWVDLEtBQUtDLE9BQU87SUFDaEMsSUFBSTtRQUNGLE1BQU1DLGNBQWMsTUFBTUQsUUFBUUwsSUFBSTtRQUV0QyxnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDTSxZQUFZQyxFQUFFLElBQUksQ0FBQ0QsWUFBWUUsS0FBSyxFQUFFO1lBQ3pDLE9BQU9YLHFEQUFZQSxDQUFDRyxJQUFJLENBQ3RCO2dCQUFFQyxPQUFPO1lBQTJCLEdBQ3BDO2dCQUFFRSxRQUFRO1lBQUk7UUFFbEI7UUFFQSxpRUFBaUU7UUFDakUsTUFBTVAsNERBQVdBLENBQUNVO1FBRWxCLE9BQU9ULHFEQUFZQSxDQUFDRyxJQUFJLENBQUM7WUFDdkJTLFNBQVM7WUFDVEMsU0FBUztZQUNUQyxXQUFXTCxZQUFZQyxFQUFFO1FBQzNCO0lBQ0YsRUFBRSxPQUFPTixPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQyx5QkFBeUJBO1FBQ3ZDLE9BQU9KLHFEQUFZQSxDQUFDRyxJQUFJLENBQ3RCO1lBQUVDLE9BQU87WUFBNEJXLFNBQVNYLE1BQU1TLE9BQU87UUFBQyxHQUM1RDtZQUFFUCxRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL3JzcXVhcmUvLi9hcHAvYXBpL3Byb2R1Y3RzL3JvdXRlLmpzP2IwNjkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0QWxsUHJvZHVjdHMsIHNhdmVQcm9kdWN0IH0gZnJvbSBcIkAvbGliL2RiLXdyYXBwZXJcIjtcbmltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xuICB0cnkge1xuICAgIGNvbnN0IHByb2R1Y3RzID0gYXdhaXQgZ2V0QWxsUHJvZHVjdHMoKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24ocHJvZHVjdHMpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBwcm9kdWN0czpcIiwgZXJyb3IpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCBwcm9kdWN0c1wiIH0sIHsgc3RhdHVzOiA1MDAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IHByb2R1Y3REYXRhID0gYXdhaXQgcmVxdWVzdC5qc29uKCk7XG5cbiAgICAvLyBWYWxpZGFzaSBkYXRhXG4gICAgaWYgKCFwcm9kdWN0RGF0YS5pZCB8fCAhcHJvZHVjdERhdGEuanVkdWwpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBlcnJvcjogXCJJRCBkYW4gSnVkdWwgd2FqaWIgZGlpc2lcIiB9LFxuICAgICAgICB7IHN0YXR1czogNDAwIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gU2ltcGFuIGtlIGRhdGFiYXNlIChhdXRvLXN3aXRjaDogU3VwYWJhc2UgPiBQb3N0Z3JlcyA+IFNRTGl0ZSlcbiAgICBhd2FpdCBzYXZlUHJvZHVjdChwcm9kdWN0RGF0YSk7XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgIG1lc3NhZ2U6IFwiVGVtcGxhdGUgYmVyaGFzaWwgZGlzaW1wYW5cIixcbiAgICAgIHByb2R1Y3RJZDogcHJvZHVjdERhdGEuaWQsXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIHNhdmluZyBwcm9kdWN0OlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogXCJHYWdhbCBtZW55aW1wYW4gdGVtcGxhdGVcIiwgZGV0YWlsczogZXJyb3IubWVzc2FnZSB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbImdldEFsbFByb2R1Y3RzIiwic2F2ZVByb2R1Y3QiLCJOZXh0UmVzcG9uc2UiLCJHRVQiLCJwcm9kdWN0cyIsImpzb24iLCJlcnJvciIsImNvbnNvbGUiLCJzdGF0dXMiLCJQT1NUIiwicmVxdWVzdCIsInByb2R1Y3REYXRhIiwiaWQiLCJqdWR1bCIsInN1Y2Nlc3MiLCJtZXNzYWdlIiwicHJvZHVjdElkIiwiZGV0YWlscyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/products/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/db-wrapper.js":
/*!***************************!*\
  !*** ./lib/db-wrapper.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   deleteProduct: () => (/* binding */ deleteProduct),\n/* harmony export */   getAllProducts: () => (/* binding */ getAllProducts),\n/* harmony export */   getProductById: () => (/* binding */ getProductById),\n/* harmony export */   saveProduct: () => (/* binding */ saveProduct),\n/* harmony export */   updateFeaturedStatus: () => (/* binding */ updateFeaturedStatus)\n/* harmony export */ });\n/**\n * Database wrapper that automatically chooses between Supabase or SQLite\n * Priority: Supabase > SQLite\n */ const useSupabase =  true && \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwZXVyeWt6YnNwZnV4ZnNqbHJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyMTg4ODYsImV4cCI6MjA3Nzc5NDg4Nn0.rV81Gf0mbcDLPgo-7xrZzV7f3O8fQ6vyTCbhA5bcP04\";\n// Lazy-load database module to avoid bundling unused dependencies\nasync function getDbModule() {\n    if (useSupabase) {\n        // Use Supabase (recommended for production)\n        return Promise.all(/*! import() */[__webpack_require__.e(\"vendor-chunks/@supabase\"), __webpack_require__.e(\"vendor-chunks/whatwg-url\"), __webpack_require__.e(\"vendor-chunks/tr46\"), __webpack_require__.e(\"vendor-chunks/tslib\"), __webpack_require__.e(\"vendor-chunks/webidl-conversions\"), __webpack_require__.e(\"_rsc_lib_supabase_js\")]).then(__webpack_require__.bind(__webpack_require__, /*! ./supabase.js */ \"(rsc)/./lib/supabase.js\"));\n    } else {\n        // Use SQLite for development\n        return __webpack_require__.e(/*! import() */ \"_rsc_lib_db_js\").then(__webpack_require__.bind(__webpack_require__, /*! ./db.js */ \"(rsc)/./lib/db.js\"));\n    }\n}\nasync function getAllProducts() {\n    const db = await getDbModule();\n    if (useSupabase) {\n        return db.getAllProductsFromSupabase();\n    } else {\n        return db.getAllProductsFromDB();\n    }\n}\nasync function getProductById(id) {\n    const db = await getDbModule();\n    if (useSupabase) {\n        return db.getProductByIdFromSupabase(id);\n    } else {\n        return db.getProductByIdFromDB(id);\n    }\n}\nasync function saveProduct(productData) {\n    const db = await getDbModule();\n    if (useSupabase) {\n        return db.saveProductToSupabase(productData);\n    } else {\n        return db.saveProductToDB(productData);\n    }\n}\nasync function updateFeaturedStatus(productId, featured) {\n    const db = await getDbModule();\n    if (useSupabase) {\n        return db.updateFeaturedStatusSupabase(productId, featured);\n    } else {\n        // For SQLite, we need to use full product update\n        const product = await getProductById(productId);\n        if (!product) throw new Error(\"Product not found\");\n        product.featured = featured;\n        return db.saveProductToDB(product);\n    }\n}\nasync function deleteProduct(id) {\n    const db = await getDbModule();\n    if (useSupabase) {\n        return db.deleteProductFromSupabase(id);\n    } else {\n        return db.deleteProductFromDB(id);\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGItd3JhcHBlci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Q0FHQyxHQUVELE1BQU1BLGNBQ0pDLEtBQW9DLElBQUlBLGtOQUF5QztBQUVuRixrRUFBa0U7QUFDbEUsZUFBZUk7SUFDYixJQUFJTCxhQUFhO1FBQ2YsNENBQTRDO1FBQzVDLE9BQU8sMGFBQXVCO0lBQ2hDLE9BQU87UUFDTCw2QkFBNkI7UUFDN0IsT0FBTywrSUFBaUI7SUFDMUI7QUFDRjtBQUVPLGVBQWVNO0lBQ3BCLE1BQU1DLEtBQUssTUFBTUY7SUFDakIsSUFBSUwsYUFBYTtRQUNmLE9BQU9PLEdBQUdDLDBCQUEwQjtJQUN0QyxPQUFPO1FBQ0wsT0FBT0QsR0FBR0Usb0JBQW9CO0lBQ2hDO0FBQ0Y7QUFFTyxlQUFlQyxlQUFlQyxFQUFFO0lBQ3JDLE1BQU1KLEtBQUssTUFBTUY7SUFDakIsSUFBSUwsYUFBYTtRQUNmLE9BQU9PLEdBQUdLLDBCQUEwQixDQUFDRDtJQUN2QyxPQUFPO1FBQ0wsT0FBT0osR0FBR00sb0JBQW9CLENBQUNGO0lBQ2pDO0FBQ0Y7QUFFTyxlQUFlRyxZQUFZQyxXQUFXO0lBQzNDLE1BQU1SLEtBQUssTUFBTUY7SUFDakIsSUFBSUwsYUFBYTtRQUNmLE9BQU9PLEdBQUdTLHFCQUFxQixDQUFDRDtJQUNsQyxPQUFPO1FBQ0wsT0FBT1IsR0FBR1UsZUFBZSxDQUFDRjtJQUM1QjtBQUNGO0FBRU8sZUFBZUcscUJBQXFCQyxTQUFTLEVBQUVDLFFBQVE7SUFDNUQsTUFBTWIsS0FBSyxNQUFNRjtJQUNqQixJQUFJTCxhQUFhO1FBQ2YsT0FBT08sR0FBR2MsNEJBQTRCLENBQUNGLFdBQVdDO0lBQ3BELE9BQU87UUFDTCxpREFBaUQ7UUFDakQsTUFBTUUsVUFBVSxNQUFNWixlQUFlUztRQUNyQyxJQUFJLENBQUNHLFNBQVMsTUFBTSxJQUFJQyxNQUFNO1FBRTlCRCxRQUFRRixRQUFRLEdBQUdBO1FBQ25CLE9BQU9iLEdBQUdVLGVBQWUsQ0FBQ0s7SUFDNUI7QUFDRjtBQUVPLGVBQWVFLGNBQWNiLEVBQUU7SUFDcEMsTUFBTUosS0FBSyxNQUFNRjtJQUNqQixJQUFJTCxhQUFhO1FBQ2YsT0FBT08sR0FBR2tCLHlCQUF5QixDQUFDZDtJQUN0QyxPQUFPO1FBQ0wsT0FBT0osR0FBR21CLG1CQUFtQixDQUFDZjtJQUNoQztBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcnNxdWFyZS8uL2xpYi9kYi13cmFwcGVyLmpzP2E4NzEiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBEYXRhYmFzZSB3cmFwcGVyIHRoYXQgYXV0b21hdGljYWxseSBjaG9vc2VzIGJldHdlZW4gU3VwYWJhc2Ugb3IgU1FMaXRlXG4gKiBQcmlvcml0eTogU3VwYWJhc2UgPiBTUUxpdGVcbiAqL1xuXG5jb25zdCB1c2VTdXBhYmFzZSA9XG4gIHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX1VSTCAmJiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9BTk9OX0tFWTtcblxuLy8gTGF6eS1sb2FkIGRhdGFiYXNlIG1vZHVsZSB0byBhdm9pZCBidW5kbGluZyB1bnVzZWQgZGVwZW5kZW5jaWVzXG5hc3luYyBmdW5jdGlvbiBnZXREYk1vZHVsZSgpIHtcbiAgaWYgKHVzZVN1cGFiYXNlKSB7XG4gICAgLy8gVXNlIFN1cGFiYXNlIChyZWNvbW1lbmRlZCBmb3IgcHJvZHVjdGlvbilcbiAgICByZXR1cm4gaW1wb3J0KFwiLi9zdXBhYmFzZS5qc1wiKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBVc2UgU1FMaXRlIGZvciBkZXZlbG9wbWVudFxuICAgIHJldHVybiBpbXBvcnQoXCIuL2RiLmpzXCIpO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBbGxQcm9kdWN0cygpIHtcbiAgY29uc3QgZGIgPSBhd2FpdCBnZXREYk1vZHVsZSgpO1xuICBpZiAodXNlU3VwYWJhc2UpIHtcbiAgICByZXR1cm4gZGIuZ2V0QWxsUHJvZHVjdHNGcm9tU3VwYWJhc2UoKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZGIuZ2V0QWxsUHJvZHVjdHNGcm9tREIoKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UHJvZHVjdEJ5SWQoaWQpIHtcbiAgY29uc3QgZGIgPSBhd2FpdCBnZXREYk1vZHVsZSgpO1xuICBpZiAodXNlU3VwYWJhc2UpIHtcbiAgICByZXR1cm4gZGIuZ2V0UHJvZHVjdEJ5SWRGcm9tU3VwYWJhc2UoaWQpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBkYi5nZXRQcm9kdWN0QnlJZEZyb21EQihpZCk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVQcm9kdWN0KHByb2R1Y3REYXRhKSB7XG4gIGNvbnN0IGRiID0gYXdhaXQgZ2V0RGJNb2R1bGUoKTtcbiAgaWYgKHVzZVN1cGFiYXNlKSB7XG4gICAgcmV0dXJuIGRiLnNhdmVQcm9kdWN0VG9TdXBhYmFzZShwcm9kdWN0RGF0YSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGRiLnNhdmVQcm9kdWN0VG9EQihwcm9kdWN0RGF0YSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUZlYXR1cmVkU3RhdHVzKHByb2R1Y3RJZCwgZmVhdHVyZWQpIHtcbiAgY29uc3QgZGIgPSBhd2FpdCBnZXREYk1vZHVsZSgpO1xuICBpZiAodXNlU3VwYWJhc2UpIHtcbiAgICByZXR1cm4gZGIudXBkYXRlRmVhdHVyZWRTdGF0dXNTdXBhYmFzZShwcm9kdWN0SWQsIGZlYXR1cmVkKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBGb3IgU1FMaXRlLCB3ZSBuZWVkIHRvIHVzZSBmdWxsIHByb2R1Y3QgdXBkYXRlXG4gICAgY29uc3QgcHJvZHVjdCA9IGF3YWl0IGdldFByb2R1Y3RCeUlkKHByb2R1Y3RJZCk7XG4gICAgaWYgKCFwcm9kdWN0KSB0aHJvdyBuZXcgRXJyb3IoXCJQcm9kdWN0IG5vdCBmb3VuZFwiKTtcblxuICAgIHByb2R1Y3QuZmVhdHVyZWQgPSBmZWF0dXJlZDtcbiAgICByZXR1cm4gZGIuc2F2ZVByb2R1Y3RUb0RCKHByb2R1Y3QpO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVQcm9kdWN0KGlkKSB7XG4gIGNvbnN0IGRiID0gYXdhaXQgZ2V0RGJNb2R1bGUoKTtcbiAgaWYgKHVzZVN1cGFiYXNlKSB7XG4gICAgcmV0dXJuIGRiLmRlbGV0ZVByb2R1Y3RGcm9tU3VwYWJhc2UoaWQpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBkYi5kZWxldGVQcm9kdWN0RnJvbURCKGlkKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbInVzZVN1cGFiYXNlIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX1NVUEFCQVNFX1VSTCIsIk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZIiwiZ2V0RGJNb2R1bGUiLCJnZXRBbGxQcm9kdWN0cyIsImRiIiwiZ2V0QWxsUHJvZHVjdHNGcm9tU3VwYWJhc2UiLCJnZXRBbGxQcm9kdWN0c0Zyb21EQiIsImdldFByb2R1Y3RCeUlkIiwiaWQiLCJnZXRQcm9kdWN0QnlJZEZyb21TdXBhYmFzZSIsImdldFByb2R1Y3RCeUlkRnJvbURCIiwic2F2ZVByb2R1Y3QiLCJwcm9kdWN0RGF0YSIsInNhdmVQcm9kdWN0VG9TdXBhYmFzZSIsInNhdmVQcm9kdWN0VG9EQiIsInVwZGF0ZUZlYXR1cmVkU3RhdHVzIiwicHJvZHVjdElkIiwiZmVhdHVyZWQiLCJ1cGRhdGVGZWF0dXJlZFN0YXR1c1N1cGFiYXNlIiwicHJvZHVjdCIsIkVycm9yIiwiZGVsZXRlUHJvZHVjdCIsImRlbGV0ZVByb2R1Y3RGcm9tU3VwYWJhc2UiLCJkZWxldGVQcm9kdWN0RnJvbURCIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/db-wrapper.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fproducts%2Froute&page=%2Fapi%2Fproducts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproducts%2Froute.js&appDir=%2Fhome%2Ftuneeca%2Fweb_app%2FRSQUARE-NextJS%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Ftuneeca%2Fweb_app%2FRSQUARE-NextJS&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();