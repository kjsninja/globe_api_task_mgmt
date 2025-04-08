const { PrismaClient } = require('@prisma/client');
const config = require('../config');


const log = ['warn'];
if(config.isDebug()){
  log.push('query');
  log.push('info');
  log.push('error');
}

const prisma = new PrismaClient({
  log,
  datasourceUrl: config.DATABASE_URL
})

module.exports = prisma;