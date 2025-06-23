// functions/_middleware.js
// Advanced redirect with cookie to remember user preference

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  
  // Skip for assets and API routes
  if (url.pathname.startsWith('/_next') || 
      url.pathname.startsWith('/api') ||
      url.pathname.includes('.')) {
    return next();
  }
  
  // Check for override cookie (user manually chose language)
  const cookies = request.headers.get('Cookie') || '';
  const languageOverride = cookies.includes('language-override=true');
  
  // If user has override cookie, don't redirect
  if (languageOverride) {
    return next();
  }
  
  // Get country from Cloudflare's geolocation
  const country = request.cf?.country;
  
  // Define your redirect rules
  const redirectRules = {
    'DE': '/de',
    'AT': '/de', // Austria also gets German content
    'CH': '/de', // Switzerland (though they might prefer different handling)
    'NL': '/nl'
  };
  
  const targetPath = redirectRules[country];
  
  // If we have a redirect rule and user isn't already on that path
  if (targetPath && !url.pathname.startsWith(targetPath)) {
    const redirectUrl = new URL(request.url);
    redirectUrl.pathname = targetPath + url.pathname;
    
    return Response.redirect(redirectUrl.toString(), 302);
  }
  
  return next();
}

// Optional: Create a function to handle language switching
// functions/api/set-language.js
export async function onRequestPost(context) {
  const { request } = context;
  
  try {
    const body = await request.json();
    const { language } = body;
    
    // Set cookie to override automatic detection
    const response = new Response(JSON.stringify({ success: true }), {
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': 'language-override=true; Path=/; Max-Age=31536000; SameSite=Lax'
      }
    });
    
    return response;
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}