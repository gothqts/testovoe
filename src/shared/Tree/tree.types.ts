export interface TreeNode<T> {
    id: number;
    data: T;
    isOpen: boolean;
    isFound: boolean;
    children: TreeNode<T>[];
    isChecked: boolean;
}

export interface ITask{
    title: string;
    description: string;
}