import {
  defineConfig,
  presetWind3,
  transformerVariantGroup,
  transformerDirectives,
} from "unocss";

export default defineConfig({
  presets: [
    presetWind3({
      theme: {
        fontFamily: {
          sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        },
      },
    }),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  shortcuts: {
    'underline-slide': "relative before:content-[''] before:absolute before:bottom-[-2px] before:left-0 before:h-[2px] before:w-0 before:bg-current before:transition-[width] before:duration-300 before:ease-in-out hover:before:w-full",
  },
});
