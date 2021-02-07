import * as fs from 'fs';
import SSH2Promise = require('ssh2-promise');

export const createScript = (filename: string) => {
  const transfer = fs.readFileSync('./sh/' + filename + '.sh', 'utf-8');
  return transfer;
};

let ssh = void 0;
const sshconfig = {
  host: '192.168.173.1',
  port: 22,
  username: 'gengzi',
  password: 'gengzi456',
};
export const getConnect = () => {
  if (!ssh) {
    ssh = new SSH2Promise(sshconfig);
    ssh.connect();
  }
  return ssh;
};
