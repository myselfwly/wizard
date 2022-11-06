/**
 * 生成检验用户登录信息的SQL语句
 * @param userName 用户名
 * @param password 密码
 * @returns SQL语句
 */
const checkUser = (userName: string, password: string): string => {
  const sql = `SELECT \`userId\` FROM \`app_userInfo\` WHERE \`userName\` = '${userName}' AND \`password\` = '${password}'`;
  return sql;
};

export const auth_center_sql: {
  /**
   * 生成检验用户登录信息的SQL语句
   * @param userName 用户名
   * @param password 密码
   * @returns SQL语句
   */
  checkUser: (userName: string, password: string) => string;
} = { checkUser };
