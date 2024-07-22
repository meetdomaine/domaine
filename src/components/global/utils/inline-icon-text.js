import bell from "../../../icons/pixel_bell.svg?raw"
import briefcase from "../../../icons/pixel_briefcase.svg?raw"
import email from "../../../icons/pixel_email.svg?raw"
import heart from "../../../icons/pixel_heart.svg?raw"
import lightning from "../../../icons/pixel_lightning.svg?raw"
import money from "../../../icons/pixel_money.svg?raw"
import pen from "../../../icons/pixel_pen.svg?raw"
import search from "../../../icons/pixel_search.svg?raw"
import spaceship from "../../../icons/pixel_spaceship.svg?raw"
import sparkle from "../../../icons/pixel_sparkle.svg?raw"

export const replaceStringIcons = (string) => {
    return string.replace(/\{(\w+)\}/g, (match) => {
        switch (match) {
            case ("{bell}"): return `<span class="inline-icon">${bell}</span>`
            case ("{briefcase}"): return `<span class="inline-icon">${briefcase}</span>`
            case ("{email}"): return `<span class="inline-icon">${email}</span>`
            case ("{heart}"): return `<span class="inline-icon">${heart}</span>`
            case ("{lightning}"): return `<span class="inline-icon">${lightning}</span>`
            case ("{money}"): return `<span class="inline-icon">${money}</span>`
            case ("{pen}"): return `<span class="inline-icon">${pen}</span>`
            case ("{search}"): return `<span class="inline-icon">${search}</span>`
            case ("{spaceship}"): return `<span class="inline-icon">${spaceship}</span>`
            case ("{sparkle}"): return `<span class="inline-icon">${sparkle}</span>`
            default: return ""
        }
    });
}
