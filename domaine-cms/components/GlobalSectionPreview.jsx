import {Stack, Text, Card} from '@sanity/ui'

export function GlobalSectionPreview(props) {
  return (
    <Stack space={3}>
      {props.renderDefault(props)}
      <Text size={1}>Characters: {props.value?.length || 0}</Text>
    </Stack>
  )
}