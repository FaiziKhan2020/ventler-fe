import ChatMessage from '../components/chat-message/chat-message';

const Container = ({ messages, onOpenReference }) => {
  return (
    <div>
      {messages.map((item, index) => (
        <ChatMessage
          key={index}
          idx={index}
          message={item}
          onOpenReference={onOpenReference}
        />
      ))}
    </div>
  );
};

export default Container;
