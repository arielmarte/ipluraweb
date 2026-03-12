export type ScrollToAnchorOptions = {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  inline?: ScrollLogicalPosition;
};

export const scrollToAnchor = (
  href: string,
  options: ScrollToAnchorOptions = { behavior: 'smooth' }
) => {
  if (!href.startsWith('#')) {
    return false;
  }

  const target = document.querySelector<HTMLElement>(href);

  if (!target) {
    return false;
  }

  target.scrollIntoView({
    behavior: options.behavior ?? 'smooth',
    block: options.block ?? 'start',
    inline: options.inline ?? 'nearest',
  });

  return true;
};
