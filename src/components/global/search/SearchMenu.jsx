import { createEffect, createSignal } from 'solid-js';
import styles from './SearchMenu.module.css'
// import { createScriptLoader } from "@solid-primitives/script-loader";


// import * as pagefind from "/pagefind/pagefind.js"


// import "/pagefind/pagefind.js"

export default function SearchMenu() {

    const [ pageFind, setPageFind ] = createSignal(null)
    const [ query, setQuery ] = createSignal(null)

    const [ results, setResults ] = createSignal(null)

    const [ projectResults, setProjectResults ] = createSignal(null)
    const [ blogResults, setBlogResults ] = createSignal(null)
    const [ partnerResults, setPartnerResults ] = createSignal(null)
    const [ serviceResults, setServiceResults ] = createSignal(null)
    const [ featureResults, setFeatureResults ] = createSignal(null)
    const [ pageResults, setPageResults ] = createSignal(null)

    // createScriptLoader({
    //     src: "/pagefind/pagefind.js",
    //     async onLoad(e) {
    //         // console.log(e)
    //         await pagefind.init()
    //     //   await grecaptcha.enterprise.ready();
    //     //   const token = await grecaptcha.enterprise.execute("my_token", { action: "login" });
    //       // do your stuff...
    //     },
    //   });

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

            const pages = await pageFind().search(query, {filters: {type: 'page'}})
            const services = await pageFind().search(query, {filters: {type: 'service'}})

            const getFilteredResults = async (queryType, setter) => {
                const data = await pageFind().search(query, {filters: {type: queryType}})
                const filteredResults = await Promise.all(await data.results.slice(0, maxResults).map(r => r.data()))
                console.log(filteredResults)
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

            <div class={styles.results}>

                <div class={styles.resultsColumn}>
                    <p>Projects</p>
                    <For each={projectResults()}>{result => 
                        <a href={result.url} class="h6">{result.meta.title}</a>
                    }</For>
                </div>

                <div class={styles.resultsColumn}>
                    <p>Insights</p>
                    <For each={blogResults()}>{result => 
                        <a href={result.url} class="h6">{result.meta.title}</a>
                    }</For>
                </div>

                <div class={styles.resultsColumn}>
                    <p>Services</p>
                    <For each={serviceResults()}>{result => 
                        <a href={result.url} class="h6">{result.meta.title}</a>
                    }</For>
                </div>

                <div class={styles.resultsColumn}>
                    <p>Partners</p>
                    <For each={partnerResults()}>{result => 
                        <a href={result.url} class="h6">{result.meta.title}</a>
                    }</For>
                </div>

            </div>
        </div>
    )
}