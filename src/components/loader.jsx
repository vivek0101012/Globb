const Loader = () => {
    return (
      <div className="flex justify-center items-center space-x-2 mt-4">
        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></span>
        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
      </div>
    );
  };
  
  export default Loader;
  