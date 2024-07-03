import { Show, createEffect, createSignal } from 'solid-js';
import styles from './SearchMenu.module.css'
import { urlFor } from '../utils/cms-queries';

function ProjectCard(props) {
    return (
        <a href={props.url} class={`${styles.resultCard} caption`}>
            {props.title}
            <img 
                src={props.image} 
                alt={props.alt}
                class={styles.resultImage}
                loading='eager'
            />
        </a>

    )
}

function BlogCard(props) {
    return (
        <a href={props.url} class={`${styles.resultCard} caption`}>
            {props.title}
            <img 
                src={props.image} 
                alt={props.alt}
                class={styles.resultImage}
                loading='eager'
            />
        </a>
    )
}

function ServiceCard(props) {
    return <a href={props.url} class="h6">{props.title}</a>
}

function PartnerCard(props) {
    return <a href={props.url} class="h6">{props.title}</a>
}

export default function SearchMenu(props) {

    console.log(props)

    const [ pageFind, setPageFind ] = createSignal(null)
    const [ query, setQuery ] = createSignal(null)

    const [ projectResults, setProjectResults ] = createSignal(null)
    const [ blogResults, setBlogResults ] = createSignal(null)
    const [ partnerResults, setPartnerResults ] = createSignal(null)
    const [ serviceResults, setServiceResults ] = createSignal(null)
    const [ featureResults, setFeatureResults ] = createSignal(null)
    const [ pageResults, setPageResults ] = createSignal(null)

    const clearResults = () => {
        setProjectResults(null)
        setBlogResults(null)
        setPartnerResults(null)
        setServiceResults(null)
        setFeatureResults(null)
        setPageResults(null)
    }

    const handleInput = (e) => {
        if (e.target.value) return setQuery(e.target.value)
        return setQuery(null)
    }

    const handleSearch = async (query) => {
        if (pageFind()) {

            const maxResults = 6

            // const pages = await pageFind().search(query, {filters: {type: 'page'}})
            // const services = await pageFind().search(query, {filters: {type: 'service'}})

            const getFilteredResults = async (queryType, setter) => {
                const data = await pageFind().search(query, {filters: {type: queryType}})
                if (data === null) return
                const filteredResults = await Promise.all(await data.results.slice(0, maxResults).map(r => r.data()))
                // console.log(filteredResults)
                if (filteredResults) return setter(filteredResults)
                return setter(null)
            }

            getFilteredResults('case-study', setProjectResults)
            getFilteredResults('blog-post', setBlogResults)
            getFilteredResults('service', setServiceResults)
            getFilteredResults('partner', setPartnerResults)
        }
    }

    createEffect(() => {

        if (window.pagefind) {
            setPageFind(window.pagefind)
            pageFind().init({
                "baseUrl": "../"
            })
        }
        if (query()) { 
            handleSearch(query()) 
        } else {
            clearResults()
        }
            
    })

    return (
        <div class={styles.searchMenu}>
            <input 
                autofocus 
                type="search" 
                class={`${styles.input} h1`} 
                placeholder="Search"
                oninput={handleInput}
                value={query()}
            />

            <Show when={!query()}>
                <h5>Recently Featured</h5>
            </Show>

            <div class={styles.results}>

                <div class={styles.resultsColumn}>
                    <p>Projects</p>
                    {projectResults() ?
                        <For each={projectResults()}>{result => 
                            <ProjectCard url={result.url} title={result.meta.title} image={result.meta.image} alt={result.meta.image_alt} />
                        }</For>
                    :
                        <For each={props.defaultProjects}>{project => 
                            <ProjectCard url={`/work/${project.slug.current}`} title={project.title} image={urlFor(project.thumbnailImage.image).width(300).height(300).auto('format').url()} alt={project.thumbnailImage.image.alt} />
                        }</For>
                    }
                </div>

                <div class={styles.resultsColumn}>
                    <p>Insights</p>
                    {blogResults() ? 
                        <For each={blogResults()}>{result => 
                            <BlogCard url={result.url} title={result.meta.title} image={result.meta.image} alt={result.meta.image_alt} />
                        }</For>
                    :
                        <For each={props.defaultBlogPosts}>{post => 
                            <BlogCard url={`/insights/${post.category.slug.current}/${post.slug.current}`} title={post.title} image={urlFor(post.thumbnailImage.image).width(300).height(300).auto('format').url()} alt={post.thumbnailImage.image.alt} />
                        }</For>
                    }
                </div>

                <div class={styles.resultsColumn}>
                    <p>Services</p>
                    {serviceResults() ? 
                        <For each={serviceResults()}>{result => 
                            <a href={result.url} class="h6">{result.meta.title}</a>
                        }</For>
                    :
                        <For each={props.defaultServices}>{service => 
                            <BlogCard url={'#'} title={"test"} />
                        }</For>
                    }
                </div>

                <Show when={(query() == null && props.defaultPartners) || partnerResults() }>
                    <div class={styles.resultsColumn}>
                        <p>Partners</p>
                        <For each={partnerResults()}>{result => 
                            <a href={result.url} class="h6">{result.meta.title}</a>
                        }</For>
                    </div>
                </Show>

            </div>
        </div>
    )
}