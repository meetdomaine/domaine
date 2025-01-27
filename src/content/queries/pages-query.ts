import { globalSectionsFields, imageBaseFields, imageFields, videoFields } from "./query-helpers"

const buttonQuery = `text, url, newTab`

export const sanityQueryHomepage = ` 
  "id": "homepage",
  eyebrow,
  heading,
  button{${buttonQuery}},
  media{ ..., ${imageFields}, ${videoFields} },
  heroTextColor,
  globalSections{ sections[]{${globalSectionsFields}} }, 
  showPreloader,
  metafields,
  metafields{ title, description, image{${imageBaseFields}} },
`

export const sanityQueryPages = `
  "id": slug.current,
  title,
  slug{...},
  isMarketingPage,
  heroColorScheme,
  eyebrow,
  heading,
  text,
  buttonText,
  button,
  media{${imageFields}, ${videoFields}},
  formTitle,
  hubspotFormId,
  addHeaderPadding,
  colorScheme,
  backgroundColor,
  showPreloader,
  metafields,
  globalSections{ sections[]{${globalSectionsFields}} },
  metafields{ title, description, image{${imageBaseFields}} },
`