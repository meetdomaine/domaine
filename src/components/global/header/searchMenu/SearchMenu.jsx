import { For, Show, createEffect, createSignal, onMount } from 'solid-js';
import styles from './SearchMenu.module.css'
import { urlFor } from '../../../../lib/cms-queries';
import { Translations } from '../../../../lib/locales';
import { getTranslationString } from 'src/lib/translations';
import { Document } from 'flexsearch';

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

    const [ searchReady, setSearchReady ] = createSignal(false)
    const [ query, setQuery ] = createSignal(null)
    const [ projectResults, setProjectResults ] = createSignal(null)
    const [ blogResults, setBlogResults ] = createSignal(null)
    const [ partnerResults, setPartnerResults ] = createSignal(null)
    const [ featureResults, setFeatureResults ] = createSignal(null)

    let projectsIndex, blogIndex, featuresIndex, partnersIndex;
    let projectsLookup, blogLookup, featuresLookup, partnersLookup;

    const initSearch = async () => {
        try {
            console.log('Starting search initialization...');
            
            // Fetch all search indexes and data
            const [
                projectsIndexResponse, projectsDataResponse,
                blogIndexResponse, blogDataResponse,
                featuresIndexResponse, featuresDataResponse,
                partnersIndexResponse, partnersDataResponse
            ] = await Promise.all([
                fetch('/search/projects-index.json'),
                fetch('/search/projects-data.json'),
                fetch('/search/blog-index.json'),
                fetch('/search/blog-data.json'),
                fetch('/search/features-index.json'),
                fetch('/search/features-data.json'),
                fetch('/search/partners-index.json'),
                fetch('/search/partners-data.json')
            ]);
            
            const [
                projectsIndexData, projectsData,
                blogIndexData, blogData,
                featuresIndexData, featuresData,
                partnersIndexData, partnersData
            ] = await Promise.all([
                projectsIndexResponse.json(),
                projectsDataResponse.json(),
                blogIndexResponse.json(),
                blogDataResponse.json(),
                featuresIndexResponse.json(),
                featuresDataResponse.json(),
                partnersIndexResponse.json(),
                partnersDataResponse.json()
            ]);

            // Initialize FlexSearch indexes
            projectsIndex = new Document({
                document: { id: "id", index: ["title", "subtitle"] },
                tokenize: "forward"
            });
            
            blogIndex = new Document({
                document: { id: "id", index: ["title", "subtitle"] },
                tokenize: "forward"
            });
            
            featuresIndex = new Document({
                document: { id: "id", index: ["title"] },
                tokenize: "forward"
            });
            
            partnersIndex = new Document({
                document: { id: "id", index: ["title"] },
                tokenize: "forward"
            });
            
            // Import index data
            Object.keys(projectsIndexData).forEach(key => {
                projectsIndex.import(key, projectsIndexData[key]);
            });
            Object.keys(blogIndexData).forEach(key => {
                blogIndex.import(key, blogIndexData[key]);
            });
            Object.keys(featuresIndexData).forEach(key => {
                featuresIndex.import(key, featuresIndexData[key]);
            });
            Object.keys(partnersIndexData).forEach(key => {
                partnersIndex.import(key, partnersIndexData[key]);
            });
            
            // Create lookup tables
            projectsLookup = projectsData.reduce((acc, item) => {
                acc[item.id] = item;
                return acc;
            }, {});
            blogLookup = blogData.reduce((acc, item) => {
                acc[item.id] = item;
                return acc;
            }, {});
            featuresLookup = featuresData.reduce((acc, item) => {
                acc[item.id] = item;
                return acc;
            }, {});
            partnersLookup = partnersData.reduce((acc, item) => {
                acc[item.id] = item;
                return acc;
            }, {});
            
            setSearchReady(true);
            console.log('✅ FlexSearch initialized with', projectsData.length, 'projects,', blogData.length, 'blog posts,', featuresData.length, 'features,', partnersData.length, 'partners');

        } catch (error) {
            console.error('❌ Failed to initialize search:', error);
        }
    }

    const searchProjects = (query) => {
        if (!searchReady() || !projectsIndex || !query) return [];
        
        try {
            const results = projectsIndex.search(query, { limit: 10 });
            const allIds = [];
            results.forEach(fieldResult => {
                if (fieldResult.result) {
                    allIds.push(...fieldResult.result);
                }
            });
            return allIds.map(id => projectsLookup[id]).filter(Boolean);
        } catch (error) {
            console.error('Projects search error:', error);
            return [];
        }
    };

    const searchBlog = (query) => {
        if (!searchReady() || !blogIndex || !query) return [];
        
        try {
            const results = blogIndex.search(query, { limit: 10 });
            const allIds = [];
            results.forEach(fieldResult => {
                if (fieldResult.result) {
                    allIds.push(...fieldResult.result);
                }
            });
            return allIds.map(id => blogLookup[id]).filter(Boolean);
        } catch (error) {
            console.error('Blog search error:', error);
            return [];
        }
    };

    const searchFeatures = (query) => {
        if (!searchReady() || !featuresIndex || !query) return [];
        
        try {
            const results = featuresIndex.search(query, { limit: 10 });
            const allIds = [];
            results.forEach(fieldResult => {
                if (fieldResult.result) {
                    allIds.push(...fieldResult.result);
                }
            });
            return allIds.map(id => featuresLookup[id]).filter(Boolean);
        } catch (error) {
            console.error('Features search error:', error);
            return [];
        }
    };

    const searchPartners = (query) => {
        if (!searchReady() || !partnersIndex || !query) return [];
        
        try {
            const results = partnersIndex.search(query, { limit: 10 });
            const allIds = [];
            results.forEach(fieldResult => {
                if (fieldResult.result) {
                    allIds.push(...fieldResult.result);
                }
            });
            return allIds.map(id => partnersLookup[id]).filter(Boolean);
        } catch (error) {
            console.error('Partners search error:', error);
            return [];
        }
    };


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

    const ResultCard = (props) => (
        <a href="#" class={styles.resultCard}>
            {props.title && <p class="h6">{props.title}</p>}
            {props.subtitle && <p>{props.subtitle}</p>}
        </a>
    )

    const ResultsGroup = (props) => (
        <div class={`${styles.resultsGroup} ${props.results?.length > 0 ? styles.visible : styles.hidden}`}>
            <p>{props.title}</p>
            <For each={props.results}>
                {(result) => (
                    <ResultCard 
                        title={result.title}
                        subtitle={result.subtitle}
                    />
                )}
            </For>
        </div>
    )

    const handleSearch = async (query) => {
        if (!searchReady()) {
            console.log('Search not ready yet');
            return;
        }

        console.log('=== SEARCHING ALL CONTENT TYPES ===');
        console.log('Query:', query);

        // Search all content types
        const projectSearchResults = searchProjects(query);
        const blogSearchResults = searchBlog(query);
        const featureSearchResults = searchFeatures(query);
        const partnerSearchResults = searchPartners(query);
        
        // Filter by current brand
        const brandType = props.currentBrand.slug.current === '/studio' ? 'case-study_studio' : 'case-study_domaine';
        const blogBrandType = props.currentBrand.slug.current === '/studio' ? 'blog-post_studio' : 'blog-post_domaine';
        const featureBrandType = props.currentBrand.slug.current === '/studio' ? 'project-feature_studio' : 'project-feature_domaine';
        
        const filteredProjects = projectSearchResults.filter(result => result && result.type === brandType);
        const filteredBlog = blogSearchResults.filter(result => result && result.type === blogBrandType);
        const filteredFeatures = featureSearchResults.filter(result => result && result.type === featureBrandType);
        // Partners don't have brand filtering
        const filteredPartners = partnerSearchResults;
        
        console.log('Projects:', filteredProjects.length);
        console.log('Blog:', filteredBlog.length);
        console.log('Features:', filteredFeatures.length);
        console.log('Partners:', filteredPartners.length);
        
        setProjectResults(filteredProjects.slice(0, 4));
        setBlogResults(filteredBlog.slice(0, 3));
        setFeatureResults(filteredFeatures.slice(0, 10));
        setPartnerResults(filteredPartners.slice(0, 5));
    }

    onMount(() => {
        initSearch();
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

                <ResultsGroup 
                    title="Projects"
                    results={projectResults()}
                />

                <ResultsGroup 
                    title="Insights"
                    results={blogResults()}
                />

                <ResultsGroup 
                    title="Features"
                    results={featureResults()}
                />

                <ResultsGroup 
                    title="Partner"
                    results={partnerResults()}
                />

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