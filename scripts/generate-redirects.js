import { createClient } from "@sanity/client";
import { writeFileSync } from "fs";
import { join, dirname } from "path";

const sanityClient = createClient({
  projectId: 'cxeknc6v',
  dataset: 'production',
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: '2025-06-25',
})

async function generateRedirectsFile() {
  const query = `*[_type == "settings_redirect"][0]{
    redirects[] {
      from,
      to,
      statusCode
    }
  }`;
  const data = await sanityClient.fetch(query);
  if (!data?.redirects) return
  console.log('data', data)
  const redirectRules = data.redirects?.map(redirect => {
    return `${redirect.from} ${redirect.to} ${redirect.statusCode}`;
  }).join('\n');

  const outputPath = join(process.cwd(), 'public', '_redirects');
  writeFileSync(outputPath, redirectRules, 'utf-8');

  console.log(`Generated ${data.redirects.length} redirect rules to ${outputPath}`)
}

generateRedirectsFile().catch(console.error);