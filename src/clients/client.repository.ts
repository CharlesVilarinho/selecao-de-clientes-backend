import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from '../entities/client.entity';

@Injectable()
export class ClientRepository {
  constructor(
    @InjectRepository(Client)
    private readonly repository: Repository<Client>,
  ) {}

  async createClient(client: Partial<Client>): Promise<Client> {
    const newClient = this.repository.create(client);
    return await this.repository.save(newClient);
  }

  async updateClient(id: number, client: Partial<Client>): Promise<Client> {
    await this.repository.update(id, client);
    return this.repository.findOneBy({ id });
  }
}
