import { TreeNode } from "shared/Tree/tree.types.ts";
import { useState } from "react";
import Tree from 'shared/Tree/index.tsx';
import Arrow from 'assets/arrow.svg?react'

interface INodeProps<T extends Record<string, any>> {
    node: TreeNode<T>;
}

const Node = <T extends Record<string, any>>({ node}: INodeProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="pl-10">
            <div className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-md">
                {node.children && node.children.length > 0 ? (
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
                    >
                        {isOpen ? (
                            <Arrow className='rotate-270'/>
                        ) : (
                            <Arrow/>
                        )}
                    </button>
                ) : (
                    <div className="w-5 h-5 flex items-center justify-center">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    </div>
                )}

                <input
                    type="checkbox"
                    checked={node.isChecked}
                    readOnly
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />

                <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-gray-900 truncate">
                        {node.data.title}
                    </span>
                </div>
            </div>

            {isOpen && node.children && node.children.length > 0 && (
                <div className="mt-1">
                    <Tree data={node.children} />
                </div>
            )}
        </div>
    );
};

export default Node;