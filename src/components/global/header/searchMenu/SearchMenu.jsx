import { Show, createEffect, createSignal } from 'solid-js';
import styles from './SearchMenu.module.css'
import { urlFor } from '../../utils/cms-queries';

function ProjectCard(props) {
    return (
        <a href={props.url} class={`${styles.projectCard} caption`} data-color-scheme="secondary">
            <img 
                src={props.image} 
                alt={props.alt}
                class={styles.projectImage}
                loading="lazy"
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

function SearchIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m15.75 15.75-4.5-4.5m1.5-3.75a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"/>
        </svg>
    )
}

function CloseIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M15 3 3 15M3 3l12 12"/>
        </svg>
    )
}

export default function SearchMenu(props) {

    const [ pageFind, setPageFind ] = createSignal(null)
    const [ query, setQuery ] = createSignal(null)
    const [ projectResults, setProjectResults ] = createSignal(null)
    const [ blogResults, setBlogResults ] = createSignal(null)
    const [ partnerResults, setPartnerResults ] = createSignal(null)
    const [ featureResults, setFeatureResults ] = createSignal(null)
    const [ activeTab, setActiveTab ] = createSignal('projects') // Mobile only tabs

    const clearResults = () => {
        setQuery(null)
        setProjectResults(null)
        setBlogResults(null)
        setPartnerResults(null)
        setFeatureResults(null)
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
                // console.log(filteredResults)
                if (filteredResults) return setter(filteredResults)
                return setter(null)
            }

            await getFilteredResults(props.currentBrand.slug.current === '/studio' ? 'case-study_studio' : 'case-study_domaine', setProjectResults, 4)
            await getFilteredResults(props.currentBrand.slug.current === '/studio' ? 'blog-post_studio' : 'blog-post_domaine', setBlogResults, 3)
            await getFilteredResults(props.currentBrand.slug.current === '/studio' ? 'project-feature_studio' : 'project-feature_domaine', setFeatureResults, 10)
            await getFilteredResults('partner', setPartnerResults, 5)

            // console.log(partnerResults())
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

        <dialog popover id="search-menu" class={styles.searchMenu} data-color-scheme="default" data-lenis-prevent>

            {/* Search Input */}
            <div class={styles.menuControls} data-color-scheme="glass-light">
                
                <div class={styles.searchInput}>  
                    <input 
                        autofocus 
                        type="search" 
                        class={`${styles.input} h4`} 
                        placeholder="Search"
                        oninput={handleInput}
                    />
                    <span class={styles.searchIcon}><SearchIcon /></span>
                </div>

                <button class={`${styles.closeIcon}`} popoverTarget='search-menu'>
                    <CloseIcon />
                </button>
            </div>

            <div class={styles.results}>

                <div class={styles.resultsTabs}>
                    <button class={`${styles.tabButton} button-reset`} onClick={() => setActiveTab('projects')} data-active={activeTab() === 'projects' ? 'true' : 'false'}>Projects</button>
                    <button class={`${styles.tabButton} button-reset`} onClick={() => setActiveTab('insights')} data-active={activeTab() === 'insights' ? 'true' : 'false'}>Insights</button>
                    <button class={`${styles.tabButton} button-reset`} onClick={() => setActiveTab('features')} data-active={activeTab() === 'features' ? 'true' : 'false'}>Features</button>
                    <button class={`${styles.tabButton} button-reset`} onClick={() => setActiveTab('partners')} data-active={activeTab() === 'partners' ? 'true' : 'false'}>Partners</button>
                </div>

                {/* Projects */}
                <Show when={!query() || (query() && projectResults()?.length > 0)} >
                    <div class={styles.resultsColumn} data-tab-active={activeTab() === 'projects' ? 'true' : 'false'}>
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
                                        url={`${project.agencyBrand.slug.current === '/studio' ? '/studio' : ''}/work/${project.slug.current}`} 
                                        title={project.title} 
                                        image={urlFor(project.thumbnailMedia.image).width(300).height(300).auto('format').url()} 
                                        alt={project.thumbnailMedia.image.alt} 
                                        />
                                }</For>
                            }
                        </div>
                    </div>
                </Show>

                {/* Blog */}
                <Show when={!query() || (query() && blogResults()?.length > 0)}>
                    <div class={styles.resultsColumn} data-tab-active={activeTab() === 'insights' ? 'true' : 'false'}>
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
                                        url={`${post.agencyBrand.slug.current === '/studio' ? '/studio' : ''}/insights/${post.category.slug.current}/${post.slug.current}`} 
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
                </Show>

                {/* Features/ */}
                <Show when={!query() || (query() && featureResults()?.length > 0)}>
                    <div class={styles.resultsColumn} data-tab-active={activeTab() === 'features' ? 'true' : 'false'}>
                        <p class={styles.columnTitle}>Features</p>
                        <div class={styles.featuresList}>
                            {featureResults() ? 
                                <For each={featureResults()}>{result => 
                                    <FeatureCard 
                                        url={result.url} 
                                        title={result.meta.title} 
                                    />
                                }</For>
                            :
                                <For each={props.defaultFeatures}>{feature => 
                                    <FeatureCard 
                                        url={`${props.currentBrand.slug.current === '/studio' ? '/studio' : ''}/work/features/${feature.slug.current}`} 
                                        title={feature.title} 
                                    />
                                }</For>
                            }
                        </div>
                    </div>
                </Show>

                {/* Partners */}
                <Show when={!query() || (query() && partnerResults()?.length > 0)}>
                    <div class={styles.resultsColumn} data-tab-active={activeTab() === 'partners' ? 'true' : 'false'}>
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
                </Show>

                {/* No Results */}
                <Show when={ query() && 
                    (!projectResults() || projectResults().length <= 0) &&
                    (!blogResults() || blogResults().length <= 0) &&
                    (!featureResults() || featureResults().length <= 0) &&
                    (!partnerResults() || partnerResults().length <= 0)
                }>
                    <h2>No Results</h2>
                </Show>

            </div>
        </dialog>
    )
}