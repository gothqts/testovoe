export interface ITask {
    id: number,
    title: string,
    children?: Array<ITask>,
}