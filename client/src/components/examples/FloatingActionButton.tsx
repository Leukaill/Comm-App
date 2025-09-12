import FloatingActionButton from '../FloatingActionButton';

export default function FloatingActionButtonExample() {
  return (
    <div className="relative h-96 bg-background p-4">
      <p className="text-muted-foreground">
        Floating action buttons for different sections:
      </p>
      
      <FloatingActionButton 
        type="post" 
        onClick={() => {}} 
        className="bottom-4 right-4"
      />
      
      <FloatingActionButton 
        type="note" 
        onClick={() => {}} 
        className="bottom-4 right-20"
      />
      
      <FloatingActionButton 
        type="message" 
        onClick={() => {}} 
        className="bottom-4 right-36"
      />
    </div>
  );
}