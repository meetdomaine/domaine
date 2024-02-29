import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import 'html-escaper';
import 'clsx';
import './chunks/astro_DEkkr4aR.mjs';
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

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.q6ieYK4J.js"}],"styles":[{"type":"external","src":"/_astro/_slug_.BNAv0Qp3.css"},{"type":"inline","content":".blog-index-hero[data-astro-cid-kkuqwvpk]{margin:0 var(--page-margin);padding:var(--header-height) 0 var(--space-xl);display:flex;flex-direction:row;justify-content:stretch;align-items:stretch;gap:var(--space-xl);border-bottom:1px solid var(--color-border)}.media[data-astro-cid-kkuqwvpk],.text[data-astro-cid-kkuqwvpk]{flex:1 1 50%}.media[data-astro-cid-kkuqwvpk]{aspect-ratio:1 / 1;border-radius:var(--radius-lg);overflow:hidden}.post-image[data-astro-cid-kkuqwvpk]{width:100%;height:100%;object-fit:cover}.text[data-astro-cid-kkuqwvpk]{display:flex;flex-direction:column;justify-content:stretch;gap:var(--space-sm)}.section-title[data-astro-cid-kkuqwvpk]{display:flex;flex-direction:row;justify-content:space-between;align-items:center;padding:0 0 var(--space-xs);border-bottom:1px solid var(--color-border);flex-wrap:wrap;gap:var(--space-2xs)}.post-content[data-astro-cid-kkuqwvpk]{flex-grow:1;display:flex;flex-direction:column;justify-content:space-between;gap:var(--space-md)}.post-title[data-astro-cid-kkuqwvpk]{display:flex;flex-direction:column;align-items:flex-start;gap:var(--space-2xs)}.post-details[data-astro-cid-kkuqwvpk]{display:flex;flex-direction:column;align-items:flex-start;gap:var(--space-sm);padding-bottom:var(--space-lg)}@media screen and (max-width:768px){.blog-index-hero[data-astro-cid-kkuqwvpk]{flex-direction:column-reverse}.media[data-astro-cid-kkuqwvpk],.text[data-astro-cid-kkuqwvpk]{flex:0 0 auto}}.blog-post-card[data-astro-cid-6aov3gpb]{display:flex;flex-direction:column;align-items:stretch;gap:var(--space-xs)}.media[data-astro-cid-6aov3gpb]{border-radius:var(--radius-sm);overflow:hidden;aspect-ratio:1 / 1}.image[data-astro-cid-6aov3gpb]{width:100%;height:100%;object-fit:cover;scale:1;transition:scale var(--anim-sm)}.media[data-astro-cid-6aov3gpb]:hover .image[data-astro-cid-6aov3gpb]{scale:1.1}.content[data-astro-cid-6aov3gpb]{display:flex;flex-direction:column;align-items:flex-start;gap:var(--space-2xs)}.blog-index-feed[data-astro-cid-j4aff6b4]{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-lg);padding:0 var(--page-margin) var(--space-2xl)}@media screen and (max-width: 960px){.blog-index-feed[data-astro-cid-j4aff6b4]{grid-template-columns:repeat(2,1fr)}}.blog-index-sidebar[data-astro-cid-e4saslip]{flex:0 0 auto;display:flex;flex-direction:column;align-items:flex-start;gap:var(--space-sm);position:sticky;top:var(--header-height);padding:0 var(--page-margin) var(--space-md);max-width:100%}.sidebar-link[data-astro-cid-e4saslip]{flex:0 0 auto;position:relative;color:var(--color-foreground-secondary)}.sidebar-link[data-astro-cid-e4saslip]:before{--dot-size: 4px;content:\"\";width:var(--dot-size);height:var(--dot-size);border-radius:var(--radius-rounded);background:var(--color-foreground);position:absolute;left:calc(var(--space-xs) * -1);top:50%;translate:0 -50%;opacity:0}.sidebar-link[data-astro-cid-e4saslip][data-active=true]{color:var(--color-foreground)}.sidebar-link[data-astro-cid-e4saslip][data-active=true]:before{opacity:1}@media screen and (max-width: 768px){.blog-index-sidebar[data-astro-cid-e4saslip]{position:static;flex-direction:row;overflow-x:auto}.sidebar-link[data-astro-cid-e4saslip]:before{width:100%;height:1px;border-radius:var(--radius-rounded);background:var(--color-foreground);left:0;right:0;top:unset;bottom:-.5em;translate:0 0;opacity:0;border-radius:0}}\n.icon-auto[data-astro-cid-ptcw2qjg]{width:100%}.icon-small[data-astro-cid-ptcw2qjg]{width:var(--icon-sm)}.icon-medium[data-astro-cid-ptcw2qjg]{width:var(--icon-md)}.icon-large[data-astro-cid-ptcw2qjg]{width:var(--icon-lg)}\n.blog-index-main[data-astro-cid-er3pmupq]{display:flex;flex-direction:row;justify-content:stretch;align-items:flex-start;padding:var(--space-2xl) 0;gap:var(--space-xl)}@media screen and (max-width: 768px){.blog-index-main[data-astro-cid-er3pmupq]{flex-direction:column}}\n.category-tag[data-astro-cid-prtur4gd]{background:transparent;color:var(--color-foreground);border:1px solid var(--color-border);padding-inline:var(--space-xs);padding-block:var(--space-2xs)}.category-tag[data-astro-cid-prtur4gd]:hover{background:var(--color-foreground);color:var(--color-background)}\n"}],"routeData":{"route":"/insights","isIndex":true,"type":"page","pattern":"^\\/insights\\/?$","segments":[[{"content":"insights","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/insights/index.astro","pathname":"/insights","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BYNTxYPg.js"}],"styles":[{"type":"external","src":"/_astro/_slug_.BNAv0Qp3.css"},{"type":"inline","content":".blog-index-hero[data-astro-cid-kkuqwvpk]{margin:0 var(--page-margin);padding:var(--header-height) 0 var(--space-xl);display:flex;flex-direction:row;justify-content:stretch;align-items:stretch;gap:var(--space-xl);border-bottom:1px solid var(--color-border)}.media[data-astro-cid-kkuqwvpk],.text[data-astro-cid-kkuqwvpk]{flex:1 1 50%}.media[data-astro-cid-kkuqwvpk]{aspect-ratio:1 / 1;border-radius:var(--radius-lg);overflow:hidden}.post-image[data-astro-cid-kkuqwvpk]{width:100%;height:100%;object-fit:cover}.text[data-astro-cid-kkuqwvpk]{display:flex;flex-direction:column;justify-content:stretch;gap:var(--space-sm)}.section-title[data-astro-cid-kkuqwvpk]{display:flex;flex-direction:row;justify-content:space-between;align-items:center;padding:0 0 var(--space-xs);border-bottom:1px solid var(--color-border);flex-wrap:wrap;gap:var(--space-2xs)}.post-content[data-astro-cid-kkuqwvpk]{flex-grow:1;display:flex;flex-direction:column;justify-content:space-between;gap:var(--space-md)}.post-title[data-astro-cid-kkuqwvpk]{display:flex;flex-direction:column;align-items:flex-start;gap:var(--space-2xs)}.post-details[data-astro-cid-kkuqwvpk]{display:flex;flex-direction:column;align-items:flex-start;gap:var(--space-sm);padding-bottom:var(--space-lg)}@media screen and (max-width:768px){.blog-index-hero[data-astro-cid-kkuqwvpk]{flex-direction:column-reverse}.media[data-astro-cid-kkuqwvpk],.text[data-astro-cid-kkuqwvpk]{flex:0 0 auto}}.blog-post-card[data-astro-cid-6aov3gpb]{display:flex;flex-direction:column;align-items:stretch;gap:var(--space-xs)}.media[data-astro-cid-6aov3gpb]{border-radius:var(--radius-sm);overflow:hidden;aspect-ratio:1 / 1}.image[data-astro-cid-6aov3gpb]{width:100%;height:100%;object-fit:cover;scale:1;transition:scale var(--anim-sm)}.media[data-astro-cid-6aov3gpb]:hover .image[data-astro-cid-6aov3gpb]{scale:1.1}.content[data-astro-cid-6aov3gpb]{display:flex;flex-direction:column;align-items:flex-start;gap:var(--space-2xs)}.blog-index-feed[data-astro-cid-j4aff6b4]{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-lg);padding:0 var(--page-margin) var(--space-2xl)}@media screen and (max-width: 960px){.blog-index-feed[data-astro-cid-j4aff6b4]{grid-template-columns:repeat(2,1fr)}}.blog-index-sidebar[data-astro-cid-e4saslip]{flex:0 0 auto;display:flex;flex-direction:column;align-items:flex-start;gap:var(--space-sm);position:sticky;top:var(--header-height);padding:0 var(--page-margin) var(--space-md);max-width:100%}.sidebar-link[data-astro-cid-e4saslip]{flex:0 0 auto;position:relative;color:var(--color-foreground-secondary)}.sidebar-link[data-astro-cid-e4saslip]:before{--dot-size: 4px;content:\"\";width:var(--dot-size);height:var(--dot-size);border-radius:var(--radius-rounded);background:var(--color-foreground);position:absolute;left:calc(var(--space-xs) * -1);top:50%;translate:0 -50%;opacity:0}.sidebar-link[data-astro-cid-e4saslip][data-active=true]{color:var(--color-foreground)}.sidebar-link[data-astro-cid-e4saslip][data-active=true]:before{opacity:1}@media screen and (max-width: 768px){.blog-index-sidebar[data-astro-cid-e4saslip]{position:static;flex-direction:row;overflow-x:auto}.sidebar-link[data-astro-cid-e4saslip]:before{width:100%;height:1px;border-radius:var(--radius-rounded);background:var(--color-foreground);left:0;right:0;top:unset;bottom:-.5em;translate:0 0;opacity:0;border-radius:0}}\n.icon-auto[data-astro-cid-ptcw2qjg]{width:100%}.icon-small[data-astro-cid-ptcw2qjg]{width:var(--icon-sm)}.icon-medium[data-astro-cid-ptcw2qjg]{width:var(--icon-md)}.icon-large[data-astro-cid-ptcw2qjg]{width:var(--icon-lg)}\n.blog-index-main[data-astro-cid-krl3ls3a]{display:flex;flex-direction:row;justify-content:stretch;align-items:flex-start;padding:var(--space-2xl) 0;gap:var(--space-xl)}@media screen and (max-width: 768px){.blog-index-main[data-astro-cid-krl3ls3a]{flex-direction:column}}\n.category-tag[data-astro-cid-prtur4gd]{background:transparent;color:var(--color-foreground);border:1px solid var(--color-border);padding-inline:var(--space-xs);padding-block:var(--space-2xs)}.category-tag[data-astro-cid-prtur4gd]:hover{background:var(--color-foreground);color:var(--color-background)}\n"}],"routeData":{"route":"/insights/[category]","isIndex":true,"type":"page","pattern":"^\\/insights\\/([^/]+?)\\/?$","segments":[[{"content":"insights","dynamic":false,"spread":false}],[{"content":"category","dynamic":true,"spread":false}]],"params":["category"],"component":"src/pages/insights/[category]/index.astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.d73o_5av.js"}],"styles":[{"type":"external","src":"/_astro/_slug_.BNAv0Qp3.css"},{"type":"inline","content":".icon-auto[data-astro-cid-ptcw2qjg]{width:100%}.icon-small[data-astro-cid-ptcw2qjg]{width:var(--icon-sm)}.icon-medium[data-astro-cid-ptcw2qjg]{width:var(--icon-md)}.icon-large[data-astro-cid-ptcw2qjg]{width:var(--icon-lg)}\n"},{"type":"external","src":"/_astro/_slug_.BvOyr85c.css"},{"type":"inline","content":".contact{margin:var(--header-height) var(--page-margin) var(--space-2xl);display:flex;justify-content:center;align-items:center;opacity:1;transition:opacity var(--anim-lg)}.contact[data-animate=true]{opacity:0}.contact .section-title{display:flex;flex-direction:column;align-items:stretch;text-align:center}.contact .contact-form{width:min(100%,540px);display:flex;flex-direction:column;align-items:stretch;gap:var(--space-sm)}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BYNTxYPg.js"}],"styles":[{"type":"external","src":"/_astro/_slug_.BNAv0Qp3.css"},{"type":"inline","content":".icon-auto[data-astro-cid-ptcw2qjg]{width:100%}.icon-small[data-astro-cid-ptcw2qjg]{width:var(--icon-sm)}.icon-medium[data-astro-cid-ptcw2qjg]{width:var(--icon-md)}.icon-large[data-astro-cid-ptcw2qjg]{width:var(--icon-lg)}\n"}],"routeData":{"route":"/events","isIndex":true,"type":"page","pattern":"^\\/events\\/?$","segments":[[{"content":"events","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/events/index.astro","pathname":"/events","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/robots.txt","isIndex":false,"type":"endpoint","pattern":"^\\/robots\\.txt\\/?$","segments":[[{"content":"robots.txt","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/robots.txt.ts","pathname":"/robots.txt","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BYNTxYPg.js"}],"styles":[{"type":"external","src":"/_astro/_slug_.BNAv0Qp3.css"},{"type":"inline","content":"section[data-astro-cid-3xbz2sym]{padding:var(--header-height) var(--page-margin) var(--space-xl);display:flex;flex-direction:column;margin-bottom:var(--space-xl)}.section-typography[data-astro-cid-3xbz2sym]{display:flex;flex-direction:column;gap:var(--space-sm)}.section-spacers[data-astro-cid-3xbz2sym]{display:flex;flex-direction:row;gap:var(--space-xs);align-items:flex-start;flex-wrap:wrap}.spacer[data-astro-cid-3xbz2sym]{aspect-ratio:1 / 1;background-color:var(--color-foreground)}.spacer-2xs[data-astro-cid-3xbz2sym]{width:var(--space-2xs)}.spacer-xs[data-astro-cid-3xbz2sym]{width:var(--space-xs)}.spacer-sm[data-astro-cid-3xbz2sym]{width:var(--space-sm)}.spacer-md[data-astro-cid-3xbz2sym]{width:var(--space-md)}.spacer-lg[data-astro-cid-3xbz2sym]{width:var(--space-lg)}.spacer-xl[data-astro-cid-3xbz2sym]{width:var(--space-xl)}.spacer-2xl[data-astro-cid-3xbz2sym]{width:var(--space-2xl)}.spacer-3xl[data-astro-cid-3xbz2sym]{width:var(--space-3xl)}.spacer-4xl[data-astro-cid-3xbz2sym]{width:var(--space-4xl)}.section-buttons[data-astro-cid-3xbz2sym]{flex-direction:row;align-items:center;gap:var(--space-sm)}\n.icon-auto[data-astro-cid-ptcw2qjg]{width:100%}.icon-small[data-astro-cid-ptcw2qjg]{width:var(--icon-sm)}.icon-medium[data-astro-cid-ptcw2qjg]{width:var(--icon-md)}.icon-large[data-astro-cid-ptcw2qjg]{width:var(--icon-lg)}\n"}],"routeData":{"route":"/styleguide","isIndex":false,"type":"page","pattern":"^\\/styleguide\\/?$","segments":[[{"content":"styleguide","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/styleguide.astro","pathname":"/styleguide","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BYNTxYPg.js"}],"styles":[{"type":"external","src":"/_astro/_slug_.BNAv0Qp3.css"},{"type":"inline","content":".icon-auto[data-astro-cid-ptcw2qjg]{width:100%}.icon-small[data-astro-cid-ptcw2qjg]{width:var(--icon-sm)}.icon-medium[data-astro-cid-ptcw2qjg]{width:var(--icon-md)}.icon-large[data-astro-cid-ptcw2qjg]{width:var(--icon-lg)}\n"}],"routeData":{"route":"/work","isIndex":true,"type":"page","pattern":"^\\/work\\/?$","segments":[[{"content":"work","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/work/index.astro","pathname":"/work","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/work/[slug]","isIndex":false,"type":"page","pattern":"^\\/work\\/([^/]+?)\\/?$","segments":[[{"content":"work","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/work/[slug].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://domaine-2-0.vercel.app/","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/pages/[...slug].astro",{"propagation":"none","containsHead":true}],["/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/pages/events/[slug].astro",{"propagation":"none","containsHead":true}],["/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/pages/events/index.astro",{"propagation":"none","containsHead":true}],["/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/pages/insights/[category]/[slug].astro",{"propagation":"in-tree","containsHead":true}],["/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/pages/insights/[category]/index.astro",{"propagation":"none","containsHead":true}],["/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/pages/insights/index.astro",{"propagation":"none","containsHead":true}],["/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/pages/styleguide.astro",{"propagation":"none","containsHead":true}],["/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/pages/work/index.astro",{"propagation":"none","containsHead":true}],["/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/components/sections/blog/blogPost/BlogPostHero.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/insights/[category]/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/src/pages/work/[slug].astro":"chunks/pages/_slug__DwF_54Kc.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_Chp52tUt.mjs","/src/pages/robots.txt.ts":"chunks/pages/robots_CoRlJJcN.mjs","/src/pages/styleguide.astro":"chunks/pages/styleguide_DnzZU7Zq.mjs","\u0000@astrojs-manifest":"manifest_FVRf-i62.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_CWwFJtNk.mjs","\u0000@astro-page:src/pages/insights/index@_@astro":"chunks/index_BzJC1y1J.mjs","\u0000@astro-page:src/pages/insights/[category]/index@_@astro":"chunks/index_feTJfGd4.mjs","\u0000@astro-page:src/pages/insights/[category]/[slug]@_@astro":"chunks/_slug__C_51bGbF.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_BHbAokFS.mjs","\u0000@astro-page:src/pages/events/index@_@astro":"chunks/index_BfDtZ12U.mjs","\u0000@astro-page:src/pages/events/[slug]@_@astro":"chunks/_slug__hAiFCFDd.mjs","\u0000@astro-page:src/pages/robots.txt@_@ts":"chunks/robots_hmZ-1PZ2.mjs","\u0000@astro-page:src/pages/styleguide@_@astro":"chunks/styleguide_Dj2BUveM.mjs","\u0000@astro-page:src/pages/work/index@_@astro":"chunks/index_BmSozYW8.mjs","\u0000@astro-page:src/pages/work/[slug]@_@astro":"chunks/_slug__DzvLB7oG.mjs","\u0000@astro-page:src/pages/[...slug]@_@astro":"chunks/_.._hCTu4Crx.mjs","/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/animation/ViewportObserver":"_astro/ViewportObserver.CLkvyobd.js","@astrojs/solid-js/client.js":"_astro/client.SzUQAjWS.js","/astro/hoisted.js?q=0":"_astro/hoisted.q6ieYK4J.js","/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/components/sections/work/Work":"_astro/Work.Cdm-JGWY.js","/astro/hoisted.js?q=1":"_astro/hoisted.d73o_5av.js","/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/components/sections/contact/Contact":"_astro/Contact.DdLwK1Rg.js","/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/node_modules/@sanity/client/dist/_chunks/stegaEncodeSourceMap-LDHMEOVo.js":"_astro/stegaEncodeSourceMap-LDHMEOVo.DbHqe1BU.js","/astro/hoisted.js?q=2":"_astro/hoisted.BYNTxYPg.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/_slug_.BNAv0Qp3.css","/_astro/_slug_.CZrgmgps.css","/_astro/_slug_.BvOyr85c.css","/OG_Image.png","/SuisseIntl-Italic.woff","/SuisseIntl-Italic.woff2","/SuisseIntl-Light.otf","/SuisseIntl-Medium.otf","/SuisseIntl-Medium.woff","/SuisseIntl-Medium.woff2","/SuisseIntl-MediumItalic.otf","/SuisseIntl-MediumItalic.woff","/SuisseIntl-MediumItalic.woff2","/SuisseIntl-Regular.otf","/SuisseIntl-Regular.woff","/SuisseIntl-Regular.woff2","/SuisseIntl-RegularItalic.otf","/favicon.svg","/_astro/Contact.DdLwK1Rg.js","/_astro/ViewportObserver.CLkvyobd.js","/_astro/Work.Cdm-JGWY.js","/_astro/Work.sbgIqjWK.js","/_astro/_slug_.VgKwLEkP.css","/_astro/browser.DbjwY0dn.js","/_astro/client.SzUQAjWS.js","/_astro/hoisted.BYNTxYPg.js","/_astro/hoisted.d73o_5av.js","/_astro/hoisted.q6ieYK4J.js","/_astro/solid.HpFterNd.js","/_astro/stegaEncodeSourceMap-LDHMEOVo.DbHqe1BU.js","/_astro/web.DHxVHd82.js"],"buildFormat":"directory"});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
