declare interface Slug {
    current: string,
    _type: 'slug',
}

declare interface ProjectFeature {
    title: string,
    slug: Slug,
}

declare interface Industry {
    title: string,
    slug: Slug,
}

declare interface Partner {
    title: string,
    slug: Slug,
}

declare interface Service {
    title: string,
    slug: Slug,
}

declare interface SanityImage {
    image: { 
        crop: any, 
        asset: {
            _id: string,
            metadata: any,
        }, 
        alt: string,
    }
}

declare interface Industry {
    _rev: string,
    _type: string,
    _id: string,
    _updatedAt: string,
    _createdAt: string,
    title: string,
    agencyBrands?: any,
    slug: Slug,
}

declare interface Project {
    title,
    slug: Slug,
    excerpt: string,
    industry?: any, 
    partners?: any, 
    features?: Array<ProjectFeature>, 
    services?: any, 
    thumbnailImage: SanityImage,
}