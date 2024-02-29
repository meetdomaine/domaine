import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import 'html-escaper';
import 'clsx';
import './chunks/astro_DqcxPQpM.mjs';
import 'cssesc';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"insights/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/insights","isIndex":true,"type":"page","pattern":"^\\/insights\\/?$","segments":[[{"content":"insights","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/insights/index.astro","pathname":"/insights","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"events/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/events","isIndex":true,"type":"page","pattern":"^\\/events\\/?$","segments":[[{"content":"events","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/events/index.astro","pathname":"/events","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"robots.txt","links":[],"scripts":[],"styles":[],"routeData":{"route":"/robots.txt","isIndex":false,"type":"endpoint","pattern":"^\\/robots\\.txt\\/?$","segments":[[{"content":"robots.txt","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/robots.txt.ts","pathname":"/robots.txt","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"styleguide/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/styleguide","isIndex":false,"type":"page","pattern":"^\\/styleguide\\/?$","segments":[[{"content":"styleguide","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/styleguide.astro","pathname":"/styleguide","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://domaine-2-0.vercel.app/","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/pages/[...slug].astro",{"propagation":"none","containsHead":true}],["/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/pages/events/[slug].astro",{"propagation":"none","containsHead":true}],["/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/pages/events/index.astro",{"propagation":"none","containsHead":true}],["/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/pages/insights/[category]/[slug].astro",{"propagation":"in-tree","containsHead":true}],["/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/pages/insights/[category]/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/pages/insights/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/pages/styleguide.astro",{"propagation":"none","containsHead":true}],["/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/components/sections/blog/blogIndex/BlogIndexHero.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/insights/[category]/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/insights/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/components/sections/blog/blogPost/BlogPostHero.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/insights/[category]/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_BmSlWhkI.mjs","\u0000@astrojs-manifest":"manifest_Buv8VCxf.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_CzAuYff3.mjs","\u0000@astro-page:src/pages/insights/index@_@astro":"chunks/index_BW_xVjws.mjs","\u0000@astro-page:src/pages/insights/[category]/index@_@astro":"chunks/index_DmZIXkog.mjs","\u0000@astro-page:src/pages/insights/[category]/[slug]@_@astro":"chunks/_slug__Cd_GJNfX.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_Dn_vBejO.mjs","\u0000@astro-page:src/pages/events/index@_@astro":"chunks/index_DfnZkSyG.mjs","\u0000@astro-page:src/pages/events/[slug]@_@astro":"chunks/_slug__D506j-mH.mjs","\u0000@astro-page:src/pages/robots.txt@_@ts":"chunks/robots_I3ypwB2o.mjs","\u0000@astro-page:src/pages/styleguide@_@astro":"chunks/styleguide_fqjzqBrw.mjs","\u0000@astro-page:src/pages/[...slug]@_@astro":"chunks/_.._xj10Qc_k.mjs","/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/animation/ViewportObserver":"_astro/ViewportObserver.CLkvyobd.js","@astrojs/solid-js/client.js":"_astro/client.SzUQAjWS.js","/astro/hoisted.js?q=0":"_astro/hoisted.muh-ZZ-v.js","/astro/hoisted.js?q=2":"_astro/hoisted.DiNuKW_X.js","/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/node_modules/@sanity/client/dist/_chunks/stegaEncodeSourceMap-LDHMEOVo.js":"_astro/stegaEncodeSourceMap-LDHMEOVo.D-lQpax3.js","/astro/hoisted.js?q=1":"_astro/hoisted.xphpYHLh.js","/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/components/sections/work/Work":"_astro/Work.C2Y1e-9P.js","/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/components/sections/contact/Contact":"_astro/Contact.DdLwK1Rg.js","/astro/hoisted.js?q=3":"_astro/hoisted.D58I9gma.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/_slug_.egS_FswZ.css","/_astro/_slug_.CXW-YWM7.css","/OG_Image.png","/SuisseIntl-Italic.woff","/SuisseIntl-Italic.woff2","/SuisseIntl-Light.otf","/SuisseIntl-Medium.otf","/SuisseIntl-Medium.woff","/SuisseIntl-Medium.woff2","/SuisseIntl-MediumItalic.otf","/SuisseIntl-MediumItalic.woff","/SuisseIntl-MediumItalic.woff2","/SuisseIntl-Regular.otf","/SuisseIntl-Regular.woff","/SuisseIntl-Regular.woff2","/SuisseIntl-RegularItalic.otf","/favicon.svg","/_astro/Contact.DdLwK1Rg.js","/_astro/ViewportObserver.CLkvyobd.js","/_astro/Work.C2Y1e-9P.js","/_astro/Work.sSw_pNAA.js","/_astro/_slug_.VgCupb4q.css","/_astro/browser.CYdUe7L9.js","/_astro/client.SzUQAjWS.js","/_astro/hoisted.D58I9gma.js","/_astro/hoisted.DiNuKW_X.js","/_astro/hoisted.muh-ZZ-v.js","/_astro/hoisted.xphpYHLh.js","/_astro/solid.HpFterNd.js","/_astro/stegaEncodeSourceMap-LDHMEOVo.D-lQpax3.js","/_astro/web.DHxVHd82.js","/insights/index.html","/index.html","/events/index.html","/robots.txt","/styleguide/index.html"],"buildFormat":"directory"});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
