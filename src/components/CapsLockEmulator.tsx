import React, { useState, useEffect, useCallback, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { Keyboard } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface CapsLockEmulatorProps {}

const CapsLockEmulator: React.FC<CapsLockEmulatorProps> = () => {
  const [inputText, setInputText] = useState<string>('');
  const [capsLockPressed, setCapsLockPressed] = useState<boolean>(false);
  const [lastAction, setLastAction] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'CapsLock') {
      e.preventDefault();
      setCapsLockPressed(true);
    }
    
    if (capsLockPressed) {
      e.preventDefault();
      let action = '';
      const textarea = textareaRef.current;
      if (!textarea) return;
      
      const { selectionStart, selectionEnd } = textarea;
      
      switch (e.key.toLowerCase()) {
        case 'a':
          textarea.select();
          action = 'Select All';
          break;
        case 's':
          document.execCommand('cut');
          action = 'Cut';
          break;
        case 'd':
          document.execCommand('copy');
          action = 'Copy';
          break;
        case 'f':
          document.execCommand('paste');
          action = 'Paste';
          break;
        case 'j':
          textarea.setSelectionRange(selectionStart - 1, selectionStart - 1);
          action = 'Move Left';
          break;
        case 'k':
          // eslint-disable-next-line no-case-declarations
          const nextLineStart = inputText.indexOf('\n', selectionEnd) + 1;
          textarea.setSelectionRange(nextLineStart, nextLineStart);
          action = 'Move Down';
          break;
        case 'l':
          textarea.setSelectionRange(selectionEnd + 1, selectionEnd + 1);
          action = 'Move Right';
          break;
        case 'i':
          // eslint-disable-next-line no-case-declarations
          const prevLineEnd = inputText.lastIndexOf('\n', selectionStart - 1);
          textarea.setSelectionRange(prevLineEnd + 1, prevLineEnd + 1);
          action = 'Move Up';
          break;
        case 'n':
          setInputText(prev => prev.slice(0, selectionStart - 1) + prev.slice(selectionEnd));
          textarea.setSelectionRange(selectionStart - 1, selectionStart - 1);
          action = 'Backspace';
          break;
        case 'm':
          setInputText(prev => prev.slice(0, selectionStart) + prev.slice(selectionEnd + 1));
          textarea.setSelectionRange(selectionStart, selectionStart);
          action = 'Delete';
          break;
        case ',':
          document.execCommand('undo');
          action = 'Undo';
          break;
        case '.':
          document.execCommand('redo');
          action = 'Redo';
          break;
        default: break;
      }
      
      if (action) {
        setLastAction(action);
      }
    }
  }, [capsLockPressed, inputText]);

  const handleKeyUp = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'CapsLock') {
      setCapsLockPressed(false);
    }
  }, []);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.addEventListener('keydown', handleKeyDown as unknown as EventListener);
    textarea.addEventListener('keyup', handleKeyUp as unknown as EventListener);
    return () => {
      textarea.removeEventListener('keydown', handleKeyDown as unknown as EventListener);
      textarea.removeEventListener('keyup', handleKeyUp as unknown as EventListener);
    };
  }, [handleKeyDown, handleKeyUp]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Alert>
        <Keyboard className="h-4 w-4" />
        <AlertTitle>CapsLock Emulator</AlertTitle>
        <AlertDescription>
          Try the custom CapsLock key mappings here. Hold CapsLock and press the mapped keys.
        </AlertDescription>
      </Alert>
      <div className="mt-4">
        <textarea
          ref={textareaRef}
          className="w-full p-2 border rounded"
          rows={5}
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type here to test the key mappings..."
        />
      </div>
      <div className="mt-4">
        <p><strong>CapsLock Status:</strong> {capsLockPressed ? 'Pressed' : 'Not Pressed'}</p>
        <p><strong>Last Action:</strong> {lastAction || 'None'}</p>
      </div>
      <div className="mt-4">
        <h3 className="font-bold">Key Mappings:</h3>
        <ul className="list-disc list-inside">
          <li>CapsLock + A: Select All</li>
          <li>CapsLock + S: Cut</li>
          <li>CapsLock + D: Copy</li>
          <li>CapsLock + F: Paste</li>
          <li>CapsLock + J/K/L/I: Arrow Keys</li>
          <li>CapsLock + N: Backspace</li>
          <li>CapsLock + M: Delete</li>
          <li>CapsLock + ,: Undo</li>
          <li>CapsLock + .: Redo</li>
        </ul>
      </div>
    </div>
  );
};

export default CapsLockEmulator;