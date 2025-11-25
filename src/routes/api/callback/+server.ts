import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "$env/static/private"


export async function GET({ url, request }: { url: URL, request: Request }) {
  // console.log("CALLBACK URL ", url)
  // console.log("CALLBACK REQUEST ", request)

  const code = url.searchParams.get("code")
  const state = url.searchParams.get("state")
  const cookieHeader = request.headers.get("cookie") || ""
  console.log("Cookies", cookieHeader)
  const cookies = Object.fromEntries(cookieHeader.split(";").map(s => {
    const [k, ...v] = s.trim().split("=")
    return [k, decodeURIComponent(v.join("="))]
  }))
  const savedState = cookies["gh_oauth_state"]

  if (!code || !state || !savedState || state !== savedState) {
    console.log("Code & state & saved state", code, state, savedState)
    console.log("Saved state &  Saved state === state",!savedState,  state !== savedState)
    return new Response("Invalid state or code", { status: 400 })
  }

  const tokenResp = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json"
    },
    body: new URLSearchParams({
      client_id: GITHUB_CLIENT_ID || "",
      client_secret: GITHUB_CLIENT_SECRET || "",
      code,
      redirect_uri: `${url.origin || ""}/api/callback`,
      state
    })
  })

  const data = await tokenResp.json()

  if (data.error) return new Response(`Github error: ${data.error_description || data.error}`, { status: 400 })
  
  const accessToken = data.access_token

  if (!accessToken) return new Response("No access token", { status: 500 })

  const expireCookie = `gh_oauth_state=deleted; Path=/; Max-Age=0; HttpOnly; SameSite=Strict`
  const allowedOrigin = url.origin || "*"
  // @todo: debug auth :
  // https://www.ailurotech.com/blog/github-oauth-with-decap
  const html = `<!doctype html><html><head><meta charset="utf-8"></head><body>
  <script>
        const receiveMessage = (message) => {
        window.opener.postMessage(
          'authorization:github:success:${JSON.stringify({
            token: accessToken,
            provider: "github"
          })}',
          message.origin
        );

        window.removeEventListener("message", receiveMessage, false);
      }
      window.addEventListener("message", receiveMessage, false);

      window.opener.postMessage("authorizing:github", "*");
  
  /*
  try {
    window.opener.postMessage({ token: "${accessToken.replace(/"/g,'\\"')}" }, "${url.origin}");
  } catch(e) { console.error(e); }
   console.log("Same origin", window.location.origin === "${url.origin}", window.location.origin, "${url.origin}");
  //  window.close()
  // setTimeout(()=> window.close(), 100);
  fetch('https://api.github.com/user', { headers: { Authorization: 'token ${accessToken.replace(/"/g,'\\"')}' } }).then(r=>r.json()).then(console.log);
  */
  </script>

  <p>Authentication complete. You may close this window.</p>
  <pre>${accessToken}</pre>
  <pre>${accessToken.replace(/"/g,'\\"')}</pre>
  <pre>${accessToken.replace(/["\\]/g,'\\&')}</pre>
  </body></html>`

  return new Response(html, { status: 200, headers: {
    "Content-Type": "text/html; charset=utf-8",
    "set-Cookie": expireCookie
  }})
}

// import { config } from "$lib/server/data/auth/config"
// import { AuthorizationCode } from "simple-oauth2"

// export default async (req, res) => {
//   const { host } = req.headers
//   const url = new URL(`https://${host}/${req.url}`)
//   const urlParams = url.searchParams
//   const code = urlParams.get("code")
//   const provider = urlParams.get("provider")
//   const client = new AuthorizationCode(config(provider))
//   const tokenParams = {
//     code,
//     redirect_uri: `https://${host}/api/callback?provider=${provider}`
//   }

//   try {
//     const accessToken = await client.getToken(tokenParams)
//     const token = accessToken.token["access_token"]
//     const responseBody = renderBody("success", {
//       token,
//       provider
//     })
//     res.statusCode = 200
//     res.end(responseBody)
//   } catch (e) {
//     res.statusCode = 200
//     res.end(renderBody("error", e))
//   }
// }

// function renderBody(status, content) {
//   return `
//     <script>
//       const recieveMessage = (message) => {
//         window.opener.postMessage(
//           'authorization:${content.provider}:${status}:${JSON.stringify(content)}',
//           message.origin
//         );
//         window.removeEventListener("message", receiveMessage, false);
//       }
//         window.addEventListener("message", receiveMessage, false);
//         window.opener.postMessage("auhtorizing:${content.provider}", "*")
//     </script>
//   `
// }