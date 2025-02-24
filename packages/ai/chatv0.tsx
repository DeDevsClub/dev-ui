'use client';

import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
// import { useAutoResizeTextarea } from '@/hooks/use-auto-resize-textarea';
import {
  ImageIcon,
  FileUp,
  Figma,
  MonitorIcon,
  CircleUserRound,
  ArrowUpIcon,
  Paperclip,
  PlusIcon,
} from 'lucide-react';

interface UseAutoResizeTextareaProps {
  minHeight: number;
  maxHeight?: number;
}

function useAutoResizeTextarea({
  minHeight,
  maxHeight,
}: UseAutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }

      // Temporarily shrink to get the right scrollHeight
      textarea.style.height = `${minHeight}px`;

      // Calculate new height
      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY)
      );

      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight]
  );

  useEffect(() => {
    // Set initial height
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${minHeight}px`;
    }
  }, [minHeight]);

  // Adjust height on window resize
  useEffect(() => {
    const handleResize = () => adjustHeight();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [adjustHeight]);

  return { textareaRef, adjustHeight };
}

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
}

export interface ChatV0Props {
  className?: string;
  onMessage?: (message: Message) => void;
  onMessageError?: (error: Error) => void;
  onMessageStart?: () => void;
  onMessageEnd?: () => void;
  placeholder?: string;
  minHeight?: number;
  maxHeight?: number;
  actionButtons?: ActionButtonProps[];
  sendButtonLabel?: string;
  attachButtonLabel?: string;
  projectButtonLabel?: string;
}

export const ChatV0 = ({
  className,
  onMessage,
  onMessageError,
  onMessageStart,
  onMessageEnd,
  placeholder = 'Ask v0 a question...',
  minHeight = 60,
  maxHeight = 200,
  actionButtons = [
    { icon: <ImageIcon className="w-4 h-4" />, label: 'Clone a Screenshot' },
    { icon: <Figma className="w-4 h-4" />, label: 'Import from Figma' },
    { icon: <FileUp className="w-4 h-4" />, label: 'Upload a Project' },
    { icon: <MonitorIcon className="w-4 h-4" />, label: 'Landing Page' },
    { icon: <CircleUserRound className="w-4 h-4" />, label: 'Sign Up Form' },
  ],
  sendButtonLabel = 'Send',
  attachButtonLabel = 'Attach',
  projectButtonLabel = 'Project',
}: ChatV0Props) => {
  const [value, setValue] = useState('');
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight,
    maxHeight,
  });

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        setValue('');
        adjustHeight(true);
      }
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center w-full max-w-4xl mx-auto p-4 space-y-4 sm:space-y-8',
        className
      )}
    >
      <h1 className="text-2xl sm:text-4xl font-bold text-white dark:text-white text-center">
        What can I help you ship?
      </h1>

      <div className="w-full">
        <div className="relative bg-neutral-900 rounded-xl border border-neutral-800">
          <div className="overflow-y-auto">
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                adjustHeight();
              }}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={cn(
                'w-full px-4 py-3',
                'resize-none',
                'bg-transparent',
                'border-none',
                'text-white text-sm',
                'focus:outline-none',
                'focus-visible:ring-0 focus-visible:ring-offset-0',
                'placeholder:text-neutral-500 placeholder:text-sm',
                'min-h-[60px]'
              )}
              style={{
                overflow: 'hidden',
              }}
            />
          </div>

          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="group p-2 hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-1"
              >
                <Paperclip className="w-4 h-4 text-white" />
                <span className="text-xs text-zinc-400 hidden group-hover:inline transition-opacity">
                  {attachButtonLabel}
                </span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-2 py-1 rounded-lg text-sm text-zinc-400 transition-colors border border-dashed border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800 flex items-center justify-between gap-1"
              >
                <PlusIcon className="w-4 h-4" />
                {projectButtonLabel}
              </button>
              <button
                type="button"
                className={cn(
                  'px-1.5 py-1.5 rounded-lg text-sm transition-colors border border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800 flex items-center justify-between gap-1',
                  value.trim() ? 'bg-white text-black' : 'text-zinc-400'
                )}
              >
                <ArrowUpIcon
                  className={cn(
                    'w-4 h-4',
                    value.trim() ? 'text-black' : 'text-zinc-400'
                  )}
                />
                <span className="sr-only">{sendButtonLabel}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 sm:overflow-x-auto sm:pb-2 sm:justify-center scrollbar-hide">
            {actionButtons.map((button, index) => (
              <ActionButton
                key={index}
                icon={button.icon}
                label={button.label}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ActionButtonProps {
  icon: ReactNode;
  label: string;
}

function ActionButton({ icon, label }: ActionButtonProps) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 w-full sm:w-auto px-3 sm:px-4 py-2 bg-neutral-900 hover:bg-neutral-800 rounded-full border border-neutral-800 text-neutral-400 hover:text-white transition-colors whitespace-nowrap flex-shrink-0"
    >
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );
}
