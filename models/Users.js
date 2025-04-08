const prisma = require('../helper/db');
const { checkPrismaError } = require('../helper/prismaErrors');
const { syncGeneratePassword, syncValidatePassword } = require('../helper/password')
const jwt = require('../helper/jwt');
class Users{
  async create({ email, name, password } = createBody){
    try{
      return await prisma.user.create({
        data: {
          email,
          name,
          password_hash: syncGeneratePassword(password)
        }
      })
    }catch(e){
      return checkPrismaError(e);
    }
  }

  async updateUser(id, {name}= updateBody) {
    try{
      return await prisma.user.update({
        where: {
          id
        },
        data: {
          name,
        }
      })
    }catch(e){
      return checkPrismaError(e);
    }
  }

  async getUserById(id){
    return await prisma.user.findFirstOrThrow({
      where: {
        id
      }
    })
  }

  async deleteUserById(id){
    try{
      return await prisma.user.delete({
        where: {
          id
        }
      });
    }catch(e){
      return checkPrismaError(e);
    }
  }

  // USER SESSIONS

  async getAllUserSessions(owner){
    return await prisma.userSession.findMany({
      where: {
        owner
      }
    })
  }

  async getUserSessionById(sessionId){
    try{
      const user = await prisma.userSession.findFirstOrThrow({
        where: {
          id: sessionId
        }
      })
      const userDetails = await this.getUserById(user.owner);
      return {
        id: userDetails.id,
        email: userDetails.email,
        name: userDetails.name
      }
    }catch(e){
      return checkPrismaError(e);
    }
  }

  async getUserSessionByIdAndOwner(sessionId, owner){
    try{
      const session = await prisma.userSession.findFirstOrThrow({
        where: {
          id: sessionId,
          owner
        }
      })
      delete session.owner;
      session.metadata = JSON.parse(session.metadata);
      return session
    }catch(e){
      return checkPrismaError(e);
    }
  }

  async deleteUserSessionById(sessionId, owner){
    try{
      const session = await prisma.userSession.delete({
        where: {
          id: sessionId,
          owner
        }
      });
      delete session.owner;
      session.metadata = JSON.parse(session.metadata);
      return session;
    }catch(e){
      return checkPrismaError(e);
    }
  }

  async getUserByEmailPassword({ email, password } = findBody, userAgent = ''){
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    })
    // if user found
    if(user){
      // check if password is correct
      if(syncValidatePassword(password, user.password_hash)){

        // create session in db
        const userSession = await prisma.userSession.create({
          data: {
            owner: user.id,
            metadata: JSON.stringify({
              agent: userAgent
            })
          }
        })
        // return the jwt token
        return jwt.generate({
          id: userSession.id
        }, 3600)
      }
    }else {
      return null
    }
  }
}

module.exports = new Users();