const prisma = require('../helper/db');
const { checkPrismaError } = require('../helper/prismaErrors');

class Users{
  // TODO: needs to hash the password using some encryption
  async create({ email, name, password } = createBody){
    try{
      return await prisma.user.create({
        data: {
          email,
          name,
          password_hash: password
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
}

module.exports = new Users();