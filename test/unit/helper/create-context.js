export default function createContext(options = {}, count = 1) {
  const context = document.createElement(`div`);

  for (let i = 1; i <= count; i += 1) {
    const perfundo = document.createElement(`div`);
    perfundo.classList.add(`perfundo`);

    const link = document.createElement(`a`);
    link.classList.add(options.classNames.link);
    perfundo.appendChild(link);

    const overlay = document.createElement(`div`);
    overlay.classList.add(options.classNames.overlay);
    overlay.setAttribute(`id`, `element${i}`);
    perfundo.appendChild(overlay);

    const close = document.createElement(`a`);
    close.classList.add(options.classNames.close);
    perfundo.appendChild(close);

    if (count > 1) {
      if (i === 1) {
        const next = document.createElement(`a`);
        next.classList.add(options.classNames.next);
        next.setAttribute(`href`, `#element${i + 1}`);
        perfundo.appendChild(next);
      } else if (i === count) {
        const prev = document.createElement(`a`);
        prev.classList.add(options.classNames.prev);
        prev.setAttribute(`href`, `#element${i - 1}`);
        perfundo.appendChild(prev);
      }
    }

    context.appendChild(perfundo);
  }

  return context;
}
