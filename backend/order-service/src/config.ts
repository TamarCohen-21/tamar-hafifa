const config = {
  SERVER_PORT: process.env.ORDERS_SERVER_PORT || 5000,
  URL: process.env.MONGO_DB_URL || "mongodb://localhost:27017/superMarket",
};

export default config;
