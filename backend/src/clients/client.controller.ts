import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ClientService } from "./client.service";
import { CreateClientDto } from "./dto/create-client.dto";

@Controller('clients')
export class ClientController {
    constructor(private readonly clientService: ClientService) { }

    @Post()
    create(@Body() createClientDto: CreateClientDto) {
        return this.clientService.create(createClientDto);
    }

    @Get()
    findAll() {
        return this.clientService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.clientService.findOne(id);
    }


}