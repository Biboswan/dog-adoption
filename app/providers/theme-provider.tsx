"use client";

import { ChakraProvider, createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { ReactNode } from "react";

const customConfig = defineConfig({
  globalCss: {
    html: {
      colorPalette: "primary", // Change this to any color palette you prefer
    },
  },
  theme: {
    tokens: {
      colors: {
          primary: {
            50: { value: "#E8F5EA" },
            100: { value: "#D1EBD5" },
            200: { value: "#BAE0C0" },
            300: { value: "#8FCD98" },
            400: { value: "#64B570" },
            500: { value: "#4A9C57" }, // base color
            600: { value: "#3B7D46" },
            700: { value: "#2C5E34" },
            800: { value: "#1E3F23" },
            900: { value: "#0F1F11" },
          },
          secondary: {
            50: { value: "#FDF9F6" },
            100: { value: "#FCF4ED" },
            200: { value: "#FAEFE5" },
            300: { value: "#F7E4D4" }, // base color
            400: { value: "#F2D0B5" },
            500: { value: "#EDBC96" },
            600: { value: "#E8A877" },
            700: { value: "#E39458" },
            800: { value: "#DE8039" },
            900: { value: "#D96C1A" },
          },
          accent: {
            50: { value: "#FDE9E5" },
            100: { value: "#FBD3CB" },
            200: { value: "#F8BDB1" },
            300: { value: "#F2937E" },
            400: { value: "#EC824B" },
            500: { value: "#E76F51" }, // base color
            600: { value: "#D85636" },
            700: { value: "#B94527" },
            800: { value: "#8A341D" },
            900: { value: "#5B2213" },
          },
          gray: {
            50: { value: "#F7F8F9" },
            100: { value: "#E3E5E8" },
            200: { value: "#CFD3D8" },
            300: { value: "#A4ABB5" },
            400: { value: "#8993A0" },
            500: { value: "#6F7B8B" }, // muted color
            600: { value: "#586274" },
            700: { value: "#424A5C" },
            800: { value: "#2C3141" },
            900: { value: "#161925" },
        },
        background: { value: "#FFFFFF" },  // Clean white
        text: { value: "#333333" },        // Dark charcoal
        muted: { value: "#6F7B8B" },       // Soft gray
      },
      fonts: {
        body: { value: "'Nunito', system-ui, sans-serif" },
        heading: { value: "'Varela Round', system-ui, sans-serif" },
      },
    },
    semanticTokens: {
      colors: {
        'dog-card-bg': { value: "{colors.secondary}" },
        'adopt-button': { value: "{colors.primary}" },
        'info-text': { value: "{colors.text}" },
        primary: {
          contrast: {
            value: {
              _light: "white",
              _dark: "white",
            },
          },
          fg: {
            value: {
              _light: "{colors.primary.700}",
              _dark: "{colors.primary.300}",
            },
          },
          subtle: {
            value: {
              _light: "{colors.primary.100}",
              _dark: "{colors.primary.900}",
            },
          },
          muted: {
            value: {
              _light: "{colors.primary.200}",
              _dark: "{colors.primary.800}",
            },
          },
          emphasized: {
            value: {
              _light: "{colors.primary.300}",
              _dark: "{colors.primary.700}",
            },
          },
          solid: {
            value: {
              _light: "{colors.primary.600}",
              _dark: "{colors.primary.600}",
            },
          },
          focusRing: {
            value: {
              _light: "{colors.primary.600}",
              _dark: "{colors.primary.600}",
            },
          },
        },
      }
    }
  }
});


const system = createSystem(defaultConfig, customConfig);

type Props = {
  children: ReactNode;
};

export default function Provider({ children }: Props) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
}
