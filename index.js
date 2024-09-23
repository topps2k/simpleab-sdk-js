const { SimpleABSDK, BaseAPIUrls, AggregationTypes, Treatments, Stages } = require('./simpleab-sdk');

// If we're in a browser environment, add SimpleABSDK to the window object
if (typeof window !== 'undefined')
{
    window.SimpleABSDK = SimpleABSDK;
    window.BaseAPIUrls = BaseAPIUrls;
    window.AggregationTypes = AggregationTypes;
    window.Treatments = Treatments;
    window.Stages = Stages;
}

module.exports = {
    SimpleABSDK,
    BaseAPIUrls,
    AggregationTypes,
    Treatments,
    Stages
};