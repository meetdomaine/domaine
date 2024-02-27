import { Suspense, Switch, createEffect, createSignal, onMount } from 'solid-js'
import './Work.css'
import { urlFor } from '../../../utils/sanityClient'

export default function Work(props) {

  // console.log(props.content)

  const [ activeFilter, setActiveFilter ] = createSignal(null)

  onMount(() => {
    if (props.content.categories) {
      setActiveFilter(props.content.categories[0].slug.current)
    }
  })
  
  return (
    <section class="work">

      <div class="section-title">
        <h2 class="heading">{props.content.heading}</h2>
        <h3 class="subheading h5">{props.content.subheading}</h3>
      </div>

      <div class="filter-tags">
        <For each={props.content.categories}>{(category, i) =>
          <button 
            class={`button-secondary filter-tag ${category.slug.current == activeFilter() ? 'active' : 'inactive'}`}
            onClick={() => setActiveFilter(category.slug.current)}
          >
            {category.name}
          </button>
        }</For>
      </div>

      <div class="project-grid">
        <Suspense>
          <For each={props.content.projects}>{(project, i) => 
            <Show when={project.categories.includes(activeFilter())}>
              <div class="project-card">
                <div class="card-media">
                  <Switch>
                    <Match when={project.showThumbnailVideo && project.videoURL}>
                      <video 
                        src={project.videoURL}
                        class="card-video"
                        oncanplaythrough={(e) => e.target.dataset.canPlay = true}
                        poster={project.image ? urlFor(project.image).format("webp").width(600).height(360).auto('format').url() : ''}
                        autoplay
                        loop
                        muted
                        playsinline
                        preload="none"
                        onloadedmetadata="this.muted = true"
                      />
                    </Match>
                    <Match when={(!project.videoURL || !project.showThumbnailVideo) && project.thumbnailImage}>
                      <img
                        srcset={`
                          ${urlFor(project.thumbnailImage).format("webp").width(600).height(360).auto('format').url()} 600w, 
                          ${urlFor(project.thumbnailImage).format("webp").width(1080).height(648).auto('format').url()} 1080w, 
                          ${urlFor(project.thumbnailImage).format("webp").width(2160).height(1296).auto('format').url()} 2160w
                        `}
                        sizes="(max-width: 960px) 50vw, 25vw"
                        src={urlFor(project.thumbnailImage).format("webp").width(600).height(360).auto('format').url()}
                        class="card-image"
                        width="30vw"
                        height="20vh"
                        loading="lazy"
                        alt={`Case study image for our work with ${project.title}`}
                      />
                    </Match>
                  </Switch>
                </div>
                <h4 class="h6">{project.title}</h4>
              </div>
            </Show>
          }</For>
        </Suspense>
      </div>
    </section>
  )
}