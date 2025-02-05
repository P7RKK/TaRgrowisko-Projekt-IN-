const cron = require('node-cron');
const UserLog = require('../models/UserLog');

const cleanLogs = async () => {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const result = await UserLog.deleteMany({ timestamp: { $lte: oneYearAgo } });
  console.log(`Usunięto ${result.deletedCount} starych logów.`);
};

// Zaplanowanie zadania
cron.schedule('0 0 * * 0', cleanLogs); // Raz w tygodniu, w niedzielę o północy
