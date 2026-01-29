// Smooth scroll utility functions

export interface ScrollOptions {
  behavior?: 'auto' | 'smooth';
  block?: 'start' | 'center' | 'end' | 'nearest';
  inline?: 'start' | 'center' | 'end' | 'nearest';
}

export interface WindowScrollOptions {
  top?: number;
  left?: number;
  behavior?: 'auto' | 'smooth';
}

export const smoothScrollTo = (elementId: string, options: ScrollOptions = {}): void => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const defaultOptions: ScrollOptions = {
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
    ...options
  };

  element.scrollIntoView(defaultOptions);
};

export const smoothScrollToTop = (options: WindowScrollOptions = {}): void => {
  const defaultOptions: WindowScrollOptions = {
    top: 0,
    left: 0,
    behavior: 'smooth',
    ...options
  };

  window.scrollTo(defaultOptions);
};

export const smoothScrollToElement = (element: Element, options: ScrollOptions = {}): void => {
  if (!element) return;

  const defaultOptions: ScrollOptions = {
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
    ...options
  };

  element.scrollIntoView(defaultOptions);
};

// Enhanced smooth scroll with offset support
export const smoothScrollWithOffset = (elementId: string, offset: number = 0, options: WindowScrollOptions = {}): void => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - offset;

  const defaultOptions: WindowScrollOptions = {
    top: offsetPosition,
    behavior: 'smooth',
    ...options
  };

  window.scrollTo(defaultOptions);
};

// Programmatic smooth scroll for navigation
export const handleSmoothNavigation = (href: string, offset: number = 80): void => {
  // Handle anchor links
  if (href.startsWith('#')) {
    const elementId = href.substring(1);
    smoothScrollWithOffset(elementId, offset);
    return;
  }

  // Handle regular navigation
  if (href.startsWith('/')) {
    window.location.href = href;
    return;
  }

  // Handle external links
  window.open(href, '_blank', 'noopener,noreferrer');
};

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Smooth scroll with reduced motion support
export const accessibleSmoothScroll = (elementId: string, options: ScrollOptions = {}): void => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const scrollOptions: ScrollOptions = {
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
    inline: 'nearest',
    ...options
  };

  element.scrollIntoView(scrollOptions);
};