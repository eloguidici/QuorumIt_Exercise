/**
 * @file Token Service
 * @author Emiliano Loguidici
 * @copyright Last modification date
 */

// Import necessary modules
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenService {
  private readonly secret = 'secretkey';
  private readonly options = { expiresIn: '1d' };

  async createToken(payload: any): Promise<string> {
    try {
      return jwt.sign(payload, this.secret, this.options);
    } catch (error) {
      throw error;
    }
  }

  async validateToken(token: string): Promise<any> {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      throw error;
    }
  }
}
