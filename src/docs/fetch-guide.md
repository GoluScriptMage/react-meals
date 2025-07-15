# Guide to Using Fetch for POST and GET Requests

## Key Points to Remember

1. **Fetch Basics:**
   - `fetch` is used to make HTTP requests in JavaScript.
   - It returns a `Promise` that resolves to the `Response` object.

2. **Error Handling:**
   - Always check `response.ok` to ensure the request was successful.
   - Use `try...catch` blocks to handle network errors.

3. **Headers:**
   - Include headers like `Content-Type` for POST requests.
   - Use `Authorization` if the API requires authentication.

4. **Async/Await:**
   - Use `async/await` for cleaner and more readable code.

5. **JSON Handling:**
   - Convert request body to JSON using `JSON.stringify()`.
   - Parse response data using `response.json()`.

---

## Example: POST Request

```javascript
const postData = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Data posted successfully:', result);
    return result;
  } catch (error) {
    console.error('Error posting data:', error);
  }
};

// Usage
postData('https://example.com/api', { name: 'John', age: 30 });
```

---

## Example: GET Request

```javascript
const getData = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Data fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Usage
getData('https://example.com/api');
```

---

## Common Errors and Solutions

1. **Network Error:**
   - Ensure the URL is correct.
   - Check your internet connection.

2. **CORS Error:**
   - Ensure the server allows cross-origin requests.
   - Use a proxy if needed.

3. **Invalid JSON:**
   - Ensure the request body is properly formatted.
   - Check the server response for valid JSON.

4. **Authentication Error:**
   - Include valid tokens or credentials in the headers.

---

## Best Practices

1. **Reuse Code:**
   - Create reusable functions for fetch requests.

2. **Timeouts:**
   - Implement timeouts for long-running requests.

3. **Logging:**
   - Log errors and responses for debugging.

4. **Security:**
   - Avoid exposing sensitive data in requests.

---

By following these guidelines, you can effectively use `fetch` for both POST and GET requests while handling errors gracefully.
