import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';

@Injectable()
export class ClientsService {
  private readonly logger = new Logger(ClientsService.name);

  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async findAll(filter: { selecionado?: boolean }): Promise<Client[]> {
    try {
      const where =
        filter.selecionado !== undefined
          ? { selecionado: filter.selecionado }
          : {};

      this.logger.error('Where: ', where);
      return this.clientRepository.find({ where });
    } catch (error) {
      this.logger.error('Erro ao buscar clientes', error.stack);
      throw error;
    }
  }

  async updateSelecionado(id: number, selecionado: boolean): Promise<Client> {
    const client = await this.clientRepository.findOneBy({ id });
    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }
    client.selecionado = selecionado;
    return this.clientRepository.save(client);
  }

  async limparSelecionados(ids: number[]): Promise<void> {
    await this.clientRepository.update(ids, { selecionado: false });
  }

  async deleteClient(id: number): Promise<void> {
    await this.clientRepository.delete(id);
  }

  async createClient(client: Partial<Client>): Promise<Client> {
    const newClient = this.clientRepository.create(client);
    return await this.clientRepository.save(newClient);
  }

  async updateClient(id: number, client: Partial<Client>): Promise<Client> {
    await this.clientRepository.update(id, client);
    return this.clientRepository.findOneBy({ id });
  }
}
