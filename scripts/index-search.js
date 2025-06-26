import { createClient } from "@sanity/client";
import { Document } from "flexsearch";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sanityClient = createClient({
  projectId: 'cxeknc6v',
  dataset: 'production',
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: '2025-06-25',
})

const loadIndex = async () => {

  // Create FlexSearch Document index for projects
  const projectsIndex = new Document({
    document: {
      id: "id",
      index: ["title", "excerpt", "description", "clientName", "industryName", "serviceNames", "featureNames"]
    },
    tokenize: "forward"
  });

  const projects = await sanityClient.fetch(`*[ _type == "type_project" && !isHidden ]{
    _id,
    title,
    excerpt,
    description,
    slug,
    agencyBrand->{
      slug,
      name
    },
    client->{
      title
    },
    industry->{
      title
    },
    services[]->{
      title
    },
    features[]->{
      title
    },
    thumbnailMedia{
      image{
        asset->{
          _id,
          url
        },
        alt
      }
    },
    orderRank
  } | order(orderRank)`)

  // Process and index projects
  const projectsData = [];
  
  projects.forEach((project, index) => {
    const projectData = {
      id: `project-${index}`,
      title: String(project.title || ''),
      excerpt: String(project.excerpt || ''),
      description: String(project.description || ''),
      clientName: String(project.client?.title || ''),
      industryName: String(project.industry?.title || ''),
      serviceNames: String(project.services?.map(s => s.title).filter(Boolean).join(' ') || ''),
      featureNames: String(project.features?.map(f => f.title).filter(Boolean).join(' ') || ''),
      url: `${project.agencyBrand?.slug?.current === '/studio' ? '/studio' : ''}/work/${project.slug?.current || ''}`,
      image: project.thumbnailMedia?.image?.asset?.url || '',
      imageAlt: project.thumbnailMedia?.image?.alt || '',
      brand: project.agencyBrand?.slug?.current || '',
      type: project.agencyBrand?.slug?.current === '/studio' ? 'case-study_studio' : 'case-study_domaine'
    };
    
    projectsData.push(projectData);
    projectsIndex.add(projectData);
  });

  // Create search directory
  const searchDir = join(__dirname, '../public/search');
  try {
    mkdirSync(searchDir, { recursive: true });
  } catch (error) {
    console.log('Search directory already exists or created');
  }

  // Export index to JSON (Document indexes need to be exported differently)
  const exportedIndex = await new Promise((resolve) => {
    const exported = {};
    projectsIndex.export((key, data) => {
      exported[key] = data;
    });
    resolve(exported);
  });
  
  // Save index and data
  writeFileSync(join(searchDir, 'projects-index.json'), JSON.stringify(exportedIndex));
  writeFileSync(join(searchDir, 'projects-data.json'), JSON.stringify(projectsData));

  console.log(`Indexed ${projects.length} projects`);
  console.log('Projects search index created successfully!');

}

loadIndex()
