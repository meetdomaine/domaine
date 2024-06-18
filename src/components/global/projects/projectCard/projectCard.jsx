import { createEffect, createSignal, onMount } from 'solid-js'
import { urlFor } from '../../utils/cms-queries'
import styles from './projectCard.module.css'

export default function ProjectCard(props) {

    let image, placeholder

    const [ imageLoaded, setImageLoaded ] = createSignal(false)

    createEffect(() => {
        if (image && placeholder) {
            // setImageLoaded(true)
            placeholder.dataset.hidden = "true"
        }
    })

    return (
        <a href={props.url} class={styles.projectCard}>
            <div class={styles.media}>
                { props.thumbnailIsVideo && props.video && props.video.asset ? 
                    <mux-player
                        playback-id={props.video.asset.playbackId}
                        metadata-video-title={props.video.asset.filename}
                        autoplay
                        loop
                        muted
                        style={{ aspectRatio: 3/4 }}
                        width="300"
                        height="400"
                    ></mux-player>
                :
                <>
                    <img 
                        class={styles.image}
                        sizes='(max-width: 768px) 50vw, 33vw'
                        srcSet={`
                            ${urlFor(props.image).auto('format').width(300).height(400).url()} 300w,
                            ${urlFor(props.image).auto('format').width(600).height(800).url()} 600w,
                            ${urlFor(props.image).auto('format').width(960).height(1280).url()} 960w,
                            ${urlFor(props.image).auto('format').width(1024).height(1365).url()},
                        `}
                        src={urlFor(props.image).auto('format').width(300).height(400).url()}
                        alt={props.image.alt}
                        loading='lazy'
                        ref={image}
                    />
                    <img 
                        class={styles.placeholder}
                        src={props.image.asset.metadata.lqip}
                        alt={props.image.alt}
                        ref={placeholder}
                        data-hidden={imageLoaded()}
                        loading='eager'
                    />
                </>
                }
            </div>
            <h3>{props.title}</h3>
            <p>{props.excerpt}</p>
        </a>
    )
}