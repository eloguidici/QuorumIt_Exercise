/**
 * @file Crypto Service
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
  private algorithm = 'aes-256-ctr';
  private password = 'd6F3Efeq';
  private iv = Buffer.alloc(16, 0);

  async encrypt(text: string): Promise<string> {
    try {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(text, saltOrRounds);

      return hash;
    } catch (error) {
      throw error;
    }
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
