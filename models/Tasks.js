const prisma = require('../helper/db');
const { checkPrismaError } = require('../helper/prismaErrors');

class Tasks{
  
  async create({ title, content, owner } = createBody){
    try{
      return await prisma.task.create({
        data: {
          title,
          content,
          owner
        }
      })
    }catch(e){
      return checkPrismaError(e);
    }
  }

  async updateTaskStatus(id, owner, status){
    try{
      return await prisma.task.update({
        where: {
          id,
          owner
        },
        data: {
          status
        }
      })
    }catch(e){
      return checkPrismaError(e);
    }
  }

  async updateTask(id, owner, {title, content, status}= updateBody) {
    try{
      return await prisma.task.update({
        where: {
          id,
          owner
        },
        data: {
          title,
          content,
          status
        }
      })
    }catch(e){
      return checkPrismaError(e);
    }
  }

  async getTaskById(id, owner){
    return await prisma.task.findFirst({
      where: {
        id,
        owner
      }
    })
  }

  async getAllTaskByOwner(owner){
    return await prisma.task.findMany({
      orderBy: {
        updatedAt: 'desc'
      },
      where: {
        owner
      }
    })
  }

  async deleteTaskById(id, owner){
    try{
      return await prisma.task.delete({
        where: {
          id,
          owner
        }
      });
    }catch(e){
      return checkPrismaError(e);
    }
  }
}

module.exports = new Tasks();