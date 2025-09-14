import { createBrowserRouter } from 'react-router'
import urls from 'navigation/app.urls.ts'
import Main from 'screens/Main'
import TaskContent from 'screens/Main/pages/TaskContent'


const appRouter = createBrowserRouter([
    {
      path: urls.main,
      Component: Main,
      children: [
        {
          index: true,
          Component: TaskContent,
        },
      ],

    },
  ],
)
export default appRouter