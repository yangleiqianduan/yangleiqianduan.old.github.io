/**
 *  === routes ===
 *
 *  created at: <?= createdAt ?>
 */
import zola from 'zola'

export default zola.router({
  history: 'hashHistory',
  routes: [
    // ==== router start ==== //
    { path: '/', component: System.import('pages/index') },
    { path: 'list/:categories', component: System.import('pages/list') },
    { path: 'article/:path', component: System.import('pages/article') },
    { path: 'about', component: System.import('pages/about') },

    // ==== router end   ==== //
    { path: '*', component: System.import('pages/404') },
  ]
})