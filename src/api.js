export async function clipBoardAPI(prompt) {
  const form = new FormData();
  form.append("prompt", prompt);
  const response = await fetch(process.env.REACT_APP_API_URL, {
    method: "POST",
    headers: {
      "x-api-key": process.env.REACT_APP_API_KEY,
    },
    body: form,
  });
  console.log("Remaining API Credits: " + [...response.headers][2][1]);
  console.log(
    "Got " +
      response.status +
      " with " +
      `${
        response.status === 422
          ? "Unprocessable Content"
          : response.status === 200
          ? "Processed Image"
          : response.statusText
      }`
  );
  const buffer = await response.arrayBuffer();
  const imageBlob = new Blob([buffer], { type: "image/png" });
  const imageUrl = URL.createObjectURL(imageBlob);
  return imageUrl;
}
