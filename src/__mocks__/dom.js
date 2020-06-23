Object.defineProperty(document, 'querySelector', {
  value: () => document.createElement('div'),
});
