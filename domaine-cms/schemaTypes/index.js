import page_projectIndex from "./projects/page_projects-index";
import settings_projects from "./projects/settings_projects";
import type_client from "./projects/type_client";
import type_industry from "./projects/type_industry";
import type_project from "./projects/type_project";
import type_service from "./services/type_service";
import type_serviceType from "./services/type_serviceType";
import type_serviceGroup from "./services/type_serviceGroup";
import page_servicesIndex from "./services/page_services-index";
import settings_services from "./services/settings_services";
import type_partnerTier from "./partners/type_partnerTier";
import type_partner from "./partners/type_partner";
import page_partnersIndex from "./partners/page_partners-index";
import type_blog from "./blog/type_blog";
import type_blogCategory from "./blog/type_blogCategory";
import page_blogIndex from "./blog/page_blog-index";
import settings_blog from "./blog/settings_blog";
import page_event from "./events/page_event";
import type_teamMember from "./team/type_teamMember";
import page_general from "./pages/page_general";
import page_homeDomaine from "./home/page_home-domaine";
import page_homeStudio from "./home/page_home-studio";
import settings_partners from "./partners/settings_partners";
import settings_events from "./events/settings_events";
import page_aboutDomaine from "./about/page_about-domaine";
import page_aboutStudio from "./about/page_about-studio";
import page_contactDomaine from "./contact/page_contact-domaine";
import page_contactStudio from "./contact/page_contact-studio";
import settings_headerDomaine from "./siteSettings/settings_header-domaine";
import settings_headerStudio from "./siteSettings/settings_header-studio";
import settings_footerDomaine from "./siteSettings/settings_footer-domaine";
import settings_footerStudio from "./siteSettings/settings_footer-studio";
import settings_SEO from "./siteSettings/settings_SEO";
import snippet_SEOFields from "./snippets/snippet_SEO-fields";
import snippet_linkList from "./snippets/snippet_link-list";
import type_agencyBrand from "./siteSettings/type_agencyBrand";
import type_teamDepartment from "./team/type_teamDepartment";
import snippet_image from "./snippets/snippet_image";
import snippet_video from "./snippets/snippet_video";


export const schemaTypes = [
    type_project,
    type_client,
    type_industry,
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

    page_projectIndex,
    page_servicesIndex,
    page_partnersIndex,
    page_blogIndex,
    page_event,
    page_general,
    page_homeDomaine,
    page_homeStudio,
    page_aboutDomaine,
    page_aboutStudio,
    page_contactDomaine,
    page_contactStudio,

    settings_projects,
    settings_services,
    settings_partners,
    settings_blog,
    settings_events,
    settings_headerDomaine,
    settings_headerStudio,
    settings_footerDomaine,
    settings_footerStudio,
    settings_SEO,

    snippet_SEOFields,
    snippet_linkList,
    snippet_image,
    snippet_video,
]
