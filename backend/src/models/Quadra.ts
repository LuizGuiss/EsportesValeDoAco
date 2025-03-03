import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Image from './Image';

//o Entity associa a classe Quadra com a tabela quadras
@Entity('quadras')
export default class Quadra {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    address: string;

    @Column()
    opening_hours: string;

    @Column()
    sports: string;

    @Column()
    tel: string;

    @Column()
    value: string;

    @Column()
    open_on_weekends: boolean;

    @OneToMany(() => Image, image => image.quadra, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'quadra_id' })
    images: Image[];

    @Column()
    accepted: boolean;
}