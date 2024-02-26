import { For, createEffect, createSignal, onMount } from "solid-js";

export default function Forms(props) {

  console.log(props)

  const [ activeForm, setActiveForm ] = createSignal(null)

  const createForm = (id) => {

    if (window.hbspt) {
        window.hbspt.forms.create({
          region: "na1",
          target: "#form",
          portalId: "41750854",
          // formId: "adfd1a1f-ca8a-4ed2-aead-5fbe29388532"
          formId: id,
        });
      }
  }

  onMount(() => {
    if (props.forms[0]) {
      setActiveForm(props.forms[0]);
      createForm(activeForm().formId);
    }
    console.log(activeForm())
  })

  createEffect(() => {
    createForm(activeForm().formId);
  })

  

  return (
    // <p>Forms</p>
    <>
      <div class="section-title">
        <Show when={props.forms && props.forms.length > 1 && activeForm()}>
          <div class="radio-button-group">
            <For each={props.forms}>{(form, i) =>
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
      </div>
      
      <div id="form"></div>
    </>
  )
}