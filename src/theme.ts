import { MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
  colorScheme: 'light',
  colors: {
    brand: ['#6BEC80', '#63E778', '#58E26E', '#58E47F', '#F13EAF', '#46D16D', '#2FB856', '#1A993D', '#0B852D', '#007320'],
  },
  primaryColor: 'brand',
  fontFamily: "Montserrat",
  fontFamilyMonospace: "Montserrat",
  headings: {
    fontFamily: "Montserrat",
    sizes: {
      h1: { fontSize: '3.5rem' },
      h2: { fontSize: '3rem' },
      h3: { fontSize: '2.25rem' },
      h4: { fontSize: '1.5rem' },
      h5: { fontSize: '1rem' },
    },
  },
}