export { renderers } from '../renderers.mjs';

const page = () => import('./prerender_Dt-piv-2.mjs').then(n => n.b);

export { page };
