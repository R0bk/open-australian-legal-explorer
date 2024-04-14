"use client"

import { Book, EggFried, MessagesSquare } from "lucide-react";

import ChatSection from "./chat-section";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable"
import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "./ui/select"
import { jurisdictions, types, sources } from './domain-constants';
import { cn } from'./ui/lib/utils';

const Selector = ({ label, items, onSelection }: {
  label: string;
  items: { value: string; label: string }[];
  onSelection: (value: string) => void;
}) => (
  <Select onValueChange={onSelection} defaultValue="all">
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder={`Select a ${label.toLowerCase()}`} />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>{label}</SelectLabel>
        {items.map((x) => (
          <SelectItem key={x.value} value={x.value}>
            {x.label}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);

const styles = {
  navContainer: "mt-2 grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2",
  navHeadingContainer: "flex flex-col items-start justify-between space-y-2 py-4 px-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16",
  navHeader: "text-lg font-semibold",
  navButton: "inline-flex items-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 justify-start",
  navButtonActive: "bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white hover:text-white",

  navButtonIcon: "size-4 mr-3",
  navHeadingIcon: "size-6 mr-3",
  keepLeft: "ml-auto flex space-x-2 sm:justify-end",
  hr: "shrink-0 bg-border h-[1px] w-full",
}


export default function Playground() {
  const [activeTab, setTab] = useState<'chat' | 'similarity'>('chat')
  const [jurisdiction, setJurisdiction] = useState('')
  const [type, setType] = useState('')
  const [source, setSource] = useState('')

  const tabs = {
    chat: <ChatSection api='chat' jurisdiction={jurisdiction} type={type} source={source} />,
    similarity: <ChatSection api='similarity' jurisdiction={jurisdiction} type={type} source={source} />
  }
  
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel collapsedSize={5} collapsible={true} defaultSize={20} maxSize={20} minSize={5}>
        <div className={styles.navHeadingContainer}>
          <EggFried className={styles.navHeadingIcon} />
          <h2 className={styles.navHeader}>Playground</h2>
          <div className={styles.keepLeft}></div>
        </div>
        <div data-orientation="horizontal" role="none" className={styles.hr}></div>

        <nav className={styles.navContainer}>
          <a
            className={cn(styles.navButton, { [styles.navButtonActive]: activeTab === 'chat' })}
            onClick={() => setTab('chat')}
          >
            <MessagesSquare className={styles.navButtonIcon} />Document Chat
          </a>
          <a
            className={cn(styles.navButton, { [styles.navButtonActive]: activeTab === 'similarity' })}
            onClick={() => setTab('similarity')}
          >
            <Book className={styles.navButtonIcon} />Similarity Search
          </a>
        </nav>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={80}>
        <div className={styles.navHeadingContainer}>
          <h2 className={styles.navHeader}>Playground</h2>
          <div className={styles.keepLeft}>
            <Selector label="Jurisdiction" items={jurisdictions} onSelection={setJurisdiction} />
            <Selector label="Type" items={types} onSelection={setType} />
            <Selector label="Source" items={sources} onSelection={setSource} />
          </div>
        </div>
        <div data-orientation="horizontal" role="none" className={styles.hr}></div>
        {tabs[activeTab]}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}