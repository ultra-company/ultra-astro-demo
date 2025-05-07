// Minimal worker to avoid conflicting with Pages
export default {
  fetch(request, env) {
    return env.ASSETS.fetch(request);
  }
};