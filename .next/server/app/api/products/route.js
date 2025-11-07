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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _lib_db_wrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/db-wrapper */ \"(rsc)/./lib/db-wrapper.js\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n\nasync function GET(request) {\n    try {\n        // Check if request wants to include inactive products (for admin)\n        const { searchParams } = new URL(request.url);\n        const includeInactive = searchParams.get(\"includeInactive\") === \"true\";\n        const products = await (0,_lib_db_wrapper__WEBPACK_IMPORTED_MODULE_0__.getAllProducts)(includeInactive);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json(products);\n    } catch (error) {\n        console.error(\"Error fetching products:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: \"Failed to fetch products\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function POST(request) {\n    try {\n        const productData = await request.json();\n        // Validasi data\n        if (!productData.id || !productData.judul) {\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: \"ID dan Judul wajib diisi\"\n            }, {\n                status: 400\n            });\n        }\n        // Simpan ke database (auto-switch: Supabase > Postgres > SQLite)\n        await (0,_lib_db_wrapper__WEBPACK_IMPORTED_MODULE_0__.saveProduct)(productData);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            success: true,\n            message: \"Template berhasil disimpan\",\n            productId: productData.id\n        });\n    } catch (error) {\n        console.error(\"Error saving product:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: \"Gagal menyimpan template\",\n            details: error.message\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3Byb2R1Y3RzL3JvdXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBK0Q7QUFDcEI7QUFFcEMsZUFBZUcsSUFBSUMsT0FBTztJQUMvQixJQUFJO1FBQ0Ysa0VBQWtFO1FBQ2xFLE1BQU0sRUFBRUMsWUFBWSxFQUFFLEdBQUcsSUFBSUMsSUFBSUYsUUFBUUcsR0FBRztRQUM1QyxNQUFNQyxrQkFBa0JILGFBQWFJLEdBQUcsQ0FBQyx1QkFBdUI7UUFFaEUsTUFBTUMsV0FBVyxNQUFNViwrREFBY0EsQ0FBQ1E7UUFDdEMsT0FBT04scURBQVlBLENBQUNTLElBQUksQ0FBQ0Q7SUFDM0IsRUFBRSxPQUFPRSxPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQyw0QkFBNEJBO1FBQzFDLE9BQU9WLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUEyQixHQUFHO1lBQUVFLFFBQVE7UUFBSTtJQUNoRjtBQUNGO0FBRU8sZUFBZUMsS0FBS1gsT0FBTztJQUNoQyxJQUFJO1FBQ0YsTUFBTVksY0FBYyxNQUFNWixRQUFRTyxJQUFJO1FBRXRDLGdCQUFnQjtRQUNoQixJQUFJLENBQUNLLFlBQVlDLEVBQUUsSUFBSSxDQUFDRCxZQUFZRSxLQUFLLEVBQUU7WUFDekMsT0FBT2hCLHFEQUFZQSxDQUFDUyxJQUFJLENBQ3RCO2dCQUFFQyxPQUFPO1lBQTJCLEdBQ3BDO2dCQUFFRSxRQUFRO1lBQUk7UUFFbEI7UUFFQSxpRUFBaUU7UUFDakUsTUFBTWIsNERBQVdBLENBQUNlO1FBRWxCLE9BQU9kLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7WUFDdkJRLFNBQVM7WUFDVEMsU0FBUztZQUNUQyxXQUFXTCxZQUFZQyxFQUFFO1FBQzNCO0lBQ0YsRUFBRSxPQUFPTCxPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQyx5QkFBeUJBO1FBQ3ZDLE9BQU9WLHFEQUFZQSxDQUFDUyxJQUFJLENBQ3RCO1lBQUVDLE9BQU87WUFBNEJVLFNBQVNWLE1BQU1RLE9BQU87UUFBQyxHQUM1RDtZQUFFTixRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL3JzcXVhcmUvLi9hcHAvYXBpL3Byb2R1Y3RzL3JvdXRlLmpzP2IwNjkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0QWxsUHJvZHVjdHMsIHNhdmVQcm9kdWN0IH0gZnJvbSBcIkAvbGliL2RiLXdyYXBwZXJcIjtcbmltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICAvLyBDaGVjayBpZiByZXF1ZXN0IHdhbnRzIHRvIGluY2x1ZGUgaW5hY3RpdmUgcHJvZHVjdHMgKGZvciBhZG1pbilcbiAgICBjb25zdCB7IHNlYXJjaFBhcmFtcyB9ID0gbmV3IFVSTChyZXF1ZXN0LnVybCk7XG4gICAgY29uc3QgaW5jbHVkZUluYWN0aXZlID0gc2VhcmNoUGFyYW1zLmdldChcImluY2x1ZGVJbmFjdGl2ZVwiKSA9PT0gXCJ0cnVlXCI7XG5cbiAgICBjb25zdCBwcm9kdWN0cyA9IGF3YWl0IGdldEFsbFByb2R1Y3RzKGluY2x1ZGVJbmFjdGl2ZSk7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHByb2R1Y3RzKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgcHJvZHVjdHM6XCIsIGVycm9yKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggcHJvZHVjdHNcIiB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBwcm9kdWN0RGF0YSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xuXG4gICAgLy8gVmFsaWRhc2kgZGF0YVxuICAgIGlmICghcHJvZHVjdERhdGEuaWQgfHwgIXByb2R1Y3REYXRhLmp1ZHVsKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgZXJyb3I6IFwiSUQgZGFuIEp1ZHVsIHdhamliIGRpaXNpXCIgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwMCB9XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFNpbXBhbiBrZSBkYXRhYmFzZSAoYXV0by1zd2l0Y2g6IFN1cGFiYXNlID4gUG9zdGdyZXMgPiBTUUxpdGUpXG4gICAgYXdhaXQgc2F2ZVByb2R1Y3QocHJvZHVjdERhdGEpO1xuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICBtZXNzYWdlOiBcIlRlbXBsYXRlIGJlcmhhc2lsIGRpc2ltcGFuXCIsXG4gICAgICBwcm9kdWN0SWQ6IHByb2R1Y3REYXRhLmlkLFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBzYXZpbmcgcHJvZHVjdDpcIiwgZXJyb3IpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgIHsgZXJyb3I6IFwiR2FnYWwgbWVueWltcGFuIHRlbXBsYXRlXCIsIGRldGFpbHM6IGVycm9yLm1lc3NhZ2UgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgICk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJnZXRBbGxQcm9kdWN0cyIsInNhdmVQcm9kdWN0IiwiTmV4dFJlc3BvbnNlIiwiR0VUIiwicmVxdWVzdCIsInNlYXJjaFBhcmFtcyIsIlVSTCIsInVybCIsImluY2x1ZGVJbmFjdGl2ZSIsImdldCIsInByb2R1Y3RzIiwianNvbiIsImVycm9yIiwiY29uc29sZSIsInN0YXR1cyIsIlBPU1QiLCJwcm9kdWN0RGF0YSIsImlkIiwianVkdWwiLCJzdWNjZXNzIiwibWVzc2FnZSIsInByb2R1Y3RJZCIsImRldGFpbHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/products/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/db-wrapper.js":
/*!***************************!*\
  !*** ./lib/db-wrapper.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   deleteProduct: () => (/* binding */ deleteProduct),\n/* harmony export */   getAllProducts: () => (/* binding */ getAllProducts),\n/* harmony export */   getProductById: () => (/* binding */ getProductById),\n/* harmony export */   saveProduct: () => (/* binding */ saveProduct),\n/* harmony export */   updateActiveStatus: () => (/* binding */ updateActiveStatus),\n/* harmony export */   updateFeaturedStatus: () => (/* binding */ updateFeaturedStatus)\n/* harmony export */ });\n/**\n * Database wrapper that automatically chooses between Supabase or SQLite\n * Priority: Supabase > SQLite\n */ const useSupabase =  true && \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwZXVyeWt6YnNwZnV4ZnNqbHJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyMTg4ODYsImV4cCI6MjA3Nzc5NDg4Nn0.rV81Gf0mbcDLPgo-7xrZzV7f3O8fQ6vyTCbhA5bcP04\";\n// Lazy-load database module to avoid bundling unused dependencies\nasync function getDbModule() {\n    if (useSupabase) {\n        // Use Supabase (recommended for production)\n        return Promise.all(/*! import() */[__webpack_require__.e(\"vendor-chunks/@supabase\"), __webpack_require__.e(\"vendor-chunks/tr46\"), __webpack_require__.e(\"vendor-chunks/whatwg-url\"), __webpack_require__.e(\"vendor-chunks/tslib\"), __webpack_require__.e(\"vendor-chunks/webidl-conversions\"), __webpack_require__.e(\"_rsc_lib_supabase_js\")]).then(__webpack_require__.bind(__webpack_require__, /*! ./supabase.js */ \"(rsc)/./lib/supabase.js\"));\n    } else {\n        // Use SQLite for development\n        return __webpack_require__.e(/*! import() */ \"_rsc_lib_db_js\").then(__webpack_require__.bind(__webpack_require__, /*! ./db.js */ \"(rsc)/./lib/db.js\"));\n    }\n}\nasync function getAllProducts(includeInactive = false) {\n    const db = await getDbModule();\n    if (useSupabase) {\n        return db.getAllProductsFromSupabase(includeInactive);\n    } else {\n        return db.getAllProductsFromDB();\n    }\n}\nasync function getProductById(id) {\n    const db = await getDbModule();\n    if (useSupabase) {\n        return db.getProductByIdFromSupabase(id);\n    } else {\n        return db.getProductByIdFromDB(id);\n    }\n}\nasync function saveProduct(productData) {\n    const db = await getDbModule();\n    if (useSupabase) {\n        return db.saveProductToSupabase(productData);\n    } else {\n        return db.saveProductToDB(productData);\n    }\n}\nasync function updateFeaturedStatus(productId, featured) {\n    const db = await getDbModule();\n    if (useSupabase) {\n        return db.updateFeaturedStatusSupabase(productId, featured);\n    } else {\n        // For SQLite, we need to use full product update\n        const product = await getProductById(productId);\n        if (!product) throw new Error(\"Product not found\");\n        product.featured = featured;\n        return db.saveProductToDB(product);\n    }\n}\nasync function updateActiveStatus(productId, active) {\n    const db = await getDbModule();\n    if (useSupabase) {\n        return db.updateActiveStatusSupabase(productId, active);\n    } else {\n        // For SQLite, we need to use full product update\n        const product = await getProductById(productId);\n        if (!product) throw new Error(\"Product not found\");\n        product.active = active;\n        return db.saveProductToDB(product);\n    }\n}\nasync function deleteProduct(id) {\n    const db = await getDbModule();\n    if (useSupabase) {\n        return db.deleteProductFromSupabase(id);\n    } else {\n        return db.deleteProductFromDB(id);\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGItd3JhcHBlci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7O0NBR0MsR0FFRCxNQUFNQSxjQUNKQyxLQUFvQyxJQUFJQSxrTkFBeUM7QUFFbkYsa0VBQWtFO0FBQ2xFLGVBQWVJO0lBQ2IsSUFBSUwsYUFBYTtRQUNmLDRDQUE0QztRQUM1QyxPQUFPLDBhQUF1QjtJQUNoQyxPQUFPO1FBQ0wsNkJBQTZCO1FBQzdCLE9BQU8sK0lBQWlCO0lBQzFCO0FBQ0Y7QUFFTyxlQUFlTSxlQUFlQyxrQkFBa0IsS0FBSztJQUMxRCxNQUFNQyxLQUFLLE1BQU1IO0lBQ2pCLElBQUlMLGFBQWE7UUFDZixPQUFPUSxHQUFHQywwQkFBMEIsQ0FBQ0Y7SUFDdkMsT0FBTztRQUNMLE9BQU9DLEdBQUdFLG9CQUFvQjtJQUNoQztBQUNGO0FBRU8sZUFBZUMsZUFBZUMsRUFBRTtJQUNyQyxNQUFNSixLQUFLLE1BQU1IO0lBQ2pCLElBQUlMLGFBQWE7UUFDZixPQUFPUSxHQUFHSywwQkFBMEIsQ0FBQ0Q7SUFDdkMsT0FBTztRQUNMLE9BQU9KLEdBQUdNLG9CQUFvQixDQUFDRjtJQUNqQztBQUNGO0FBRU8sZUFBZUcsWUFBWUMsV0FBVztJQUMzQyxNQUFNUixLQUFLLE1BQU1IO0lBQ2pCLElBQUlMLGFBQWE7UUFDZixPQUFPUSxHQUFHUyxxQkFBcUIsQ0FBQ0Q7SUFDbEMsT0FBTztRQUNMLE9BQU9SLEdBQUdVLGVBQWUsQ0FBQ0Y7SUFDNUI7QUFDRjtBQUVPLGVBQWVHLHFCQUFxQkMsU0FBUyxFQUFFQyxRQUFRO0lBQzVELE1BQU1iLEtBQUssTUFBTUg7SUFDakIsSUFBSUwsYUFBYTtRQUNmLE9BQU9RLEdBQUdjLDRCQUE0QixDQUFDRixXQUFXQztJQUNwRCxPQUFPO1FBQ0wsaURBQWlEO1FBQ2pELE1BQU1FLFVBQVUsTUFBTVosZUFBZVM7UUFDckMsSUFBSSxDQUFDRyxTQUFTLE1BQU0sSUFBSUMsTUFBTTtRQUU5QkQsUUFBUUYsUUFBUSxHQUFHQTtRQUNuQixPQUFPYixHQUFHVSxlQUFlLENBQUNLO0lBQzVCO0FBQ0Y7QUFFTyxlQUFlRSxtQkFBbUJMLFNBQVMsRUFBRU0sTUFBTTtJQUN4RCxNQUFNbEIsS0FBSyxNQUFNSDtJQUNqQixJQUFJTCxhQUFhO1FBQ2YsT0FBT1EsR0FBR21CLDBCQUEwQixDQUFDUCxXQUFXTTtJQUNsRCxPQUFPO1FBQ0wsaURBQWlEO1FBQ2pELE1BQU1ILFVBQVUsTUFBTVosZUFBZVM7UUFDckMsSUFBSSxDQUFDRyxTQUFTLE1BQU0sSUFBSUMsTUFBTTtRQUU5QkQsUUFBUUcsTUFBTSxHQUFHQTtRQUNqQixPQUFPbEIsR0FBR1UsZUFBZSxDQUFDSztJQUM1QjtBQUNGO0FBRU8sZUFBZUssY0FBY2hCLEVBQUU7SUFDcEMsTUFBTUosS0FBSyxNQUFNSDtJQUNqQixJQUFJTCxhQUFhO1FBQ2YsT0FBT1EsR0FBR3FCLHlCQUF5QixDQUFDakI7SUFDdEMsT0FBTztRQUNMLE9BQU9KLEdBQUdzQixtQkFBbUIsQ0FBQ2xCO0lBQ2hDO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yc3F1YXJlLy4vbGliL2RiLXdyYXBwZXIuanM/YTg3MSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIERhdGFiYXNlIHdyYXBwZXIgdGhhdCBhdXRvbWF0aWNhbGx5IGNob29zZXMgYmV0d2VlbiBTdXBhYmFzZSBvciBTUUxpdGVcbiAqIFByaW9yaXR5OiBTdXBhYmFzZSA+IFNRTGl0ZVxuICovXG5cbmNvbnN0IHVzZVN1cGFiYXNlID1cbiAgcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMICYmIHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZO1xuXG4vLyBMYXp5LWxvYWQgZGF0YWJhc2UgbW9kdWxlIHRvIGF2b2lkIGJ1bmRsaW5nIHVudXNlZCBkZXBlbmRlbmNpZXNcbmFzeW5jIGZ1bmN0aW9uIGdldERiTW9kdWxlKCkge1xuICBpZiAodXNlU3VwYWJhc2UpIHtcbiAgICAvLyBVc2UgU3VwYWJhc2UgKHJlY29tbWVuZGVkIGZvciBwcm9kdWN0aW9uKVxuICAgIHJldHVybiBpbXBvcnQoXCIuL3N1cGFiYXNlLmpzXCIpO1xuICB9IGVsc2Uge1xuICAgIC8vIFVzZSBTUUxpdGUgZm9yIGRldmVsb3BtZW50XG4gICAgcmV0dXJuIGltcG9ydChcIi4vZGIuanNcIik7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFsbFByb2R1Y3RzKGluY2x1ZGVJbmFjdGl2ZSA9IGZhbHNlKSB7XG4gIGNvbnN0IGRiID0gYXdhaXQgZ2V0RGJNb2R1bGUoKTtcbiAgaWYgKHVzZVN1cGFiYXNlKSB7XG4gICAgcmV0dXJuIGRiLmdldEFsbFByb2R1Y3RzRnJvbVN1cGFiYXNlKGluY2x1ZGVJbmFjdGl2ZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGRiLmdldEFsbFByb2R1Y3RzRnJvbURCKCk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFByb2R1Y3RCeUlkKGlkKSB7XG4gIGNvbnN0IGRiID0gYXdhaXQgZ2V0RGJNb2R1bGUoKTtcbiAgaWYgKHVzZVN1cGFiYXNlKSB7XG4gICAgcmV0dXJuIGRiLmdldFByb2R1Y3RCeUlkRnJvbVN1cGFiYXNlKGlkKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZGIuZ2V0UHJvZHVjdEJ5SWRGcm9tREIoaWQpO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzYXZlUHJvZHVjdChwcm9kdWN0RGF0YSkge1xuICBjb25zdCBkYiA9IGF3YWl0IGdldERiTW9kdWxlKCk7XG4gIGlmICh1c2VTdXBhYmFzZSkge1xuICAgIHJldHVybiBkYi5zYXZlUHJvZHVjdFRvU3VwYWJhc2UocHJvZHVjdERhdGEpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBkYi5zYXZlUHJvZHVjdFRvREIocHJvZHVjdERhdGEpO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVGZWF0dXJlZFN0YXR1cyhwcm9kdWN0SWQsIGZlYXR1cmVkKSB7XG4gIGNvbnN0IGRiID0gYXdhaXQgZ2V0RGJNb2R1bGUoKTtcbiAgaWYgKHVzZVN1cGFiYXNlKSB7XG4gICAgcmV0dXJuIGRiLnVwZGF0ZUZlYXR1cmVkU3RhdHVzU3VwYWJhc2UocHJvZHVjdElkLCBmZWF0dXJlZCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gRm9yIFNRTGl0ZSwgd2UgbmVlZCB0byB1c2UgZnVsbCBwcm9kdWN0IHVwZGF0ZVxuICAgIGNvbnN0IHByb2R1Y3QgPSBhd2FpdCBnZXRQcm9kdWN0QnlJZChwcm9kdWN0SWQpO1xuICAgIGlmICghcHJvZHVjdCkgdGhyb3cgbmV3IEVycm9yKFwiUHJvZHVjdCBub3QgZm91bmRcIik7XG5cbiAgICBwcm9kdWN0LmZlYXR1cmVkID0gZmVhdHVyZWQ7XG4gICAgcmV0dXJuIGRiLnNhdmVQcm9kdWN0VG9EQihwcm9kdWN0KTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlQWN0aXZlU3RhdHVzKHByb2R1Y3RJZCwgYWN0aXZlKSB7XG4gIGNvbnN0IGRiID0gYXdhaXQgZ2V0RGJNb2R1bGUoKTtcbiAgaWYgKHVzZVN1cGFiYXNlKSB7XG4gICAgcmV0dXJuIGRiLnVwZGF0ZUFjdGl2ZVN0YXR1c1N1cGFiYXNlKHByb2R1Y3RJZCwgYWN0aXZlKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBGb3IgU1FMaXRlLCB3ZSBuZWVkIHRvIHVzZSBmdWxsIHByb2R1Y3QgdXBkYXRlXG4gICAgY29uc3QgcHJvZHVjdCA9IGF3YWl0IGdldFByb2R1Y3RCeUlkKHByb2R1Y3RJZCk7XG4gICAgaWYgKCFwcm9kdWN0KSB0aHJvdyBuZXcgRXJyb3IoXCJQcm9kdWN0IG5vdCBmb3VuZFwiKTtcblxuICAgIHByb2R1Y3QuYWN0aXZlID0gYWN0aXZlO1xuICAgIHJldHVybiBkYi5zYXZlUHJvZHVjdFRvREIocHJvZHVjdCk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVByb2R1Y3QoaWQpIHtcbiAgY29uc3QgZGIgPSBhd2FpdCBnZXREYk1vZHVsZSgpO1xuICBpZiAodXNlU3VwYWJhc2UpIHtcbiAgICByZXR1cm4gZGIuZGVsZXRlUHJvZHVjdEZyb21TdXBhYmFzZShpZCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGRiLmRlbGV0ZVByb2R1Y3RGcm9tREIoaWQpO1xuICB9XG59XG4iXSwibmFtZXMiOlsidXNlU3VwYWJhc2UiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVkiLCJnZXREYk1vZHVsZSIsImdldEFsbFByb2R1Y3RzIiwiaW5jbHVkZUluYWN0aXZlIiwiZGIiLCJnZXRBbGxQcm9kdWN0c0Zyb21TdXBhYmFzZSIsImdldEFsbFByb2R1Y3RzRnJvbURCIiwiZ2V0UHJvZHVjdEJ5SWQiLCJpZCIsImdldFByb2R1Y3RCeUlkRnJvbVN1cGFiYXNlIiwiZ2V0UHJvZHVjdEJ5SWRGcm9tREIiLCJzYXZlUHJvZHVjdCIsInByb2R1Y3REYXRhIiwic2F2ZVByb2R1Y3RUb1N1cGFiYXNlIiwic2F2ZVByb2R1Y3RUb0RCIiwidXBkYXRlRmVhdHVyZWRTdGF0dXMiLCJwcm9kdWN0SWQiLCJmZWF0dXJlZCIsInVwZGF0ZUZlYXR1cmVkU3RhdHVzU3VwYWJhc2UiLCJwcm9kdWN0IiwiRXJyb3IiLCJ1cGRhdGVBY3RpdmVTdGF0dXMiLCJhY3RpdmUiLCJ1cGRhdGVBY3RpdmVTdGF0dXNTdXBhYmFzZSIsImRlbGV0ZVByb2R1Y3QiLCJkZWxldGVQcm9kdWN0RnJvbVN1cGFiYXNlIiwiZGVsZXRlUHJvZHVjdEZyb21EQiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/db-wrapper.js\n");

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