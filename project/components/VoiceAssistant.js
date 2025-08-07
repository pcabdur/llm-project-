function VoiceAssistant({ isActive, onClose }) {
  try {
    const [isListening, setIsListening] = React.useState(false);
    const [transcript, setTranscript] = React.useState('');
    const [response, setResponse] = React.useState('');
    const [isProcessing, setIsProcessing] = React.useState(false);

    React.useEffect(() => {
      if (isActive) {
        setTranscript('');
        setResponse('');
        setIsProcessing(false);
      }
    }, [isActive]);

    const startListening = () => {
      setIsListening(true);
      setTranscript('');
      setResponse('');
      
      // Simulate voice recognition
      setTimeout(() => {
        const sampleCommands = [
          "Order 2 Masala Dosas from Saravana Bhavan",
          "I want Chicken Biryani",
          "Show me vegetarian options",
          "Add Pani Puri to my cart"
        ];
        
        const randomCommand = sampleCommands[Math.floor(Math.random() * sampleCommands.length)];
        setTranscript(randomCommand);
        setIsListening(false);
        processVoiceCommand(randomCommand);
      }, 3000);
    };

    const processVoiceCommand = async (command) => {
      setIsProcessing(true);
      
      // Simulate AI processing
      setTimeout(() => {
        let aiResponse = '';
        
        if (command.toLowerCase().includes('dosa')) {
          aiResponse = "Great choice! I found Masala Dosa from Saravana Bhavan for ₹120. Would you like me to add it to your cart?";
        } else if (command.toLowerCase().includes('biryani')) {
          aiResponse = "Perfect! Our Chicken Biryani from Hyderabad House is very popular. It's ₹280. Shall I add it to your cart?";
        } else if (command.toLowerCase().includes('vegetarian')) {
          aiResponse = "Here are some great vegetarian options: Masala Dosa, Pani Puri, and Veg Biryani. Which one interests you?";
        } else {
          aiResponse = "I understand you want to order food. Let me show you our popular items. What type of cuisine are you in the mood for?";
        }
        
        setResponse(aiResponse);
        setIsProcessing(false);
      }, 2000);
    };

    const stopListening = () => {
      setIsListening(false);
    };

    if (!isActive) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" data-name="voice-assistant" data-file="components/VoiceAssistant.js">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-[var(--forest-green)]">Voice Assistant</h3>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="icon-x text-xl text-gray-600"></div>
            </button>
          </div>

          {/* Voice Animation */}
          <div className="text-center mb-8">
            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
              isListening 
                ? 'bg-gradient-to-r from-[var(--saffron)] to-[var(--spice-red)] animate-pulse' 
                : 'bg-gray-100'
            }`}>
              <div className={`icon-mic text-3xl ${isListening ? 'text-white' : 'text-gray-400'}`}></div>
            </div>
            
            <p className="text-gray-600 mt-4">
              {isListening ? 'Listening... Speak now!' : 'Tap the microphone to start'}
            </p>
          </div>

          {/* Transcript Display */}
          {transcript && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">You said:</h4>
              <p className="text-gray-700">{transcript}</p>
            </div>
          )}

          {/* AI Response */}
          {response && (
            <div className="mb-6 p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">SpiceVoice Assistant:</h4>
              <p className="text-gray-700">{response}</p>
            </div>
          )}

          {/* Processing State */}
          {isProcessing && (
            <div className="mb-6 p-4 bg-orange-50 rounded-lg text-center">
              <div className="inline-flex items-center space-x-2">
                <div className="w-4 h-4 bg-[var(--saffron)] rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-[var(--saffron)] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-4 h-4 bg-[var(--saffron)] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              <p className="text-gray-600 mt-2">Processing your request...</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            {!isListening && !isProcessing ? (
              <button 
                onClick={startListening}
                className="flex-1 btn-primary"
              >
                <div className="flex items-center justify-center space-x-2">
                  <div className="icon-mic text-lg"></div>
                  <span>Start Listening</span>
                </div>
              </button>
            ) : (
              <button 
                onClick={stopListening}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                disabled={isProcessing}
              >
                <div className="flex items-center justify-center space-x-2">
                  <div className="icon-square text-lg"></div>
                  <span>Stop</span>
                </div>
              </button>
            )}
          </div>

          {/* Quick Commands */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-3">Try saying:</h4>
            <div className="space-y-2">
              {[
                "Order 2 Masala Dosas",
                "Show me biryani options", 
                "Add Pani Puri to cart",
                "What's popular today?"
              ].map((command, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setTranscript(command);
                    processVoiceCommand(command);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  "{command}"
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('VoiceAssistant component error:', error);
    return null;
  }
}
