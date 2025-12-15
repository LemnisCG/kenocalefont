import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const PDFDocument = require('pdfkit');

@Injectable()
export class DocumentsService {
    constructor(
        @InjectRepository(Document)
        private readonly documentRepository: Repository<Document>,
    ) { }

    async create(createDocumentDto: CreateDocumentDto): Promise<Document> {
        const doc = this.documentRepository.create(createDocumentDto);
        return this.documentRepository.save(doc);
    }

    async findAll(): Promise<Document[]> {
        return this.documentRepository.find({ order: { createdAt: 'DESC' } });
    }

    async findOne(id: string): Promise<Document> {
        const doc = await this.documentRepository.findOneBy({ id });
        if (!doc) {
            throw new NotFoundException(`Document with ID ${id} not found`);
        }
        return doc;
    }

    async generatePdf(id: string): Promise<Buffer> {
        const docEntity = await this.findOne(id);

        return new Promise((resolve) => {
            const pdf = new PDFDocument();
            const buffers: Buffer[] = [];

            pdf.on('data', (buffer) => buffers.push(buffer));
            pdf.on('end', () => resolve(Buffer.concat(buffers)));

            // PDF Content
            pdf.fontSize(25).text('Comprobante de Servicio', { align: 'center' });
            pdf.moveDown();

            pdf.fontSize(14).text(`Cliente: ${docEntity.clientName}`);
            pdf.text(`Email: ${docEntity.clientEmail}`);
            pdf.moveDown();

            pdf.text(`Descripción del Servicio:`);
            pdf.text(docEntity.serviceDescription);
            pdf.moveDown();

            pdf.fontSize(20).text(`Total: $${docEntity.price}`, { align: 'right' });

            pdf.end();
        });
    }
}
