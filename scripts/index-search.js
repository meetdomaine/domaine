import { createClient } from "@sanity/client";
import { Document } from "flexsearch";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import imageUrlBuilder from '@sanity/image-url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sanityClient = createClient({
  projectId: 'cxeknc6v',
  dataset: 'production',
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: '2025-06-25',
})

// Create urlFor function for this script
const urlBuilder = imageUrlBuilder(sanityClient);
const urlFor = (source) => urlBuilder.image(source);

const imageFields = 'image{crop, asset->{_id, metadata}, hotspot, alt }'
const mediaFields = `video{ asset->{playbackId, assetId, filename} }, ${imageFields}`

const loadIndex = async () => {

  // Helper function to extract text from Sanity localized content
  const extractText = (field) => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    if (field.text) return field.text;
    return '';
  };

  // Create FlexSearch Document indexes for each content type
  const projectsIndex = new Document({
    document: {
      id: "id",
      index: ["title", "subtitle"]
    },
    tokenize: "forward"
  });

  const blogIndex = new Document({
    document: {
      id: "id", 
      index: ["title", "subtitle"]
    },
    tokenize: "forward"
  });

  const featuresIndex = new Document({
    document: {
      id: "id",
      index: ["title", "subtitle"]
    },
    tokenize: "forward"
  });

  const partnersIndex = new Document({
    document: {
      id: "id",
      index: ["title", "subtitle"]
    },
    tokenize: "forward"
  });

  // Fetch all content types
  const [projects, blogPosts, features, partners] = await Promise.all([
    sanityClient.fetch(`*[ _type == "type_project" && isHidden != true ]{
      title,
      slug,
      excerpt,
      agencyBrand->{name, slug},
      thumbnailMedia{${mediaFields}},
      orderRank
    } | order(orderRank)`),
    
    sanityClient.fetch(`*[ _type == "type_blog" && isHidden != true ]{
      title,
      slug,
      excerpt,
      agencyBrand->{name,slug},
      category->{slug},
      thumbnailImage{${imageFields}},
      orderRank
    } | order(orderRank)`),
    
    sanityClient.fetch(`*[ _type == "type_projectFeature" && isHidden != true ]{
      _id,
      title,
      excerpt,
      slug,
      agencyBrand->{name, slug},
      orderRank
    } | order(orderRank)`),
    
    sanityClient.fetch(`*[ _type == "type_partner" && isHidden != true && tier->createLandingPages ]{
      _id,
      title,
      tier->{createLandingPages},
      slug,
      excerpt,
      icon{${imageFields}},
      orderRank
    } | order(orderRank)`)
  ]);
  
  // Process projects
  const projectsData = [];
  projects.forEach((project, index) => {
    const projectData = {
      id: `project-${index}`,
      title: String(project.title || ''),
      slug: String(project.slug?.current || ''),
      subtitle: String(project.excerpt?.text || ''),
      image: urlFor(project.thumbnailMedia.image).auto('format').width(600).height(800).url(),
      video: project.thumbnailMedia.video?.asset.playbackId,
      brand: project.agencyBrand?.name,
      type: project.agencyBrand?.slug?.current === '/studio' ? 'case-study_studio' : 'case-study_domaine' // DEPRECATED
    };
    console.log(projectData)
    
    projectsData.push(projectData);
    projectsIndex.add(projectData);
  });

  // Process blog posts
  const blogData = [];
  blogPosts.forEach((post, index) => {
    const postData = {
      id: `blog-${index}`,
      title: extractText(post.title),
      slug: post.category?.slug?.current && post.slug?.current 
        ? `${post.category.slug.current}/${post.slug.current}` 
        : post.slug?.current || '',
      subtitle: String(post.excerpt?.text || ''),
      image: urlFor(post.thumbnailImage.image).auto('format').width(600).height(800).url(),
      brand: post.agencyBrand?.name,
      type: post.agencyBrand?.slug?.current === '/studio' ? 'blog-post_studio' : 'blog-post_domaine'
    };

    blogData.push(postData);
    blogIndex.add(postData);
  });

  // Process features
  const featuresData = [];
  features.forEach((feature, index) => {
    const featureData = {
      id: `feature-${index}`,
      title: extractText(feature.title),
      slug: String(feature.slug?.current || ''),
      subtitle: String(feature.excerpt?.text || ''),
      brand: feature.agencyBrand?.name,
      type: feature.agencyBrand?.slug?.current === '/studio' ? 'project-feature_studio' : 'project-feature_domaine'
    };
    
    featuresData.push(featureData);
    featuresIndex.add(featureData);
  });

  // Process partners
  const partnersData = [];
  partners.forEach((partner, index) => {
    const partnerData = {
      id: `partner-${index}`,
      title: String(partner.title || ''),
      slug: String(partner.slug?.current || ''),
      subtitle: String(partner.excerpt?.text || ''),
      image: urlFor(partner.icon.image).auto('format').width(600).height(800).url(),
      type: 'partner' // Partners don't have agency brand filtering
    };
    
    partnersData.push(partnerData);
    partnersIndex.add(partnerData);
  });

  // Export all indexes
  const [projectsIndexData, blogIndexData, featuresIndexData, partnersIndexData] = await Promise.all([
    new Promise((resolve) => {
      const exportedIndex = {};
      projectsIndex.export((key, data) => {
        exportedIndex[key] = data;
      });
      resolve(exportedIndex);
    }),
    new Promise((resolve) => {
      const exportedIndex = {};
      blogIndex.export((key, data) => {
        exportedIndex[key] = data;
      });
      resolve(exportedIndex);
    }),
    new Promise((resolve) => {
      const exportedIndex = {};
      featuresIndex.export((key, data) => {
        exportedIndex[key] = data;
      });
      resolve(exportedIndex);
    }),
    new Promise((resolve) => {
      const exportedIndex = {};
      partnersIndex.export((key, data) => {
        exportedIndex[key] = data;
      });
      resolve(exportedIndex);
    })
  ]);

  // Create search directory
  const searchDir = join(__dirname, '../public/search');
  try {
    mkdirSync(searchDir, { recursive: true });
  } catch (error) {
    console.log('Search directory already exists or created');
  }

  // Save all search indexes and data files
  writeFileSync(join(searchDir, 'projects-index.json'), JSON.stringify(projectsIndexData));
  writeFileSync(join(searchDir, 'projects-data.json'), JSON.stringify(projectsData));
  
  writeFileSync(join(searchDir, 'blog-index.json'), JSON.stringify(blogIndexData));
  writeFileSync(join(searchDir, 'blog-data.json'), JSON.stringify(blogData));
  
  writeFileSync(join(searchDir, 'features-index.json'), JSON.stringify(featuresIndexData));
  writeFileSync(join(searchDir, 'features-data.json'), JSON.stringify(featuresData));
  
  writeFileSync(join(searchDir, 'partners-index.json'), JSON.stringify(partnersIndexData));
  writeFileSync(join(searchDir, 'partners-data.json'), JSON.stringify(partnersData));

  console.log(`Indexed ${projects.length} projects, ${blogPosts.length} blog posts, ${features.length} features, ${partners.length} partners`);
  console.log('All search indexes created successfully!');

}

loadIndex()