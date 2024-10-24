import type { Config } from 'tailwindcss/types/config';

export default {
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      borderWidth: {
        '1': '1px',
      },
    },

    container: {
      center: true,
    },
  },
  plugins: [],
} as Omit<Config, 'content'>;
