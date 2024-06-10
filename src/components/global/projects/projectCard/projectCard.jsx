import { urlFor } from '../../utils/cms-queries'
import styles from './projectCard.module.css'

export default function ProjectCard(props) {
    // console.log(props)
    return (
        <a href={props.url} class={styles.projectCard}>
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
            />
            <h3>{props.title}</h3>
            <p>{props.excerpt}</p>
        </a>
    )
}