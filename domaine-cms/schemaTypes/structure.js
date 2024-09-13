import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {
    CaseIcon
} from '@sanity/icons'

import { 
    iconAbout,
    iconAgencyBrand,
    iconBlog,
    iconBlogCategories,
    iconBrandPrimary, 
    iconBrandSecondary, 
    iconClientStages, 
    iconClients, 
    iconContact, 
    iconEvents, 
    iconFooter, 
    iconHeader, 
    iconHome, 
    iconIndex, 
    iconIndustries, 
    iconLocation, 
    iconPages, 
    iconPartnerTiers, 
    iconPartners, 
    iconPractices, 
    iconPreloader, 
    iconProjectFeatures, 
    iconProjects, 
    iconSEO, 
    iconServiceGroups, 
    iconServiceTypes, 
    iconServices, 
    iconSettings, 
    iconSiteSettings, 
    iconTeamDepartments, 
    iconTeamMembers, 
    labelAbout, 
    labelAgencyBrand, 
    labelBlog, 
    labelBlogCategories, 
    labelBrandPrimary, 
    labelBrandSecondary, 
    labelClientStages, 
    labelClients, 
    labelContact, 
    labelEvents, 
    labelFooter, 
    labelHeader, 
    labelHome, 
    labelIndex, 
    labelIndustries, 
    labelLocation, 
    labelPages, 
    labelPartnerTiers, 
    labelPartners, 
    labelPractices, 
    labelPreloader, 
    labelProjectFeatures, 
    labelProjects, 
    labelSEO, 
    labelServiceGroups, 
    labelServiceTypes, 
    labelServices, 
    labelSettings, 
    labelSiteSettings, 
    labelTeamDepartments, 
    labelTeamMembers, 
    slugBrandPrimary, 
    slugBrandSecondary,
} from "./variables";

