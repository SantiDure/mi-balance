import { compareSync, genSaltSync, hashSync } from "bcrypt";

export function hashear(password) {
    return hashSync(password, genSaltSync(10));
  }
  
  export function hashCompare(received, almacened) {
    return compareSync(received, almacened);
  }