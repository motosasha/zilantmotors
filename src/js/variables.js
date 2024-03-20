export const vacancyFormAddress = "https://jsonplaceholder.typicode.com/posts";

export function vacancyFormConfig(plainFormData) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(plainFormData),
  };
}
