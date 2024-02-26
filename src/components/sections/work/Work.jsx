import { createEffect, createSignal, onMount } from 'solid-js'
import './Work.css'

export default function Work(props) {

  console.log(props.content)

  const [ activeFilter, setActiveFilter ] = createSignal(null)
  const [ filteredProjects, setFilteredProjects ] = createSignal(null)

  onMount(() => {
    if (props.content.categories) {
      setActiveFilter(props.content.categories[0].slug)
    }
  })

  createEffect(() => {
    if (props.content.projects) {
      const projects = props.content.projects.reduce((project) => project.categories.includes(activeFilter()))
      console.log(projects)
    }
    console.log(activeFilter())
  })

  return (
    <section class="work">

      <div class="section-title">
        <h2 class="heading">{props.content.heading}</h2>
        <h3 class="subheading h5">{props.content.subheading}</h3>
      </div>

      <div class="filter-tags">
        <For each={props.content.categories}>{(category, i) =>
          <button class="button-secondary" onClick={() => setActiveFilter(category.slug)}>{category.name}</button>
        }</For>
      </div>

      <div class="project-grid">
        {/* <For each={props.content.projects}>{(project, i) => 
          <Show when={project.categories.includes(activeFilter())}>
            <p>{project.title}</p>
          </Show>
        }</For> */}
      </div>
    </section>
  )
}