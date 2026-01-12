import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  minify: false,
  external: ['react', 'react-dom'],
  target: 'es2020',
  treeshake: true,
  banner: {
    js: "'use client';",
  },
  loader: {
    '.css': 'text',
  },
});