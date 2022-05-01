
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions"
});