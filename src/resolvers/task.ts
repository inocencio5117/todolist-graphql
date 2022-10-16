import { TaskEntity } from "../entities/TaskEntity";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class TaskResolver {
  @Query(() => String)
  hello(): string {
    return "hello world";
  }

  @Query(() => [TaskEntity])
  allTaskEntitys(): Promise<TaskEntity[]> {
    return TaskEntity.find({});
  }

  @Query(() => TaskEntity, { nullable: true })
  singleTaskEntity(
    @Arg("id", () => Int)
    id: number
  ): Promise<TaskEntity | null> {
    return TaskEntity.findOne({ id });
  }

  @Mutation(() => TaskEntity)
  async createTaskEntity(
    @Arg("title", () => String)
    title: string
  ): Promise<TaskEntity> {
    return await TaskEntity.create({ title, isComplete: false }).save();
  }

  @Mutation(() => Boolean)
  deleteTaskEntity(
    @Arg("id", () => Int)
    id: number
  ): boolean {
    try {
      TaskEntity.delete({ id });
      return true;
    } catch (err) {
      return false;
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  updateTaskEntity(
    @Arg("id", () => Int)
    id: number,
    @Arg("isComplete", () => Boolean)
    isComplete: boolean
  ): boolean | null {
    const task = TaskEntity.findOne({ id });
    if (!task) {
      return null;
    }

    try {
      TaskEntity.update({ id }, { isComplete });
      return true;
    } catch (err) {
      return false;
    }
  }
}
