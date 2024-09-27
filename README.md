# Simple A/B SDK for JavaScript

This is the JavaScript version of the Simple A/B SDK, providing powerful functionality for A/B testing and metrics tracking in web applications.

## Features

- Easy integration with web applications
- Asynchronous treatment retrieval
- Support for multiple experiments and stages
- Flexible dimension-based testing
- Local caching for improved performance
- Automatic error handling and retry mechanism
- Built-in support for common API URLs
- Client-side metrics tracking and aggregation with configurable flush interval
- Uses fetch API with a polyfill for universal compatibility
- Manual flushing of metrics for more control over data transmission
- Segment information retrieval for user targeting
- Wrapper functions for simplified segment-based treatment retrieval and metric tracking

## Installation

Install the SDK using npm:

```bash
npm install simpleab-sdk-js
```

## Version 2.0.0 Update

This version introduces new wrapper functions `getTreatmentWithSegment` and `trackMetricWithSegment`, which simplify the process of retrieving treatments and tracking metrics using Segment objects. These functions automatically determine the appropriate dimension based on the experiment and segment information.

The existing functionality remains unchanged, ensuring a seamless upgrade for existing users.

## Setting Up Simple A/B

Before using the Simple A/B SDK, you need to set up your account and experiments on captchify.com. Follow these steps:

