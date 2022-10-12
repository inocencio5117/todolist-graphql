import { Task } from "../entities/Task";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class TaskResolver {
  @Query(() => String)
  hello(): string {
    return "hello world";
  }

  @Query(() => [Task])
  allTasks(): Promise<Task[]> {
    return Task.find({});
  }

  @Query(() => Task, { nullable: true })
  singleTask(
    @Arg("id", () => Int)
    id: number
  ): Promise<Task | null> {
    return Task.findOne({ id });
  }

  @Mutation(() => Task)
  async createTask(
    @Arg("title", () => String)
    title: string
  ): Promise<Task> {
    return await Task.create({ title, isComplete: false }).save();
  }

  @Mutation(() => Boolean)
  deleteTask(
    @Arg("id", () => Int)
    id: number
  ): boolean {
    try {
      Task.delete({ id });
      return true;
    } catch (err) {
      return false;
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  updateTask(
    @Arg("id", () => Int)
    id: number,
    @Arg("isComplete", () => Boolean)
    isComplete: boolean
  ): boolean | null {
    const task = Task.findOne({ id });
    if (!task) {
      return null;
    }

    try {
      Task.update({ id }, { isComplete });
      return true;
    } catch (err) {
      return false;
    }
  }
}
