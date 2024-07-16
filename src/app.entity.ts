// app.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn } from 'typeorm';
import * as moment from 'moment-timezone';

@Entity()
export class RsvpModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @CreateDateColumn({
    type: 'timestamptz'
  })
  registed_at: Date;

}

