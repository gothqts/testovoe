import { TreeNode } from "shared/Tree/tree.types.ts";
import Node from './Components/Node';

interface ITreeProps<T extends Record<string, any>> {
    data: TreeNode<T>[];
}

const Tree = <T extends Record<string, any>>({ data }: ITreeProps<T>) => {
    return (
        <div className='m-0 p-0 list-none'>
            {data.map(node => (
                <Node key={node.id} node={node} />
            ))}
        </div>
    );
};

export default Tree;