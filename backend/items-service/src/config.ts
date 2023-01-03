
const config = {
  SERVER_PORT: process.env.PERSON_SERVER_PORT || 9000,
  URL: process.env.MONGO_DB_URL || "mongodb://localhost:27017",
};

export default config;