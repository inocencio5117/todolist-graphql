import { ObjectType, Field, Int } from "type-graphql";
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @CreateDateColumn()
  @Field(() => String)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => String)
  updatedAt: Date;

  @CreateDateColumn()
  @Field(() => String)
  title: string;

  @CreateDateColumn()
  @Field(() => Boolean)
  isComplete: boolean;
}
