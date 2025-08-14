import type_agencyBrand from "./siteSettings/type_agencyBrand.jsx";
import type_blog from "./blog/type_blog";
import type_blogCategory from "./blog/type_blogCategory";
import type_client from "./projects/type_client.js";
// import type_clientStage from "./projects/type_clientStage.js";
import type_event from "./events/type_event.jsx";
import type_industry from "./projects/type_industry";
import type_partner from "./partners/type_partner";
import type_partnerTier from "./partners/type_partnerTier.js";
// import type_practice from "./practices/type_practice.js";
import type_project from "./projects/type_project";
import type_projectFeature from "./projects/type_projectFeature";
import type_service from "./services/type_service";
import type_serviceType from "./services/type_serviceType";
import type_serviceGroup from "./services/type_serviceGroup";
import type_teamDepartment from "./team/type_teamDepartment";
import type_teamMember from "./team/type_teamMember";
import page_aboutDomaine from "./about/page_about-domaine";
import page_aboutStudio from "./about/page_about-studio";
import page_blogIndex from "./blog/page_blog-index";
import page_careers from "./pages/page_careers.js";
// import page_contactDomaine from "./contact/page_contact-domaine";
// import page_contactStudio from "./contact/page_contact-studio";
import page_general from "./pages/page_general";
import page_homeDomaine from "./home/page_home-domaine";
import page_homeStudio from "./home/page_home-studio";
import page_projectIndex from "./projects/page_projects-index";
import page_partnersIndex from "./partners/page_partners-index";
import page_servicesIndexDomaine from "./services/page_services-index-domaine.js";
import page_servicesIndexStudio from "./services/page_services-index-studio.js";
// import settings_blog from "./blog/settings_blog";
// import settings_projects from "./projects/settings_projects";
// import settings_services from "./services/settings_services";
// import settings_partners from "./partners/settings_partners";
import settings_events from "./events/settings_events";
import section_globalSections from "./sections/section_globalSections";
import section_form from "./sections/section_form";
import section_projectsFeed from "./sections/section_projectsFeed";
import section_blogFeed from "./sections/section_blogFeed";
import section_textMedia from "./sections/section_textMedia";
import section_videoPlayer from "./sections/section_videoPlayer";
import section_servicesFeed from "./sections/section_servicesFeed";
import section_contentBlocks from "./sections/section_contentBlocks";
import section_projectsFullBleed from "./sections/section_projectsFullBleed.js";
import settings_preloader from "./siteSettings/settings_preloader.js";
import section_projectsGrid from "./sections/section_projectsGrid.js";
import settings_footer from "./siteSettings/settings_footer.js";
import section_partnersFeed from "./sections/section_partnersFeed.js";
import section_textClients from "./sections/section_textClients.js";
import section_imageFullHeight from "./sections/section_imageFullHeight.js";
import section_textColumns from "./sections/section_textColumns.js";
import section_mediaCarousel from "./sections/section_mediaCarousel.js";
import section_textLinkCard from "./sections/section_textLinkCard.js";
import section_practicesFeed from "./sections/section_practicesFeed.js";
import section_textVideoPlayer from "./sections/section_textVideoPlayer.js";
import section_textMediaTabs from "./sections/section_textMediaTabs.js";
import section_serviceFeature from "./sections/section_serviceFeature.js";
import section_statsCarousel from "./sections/section_statsCarousel.js";
import settings_header from "./siteSettings/settings_header.jsx";
import snippet_button from "./snippets/snippet_button.js";
import snippet_image from "./snippets/snippet_image";
import snippet_linkList from "./snippets/snippet_link-list";
import snippet_richContent from "./snippets/snippet_rich-content.js";
import snippet_SEOFields from "./snippets/snippet_SEO-fields";
import snippet_video from "./snippets/snippet_video";
import section_serviceCards from "./sections/section_serviceCards.js";
import section_linkList from "./sections/section_linkList.js";
// import settings_locations from "./siteSettings/settings_locations.jsx";
import section_quote from "./sections/section_quote.js";
import page_studioGeneral from "./pages/page_studio-general.js";
import section_richContent from "./sections/section_richContent.js";
import section_textHeading from "./sections/section_textHeading.js";
import type_location from "./siteSettings/type_location.jsx";
import section_locationsFeed from "./sections/section_locationsFeed.js";
import section_textMediaBlocks from "./sections/section_textMediaBlocks.js";
import section_mediaFullbleed from "./sections/section_mediaFullbleed.js";
import section_agenda from "./sections/section_agenda.js";
import snippet_localeString from "./snippets/snippet_locale-string.js";
import snippet_localeButton from "./snippets/snippet_locale-button.js";
import snippet_localeText from "./snippets/snippet_locale-text.js";
import snippet_localeLinkList from "./snippets/snippet_locale-link-list.js";
import snippet_localeSEOFields from "./snippets/snippet_locale-SEO-fields.js";
import snippet_localeRichContent from "./snippets/snippet_locale-rich-content.js";
import type_resource from "./resources/type_resource.js";
import type_resourcesIndex from "./resources/type_resources-index.js";


export const schemaTypes = [
    type_project,
    type_client,
    type_projectFeature,
    type_industry,
    type_location,
    type_service,
    type_serviceType,
    type_serviceGroup,
    type_partnerTier,
    type_partner,
    type_blog,
    type_blogCategory,
    type_teamMember,
    type_teamDepartment,
    type_agencyBrand,
    type_event,
    type_resourcesIndex,
    type_resource,

    page_aboutDomaine,
    page_aboutStudio,
    page_blogIndex,
    page_careers,
    page_general,
    page_homeDomaine,
    page_homeStudio,
    page_partnersIndex,
    page_projectIndex,
    page_servicesIndexDomaine,
    page_servicesIndexStudio,
    page_studioGeneral,

    settings_events,
    settings_header,
    settings_footer,
    settings_preloader,

    snippet_SEOFields,
    snippet_linkList,
    snippet_image,
    snippet_video,
    snippet_button, // Deprecated
    snippet_richContent,
    snippet_localeString,
    snippet_localeText,
    snippet_localeButton,
    snippet_localeLinkList,
    snippet_localeSEOFields,
    snippet_localeRichContent,

    section_globalSections,
    section_agenda,
    section_blogFeed,
    section_contentBlocks,
    section_form,
    section_imageFullHeight,
    section_linkList,
    section_mediaCarousel,
    section_mediaFullbleed,
    section_partnersFeed,
    section_practicesFeed,
    section_projectsFeed,
    section_projectsFullBleed,
    section_projectsGrid,
    section_quote,
    section_locationsFeed,
    section_richContent,
    section_serviceCards,
    section_servicesFeed,
    section_serviceFeature,
    section_statsCarousel,
    section_textClients,
    section_textColumns,
    section_textHeading,
    section_textLinkCard,
    section_textMedia,
    section_textMediaTabs,
    section_textMediaBlocks,
    section_textVideoPlayer,
    section_videoPlayer,
]
