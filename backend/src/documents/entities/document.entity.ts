import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Document {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    clientName: string;

    @Column()
    clientEmail: string;

    @Column('text')
    serviceDescription: string;

    @Column('decimal')
    price: number;

    @CreateDateColumn()
    createdAt: Date;

    // We won't store the binary PDF in DB to keep it light.
    // Ideally, store it in S3/disk and save the path here.
    // For this MVP, we might regenerate it on fly or save to local disk.
    @Column({ nullable: true })
    filePath: string;
}
