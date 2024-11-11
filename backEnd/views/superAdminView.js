
export class superAdminView {
    static formatUserResponse(user) {
      return {
        success: true,
        user: {
          uid: user.uid,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
        },
      };
    }
  
    static formatError(message) {
      return {
        success: false,
        message,
      };
    }
  }
  