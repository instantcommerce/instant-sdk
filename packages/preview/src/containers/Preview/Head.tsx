import { useCallback, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import {
  PublicStore,
  SnippetType,
  PublicAsset,
  ThemeTypography,
} from "types/api";

const FALLBACK_FONT = "IBM Plex Sans";

interface HeadProps {
  store?: PublicStore;
}

const getGoogleFontUrl = (font: string) => {
  const baseURL = new URL("https://fonts.googleapis.com/css2");
  const params = new URLSearchParams({
    display: "swap",
    family: `${font}:wght@400;500;700`,
  });

  return `${baseURL.toString()}?${params.toString()}`;
};

export const Head = ({ store }: HeadProps) => {
  const theme = store?.storefront?.config?.theme;

  const styles = useMemo(
    () =>
      store?.snippets
        ?.filter(({ type }) => type === SnippetType.Css)
        ?.map((snippet) => (
          <link
            key={snippet.url}
            href={snippet.url}
            rel="stylesheet"
            id={snippet.id}
          />
        )),
    [store]
  );

  const { googleFonts, customFonts } = useMemo(() => {
    const googleFonts: string[] = [];
    const customFonts: (Partial<PublicAsset> & { isBold: boolean })[] = [];

    if (theme?.typography) {
      ["paragraph", "heading", "display"].forEach((fontType) => {
        const font =
          theme.typography[
            fontType as keyof Omit<ThemeTypography, "__typename">
          ].font;
        const fontSplit = font?.split("://");

        if (fontSplit?.length === 2) {
          const [prefix, fontNameId] = fontSplit;

          if (prefix === "gfonts") {
            if (!googleFonts.includes(fontNameId.replace(/\+/gm, " "))) {
              googleFonts.push(fontNameId);
            }
          } else if (prefix === "instant") {
            const customFontAsset = store?.assets?.find(
              (asset) => asset.id === fontNameId
            );

            if (
              customFontAsset &&
              !customFonts.find((c) => c.id === customFontAsset.id)
            ) {
              customFonts.push({
                ...customFontAsset,
                isBold: fontType !== "paragraph",
              });
            }
          }
        }
      });
    }

    if (
      !theme?.typography ||
      !theme.typography.paragraph.font ||
      !theme.typography.heading.font ||
      !theme.typography.display.font
    ) {
      googleFonts.push(FALLBACK_FONT);
    }

    return { googleFonts, customFonts };
  }, [store]);

  const getFontFamily = useCallback(
    (font?: string) => {
      const fontSplit = font?.split("://");

      if (fontSplit?.length === 2) {
        const [prefix, fontNameId] = fontSplit;

        if (prefix === "gfonts") {
          return `'${fontNameId.replace(/\+/gm, " ")}', sans-serif`;
        } else if (prefix === "instant") {
          const customFontAsset = store?.assets?.find(
            (asset) => asset.id === fontNameId
          );

          if (customFontAsset) {
            return `'${customFontAsset.name}', sans-serif`;
          }
        }
      }

      return undefined;
    },
    [store?.assets]
  );

  return (
    <Helmet>
      {!!googleFonts.length &&
        googleFonts.map((font) => (
          <link key={font} href={getGoogleFontUrl(font)} rel="style" />
        ))}

      {!!customFonts.length &&
        customFonts.map((font) => (
          <link
            key={font.id}
            href={font.url}
            rel="font"
            crossOrigin="true"
            type="font/woff2"
          />
        ))}

      <style type="text/css">{`
          ${
            customFonts.length
              ? customFonts
                  .map(
                    (font) =>
                      `@font-face {
              font-family: '${font.name}';
              font-style: normal;
              font-weight: ${font.isBold ? 700 : 400};
              font-display: swap;
              src: url(${font.url}) format('woff2');
            }`
                  )
                  .join("\n")
              : ""
          }
          html {
            font-family: ${
              getFontFamily(theme?.typography?.paragraph?.font) || FALLBACK_FONT
            };
          }
          ${
            theme?.typography?.paragraph?.transform
              ? `html, button, select {
              text-transform: ${theme.typography.paragraph.transform.toLowerCase()};
            }`
              : ""
          }
        `}</style>

      {styles}
    </Helmet>
  );
};
