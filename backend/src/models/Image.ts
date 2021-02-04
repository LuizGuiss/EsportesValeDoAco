import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Quadra from './Quadra';

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(() => Quadra, quadra => quadra.images)
    @JoinColumn({ name: 'quadra_id' })
    quadra: Quadra;
}