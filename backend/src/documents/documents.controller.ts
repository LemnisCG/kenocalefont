import { Controller, Get, Post, Body, Param, Res, NotFoundException } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import type { Response } from 'express';

@Controller('documents')
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) { }

    @Post()
    create(@Body() createDocumentDto: CreateDocumentDto) {
        return this.documentsService.create(createDocumentDto);
    }

    @Get()
    findAll() {
        return this.documentsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.documentsService.findOne(id);
    }

    @Get(':id/download')
    async downloadPdf(@Param('id') id: string, @Res() res: Response) {
        try {
            const pdfBuffer = await this.documentsService.generatePdf(id);

            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=document-${id}.pdf`,
                'Content-Length': pdfBuffer.length,
            });

            res.end(pdfBuffer);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw error;
        }
    }
}
