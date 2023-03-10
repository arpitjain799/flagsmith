module.exports = (envId, { LIB_NAME, LIB_NAME_JAVA, FEATURE_NAME, FEATURE_NAME_ALT }, customFeature) => `${LIB_NAME_JAVA} ${LIB_NAME} = ${LIB_NAME_JAVA}
    .newBuilder()
    .setApiKey("${envId}")
    .build();

Flags flags = flagsmith.getEnvironmentFlags();

// Check for a feature
boolean isEnabled = flags.isFeatureEnabled("${customFeature || FEATURE_NAME}");

// Or, use the value of a feature
Object featureValue = flags.GetFeatureValue("${customFeature || FEATURE_NAME_ALT}");
`;
