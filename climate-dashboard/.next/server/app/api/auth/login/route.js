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
exports.id = "app/api/auth/login/route";
exports.ids = ["app/api/auth/login/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

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

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=C%3A%5CUsers%5Crava_%5COneDrive%5CDesktop%5Cwinter%20climate%20project%5Cclimate-dashboard%5Cclimate-dashboard%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Crava_%5COneDrive%5CDesktop%5Cwinter%20climate%20project%5Cclimate-dashboard%5Cclimate-dashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=C%3A%5CUsers%5Crava_%5COneDrive%5CDesktop%5Cwinter%20climate%20project%5Cclimate-dashboard%5Cclimate-dashboard%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Crava_%5COneDrive%5CDesktop%5Cwinter%20climate%20project%5Cclimate-dashboard%5Cclimate-dashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_rava_OneDrive_Desktop_winter_climate_project_climate_dashboard_climate_dashboard_src_app_api_auth_login_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/auth/login/route.ts */ \"(rsc)/./src/app/api/auth/login/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/login/route\",\n        pathname: \"/api/auth/login\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/login/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\rava_\\\\OneDrive\\\\Desktop\\\\winter climate project\\\\climate-dashboard\\\\climate-dashboard\\\\src\\\\app\\\\api\\\\auth\\\\login\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_rava_OneDrive_Desktop_winter_climate_project_climate_dashboard_climate_dashboard_src_app_api_auth_login_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/login/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGbG9naW4lMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkZsb2dpbiUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkZsb2dpbiUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNyYXZhXyU1Q09uZURyaXZlJTVDRGVza3RvcCU1Q3dpbnRlciUyMGNsaW1hdGUlMjBwcm9qZWN0JTVDY2xpbWF0ZS1kYXNoYm9hcmQlNUNjbGltYXRlLWRhc2hib2FyZCU1Q3NyYyU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDcmF2YV8lNUNPbmVEcml2ZSU1Q0Rlc2t0b3AlNUN3aW50ZXIlMjBjbGltYXRlJTIwcHJvamVjdCU1Q2NsaW1hdGUtZGFzaGJvYXJkJTVDY2xpbWF0ZS1kYXNoYm9hcmQmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ3VGO0FBQ3BLO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2xpbWF0ZS1kYXNoYm9hcmQvP2NhZmIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxccmF2YV9cXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFx3aW50ZXIgY2xpbWF0ZSBwcm9qZWN0XFxcXGNsaW1hdGUtZGFzaGJvYXJkXFxcXGNsaW1hdGUtZGFzaGJvYXJkXFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcbG9naW5cXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvbG9naW4vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hdXRoL2xvZ2luXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hdXRoL2xvZ2luL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxccmF2YV9cXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFx3aW50ZXIgY2xpbWF0ZSBwcm9qZWN0XFxcXGNsaW1hdGUtZGFzaGJvYXJkXFxcXGNsaW1hdGUtZGFzaGJvYXJkXFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcbG9naW5cXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2F1dGgvbG9naW4vcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=C%3A%5CUsers%5Crava_%5COneDrive%5CDesktop%5Cwinter%20climate%20project%5Cclimate-dashboard%5Cclimate-dashboard%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Crava_%5COneDrive%5CDesktop%5Cwinter%20climate%20project%5Cclimate-dashboard%5Cclimate-dashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/auth/login/route.ts":
/*!*****************************************!*\
  !*** ./src/app/api/auth/login/route.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./src/lib/prisma.ts\");\n/* harmony import */ var _lib_jwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/jwt */ \"(rsc)/./src/lib/jwt.ts\");\n\n\n\nasync function POST(req) {\n    const { email } = await req.json();\n    if (!email) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Email is required\"\n        }, {\n            status: 400\n        });\n    }\n    const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.user.findUnique({\n        where: {\n            email\n        }\n    });\n    if (!user) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"User not found\"\n        }, {\n            status: 404\n        });\n    }\n    const token = (0,_lib_jwt__WEBPACK_IMPORTED_MODULE_2__.signToken)({\n        userId: user.id\n    });\n    const res = next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        message: \"Login successful\"\n    });\n    res.cookies.set(\"token\", token, {\n        httpOnly: true,\n        sameSite: \"lax\"\n    });\n    return res;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdXRoL2xvZ2luL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBMkM7QUFDTDtBQUNBO0FBRS9CLGVBQWVHLEtBQUtDLEdBQVk7SUFDckMsTUFBTSxFQUFFQyxLQUFLLEVBQUUsR0FBRyxNQUFNRCxJQUFJRSxJQUFJO0lBRWhDLElBQUksQ0FBQ0QsT0FBTztRQUNWLE9BQU9MLHFEQUFZQSxDQUFDTSxJQUFJLENBQ3RCO1lBQUVDLFNBQVM7UUFBb0IsR0FDL0I7WUFBRUMsUUFBUTtRQUFJO0lBRWxCO0lBRUEsTUFBTUMsT0FBTyxNQUFNUiwrQ0FBTUEsQ0FBQ1EsSUFBSSxDQUFDQyxVQUFVLENBQUM7UUFDeENDLE9BQU87WUFBRU47UUFBTTtJQUNqQjtJQUVBLElBQUksQ0FBQ0ksTUFBTTtRQUNULE9BQU9ULHFEQUFZQSxDQUFDTSxJQUFJLENBQ3RCO1lBQUVDLFNBQVM7UUFBaUIsR0FDNUI7WUFBRUMsUUFBUTtRQUFJO0lBRWxCO0lBRUEsTUFBTUksUUFBUVYsbURBQVNBLENBQUM7UUFBRVcsUUFBUUosS0FBS0ssRUFBRTtJQUFDO0lBRTFDLE1BQU1DLE1BQU1mLHFEQUFZQSxDQUFDTSxJQUFJLENBQUM7UUFBRUMsU0FBUztJQUFtQjtJQUM1RFEsSUFBSUMsT0FBTyxDQUFDQyxHQUFHLENBQUMsU0FBU0wsT0FBTztRQUM5Qk0sVUFBVTtRQUNWQyxVQUFVO0lBQ1o7SUFFQSxPQUFPSjtBQUNUIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2xpbWF0ZS1kYXNoYm9hcmQvLi9zcmMvYXBwL2FwaS9hdXRoL2xvZ2luL3JvdXRlLnRzP2QzMWEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xyXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tICdAL2xpYi9wcmlzbWEnO1xyXG5pbXBvcnQgeyBzaWduVG9rZW4gfSBmcm9tICdAL2xpYi9qd3QnO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxOiBSZXF1ZXN0KSB7XHJcbiAgY29uc3QgeyBlbWFpbCB9ID0gYXdhaXQgcmVxLmpzb24oKTtcclxuXHJcbiAgaWYgKCFlbWFpbCkge1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICB7IG1lc3NhZ2U6ICdFbWFpbCBpcyByZXF1aXJlZCcgfSxcclxuICAgICAgeyBzdGF0dXM6IDQwMCB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xyXG4gICAgd2hlcmU6IHsgZW1haWwgfSxcclxuICB9KTtcclxuXHJcbiAgaWYgKCF1c2VyKSB7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgIHsgbWVzc2FnZTogJ1VzZXIgbm90IGZvdW5kJyB9LFxyXG4gICAgICB7IHN0YXR1czogNDA0IH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjb25zdCB0b2tlbiA9IHNpZ25Ub2tlbih7IHVzZXJJZDogdXNlci5pZCB9KTtcclxuXHJcbiAgY29uc3QgcmVzID0gTmV4dFJlc3BvbnNlLmpzb24oeyBtZXNzYWdlOiAnTG9naW4gc3VjY2Vzc2Z1bCcgfSk7XHJcbiAgcmVzLmNvb2tpZXMuc2V0KCd0b2tlbicsIHRva2VuLCB7XHJcbiAgICBodHRwT25seTogdHJ1ZSxcclxuICAgIHNhbWVTaXRlOiAnbGF4JyxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHJlcztcclxufVxyXG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwicHJpc21hIiwic2lnblRva2VuIiwiUE9TVCIsInJlcSIsImVtYWlsIiwianNvbiIsIm1lc3NhZ2UiLCJzdGF0dXMiLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwidG9rZW4iLCJ1c2VySWQiLCJpZCIsInJlcyIsImNvb2tpZXMiLCJzZXQiLCJodHRwT25seSIsInNhbWVTaXRlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/auth/login/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/jwt.ts":
/*!************************!*\
  !*** ./src/lib/jwt.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   signToken: () => (/* binding */ signToken)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n\nconst JWT_SECRET = process.env.JWT_SECRET;\nif (!JWT_SECRET) {\n    throw new Error(\"JWT_SECRET is not defined in environment variables\");\n}\nfunction signToken(payload) {\n    return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().sign(payload, JWT_SECRET, {\n        expiresIn: \"1d\"\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2p3dC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBK0I7QUFFL0IsTUFBTUMsYUFBYUMsUUFBUUMsR0FBRyxDQUFDRixVQUFVO0FBRXpDLElBQUksQ0FBQ0EsWUFBWTtJQUNmLE1BQU0sSUFBSUcsTUFBTTtBQUNsQjtBQUVPLFNBQVNDLFVBQVVDLE9BQWU7SUFDdkMsT0FBT04sd0RBQVEsQ0FBQ00sU0FBU0wsWUFBWTtRQUNuQ08sV0FBVztJQUNiO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbGltYXRlLWRhc2hib2FyZC8uL3NyYy9saWIvand0LnRzPzE0ZmYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nO1xyXG5cclxuY29uc3QgSldUX1NFQ1JFVCA9IHByb2Nlc3MuZW52LkpXVF9TRUNSRVQgYXMgc3RyaW5nO1xyXG5cclxuaWYgKCFKV1RfU0VDUkVUKSB7XHJcbiAgdGhyb3cgbmV3IEVycm9yKCdKV1RfU0VDUkVUIGlzIG5vdCBkZWZpbmVkIGluIGVudmlyb25tZW50IHZhcmlhYmxlcycpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2lnblRva2VuKHBheWxvYWQ6IG9iamVjdCkge1xyXG4gIHJldHVybiBqd3Quc2lnbihwYXlsb2FkLCBKV1RfU0VDUkVULCB7XHJcbiAgICBleHBpcmVzSW46ICcxZCcsXHJcbiAgfSk7XHJcbn1cclxuIl0sIm5hbWVzIjpbImp3dCIsIkpXVF9TRUNSRVQiLCJwcm9jZXNzIiwiZW52IiwiRXJyb3IiLCJzaWduVG9rZW4iLCJwYXlsb2FkIiwic2lnbiIsImV4cGlyZXNJbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/jwt.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/prisma.ts":
/*!***************************!*\
  !*** ./src/lib/prisma.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\n// Reuse Prisma client across hot reloads in development to avoid exhausting\n// database connections. In production, a single instance is sufficient.\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"error\",\n        \"warn\"\n    ]\n});\nif (true) {\n    globalForPrisma.prisma = prisma;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3ByaXNtYS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBOEM7QUFFOUMsNEVBQTRFO0FBQzVFLHdFQUF3RTtBQUN4RSxNQUFNQyxrQkFBa0JDO0FBRWpCLE1BQU1DLFNBQ1hGLGdCQUFnQkUsTUFBTSxJQUN0QixJQUFJSCx3REFBWUEsQ0FBQztJQUNmSSxLQUFLO1FBQUM7UUFBUztLQUFPO0FBQ3hCLEdBQUc7QUFFTCxJQUFJQyxJQUFxQyxFQUFFO0lBQ3pDSixnQkFBZ0JFLE1BQU0sR0FBR0E7QUFDM0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbGltYXRlLWRhc2hib2FyZC8uL3NyYy9saWIvcHJpc21hLnRzPzAxZDciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCI7XHJcblxyXG4vLyBSZXVzZSBQcmlzbWEgY2xpZW50IGFjcm9zcyBob3QgcmVsb2FkcyBpbiBkZXZlbG9wbWVudCB0byBhdm9pZCBleGhhdXN0aW5nXHJcbi8vIGRhdGFiYXNlIGNvbm5lY3Rpb25zLiBJbiBwcm9kdWN0aW9uLCBhIHNpbmdsZSBpbnN0YW5jZSBpcyBzdWZmaWNpZW50LlxyXG5jb25zdCBnbG9iYWxGb3JQcmlzbWEgPSBnbG9iYWxUaGlzIGFzIHVua25vd24gYXMgeyBwcmlzbWE/OiBQcmlzbWFDbGllbnQgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcmlzbWEgPVxyXG4gIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPz9cclxuICBuZXcgUHJpc21hQ2xpZW50KHtcclxuICAgIGxvZzogW1wiZXJyb3JcIiwgXCJ3YXJuXCJdLFxyXG4gIH0pO1xyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xyXG4gIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPSBwcmlzbWE7XHJcbn1cclxuIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsImdsb2JhbEZvclByaXNtYSIsImdsb2JhbFRoaXMiLCJwcmlzbWEiLCJsb2ciLCJwcm9jZXNzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=C%3A%5CUsers%5Crava_%5COneDrive%5CDesktop%5Cwinter%20climate%20project%5Cclimate-dashboard%5Cclimate-dashboard%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Crava_%5COneDrive%5CDesktop%5Cwinter%20climate%20project%5Cclimate-dashboard%5Cclimate-dashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();