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
});
