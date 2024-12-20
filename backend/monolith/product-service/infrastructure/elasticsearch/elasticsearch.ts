// elasticsearchClient.js
import { Client } from '@elastic/elasticsearch';

// Initialize the Elasticsearch client
const elasticsearchClient = new Client({
  node: 'http://localhost:9200',  // Elasticsearch service running in Docker container
  auth: {
    username: 'elastic', // Default username for the Bitnami Elasticsearch image
    password: 'elastictestnewmindai', // Password from Docker Compose
  },
});

// Export the client so you can use it in other parts of your app
export default elasticsearchClient;
