import { For, Show, createSignal, onMount } from 'solid-js'
import { isServer } from 'solid-js/web';

import styles from './projectsFilter.module.css'

export const [ currentFilterType, setCurrentFilterType ] = createSignal(null)
export const [ currentFilterValue, setCurrentFilterValue ] = createSignal(null)

export default function ProjectsFilter(props) {

    const handleFilter = (category, value) => {
            if (currentFilterType() == category && currentFilterValue() == value) {
                setCurrentFilterType(null)
                setCurrentFilterValue(null)
                window.history.pushState(null, '', window.location.pathname);
            } else {
                setCurrentFilterType(category)
                setCurrentFilterValue(value)
                const urlParams = new URLSearchParams();
                urlParams.set(category, value);
                const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
                window.history.pushState(null, '', newUrl);
            }
    }

    const getInitialFilter = () => {
        if (!isServer) {
            const urlParams = new URLSearchParams(window.location.search);
            const params = Object.fromEntries(urlParams.entries());
            const filterType = Object.keys(params)[0]
            const filterValue = params[Object.keys(params)[0]]
            if (filterType && filterValue) {
                setCurrentFilterType(filterType)
                setCurrentFilterValue(filterValue)
            } else {
                setCurrentFilterType(null)
                setCurrentFilterValue(null)
            }
        }
    }

    onMount(() => {
        getInitialFilter()
    })
    
    // getInitialFilter()

    return (
        <div class={styles.projectsFilter}>

            <Show when={props.industries}>
                <div class={styles.filterColumn}>
                    <p class="caption">Industries</p>
                    <For each={props.industries}>{(industry, i) => 
                        <button 
                            class={styles.filterButton}
                            data-active={currentFilterValue() == industry.slug.current}
                            onClick={() => {
                                handleFilter('industry', industry.slug.current)
                            }
                        }>
                            <p>{industry.title}</p>
                        </button>
                    }
                    </For>
                </div>
            </Show>

            <Show when={props.services}>
                <div class={styles.filterColumn}>
                    <p class="caption">Services</p>
                    <For each={props.services}>{(service, i) => 
                        <button 
                            class={styles.filterButton} 
                            data-active={currentFilterValue() == service.slug.current}
                            onClick={() => {
                                handleFilter('service', service.slug.current)
                            }
                        }>
                            <p>{service.title}</p>
                        </button>
                    }
                    </For>
                </div>
            </Show>

            <Show when={props.features}>
                <div class={styles.filterColumn}>
                    <p class="caption">Features</p>
                    <For each={props.features}>{(feature, i) => 
                        <button 
                            class={styles.filterButton}
                            data-active={currentFilterValue() == feature.slug.current}
                            onClick={() => {
                                handleFilter('feature', feature.slug.current)
                            }
                        }>
                            <p>{feature.title}</p>
                        </button>
                    }
                    </For>
                </div>
            </Show>

            <Show when={props.partners}>
                <div class={styles.filterColumn}>
                    <p class="caption">Partners</p>
                    <For each={props.partners}>{(partner, i) => 
                        <button 
                            class={styles.filterButton} 
                            data-active={currentFilterValue() == partner.slug.current}
                            onClick={() => {
                                handleFilter('partner', partner.slug.current)
                            }
                        }>
                            <p>{partner.title}</p>
                        </button>
                    }
                    </For>
                </div>
            </Show>

        </div>
    )
}