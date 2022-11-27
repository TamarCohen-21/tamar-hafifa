export const SERVER_URL = process.env.SERVER_URL || "http://localhost";
export const ITEMS_SERVER_PORT = process.env.ITEMS_SERVER_PORT || 9000;
export const ORDERS_SERVER_PORT = process.env.ORDERS_SERVER_PORT || 5000;
const ITEMS_SERVER_URL = process.env.ITEMS_SERVER_URL || "http://localhost";
const ORDERS_SERVER_URL = process.env.ORDERS_SERVER_URL || "http://localhost";

export const config = {
  SERVER_PORT: process.env.COMPOSITOR_SERVER_PORT || 8000,
  ITEMS_TARGET_URL: `${ITEMS_SERVER_URL}:${ITEMS_SERVER_PORT}`,
  ORDERS_TARGET_URL: `${ORDERS_SERVER_URL}:${ORDERS_SERVER_PORT}`,
};
