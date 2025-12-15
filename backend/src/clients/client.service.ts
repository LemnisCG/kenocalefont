import { Injectable } from "@nestjs/common";
import { CreateClientDto } from "./dto/create-client.dto";
import { Client } from "./entity/client.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,
    ) { }

    create(createClientDto: CreateClientDto) {
        const client = this.clientRepository.create(createClientDto);
        return this.clientRepository.save(client);
    }

    findAll(): Promise<Client[]> {
        return this.clientRepository.find();
    }

    findOne(id: number): Promise<Client | null> {
        return this.clientRepository.findOne({ where: { id } });
    }

}