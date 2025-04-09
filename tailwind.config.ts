import scrollbarHide from 'tailwind-scrollbar-hide'
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  theme: {
    // ...
  },
  plugins: [scrollbarHide],
  content: ['./node_modules/react-datepicker/dist/react-datepicker.css'],
} satisfies Config
