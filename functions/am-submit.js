export async function onRequestPost(context) {
  const token = context.env.BEARER_TOKEN;
  const formData = await context.request.json();

  const response = await fetch("https://api-v2.morminds.com/forms/am-update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify(formData)
  });

  const result = await response.json();
  return new Response(JSON.stringify(result), {
    status: response.status,
    headers: { "Content-Type": "application/json" }
  });
}
