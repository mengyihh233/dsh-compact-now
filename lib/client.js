window.__ModuleLoader__.load({ id: "dsh-compact-now", factory: (require) => { var module = { exports: {} }; var exports = module.exports;
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client.ts
var client_exports = {};
__export(client_exports, {
  apply: () => apply,
  inject: () => inject,
  name: () => name
});
module.exports = __toCommonJS(client_exports);
var import_react = __toESM(require("react"), 1);
var name = "dsh-compact-now";
var inject = ["slots", "remote"];
function createCompactButton(ctx) {
  return function CompactButton(props) {
    const [busy, setBusy] = import_react.default.useState(false);
    const [done, setDone] = import_react.default.useState(false);
    const sessionId = props && props.sessionId;
    const run = () => {
      if (busy || !sessionId) return;
      setBusy(true);
      const remote = ctx.remote;
      const cmd = remote && remote.commands && typeof remote.commands.execute === "function" ? remote.commands.execute(sessionId, "/compact") : Promise.resolve({ ok: false });
      Promise.resolve(cmd).then(
        () => {
          setBusy(false);
          setDone(true);
          setTimeout(() => setDone(false), 2500);
        },
        () => {
          setBusy(false);
          setDone(true);
          setTimeout(() => setDone(false), 2500);
        }
      );
    };
    return import_react.default.createElement("button", {
      onClick: run,
      disabled: busy || !sessionId,
      title: "\u538B\u7F29\u4E0A\u4E0B\u6587\uFF1A\u628A\u65E7\u5386\u53F2\u6298\u53E0\u6210\u6458\u8981\uFF0C\u964D\u4F4E\u6BCF\u8F6E token \u5F00\u9500",
      style: {
        background: "transparent",
        border: "1px solid var(--dsw-border, rgba(128,128,128,0.35))",
        borderRadius: 6,
        cursor: busy ? "default" : "pointer",
        fontSize: 13,
        padding: "3px 8px",
        color: done ? "var(--dsw-state-success, #4caf50)" : "var(--dsw-text-primary, #ddd)",
        opacity: busy ? 0.6 : 1
      }
    }, busy ? "\u538B\u7F29\u4E2D\u2026" : done ? "\u5DF2\u538B\u7F29 \u2713" : "\u{1F5DC} \u538B\u7F29");
  };
}
function apply(ctx) {
  const slots = ctx.slots;
  if (slots === void 0) return;
  const CompactButton = createCompactButton(ctx);
  slots.inject(
    "conversation.input.right",
    () => slots.register(
      { name: "conversation.input.right", id: "compact-now", order: 5 },
      (props) => import_react.default.createElement(CompactButton, props)
    )
  );
}
return module.exports; } });
