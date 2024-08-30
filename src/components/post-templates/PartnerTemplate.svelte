<script lang="ts">
  import { Container, Heading, Hr, Html, Text } from 'svelte-email';
  export let name: string;
  export let email: string;
  export let phone: string;
  export let organization: string;
</script>

<Html lang="ru">
  <Container>
    <Heading as="h1">{organization}</Heading>
    <Text><b>Email:</b> <a href={`mailto:${email}`}>{email}</a></Text>
    <Text><b>Телефон:</b> <a href={`tel:${phone}`}>{phone}</a></Text>
    <Hr />
    <footer>
      <Text><b>Отправил:</b> {name}</Text>
    </footer>
  </Container>
</Html>
