const { createClient } = require("redis");
const uuid = require('uuid');

const redisClient = createClient({
  socket: {
    host: 'redis',
    port: 6379,
    reconnectStrategy: (retries) => {
      if (retries > 20) {
        console.log(
          "Too many attempts to reconnect. Redis connection was terminated"
        );
        return new Error("Too many retries.");
      } else {
        return retries * 500;
      }
    },
  },
});

redisClient.on("error", (error) => {
  console.error("Error occurred in Redis client: ", error);
});

const getSession = async (sessionId) => {
  try {
    await redisClient.connect();
    const sessionData = await redisClient.hGetAll(sessionId);
    if (sessionData) {
      return sessionData;
    }
    throw new Error("Session not found!");
  } catch (error) {
    console.log("An error occurred while fetching sessions: ", error);
  } finally {
    await redisClient.quit();
  }
};

const setSession = async (userId) => {
  try {
    await redisClient.connect();
    let sessionId = uuid.v4();
    let existingSessionId = await redisClient.hGetAll(sessionId);
    while (!existingSessionId || existingSessionId.userId !== userId) {
      sessionId = uuid.v4();
      existingSessionId = await redisClient.hGetAll(sessionId);
    }
    const csrfToken = uuid.v5(sessionId, Date.now());
    await redisClient.hSet(sessionId, {
      userId: userId,
      csrfToken: csrfToken,
    });
    return sessionId;
  } catch (error) {
    throw new Error("An error occurred while setting session: ", error);
  } finally {
    await redisClient.quit();
  }
};

exports.getSession = getSession;
exports.setSession = setSession;