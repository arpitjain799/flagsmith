import Utils from 'common/utils/utils';

module.exports = () => `// Maven
${Utils.escapeHtml('<dependency>')}
${Utils.escapeHtml('<groupId>com.flagsmith</groupId>')}
${Utils.escapeHtml('<artifactId>flagsmith-java-client</artifactId>')}
${Utils.escapeHtml('<version>5.0.0/version>')}
</dependency>

// Gradle
implementation 'com.flagsmith:flagsmith-java-client:5.0.0'
`;
