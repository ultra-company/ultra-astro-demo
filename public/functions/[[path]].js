// Fix the redirect issues by directly serving the HTML files
export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  
  // Handle specific redirect loop cases
  if (url.pathname === '/blog' || url.pathname === '/blog/') {
    return fetch(new URL('/blog.html', url.origin));
  }
  
  if (url.pathname === '/solutions' || url.pathname === '/solutions/') {
    return fetch(new URL('/solutions.html', url.origin));
  }
  
  // Let Cloudflare handle the rest
  return next();
}