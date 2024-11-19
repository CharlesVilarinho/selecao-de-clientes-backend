import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'clients', schema: 'teddy' })
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  selecionado: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  salario: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  empresa: number;

  @Column()
  created_user: string;

  @Column()
  updated_user: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
  repository: any;

  async createClient(client: Partial<Client>): Promise<Client> {
    const newClient = this.repository.create(client);
    return await this.repository.save(newClient);
  }

  async updateClient(id: number, client: Partial<Client>): Promise<Client> {
    await this.repository.update(id, client);
    return this.repository.findOneBy({ id });
  }
}
