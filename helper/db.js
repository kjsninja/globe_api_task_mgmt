const { PrismaClient } = require('@prisma/client');
const config = require('../config/config');


const log = ['warn', 'error'];
if(config.isDebug()){
  log.push('query');
  log.push('info');
}

const prisma = new PrismaClient({
  log,
  datasourceUrl: config.DATABASE_URL
})

module.exports = prisma;