import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    [/^size-(.+)$/, ([, size]: [any, any]) => `w-${size} h-${size}`],
    ['flex-middle', 'flex items-center justify-center'],
  ],
  rules: [
    [
      /^layout-grid$/,
      (_: any, { currentSelector }: { currentSelector: string }) => {
        const selector = `.${currentSelector}`

        return `
          ${selector} {
          --gap: 16px;
          --full: minmax(var(--gap), 1fr);
          --content: min(50ch, 100% - var(--gap) * 2);
          --popout: minmax(0, 32px);
          --feature: minmax(0, 192px);
  
          display: grid;
          grid-template-columns:
            [full-start] var(--full)
            [feature-start] var(--feature)
            [popout-start] var(--popout)
            [content-start] var(--content) [content-end]
            var(--popout) [popout-end]
            var(--feature) [feature-end]
            var(--full) [full-end];
          }
  
          ${selector} > * {
            grid-column: content;
          }`
      },
    ],
    [
      /^layout-grid-(\w+)$/,
      ([full, name]: any) => {
        // Second param is ctx = { rawSelector, currentSelector, variantHandlers, theme }: any
        // we could use either full, rawSelector or currentSelector
        const selector = `.layout-grid .${full}`

        return `
          ${selector} {
            grid-column: ${name};
          }`
      },
    ],
    [
      /^no-scrollbar$/,
      (_: any, { currentSelector }: { currentSelector: string }) => {
        const selector = `.${currentSelector}`
        return `
        ${selector} {
          -ms-overflow-style: none;
          scrollbar-width: none;
          &::-webkit-scrollbar {
            display: none;
          }
        }`
      },
    ],
    // https://twitter.com/ChromiumDev/status/1734742817812152796
    ['break-normal', { 'word-break': 'normal' }],
    ['break-phrase', { 'word-break': 'auto-phrase' }],
    ['text-balance', { 'text-wrap': 'balance;' }],
    ['text-pretty', { 'text-wrap': 'pretty;' }],
    ['text-stable', { 'text-wrap': 'stable;' }],
    ['grid-cols-subgrid',	{ 'grid-template-columns': 'subgrid;' }],
    [/^bg-checked$/, ([,], { rawSelector, currentSelector, variantHandlers, theme }) => {
      const selector = `.${currentSelector}`
      const mainColor = theme.colors.slate[200]
      const darkColor = theme.colors.slate[700]

      return `
        ${selector} {
            background-color: transparent;
            background-image: 
              radial-gradient(
                rgba(0,0,0,0) 2px,
                ${mainColor} 2px
              );
            background-size: 4px 4px;
            backdrop-filter: brightness(100%) blur(3px);
         }
        .dark ${selector} {
            background-image: 
              radial-gradient(
                rgba(0,0,0,0) 2px,
                ${darkColor} 2px
              );
         }
      `
    }],
  ],
  theme: {
    colors: {
      'oxford-blue': '#090731',
      'pale-cerulean': '#BBEFFF',
      'purple-heart': '#7434FD',
      'medium-orchid': '#AB57FF',
      'light-coral': '#FF9A9E',
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'Space Grotesk',
        serif: 'Milonga',
        mono: 'Space Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
