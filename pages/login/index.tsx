import { Auth, Typography, Button } from '@supabase/ui'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://aaqdshxfbdenujajyefp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNDU3MjkxNCwiZXhwIjoxOTQwMTQ4OTE0fQ.G5vuustKQeeVJB4n31CAKbXTJ73ZBrb7DF9jRCLGKVM')

const Container = (props) => {
  const { user } = Auth.useUser()
  if (user)
    return (
      <>
        <Typography.Text>Signed in: {user.email}</Typography.Text>
        <Button block onClick={() => props.supabaseClient.auth.signOut()}>
          Sign out
        </Button>
      </>
    )
  return props.children
}

export default function AuthBasic() {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Container supabaseClient={supabase}>
        <Auth supabaseClient={supabase} providers={['google', 'facebook']} socialColors />
      </Container>
    </Auth.UserContextProvider>
  )
}