export const structure = (S, context) =>
    S.list()
      .title('Content')
      .items([
        S.listItem()
            .title(labelHome)
            .icon(iconHome)
            .child(
                S.list()
                .title(labelHome)
                .items([
                    S.listItem()
                    .title(labelBrandPrimary)
                    .icon(iconBrandPrimary)
                    .child(
                        S.document()
                        .schemaType('page_home-domaine')
                        .documentId(`page_home-${slugBrandPrimary}`)
                        .title(labelHome)
                    ),
                    S.listItem()
                    .title(labelBrandSecondary)
                    .icon(iconBrandSecondary)
                    .child(
                        S.document()
                        .schemaType('page_home-studio')
                        .documentId(`page_home-${slugBrandSecondary}`)
                        .title(labelHome)
                    )
                ])
            ),
        S.listItem()
            .title(labelBlog)
            .icon(iconBlog)
            .child(
                S.list()
                .title(labelBlog)
                .items([
                    S.listItem()
                        .title(`${labelBlog} ${labelIndex}`)
                        .icon(iconIndex)
                        .child(
                            S.list()
                            .title(`${labelBlog} ${labelIndex}`)
                            .items([
                                S.listItem()
                                .title(labelBrandPrimary)
                                .icon(iconBrandPrimary)
                                .child(
                                    S.document()
                                    .schemaType('page_blog-index')
                                    .documentId(`page_blog-index-${slugBrandPrimary}`)
                                    .title(labelBrandPrimary)
                                ),
                                S.listItem()
                                .title(labelBrandSecondary)
                                .icon(iconBrandSecondary)
                                .child(
                                    S.document()
                                    .schemaType('page_blog-index')
                                    .documentId(`page_blog-index-${slugBrandSecondary}`)
                                    .title(labelBrandSecondary)
                                )
                            ])
                        ),
                    orderableDocumentListDeskItem({
                        type: 'type_blogCategory',
                        title: labelBlogCategories,
                        icon: iconBlogCategories,
                        S, 
                        context
                    }),
                    S.listItem()
                        .title(labelBlog)
                        .icon(iconBlog)
                        .child(
                            S.documentTypeList('type_blog')
                        ),
                    S.listItem()
                        .title(`${labelBlog} ${labelSettings}`)
                        .icon(iconSettings)
                        .child(
                            S.list()
                            .title(`${labelBlog} ${labelSettings}`)
                            .items([
                                S.listItem()
                                .title(labelBrandPrimary)
                                .icon(iconBrandPrimary)
                                .child(
                                    S.document()
                                    .schemaType('settings_blog')
                                    .documentId(`settings_blog-${slugBrandPrimary}`)
                                    .title(labelBrandPrimary)
                                ),
                                S.listItem()
                                .title(labelBrandSecondary)
                                .icon(iconBrandSecondary)
                                .child(
                                    S.document()
                                    .schemaType('settings_blog')
                                    .documentId(`settings_blog-${slugBrandSecondary}`)
                                    .title(labelBrandSecondary)
                                )
                            ])
                        ),
                ])
            ),
        S.listItem()
            .title(labelProjects)
            .icon(iconProjects)
            .child(
                S.list()
                .title(labelProjects)
                .items([
                    S.listItem()
                        .title(`${labelProjects} ${labelIndex}`)
                        .icon(iconIndex)
                        .child(
                            S.list()
                            .title(`${labelProjects} ${labelIndex}`)
                            .items([
                                S.listItem()
                                .title(labelBrandPrimary)
                                .icon(iconBrandPrimary)
                                .child(
                                    S.document()
                                    .schemaType('page_projects-index')
                                    .documentId(`page_projects-index-${slugBrandPrimary}`)
                                    .title(labelBrandPrimary)
                                ),
                                S.listItem()
                                .title(labelBrandSecondary)
                                .icon(iconBrandSecondary)
                                .child(
                                    S.document()
                                    .schemaType('page_projects-index')
                                    .documentId(`page_projects-index-${slugBrandSecondary}`)
                                    .title(labelBrandSecondary)
                                )
                            ])
                        ),
                    orderableDocumentListDeskItem({
                        type: 'type_project',
                        title: labelProjects,
                        icon: iconProjects,
                        S, 
                        context
                    }),
                    // S.listItem()
                    //     .title(labelClients)
                    //     .icon(iconClients)
                    //     .child(
                    //         S.documentTypeList('type_client')
                    //     ),
                    orderableDocumentListDeskItem({
                        type: 'type_client',
                        title: labelClients,
                        icon: iconClients,
                        S, 
                        context
                    }),
                    orderableDocumentListDeskItem({
                        type: 'type_clientStage',
                        title: labelClientStages,
                        icon: iconClientStages,
                        S, 
                        context
                    }),
                    S.listItem()
                        .title(labelIndustries)
                        .icon(iconIndustries)
                        .child(
                            S.documentTypeList('type_industry')
                        ),
                    orderableDocumentListDeskItem({
                        type: 'type_projectFeature',
                        title: labelProjectFeatures,
                        icon: iconProjectFeatures,
                        S, 
                        context
                    }),
                    S.listItem()
                        .title(`${labelProjects} ${labelSettings}`)
                        .icon(iconSettings)
                        .child(
                            S.list()
                            .title(`${labelProjects} ${labelSettings}`)
                            .items([
                                S.listItem()
                                .title(labelBrandPrimary)
                                .icon(iconBrandPrimary)
                                .child(
                                    S.document()
                                    .schemaType('settings_projects')
                                    .documentId(`settings_project-${slugBrandPrimary}`)
                                    .title(labelBrandPrimary)
                                ),
                                S.listItem()
                                .title(labelBrandSecondary)
                                .icon(iconBrandSecondary)
                                .child(
                                    S.document()
                                    .schemaType('settings_projects')
                                    .documentId(`settings_project-${slugBrandSecondary}`)
                                    .title(labelBrandSecondary)
                                )
                            ])
                        ),
                ]),
            ),
        S.listItem()
            .title(labelServices)
            .icon(iconServices)
            .child(
                S.list()
                .title(labelServices)
                .items([
                    S.listItem()
                        .title(`${labelServices} ${labelIndex}`)
                        .icon(iconIndex)
                        .child(
                            S.list()
                            .title(`${labelServices} ${labelIndex}`)
                            .items([
                                S.listItem()
                                .title(labelBrandPrimary)
                                .icon(iconBrandPrimary)
                                .child(
                                    S.document()
                                    .schemaType(`page_services-index-${slugBrandPrimary}`)
                                    .documentId(`page_services-index-${slugBrandPrimary}`)
                                    .title(labelBrandPrimary)
                                ),
                                S.listItem()
                                .title(labelBrandSecondary)
                                .icon(iconBrandSecondary)
                                .child(
                                    S.document()
                                    .schemaType(`page_services-index-${slugBrandSecondary}`)
                                    .documentId(`page_services-index-${slugBrandSecondary}`)
                                    .title(labelBrandSecondary)
                                )
                            ])
                        ),
                    orderableDocumentListDeskItem({
                        type: 'type_serviceType',
                        title: labelServiceTypes,
                        icon: iconServiceTypes,
                        S, 
                        context
                    }),
                    orderableDocumentListDeskItem({
                        type: 'type_serviceGroup',
                        title: labelServiceGroups,
                        icon: iconServiceGroups,
                        S, 
                        context
                    }),
                    orderableDocumentListDeskItem({
                        type: 'type_service',
                        title: labelServices,
                        icon: iconServices,
                        S, 
                        context
                    }),
                    S.listItem()
                        .title(`${labelServices} ${labelSettings}`)
                        .icon(iconSettings)
                        .child(
                            S.list()
                            .title(`${labelServices} ${labelSettings}`)
                            .items([
                                S.listItem()
                                .title(labelBrandPrimary)
                                .icon(iconBrandPrimary)
                                .child(
                                    S.document()
                                    .schemaType('settings_services')
                                    .documentId(`settings_services-${slugBrandPrimary}`)
                                    .title(labelBrandPrimary)
                                ),
                                S.listItem()
                                .title(labelBrandSecondary)
                                .icon(iconBrandSecondary)
                                .child(
                                    S.document()
                                    .schemaType('settings_services')
                                    .documentId(`settings_services-${slugBrandSecondary}`)
                                    .title(labelBrandSecondary)
                                )
                            ])
                        ),
                ])
            ),
        S.listItem()
            .title(labelPartners)
            .icon(iconPartners)
            .child(
                S.list()
                .title(labelPartners)
                .items([
                    S.listItem()
                        .title(`${labelPartners} ${labelIndex}`)
                        .icon(iconIndex)
                        .child(
                            S.document()
                            .schemaType('page_partners-index')
                            .documentId('page_partners-index')
                            .title(`${labelPartners} ${labelIndex}`)
                        ),
                    S.listItem()
                        .title(labelPartnerTiers)
                        .icon(iconPartnerTiers)
                        .child(
                            S.documentTypeList('type_partnerTier')
                        ),

                    orderableDocumentListDeskItem({
                        type: 'type_partnerTier',
                        title: labelPartnerTiers,
                        icon: iconPartnerTiers,
                        S, 
                        context
                    }),
                    orderableDocumentListDeskItem({
                        type: 'type_partner',
                        title: labelPartners,
                        icon: iconPartners,
                        S, 
                        context
                    }),
                    S.listItem()
                        .title(`${labelPartners} ${labelSettings}`)
                        .icon(iconSettings)
                        .child(
                            S.document()
                            .schemaType('settings_partners')
                            .documentId('settings_partners')
                            .title(`${labelPartners} ${labelSettings}`)
                        ),
                ])
            ),
        S.listItem()
            .title(labelEvents)
            .icon(iconEvents)
            .child(
                S.list()
                    .title(labelEvents)
                    .items([
                        S.listItem()
                            .title(labelEvents)
                            .icon(iconEvents)
                            .child(
                                S.documentTypeList('type_event')
                            ),
                        S.listItem()
                            .title(`${labelEvents} ${labelSettings}`)
                            .icon(iconSettings)
                            .child(
                                S.document()
                                .schemaType('settings_events')
                                .documentId(`settings_events`)
                                .title(`${labelEvents} ${labelSettings}`)
                            ),
                    ])
            ),
        S.listItem()
            .title(labelTeamMembers)
            .icon(iconTeamMembers)
            .child(
                // S.documentTypeList('type_teamMember')
                S.list()
                .title(labelTeamMembers)
                .items([
                    orderableDocumentListDeskItem({
                        type: 'type_teamDepartment',
                        title: labelTeamDepartments,
                        icon: iconTeamDepartments,
                        S, 
                        context
                    }),
                    orderableDocumentListDeskItem({
                        type: 'type_teamMember',
                        title: labelTeamMembers,
                        icon: iconTeamMembers,
                        S, 
                        context
                    })
                ])
            ),
        orderableDocumentListDeskItem({
            type: 'type_practice',
            title: labelPractices,
            icon: iconPractices,
            S, 
            context
        }),
        S.listItem()
            .title(labelAbout)
            .icon(iconAbout)
            .child(
                S.list()
                .title(labelAbout)
                .items([
                    S.listItem()
                    .title(labelBrandPrimary)
                    .icon(iconBrandPrimary)
                    .child(
                        S.document()
                        .schemaType('page_about-domaine')
                        .documentId(`page_about-${slugBrandPrimary}`)
                        .title(labelAbout)
                    ),
                    S.listItem()
                    .title(labelBrandSecondary)
                    .icon(iconBrandSecondary)
                    .child(
                        S.document()
                        .schemaType('page_about-studio')
                        .documentId(`page_about-${slugBrandSecondary}`)
                        .title(labelAbout)
                    )
                ])
            ),
        S.listItem()
            .title(labelContact)
            .icon(iconContact)
            .child(
                S.list()
                .title(labelContact)
                .items([
                    S.listItem()
                    .title(labelBrandPrimary)
                    .icon(iconBrandPrimary)
                    .child(
                        S.document()
                        .schemaType('page_contact-domaine')
                        .documentId(`page_contact-${slugBrandPrimary}`)
                        .title(labelContact)
                    ),
                    S.listItem()
                    .title(labelBrandSecondary)
                    .icon(iconBrandSecondary)
                    .child(
                        S.document()
                        .schemaType('page_contact-studio')
                        .documentId(`page_contact-${slugBrandSecondary}`)
                        .title(labelContact)
                    )
                ])
            ),
        S.listItem()
            .title(labelPages)
            .icon(iconPages)
            .child(
                S.list()
                    .title(labelContact)
                    .items([
                        S.listItem()
                            .title('Careers')
                            .icon(CaseIcon)
                            .child(
                                S.document()
                                .schemaType('page_careers')
                                .documentId(`page_careers`)
                                .title('Careers')
                            ),
                        S.listItem()
                            .title(labelPages)
                            .child(
                                S.documentTypeList('page_general')
                            )
                        ])
            ),
        S.listItem()
            .title(labelSiteSettings)
            .icon(iconSiteSettings)
            .child(
                S.list()
                .title(labelSiteSettings)
                .items([
                    S.listItem()
                        .title(labelHeader)
                        .icon(iconHeader)
                        .child(
                            S.list()
                            .title(labelHeader)
                            .items([
                                S.listItem()
                                    .title(labelBrandPrimary)
                                    .icon(iconBrandPrimary)
                                    .child(
                                        S.document()
                                            .schemaType('settings_header')
                                            .documentId(`settings_header--${slugBrandPrimary}`)
                                            .title(labelHeader)
                                    ),
                                S.listItem()
                                    .title(labelBrandSecondary)
                                    .icon(iconBrandSecondary)
                                    .child(
                                        S.document()
                                            .schemaType('settings_header')
                                            .documentId(`settings_header--${slugBrandSecondary}`)
                                            .title(labelHeader)
                                    )
                            ])
                        ),
                    S.listItem()
                        .title(labelFooter)
                        .icon(iconFooter)
                        .child(
                            S.list()
                            .title(labelFooter)
                            .items([
                                S.listItem()
                                    .title(labelBrandPrimary)
                                    .icon(iconBrandPrimary)
                                    .child(
                                        S.document()
                                        .schemaType('settings_footer')
                                        .documentId(`settings_footer--${slugBrandPrimary}`)
                                        .title(labelFooter)
                                    ),
                                S.listItem()
                                    .title(labelBrandSecondary)
                                    .icon(iconBrandSecondary)
                                    .child(
                                        S.document()
                                        .schemaType('settings_footer')
                                        .documentId(`settings_footer--${slugBrandSecondary}`)
                                        .title(labelFooter)
                                    )
                            ])
                        ),
                    S.listItem()
                        .title(labelPreloader)
                        .icon(iconPreloader)
                        .child(
                            S.list()
                            .title(labelPreloader)
                            .items([
                                S.listItem()
                                    .title(labelBrandPrimary)
                                    .icon(iconBrandPrimary)
                                    .child(
                                        S.document()
                                        .schemaType('settings_preloader')
                                        .documentId(`settings_preloader-${slugBrandPrimary}`)
                                        .title(labelPreloader)
                                    ),
                                S.listItem()
                                    .title(labelBrandSecondary)
                                    .icon(iconBrandSecondary)
                                    .child(
                                        S.document()
                                        .schemaType('settings_preloader')
                                        .documentId(`settings_preloader-${slugBrandSecondary}`)
                                        .title(labelPreloader)
                                    ),
                            ])
                        ),
                    orderableDocumentListDeskItem({
                        type: 'type_agencyBrand',
                        title: labelAgencyBrand,
                        icon: iconAgencyBrand,
                        S, 
                        context
                    }),
                    S.listItem()
                        .title(labelLocation)
                        .icon(iconLocation)
                        .child(
                            S.document()
                            .schemaType('settings_locations')
                            .documentId(`settings_locations`)
                            .title(labelLocation)
                        ),
                ])
            ),
      ])