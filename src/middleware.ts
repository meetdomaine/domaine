import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);

  let shouldRedirect = false;
  let redirectUrl = new URL(url);

  if (url.hostname === 'meetdomaine.com') {
    redirectUrl.hostname = 'www.meetdomaine.com';
    shouldRedirect = true;
  }

  const hasFileExtension = /\.[a-z0-9]+$/i.test(url.pathname);
  const isRootPath = url.pathname === '/';
  const isApiRoute = url.pathname.startsWith('/api/');
  const isAdminRoute = url.pathname.startsWith('/admin');

  if (!hasFileExtension && !isRootPath && !isApiRoute && !isAdminRoute && !url.pathname.endsWith('/')) {
    redirectUrl.pathname = `${url.pathname}/`;
    shouldRedirect = true;
  }

  if (shouldRedirect) {
    return context.redirect(redirectUrl.toString(), 301);
  }

  return next();
});
