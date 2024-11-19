import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Client } from '../entities/client.entity';
import { Query } from '@nestjs/common';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get('all')
  findAll(): Promise<Client[]> {
    console.log('Buscando todos os clientes... findAll');
    return this.clientsService.findAll({});
  }

  @Get()
  async getClients(
    @Query('selecionado') selecionado?: boolean,
  ): Promise<Client[]> {
    console.log('Buscando todos os clientes... getClients');
    return this.clientsService.findAll({ selecionado });
  }

  @Post()
  async createClient(@Body() client: Partial<Client>): Promise<Client> {
    return this.clientsService.createClient(client);
  }

  @Put(':id')
  async updateClient(
    @Param('id') id: number,
    @Body() client: Partial<Client>,
  ): Promise<Client> {
    return this.clientsService.updateClient(id, client);
  }

  @Patch(':id/selecionar')
  async selecionarCliente(
    @Param('id') id: string,
    @Body('selecionado') selecionado: boolean,
  ): Promise<Client> {
    if (selecionado === undefined) {
      throw new BadRequestException('O campo "selecionado" é obrigatório.');
    }
    console.log(selecionado);
    return this.clientsService.updateSelecionado(+id, selecionado);
  }

  @Post('limpar-selecionados')
  async limparSelecionados(@Body('ids') ids: number[]): Promise<void> {
    if (!ids || ids.length === 0) {
      throw new BadRequestException('Nenhum cliente para limpar.');
    }
    await this.clientsService.limparSelecionados(ids);
  }

  @Delete(':id')
  async deleteClient(@Param('id') id: number): Promise<{ message: string }> {
    await this.clientsService.deleteClient(id);
    return { message: `Client with ID ${id} deleted successfully` };
  }
}
