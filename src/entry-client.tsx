import './styles/index.css';

const container = document.getElementById('root');
if (!container) throw new Error('Missing #root');

// A prerendered page is complete HTML. React is fetched only when the page has an
// interactive island (a preview video marks itself with data-hydrate) or in dev.
const prerendered = container.firstElementChild !== null;
if (!prerendered || container.querySelector('[data-hydrate]')) {
  void import('./hydrate').then(({ start }) => start(container, prerendered));
}
