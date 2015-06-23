module.exports = {
 db: process.env.MONGO_DB || process.env.MONGOHQ_URL,
 sessionSecret: process.env.SESSION_SECRET
};