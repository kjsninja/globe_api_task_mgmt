const checkPrismaError = function(error){
  switch(error.code){
    case "P2002":
      return {
        error: {
          message: "Duplicate record error.",
          field: error.meta.target
        }
      }
    case "P2025":
      return {
        error: {
          message: error.meta.cause
        }
      }
    default:
      return {
        error: {
          message: "There is problem with your request.",
          field: error.meta.target
        }
      }
  }
}

module.exports = {
  checkPrismaError
}