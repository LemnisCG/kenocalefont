import { IsString, IsEmail, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateDocumentDto {
    @IsString()
    @IsNotEmpty()
    clientName: string;

    @IsEmail()
    @IsNotEmpty()
    clientEmail: string;

    @IsString()
    @IsNotEmpty()
    serviceDescription: string;

    @IsNumber()
    @Min(0)
    price: number;
}
