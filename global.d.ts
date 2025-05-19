declare module 'sanity:client';

declare global {
    interface Window { preloaderActive: boolean; }
}


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

declare interface ImageBase {
    asset: {
        _id: 'string',
        metadata: {
        dimensions: {
            width: number,
            height: number,
            aspectRatio: number,
        },
        blurHash: string,
        lqip: string,
        }
    },
    crop: {
        top: number,
        right: number,
        bottom: number,
        left: number
    },
}

declare interface SanityImage {
    asset: {
        _id: 'string',
        metadata: {
            dimensions: {
                width: number,
                height: number,
                aspectRatio: number,
            },
            blurHash: string,
            lqip: string,
        }
    },
    crop: {
        top: number,
        right: number,
        bottom: number,
        left: number
    },
    alt: string
}



declare interface MuxVideo {
    asset: {
        playbackId: string,
        assetId: string,
        filename: string,
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
    thumbnailVideo: any,
}

declare interface Media {
    image?: SanityImage,
    video?: MuxVideo
}

declare interface ClientCard {
    title: string,
    // logoDark: {image: SanityImage},
    // logoLight: {image: SanityImage},
    productImage: ImageBase,
    // stage: {
    //     title: string
    // },
    isEnterprise: boolean,
    logo: string,
    logoWidthProjectCard: number,
    logoScale: number,
}

declare interface BlogCard {

}

declare interface ProjectCard {
    title,
    slug: Slug,
    excerpt: {
        text: string;
        translations: any
    },
    industry?: Industry, 
    partners?: Array<Partner>, 
    features?: Array<ProjectFeature>, 
    services?: any,
    orderRank: number,
    thumbnailMedia: Media,
    thumbnailImageSecondary?: {
        image: SanityImage
    },
    heroMedia: Media,
    client: ClientCard,
    logoColor: string,
    agencyBrand: any,
}
