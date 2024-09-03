import { Show, createEffect, createSignal } from 'solid-js';
import styles from './SearchMenu.module.css'
import { urlFor } from '../../utils/cms-queries';
import AtomSanityImage from '../../atoms/atom-sanityImage.astro';

function ProjectCard(props) {
    return (
        <a href={props.url} class={`${styles.projectCard} caption`} data-color-scheme="secondary">
            <img 
                src={props.image} 
                alt={props.alt}
                class={styles.projectImage}
                loading='eager'
            />
            <p class={`${styles.projectInfo} caption`}>
                {props.title}
            </p>
        </a>

    )
}

function BlogCard(props) {
    return (
        <div class={styles.blogCard}>
            <div class={styles.blogInfo}>
                <a class={`${styles.cardTag} caption`} href={props.categoryUrl}>{props.categoryTitle}</a>
                <a class={`${styles.blogTitle}`} href={props.url}>{props.title}</a>
            </div>
            <a class={styles.blogImage} href={props.url}>
                <img 
                    src={props.image} 
                    alt={props.alt}
                    loading='eager'
                />
            </a>
        </div>
    )
}

function FeatureCard(props) {
    return <a href={props.url} class={`${styles.cardTag} caption`}>{props.title}</a>
}

function PartnerCard(props) {
    return (
        <a 
            href={props.url} 
            class={`${styles.partnerCard} color-reset`}
            data-color-scheme="secondary"
        >
            <div class={styles.partnerMedia}>
                <img 
                    src={props.icon} 
                    alt={props.alt}
                    loading='eager'
                />
            </div>
            <div class={styles.partnerText}>
                <span class={`${styles.partnerTitle} caption`}>{props.title}</span>
                <span class={`${styles.partnerExcerpt} caption`}>{props.excerpt}</span>
            </div>
        </a>
    )
}

export default function SearchMenu(props) {

    // console.log(props)

    const [ pageFind, setPageFind ] = createSignal(null)
    const [ query, setQuery ] = createSignal(null)

    const [ projectResults, setProjectResults ] = createSignal(null)
    const [ blogResults, setBlogResults ] = createSignal(null)
    const [ partnerResults, setPartnerResults ] = createSignal(null)
    const [ serviceResults, setServiceResults ] = createSignal(null)
    const [ featureResults, setFeatureResults ] = createSignal(null)
    const [ pageResults, setPageResults ] = createSignal(null)

    const clearResults = () => {
        setQuery(null)
        setProjectResults(null)
        setBlogResults(null)
        setPartnerResults(null)
        setServiceResults(null)
        setFeatureResults(null)
        setPageResults(null)
    }

    const handleInput = (e) => {
        if (e.target.value) {
            setQuery(e.target.value)
            handleSearch(e.target.value)
        } else {
            clearResults()
        }
    }

    const handleSearch = async (query) => {
        if (pageFind()) {


            const getFilteredResults = async (queryType, setter, maxResults = 6) => {
                const data = await pageFind().search(query, {filters: {type: queryType}})
                if (data === null) return
                const filteredResults = await Promise.all(await data.results.slice(0, maxResults).map(r => r.data()))
                if (filteredResults) return setter(filteredResults)
                return setter(null)
            }

            await getFilteredResults(props.currentBrand.slug.current === '/studio' ? 'case-study_studio' : 'case-study_domaine', setProjectResults, 4)
            await getFilteredResults(props.currentBrand.slug.current === '/studio' ? 'blog-post_studio' : 'blog-post_domaine', setBlogResults, 3)
            await getFilteredResults('partner', setPartnerResults, 5)
            await getFilteredResults('project-feature', setFeatureResults, 10)

            console.log(partnerResults())
        }
    }

    createEffect(() => {
        if (window.pagefind) {
            setPageFind(window.pagefind)
            pageFind().init({
                "baseUrl": "../"
            })
        }   
    })

    return (
        <div class={styles.searchMenu}>
            <input 
                autofocus 
                type="search" 
                class={`${styles.input} h4`} 
                placeholder="Search"
                oninput={handleInput}
                // value={query()}
            />

            <div class={styles.results}>

                <div class={styles.resultsColumn}>
                    <p class={styles.columnTitle}>Projects</p>
                    <div class={styles.projectsList}>
                        {projectResults() ?
                            <For each={projectResults()}>{result => 
                                <ProjectCard 
                                    url={result.url} 
                                    title={result.meta.title} 
                                    image={result.meta.image} 
                                    alt={result.meta.image_alt} 
                                />
                            }</For>
                        :
                            <For each={props.defaultProjects}>{project => 
                                <ProjectCard
                                    url={`/work/${project.slug.current}`} 
                                    title={project.title} 
                                    image={urlFor(project.thumbnailMedia.image).width(300).height(300).auto('format').url()} 
                                    alt={project.thumbnailMedia.image.alt} 
                                    />
                            }</For>
                        }
                    </div>
                </div>

                <div class={styles.resultsColumn}>
                    <p class={styles.columnTitle}>Insights</p>
                    <div class={styles.projectsList}>
                        {blogResults() ? 
                            <For each={blogResults()}>{result => 
                                <BlogCard 
                                    url={result.url} 
                                    title={result.meta.title} 
                                    categoryTitle={result.meta.categoryTitle}
                                    categoryUrl={result.meta.categoryUrl}
                                    image={result.meta.image} 
                                    alt={result.meta.image_alt} 
                                />
                            }</For>
                        :
                            <For each={props.defaultBlogPosts}>{post => 
                                <BlogCard 
                                    url={`/insights/${post.category.slug.current}/${post.slug.current}`} 
                                    title={post.title}
                                    categoryTitle={post.category.title}
                                    categoryUrl={`/insights/${post.category.slug.current}`}
                                    image={urlFor(post.thumbnailImage.image).width(300).height(300).auto('format').url()} 
                                    alt={post.thumbnailImage.image.alt} 
                                />
                            }</For>
                        }
                    </div>
                </div>

                <div class={styles.resultsColumn}>
                    <p class={styles.columnTitle}>Features</p>
                    <div class={styles.featuresList}>
                        {featureResults() ? 
                            <For each={featureResults()}>{result => 
                                <FeatureCard url={result.url} title={result.meta.title} />
                            }</For>
                        :
                            <For each={props.defaultFeatures}>{feature => 
                                <FeatureCard url={`/work/features/${feature.slug.current}`} title={feature.title} />
                            }</For>
                        }
                    </div>
                </div>

                <div class={styles.resultsColumn}>
                    <p class={styles.columnTitle}>Partners</p>
                    <div class={styles.partnersList}>
                        {partnerResults() ?
                            <For each={partnerResults()}>{result => 
                                <PartnerCard 
                                    url={result.url} 
                                    title={result.meta.title} 
                                    icon={result.meta.image}
                                    alt={result.meta.image_alt} 
                                    excerpt={result.meta.excerpt}
                                />
                            }</For>
                            :
                            <For each={props.defaultPartners}>{partner => 
                                <PartnerCard 
                                    url={`/partners/${partner.slug.current}`} 
                                    title={partner.title}
                                    icon={urlFor(partner.icon.image).auto('format').width(300).height(300).url()}
                                    alt={partner.icon.alt} 
                                    excerpt={partner.excerpt}
                                />
                            }</For>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}