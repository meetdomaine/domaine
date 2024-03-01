import { For, createEffect, createSignal, onMount } from "solid-js";
import './Contact.css';
import { createViewportObserver } from "../../../utils/viewportObserver";

export default function Forms(props) {

  const [ activeForm, setActiveForm ] = createSignal(null)

  let section;

  const createHubspotScript = () => {

    const hubspotScript = document.createElement("script");
    hubspotScript.src = "https://js.hsforms.net/forms/embed/v2.js";
    hubspotScript.setAttribute("type", "text/javascript");
    document.body.appendChild(hubspotScript);

    hubspotScript.addEventListener("load", () => {
      if (props.content.forms[0]) {
        setActiveForm(props.content.forms[0]);
      }
    });
  }

  const createForm = (id) => {
    window.hbspt.forms.create({
      region: "na1",
      target: "#form",
      portalId: "41750854",
      formId: id,
    });
  }

  onMount(() => {
    createHubspotScript();
    if (section) createViewportObserver(section)
  })

  createEffect(() => {
    if (activeForm()) {
      createForm(activeForm().formId);
    }
  })

  return (
    <section class="contact" id="contact" ref={section}>
      <div class="contact-form">
        <div class="section-title">
          <h2 class="h2">{props.content.heading}</h2>
          <h3 class="h5">{props.content.subheading}</h3>
        </div>

        <Show when={props.content.forms && props.content.forms.length > 1 && activeForm()}>
          <div class="radio-button-group">
            <For each={props.content.forms}>{(form, i) =>
              <label 
                class={`button button-radio ${activeForm().formId == form.formId ? 'active' : 'inactive'}`}
                for={form.formId}
              >
                <input 
                  type="radio" 
                  name="form-toggle" 
                  value={form.title} 
                  id={form.formId}
                  checked={activeForm().formId == form.formId}
                  onClick={() => setActiveForm(form)}
                />
                {form.title}
              </label>
              // <button class={`button-radio ${activeForm().formId == form.formId ? 'active': 'inactive'} `}>{form.title}</button>
            }</For>
          </div>
        </Show>
      
        <div id="form"></div>
      </div>
    </section>
  )
}