import mysql, { QueryOptions } from 'mysql';
import { connInfo } from './config';
const conn = mysql.createPool({
  ...connInfo,
  multipleStatements: true
});
const appQuery = function <T>(sql: string | QueryOptions, values?: any): Promise<T> {
  return new Promise((resolve, reject) => {
    conn.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, function (err, results) {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      }
      connection.release(); // 释放连接资源 | 跟 connection.destroy() 不同，它是销毁
    });
  });
};
// conn.query = query as unknown as QueryFunction;
export { appQuery };
