import {Outlet} from "react-router";
import Tree from "shared/Tree";
import {ITask, TreeNode} from "shared/Tree/tree.types.ts";

const Main = () => {
    const generateTasksTree = (): TreeNode<ITask>[] => {
        return [
            {
                id: 1,
                data: {
                    title: "Задача 1",
                    description: "Основная задача по разработке"
                },
                isOpen: false,
                isFound: false,
                isChecked: false,
                children: [
                    {
                        id: 2,
                        data: {
                            title: "Задача 1.1",
                            description: "Задачи по фронтенд части"
                        },
                        isOpen: false,
                        isFound: false,
                        isChecked: false,
                        children: [
                            {
                                id: 3,
                                data: {
                                    title: "Задача 1.1.1",
                                    description: "Создание новой главной страницы"
                                },
                                isOpen: false,
                                isFound: false,
                                isChecked: false,
                                children: [
                                    {
                                        id: 4,
                                        data: {
                                            title: "Задача 1.1.1.1",
                                            description: "HTML/CSS верстка основной структуры"
                                        },
                                        isOpen: false,
                                        isFound: false,
                                        isChecked: false,
                                        children: []
                                    },
                                    {
                                        id: 5,
                                        data: {
                                            title: "Задача 1.1.1.2",
                                            description: "Настройка адаптивности под мобильные устройства"
                                        },
                                        isOpen: false,
                                        isFound: false,
                                        isChecked: false,
                                        children: []
                                    }
                                ]
                            },
                            {
                                id: 6,
                                data: {
                                    title: "Задача 1.1.2",
                                    description: "Настройка взаимодействия с бэкенд API"
                                },
                                isOpen: false,
                                isFound: false,
                                isChecked: false,
                                children: []
                            }
                        ]
                    },
                    {
                        id: 7,
                        data: {
                            title: "Задача 1.2",
                            description: "Задачи по бэкенд части"
                        },
                        isOpen: false,
                        isFound: false,
                        isChecked: false,
                        children: [
                            {
                                id: 8,
                                data: {
                                    title: "Задача 1.2.1",
                                    description: "Создание RESTful API"
                                },
                                isOpen: false,
                                isFound: false,
                                isChecked: false,
                                children: [
                                    {
                                        id: 9,
                                        data: {
                                            title: "Задача 1.2.1.1",
                                            description: "Создание API endpoints"
                                        },
                                        isOpen: false,
                                        isFound: false,
                                        isChecked: false,
                                        children: []
                                    },
                                    {
                                        id: 10,
                                        data: {
                                            title: "Задача 1.2.1.2",
                                            description: "Настройка промежуточного ПО"
                                        },
                                        isOpen: false,
                                        isFound: false,
                                        isChecked: false,
                                        children: []
                                    }
                                ]
                            },
                            {
                                id: 11,
                                data: {
                                    title: "Задача 1.2.2",
                                    description: "Работа с базой данных"
                                },
                                isOpen: false,
                                isFound: false,
                                isChecked: false,
                                children: []
                            }
                        ]
                    }
                ]
            },
            {
                id: 12,
                data: {
                    title: "Задача 2",
                    description: "Задачи по тестированию"
                },
                isOpen: false,
                isFound: false,
                isChecked: false,
                children: [
                    {
                        id: 13,
                        data: {
                            title: "Задача 2.1",
                            description: "Модульное тестирование"
                        },
                        isOpen: false,
                        isFound: false,
                        isChecked: false,
                        children: [
                            {
                                id: 14,
                                data: {
                                    title: "Задача 2.1.1",
                                    description: "Тесты бизнес-логики"
                                },
                                isOpen: false,
                                isFound: false,
                                isChecked: false,
                                children: []
                            },
                            {
                                id: 15,
                                data: {
                                    title: "Задача 2.1.2",
                                    description: "Тесты UI компонентов"
                                },
                                isOpen: false,
                                isFound: false,
                                isChecked: false,
                                children: []
                            }
                        ]
                    },
                    {
                        id: 16,
                        data: {
                            title: "Задача 2.2",
                            description: "Тестирование взаимодействия"
                        },
                        isOpen: false,
                        isFound: false,
                        isChecked: false,
                        children: []
                    }
                ]
            },
            {
                id: 17,
                data: {
                    title: "Задача 3",
                    description: "Задачи по документации"
                },
                isOpen: false,
                isFound: false,
                isChecked: false,
                children: [
                    {
                        id: 18,
                        data: {
                            title: "Задача 3.1",
                            description: "Документация для разработчиков"
                        },
                        isOpen: false,
                        isFound: false,
                        isChecked: false,
                        children: []
                    },
                    {
                        id: 19,
                        data: {
                            title: "Задача 3.2",
                            description: "Руководство для пользователей"
                        },
                        isOpen: false,
                        isFound: false,
                        isChecked: false,
                        children: []
                    }
                ]
            }
        ];
    };

    return (
        <div className="h-screen flex">
            <div className="flex-1 p-[36px]" >
                <input placeholder='Поиск'/>
                <Tree
                    data={generateTasksTree()}
                />
            </div>
            <Outlet/>
        </div>
    );
};

export default Main;