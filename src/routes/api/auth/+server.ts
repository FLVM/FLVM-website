// import { config, providers, type ProvidersTypes } from "$lib/server/data/auth/config";
import { randomBytes } from "crypto";
// import { AuthorizationCode } from "simple-oauth2"
// import { scopes } from "$lib/server/data/auth/scopes";
// import { redirect, type RequestHandler } from "@sveltejs/kit";
// import type { ClientRequest, ServerResponse } from "http";
import { GITHUB_CLIENT_ID } from "$env/static/private";
// import { redirect } from "@sveltejs/kit";
// import { dev } from "$app/environment";
// import { dev } from "$app/environment";
// const randomString = () => randomBytes(4).toString("hex")


export function _load({ setHeaders }: { setHeaders: ({ }) => void }) {
  setHeaders({
    'Content-Type': 'text/plain'
  });
}

// flvm-website.vercel.app/api/auth?provider=github&site_id=cms.netlify.com&scope=repo%2Cuser

export async function GET({ url }: { url: URL }) {
  console.log("AUTH URL ", url)
  const clientId = GITHUB_CLIENT_ID
  if (!clientId) return new Response("Missing GITHUB_CLIENT_ID", { status: 500 })
  const state = randomBytes(16).toString("hex")
  const redirectUri = `${url.origin || ""}/api/callback`
  const scope = "public_repo,repo,user"

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    state,
    scope,
    allow_signup: "false"
  })

  const cookie = `gh_oauth_state=${state}; Path=/; Max-Age=300; HttpOnly; Secure; SameSite=Lax`
  return new Response("", {
    headers: {
      location: `https://github.com/login/oauth/authorize?${params.toString()}`,
      "Set-Cookie": cookie
    },
    status: 302
  })

  // throw redirect(302, `https://github.com/login/oauth/authorize?${params.toString()}`, {
  //   headers: { "Set-Cookie": cookie }
  // })
    // github.com/login?
  // client_id=232500c230c4662f5a8b
  // &return_to=%2Flogin%2Foauth%2Fauthorize%3Fclient_id%3D232500c230c4662f5a8b%26redirect_uri%3Dhttps%253A%252F%252Fapi.netlify.com%252Fauth%252Fdone%26scope%3Drepo%252Cuser%26state%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwaWQiOiI1NThhZTEzODgwZjQ5MDA3MWIwMDAwOTMiLCJleHAiOjE3NjM5MTg0MTAsImxvZ2luIjpudWxsfQ.h7so5ZsXvn9kLCj1-dUJfV4rlTnWZobRU8K5LoUk5WQ
  // 
  // github.com/login?
  // client_id=Ov23liqsz6PueJDkDPsp
  // &redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fapi%2Fcallback&state=977e8785a3c3b223c5d435fc2ec32d77&scope=repo&allow_signup=false

  // Même soucis avec cette méthode
  // cookies.set('gh_oauth_state', state, {
  //   path: '/',
  //   httpOnly: true,
  //   sameSite: 'lax',
  //   secure: !dev,
  //   maxAge: 300
  // });
  // throw redirect(302, `https://github.com/login/oauth/authorize?${params.toString()}`)

}

// export default async (req: Request , res: ServerResponse) => {
//   const { host } = req.headers
//   const url = new URL(`https://${host}/${req.url}`)
//   const urlParams = url.searchParams
//   const provider = urlParams.get("provider") || "github"
//   const client = new AuthorizationCode(config(provider as ProvidersTypes))
//   const authorizetionUri = client.authorizeURL({
//     redirect_uri: `https://${host}/api/callback?provider=${provider}`,
//     scope: scopes[provider],
//     state: randomString()
//   })
//   res.writeHead(301, { location: authorizetionUri })
//   res.end()
// }