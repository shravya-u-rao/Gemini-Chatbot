import { ChatContainer } from './components/chat/ChatContainer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="container mx-auto py-8">
        <ChatContainer />
      </div>
    </div>
  );
}

export default App;