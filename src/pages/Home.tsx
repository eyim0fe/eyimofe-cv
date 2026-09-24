import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

export function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ['example'],
    queryFn: async () => {
      // Simulate API call
      return new Promise((resolve) => setTimeout(() => resolve('Hello World!'), 1000))
    },
  })

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <h2 className="text-2xl font-semibold">Welcome to the Boilerplate</h2>
      <p className="text-gray-600">
        Status: {isLoading ? 'Loading query...' : data as string}
      </p>
      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        onClick={() => toast.success('Action successful!')}
      >
        Test Toast
      </button>
    </div>
  )
}
