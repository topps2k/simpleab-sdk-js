# SimpleAB SDK for JavaScript

This is the JavaScript version of the SimpleAB SDK, providing powerful functionality for A/B testing in web applications.

## Features

- Easy integration with web applications
- Asynchronous treatment retrieval
- Support for multiple experiments and stages
- Flexible dimension-based testing
- Local caching for improved performance
- Automatic error handling and retry mechanism
- Built-in support for common API URLs

## Installation

Install the SDK using npm:

```bash
npm install simpleab-sdk-js
```

## Usage

Here's a basic example of how to use the SimpleAB SDK:

```javascript
const { SimpleABSDK, BaseAPIUrls } = require('simpleab-sdk-js');

// Initialize the SDK
const sdk = new SimpleABSDK(BaseAPIUrls.CAPTCHIFY_NA, 'your-api-key', ['experiment1', 'experiment2']);

// Using async/await
async function runExperiment() {
  try {
    const treatment = await sdk.getTreatment('experiment1', 'stage1', 'user123', 'default');
    console.log('Treatment:', treatment);
    // Apply the treatment in your application
    // Note: If no allocation is found, treatment will be an empty string ('')
    if (treatment === '') {
      console.log('No treatment allocated for this user');
      // Apply default behavior
    } else {
      // Apply treatment-specific behavior
    }
  } catch (error) {
    console.error('Error:', error);
    // Handle the error or use a default treatment
  }
}

runExperiment();

// Using Promises
sdk.getTreatment('experiment2', 'stage1', 'user456', 'default')
  .then(treatment => {
    console.log('Treatment:', treatment);
    // Apply the treatment in your application
    // Note: If no allocation is found, treatment will be an empty string ('')
    if (treatment === '') {
      console.log('No treatment allocated for this user');
      // Apply default behavior
    } else {
      // Apply treatment-specific behavior
    }
  })
  .catch(error => {
    console.error('Error:', error);
    // Handle the error or use a default treatment
  });
```

## API Reference

### `new SimpleABSDK(apiURL, apiKey, experiments)`

Creates a new instance of the SimpleAB SDK.

- `apiURL` (string): The URL of the SimpleAB API. You can use the `BaseAPIUrls` object for common API endpoints.
- `apiKey` (string): Your API key for authentication.
- `experiments` (string[]): An array of experiment IDs to preload (optional).

### `BaseAPIUrls`

A class containing static properties for common API URLs:

- `BaseAPIUrls.CAPTCHIFY_NA`: The API URL for the North America region.

### `sdk.getTreatment(experimentID, stage, allocationKey, dimension)`

Gets the treatment for a specific experiment, stage, allocation key, and dimension.

- `experimentID` (string): The ID of the experiment.
- `stage` (string): The stage of the experiment.
- `allocationKey` (string): A unique identifier for the user or entity being tested.
- `dimension` (string): The dimension of the experiment.

Returns a Promise that resolves to the treatment ID (string) or an empty string ('') if no treatment is assigned or no allocation is found.

### `sdk.close()`

Closes the SDK instance and clears any running intervals. Call this method when you're done using the SDK to clean up resources.

## Best Practices

1. **Initialization**: Initialize the SDK once when your application starts and reuse the instance throughout your app. Use the `BaseAPIUrls` object for common API endpoints.

2. **Error Handling**: Always include error handling when calling `getTreatment()` to ensure your application degrades gracefully if the SDK encounters issues.

3. **Caching**: The SDK implements local caching to improve performance. Take advantage of this by using consistent allocation keys for the same user across sessions.

4. **Dimensions**: Use dimensions to create more granular experiments. For example, you could use different dimensions for new users vs. returning users.

5. **Preloading**: If you know which experiments you'll be using, preload them during SDK initialization to improve performance.

6. **Cleanup**: Remember to call `sdk.close()` when you're done using the SDK to clean up resources and stop the cache refresh interval.

7. **Handling No Allocation**: Always check if the returned treatment is an empty string, which indicates no allocation was found. In this case, apply your default behavior.

## Contributing

We welcome contributions to the SimpleAB SDK! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions about using the SimpleAB SDK, please [open an issue](https://github.com/yourusername/simpleab-sdk-js/issues) on our GitHub repository.