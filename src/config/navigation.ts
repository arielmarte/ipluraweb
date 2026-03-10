export const NAVIGATION_BREAKPOINTS = {
  mobile: 1024,
} as const;

export const DESKTOP_NAV_LAYOUT = {
  linkGapPx: 24,
  safetyPx: 8,
} as const;

// Ordem do primeiro a desaparecer ao último, conforme prioridade de negócio.
export const DESKTOP_LINK_HIDE_ORDER = [
  '#contato',
  '#hero',
  '#beneficios',
  '#credenciais',
  '#como-funciona',
  '#sobre',
  '#solucoes',
] as const;