1. Go to [captchify.com](https://captchify.com) and sign up for an account if you haven't already.
2. Once logged in, navigate to the Simple A/B section of the dashboard.
3. Create a new organization or select an existing one.
4. Create a new experiment by clicking on the "New Experiment" button.
5. Configure your experiment by setting up stages, dimensions, and treatments.
6. Generate an API key for your Simple A/B SDK integration.
7. Copy your API key and experiment IDs, as you'll need them to initialize the SDK in your application.

For more detailed instructions on setting up experiments and managing your Simple A/B account, please refer to the documentation on captchify.com.

## Usage

Here's a basic example of how to use the Simple A/B SDK, including the new segment-based wrapper functions:

```javascript
const { SimpleABSDK, BaseAPIUrls, AggregationTypes, Treatments, Stages } = require('simpleab-sdk-js');

// Initialize the SDK
const sdk = new SimpleABSDK(BaseAPIUrls.CAPTCHIFY_NA, 'your-api-key', ['experiment1', 'experiment2']);

// Using async/await
async function runExperiment() {
  try {
    // Get segment information
    const segment = await sdk.getSegment({ ip: '123.45.67.89', userAgent: 'Mozilla/5.0...' });
    console.log('Segment:', segment);

    // Use the new wrapper function for getting treatment
    const treatment = await sdk.getTreatmentWithSegment('experiment1', Stages.BETA, segment, 'user123');
    console.log('Treatment:', treatment);
    
    // Apply the treatment in your application
    if (treatment === '') {
      console.log('No treatment allocated for this user');
      // Apply default behavior
    } else {
      // Apply treatment-specific behavior
    }

    // Use the new wrapper function for tracking metrics
    await sdk.trackMetricWithSegment({
      experimentID: 'experiment1',
      stage: Stages.BETA,
      segment: segment,
      treatment: treatment,
      metricName: 'clicks',
      metricValue: 1,
      aggregationType: AggregationTypes.SUM
    });

    // Manually flush metrics
    await sdk.flush();

  } catch (error) {
    console.error('Error:', error);
    // Handle the error or use a default treatment
  }
}

runExperiment();
```

## API Reference

### `new SimpleABSDK(apiURL, apiKey, experiments)`

Creates a new instance of the Simple A/B SDK.

- `apiURL` (string): The URL of the Simple A/B API. You can use the `BaseAPIUrls` object for common API endpoints.
- `apiKey` (string): Your API key for authentication.
- `experiments` (string[]): An array of experiment IDs to preload (optional).

### `BaseAPIUrls`

A class containing static properties for common API URLs:

- `BaseAPIUrls.CAPTCHIFY_NA`: The API URL for the North America region.

### `sdk.getTreatment(experimentID, stage, dimension, allocationKey)`

Gets the treatment for a specific experiment, stage, allocation key, and dimension.

- `experimentID` (string): The ID of the experiment.
- `stage` (string): The stage of the experiment. Use values from the `Stages` class.
- `dimension` (string): The dimension of the experiment.
- `allocationKey` (string): A unique identifier for the user or entity being tested.

Returns a Promise that resolves to the treatment ID (string) or an empty string ('') if no treatment is assigned or no allocation is found.

### `sdk.getTreatmentWithSegment(experimentID, stage, segment, allocationKey)`

Gets the treatment for a specific experiment, stage, segment, and allocation key. This wrapper function automatically determines the appropriate dimension based on the experiment and segment information.

- `experimentID` (string): The ID of the experiment.
- `stage` (string): The stage of the experiment. Use values from the `Stages` class.
- `segment` (Segment): The segment object containing user information.
- `allocationKey` (string): A unique identifier for the user or entity being tested.

Returns a Promise that resolves to the treatment ID (string) or an empty string ('') if no treatment is assigned or no allocation is found.

### `sdk.trackMetric(params)`

Tracks a metric for a specific experiment, stage, dimension, and treatment.

- `params` (object): An object containing the following properties:
  - `experimentID` (string): The ID of the experiment.
  - `stage` (string): The stage of the experiment. Use values from the `Stages` class.
  - `dimension` (string): The dimension of the experiment.
  - `treatment` (string): The treatment group for the experiment. Use values from the `Treatments` class.
  - `metricName` (string): The name of the metric.
  - `metricValue` (number): The value of the metric.
  - `aggregationType` (string): The type of aggregation to use for this metric. Use values from the `AggregationTypes` enum.

Returns a Promise that resolves when the metric has been tracked successfully.

### `sdk.trackMetricWithSegment(params)`

Tracks a metric for a specific experiment, stage, segment, and treatment. This wrapper function automatically determines the appropriate dimension based on the experiment and segment information.

- `params` (object): An object containing the following properties:
  - `experimentID` (string): The ID of the experiment.
  - `stage` (string): The stage of the experiment. Use values from the `Stages` class.
  - `segment` (Segment): The segment object containing user information.
  - `treatment` (string): The treatment group for the experiment. Use values from the `Treatments` class.
  - `metricName` (string): The name of the metric.
  - `metricValue` (number): The value of the metric.
  - `aggregationType` (string): The type of aggregation to use for this metric. Use values from the `AggregationTypes` enum.

Returns a Promise that resolves when the metric has been tracked successfully.

### `sdk.getSegment(options)`

Retrieves segment information based on the provided options. If the optional properties are not provided the api will use the ip and user agent of the caller.

- `options` (object): An object containing the following optional properties:
  - `ip` (string): The IP address of the user.
  - `userAgent` (string): The user agent string of the user's browser.

Returns a Promise that resolves to a Segment object containing the following properties:
- `countryCode` (string): The two-letter country code of the user.
- `region` (string): The region of the user.
- `deviceType` (string): The type of device the user is using.

### `sdk.flush()`

Manually flushes the current metrics buffer to the server. This method can be used to ensure that all tracked metrics are sent to the server immediately, rather than waiting for the automatic flush interval.

Returns a Promise that resolves when all metrics have been successfully sent to the server.

### `sdk.close()`

Closes the SDK instance, flushes any remaining metrics, and clears any running intervals. Call this method when you're done using the SDK to clean up resources.

### `AggregationTypes`

An enum containing the supported aggregation types for metrics:

- `AggregationTypes.SUM`: Sum of all values.
- `AggregationTypes.AVERAGE`: Average of all values.
- `AggregationTypes.PERCENTILE`: Calculates percentiles of the values.

### `Treatments`

An enum containing the supported treatment types:

- `Treatments.NONE`: No treatment (empty string).
- `Treatments.CONTROL`: Control treatment ('C').
- `Treatments.T1` to `Treatments.T255`: Treatment groups ('T1' to 'T255').

### `Stages`

An enum containing common experimental stages:

- `Stages.BETA`: Beta stage.
- `Stages.PROD`: Production stage.

### `Segment`

A class representing segment information:

- `countryCode` (string): The two-letter country code of the user.
- `region` (string): The region of the user.
- `deviceType` (string): The type of device the user is using.

## Best Practices

1. **Initialization**: Initialize the SDK once when your application starts and reuse the instance throughout your app. Use the `BaseAPIUrls` object for common API endpoints.

2. **Error Handling**: Always include error handling when calling `getTreatment()`, `getTreatmentWithSegment()`, `trackMetric()`, `trackMetricWithSegment()`, `getSegment()`, or `flush()` to ensure your application degrades gracefully if the SDK encounters issues.

3. **Caching**: The SDK implements local caching to improve performance. Take advantage of this by using consistent allocation keys for the same user across sessions.

4. **Dimensions**: Use dimensions to create more granular experiments. For example, you could use different dimensions for new users vs. returning users, or use the countryCode from the Segment information.

5. **Preloading**: If you know which experiments you'll be using, preload them during SDK initialization to improve performance.

6. **Cleanup**: Remember to call `sdk.close()` when you're done using the SDK to clean up resources, stop the cache refresh interval, and flush any remaining metrics.

7. **Handling No Allocation**: Always check if the returned treatment is an empty string, which indicates no allocation was found. In this case, apply your default behavior.

8. **Metric Tracking**: Use the `trackMetric()` or `trackMetricWithSegment()` methods to record important user interactions and outcomes. Choose appropriate aggregation types for your metrics to get meaningful insights.

9. **Manual Flushing**: Use the `flush()` method when you need to ensure that all tracked metrics are sent to the server immediately, such as before the user leaves the page or after important events.

10. **Validation**: The SDK performs validation on treatment, stage, and aggregation type. Ensure you use valid values from the respective enums to avoid errors.

11. **Segment Information**: Use the `getSegment()` method to retrieve user segment information for more targeted experiments and metrics tracking. Use the new wrapper functions `getTreatmentWithSegment()` and `trackMetricWithSegment()` for simplified segment-based operations.

## Contributing

We welcome contributions to the Simple A/B SDK! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions about using the Simple A/B SDK, please [open an issue](https://github.com/yourusername/simpleab-sdk-js/issues) on our GitHub repository.