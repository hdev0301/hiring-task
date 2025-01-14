import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "./core.entity";  // Assuming CoreEntity contains common fields like createdAt, updatedAt, etc.

@Entity("todo")
export class TodoEntity extends CoreEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ type: "varchar", nullable: false, name: "title" })  // Set custom column name "task_title"
  title: string;  // Title of the Todo, a required string.

  @Column({ type: "varchar", nullable: true, name: "description" })  // Set custom column name "task_description"
  description: string;  // Description of the Todo, an optional string.

  @Column({ type: "boolean", default: false, name: "status" })  // Set custom column name "is_completed"
  status: boolean;  // Status (completed or not), default is 'false' (not completed).

  @Column({ type: "date", nullable: true, name: "due_date" })  // Set custom column name "due_date"
  dueDate: Date | null;  // Due date, an optional Date field.
}
