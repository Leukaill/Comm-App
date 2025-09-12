import BottomNavigation from '../BottomNavigation';
import { useState } from 'react';

export default function BottomNavigationExample() {
  const [activeTab, setActiveTab] = useState("home");
  
  return (
    <div className="relative h-96 bg-background">
      <div className="p-4">
        <p className="text-muted-foreground">Current tab: {activeTab}</p>
      </div>
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}