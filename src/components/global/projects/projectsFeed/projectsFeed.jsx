import { For, createEffect, createSignal, onMount } from 'solid-js'
import ProjectsFilter, { currentFilterType, currentFilterValue } from '../projectsFilter/projectsFilter'
import styles from './projectsFeed.module.css'
import ProjectCard from '../projectCard/projectCard'

export default function ProjectsFeed(props) {

    const [ filteredProjects, setFilteredProjects ] = createSignal(props.projects)

    const handleFilter = (category, value) => {
        if (category && value) {
            const updatedProjects = props.projects.filter((project) => {
                if (category == "industry") {
                    return project.industry.slug.current == value
                }
                if (category == "service") {
                    if (project.services) {
                        return project.services.some((service) => service.serviceGroup.slug.current == value)
                    }
                    return false 
                }
                if (category == "partner") {
                    if (project.partners) {
                        return project.partners.some((partner) => partner.slug.current == value)
                    }
                    return false
                }
            })
            setFilteredProjects(updatedProjects)
        } else {
            setFilteredProjects(props.projects)
        }
    }

    createEffect(() => {
        handleFilter(currentFilterType(), currentFilterValue())
    })

    return (
        <section class={styles.projectsFeed}>
            <ProjectsFilter 
                industries={props.industries}
                services={props.services}
                partners={props.partners}
            />
            <div class={styles.projectsGrid}>
                <For each={filteredProjects()}>{(project, i) => 
                    <ProjectCard 
                        title={project.title}
                        excerpt={project.excerpt}
                        image={project.thumbnailImage.image}
                        url={`${props.root}/${project.slug.current}`}
                    />
                }</For>
            </div>
        </section>
    )
}